class InvalidNumberException(Exception):
    """ Error thrown when the given input is invalid """
    pass


class NumberOutOfRangeException(Exception):
    """ Error thrown when a number is less than zero or over 1 million """
    pass


MILLION = 1000000
THOUSAND = 1000
HUNDRED = 100
TEN = 10
UNIT = 1


__base = {
    0: 'cero',
    UNIT: 'uno',
    2: 'dos',
    3: 'tres',
    4: 'cuatro',
    5: 'cinco',
    6: 'seis',
    7: 'siete',
    8: 'ocho',
    9: 'nueve',
    TEN: [
        'diez',
        'dieci'
    ],
    11: 'once',
    12: 'doce',
    13: 'trece',
    14: 'catorce',
    15: 'quince',
    16: 'dieciséis',

    20: [
        'veinte',
        'veinti'
    ],

    22: 'veintidós',
    23: 'veintitrés',
    26: 'ventiséis',

    30: 'treinta',

    40: 'cuarenta',

    50: 'cincuenta',

    60: 'sesenta',

    70: 'setenta',

    80: 'ochenta',

    90: 'noventa',

    HUNDRED: [
        'cien',
        'ciento',
        'cientos'
    ],

    500: 'quinientos',

    700: 'setecientos',

    900: 'novecientos',

    THOUSAND: 'mil',

    MILLION: 'un millón'
}


def __get_units(n):
    pass


def __get_tens_and_units(n):
    # Number is present exactly in the dictionary
    if n in __base:
        name = __base[n]

        # In case number is exactly present, but has another available name
        if isinstance(name, list):
            name = name[0]

        return name

    # Round number to the lower multiple of ten
    tens = (n // TEN) * TEN
    # Get the value lower than ten, but higher or equal to zero, present in the number
    units = n % TEN
    t_name = __base[tens]

    # In case there's another way to express certain numbers, we use their prefixes
    # otherwise, place a nexus between name of "tens" and name of "units"
    if isinstance(t_name, list):
        t_name = t_name[1]
    else:
        t_name += ' y '

    # Return the name of tens and the units in the number
    return t_name + __base[units]


def __get_hundreds(n):
    if n < HUNDRED:
        # Just in case we call this function and provide a number lower than one hundred
        return __get_tens_and_units(n)
    elif n in __base:
        # In case the number is present in the dictionary
        if n == HUNDRED:
            # In case the number is exactly one hundred
            return __base[HUNDRED][0]
        else:
            # In case the number is higher than one hundred
            return __base[n]

    # Get the unit name of the hundred in place
    hundreds_unit = n // HUNDRED

    if n % HUNDRED == 0:
        # In case the number is exact multiple of one hundred
        return __get_tens_and_units(hundreds_unit) + __base[HUNDRED][2]

    # Round number to the lower multiple of one hundred
    hundreds = hundreds_unit * HUNDRED

    if hundreds == HUNDRED:
        # In case number is higher than one hundred, but less than two hundred
        # appends the name prefix "ciento"
        h_name = __base[HUNDRED][1]
    else:
        # In case number is higher than two hundred, but less than one thousand
        # but still, not an exact multiple of one hundred (that was done at beginning of function)
        if hundreds in __base:
            # In case the hundred has a different name than others...
            h_name = __base[hundreds]
        else:
            # Appends prefix as the unit name of the hundred and suffix "cientos"
            h_name = __get_tens_and_units(hundreds_unit) + __base[HUNDRED][2]

    # Return the hundreds name and return the name of the tens and units from the number
    return h_name + ' ' + __get_tens_and_units(n % HUNDRED)


def __get_thousands(n):
    if n == THOUSAND:
        # In case number is exactly one thousand
        return __base[THOUSAND]

    # Get the unit name of the thousand in place
    thousands_unit = n // THOUSAND

    if n % THOUSAND == 0:
        # In case number is exact multiple of one thousand
        return __get_tens_and_units(thousands_unit) + ' ' + __base[THOUSAND]

    # Round number to the lower multiple of one thousand
    thousands = thousands_unit * THOUSAND

    if thousands == THOUSAND:
        t_name = __base[THOUSAND]
    else:
        t_name = __get_hundreds(thousands_unit) + ' ' + __base[THOUSAND]

    # Return the thousands name and return the name of the rest of the number
    return t_name + ' ' + __get_hundreds(n % THOUSAND)


def get_number_name(n):
    try:
        n = int(n)
    except ValueError:
        raise InvalidNumberException

    if (n < 0) or (n > MILLION):
        raise NumberOutOfRangeException

    name = ""

    if n == MILLION:
        name += __base[MILLION]
    elif n >= THOUSAND:
        name += __get_thousands(n)
    elif n >= HUNDRED:
        name += __get_hundreds(n)
    elif n >= UNIT:
        name += __get_tens_and_units(n)

    return name
