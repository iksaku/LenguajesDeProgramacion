from Exceptions import InvalidNumberException, NumberOutOfRangeException
from HelperFunctions import try_int


class NamedNumbers(object):
    MILLION = 1000000
    THOUSAND = 1000
    HUNDRED = 100
    TEN = 10
    UNIT = 1

    MIN = 0
    MAX = MILLION

    __dictionary = {
        MIN: 'cero',
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

    def __get_tens_and_units(self, n):
        # Number is present exactly in the dictionary
        if n in self.__dictionary:
            name = self.__dictionary[n]

            # In case number is exactly present, but has another available name
            if isinstance(name, list):
                name = name[0]

            return name

        # Round number to the lower multiple of ten
        tens = (n // self.TEN) * self.TEN
        # Get the value lower than ten, but higher or equal to zero, present in the number
        units = n % self.TEN
        t_name = self.__dictionary[tens]

        # In case there's another way to express certain numbers, we use their prefixes
        # otherwise, place a nexus between name of "tens" and name of "units"
        if isinstance(t_name, list):
            t_name = t_name[1]
        else:
            t_name += ' y '

        # Return the name of tens and the units in the number
        return t_name + self.__dictionary[units]

    def __get_hundreds(self, n):
        if n < self.HUNDRED:
            # Just in case we call this function and provide a number lower than one hundred
            return self.__get_tens_and_units(n)
        elif n in self.__dictionary:
            # In case the number is present in the dictionary
            if n == self.HUNDRED:
                # In case the number is exactly one hundred
                return self.__dictionary[self.HUNDRED][0]
            else:
                # In case the number is higher than one hundred
                return self.__dictionary[n]

        # Get the unit name of the hundred in place
        hundreds_unit = n // self.HUNDRED

        if n % self.HUNDRED == 0:
            # In case the number is exact multiple of one hundred
            return self.__get_tens_and_units(hundreds_unit) + self.__dictionary[self.HUNDRED][2]

        # Round number to the lower multiple of one hundred
        hundreds = hundreds_unit * self.HUNDRED

        if hundreds == self.HUNDRED:
            # In case number is higher than one hundred, but less than two hundred
            # appends the name prefix "ciento"
            h_name = self.__dictionary[self.HUNDRED][1]
        else:
            # In case number is higher than two hundred, but less than one thousand
            # but still, not an exact multiple of one hundred (that was done at beginning of function)
            if hundreds in self.__dictionary:
                # In case the hundred has a different name than others...
                h_name = self.__dictionary[hundreds]
            else:
                # Appends prefix as the unit name of the hundred and suffix "cientos"
                h_name = self.__get_tens_and_units(hundreds_unit) + self.__dictionary[self.HUNDRED][2]

        # Return the hundreds name and return the name of the tens and units from the number
        return h_name + ' ' + self.__get_tens_and_units(n % self.HUNDRED)

    def __get_thousands(self, n):
        if n == self.THOUSAND:
            # In case number is exactly one thousand
            return self.__dictionary[self.THOUSAND]

        # Get the unit name of the thousand in place
        thousands_unit = n // self.THOUSAND

        if n % self.THOUSAND == 0:
            # In case number is exact multiple of one thousand
            return self.__get_tens_and_units(thousands_unit) + ' ' + self.__dictionary[self.THOUSAND]

        # Round number to the lower multiple of one thousand
        thousands = thousands_unit * self.THOUSAND

        if thousands == self.THOUSAND:
            t_name = self.__dictionary[self.THOUSAND]
        else:
            t_name = self.__get_hundreds(thousands_unit) + ' ' + self.__dictionary[self.THOUSAND]

        # Return the thousands name and return the name of the rest of the number
        return t_name + ' ' + self.__get_hundreds(n % self.THOUSAND)

    def get(self, n):
        if (n < self.MIN) or (n > self.MAX):
            raise NumberOutOfRangeException

        if n == self.MILLION:
            return self.__dictionary[self.MILLION]
        elif n >= self.THOUSAND:
            return self.__get_thousands(n)
        elif n >= self.HUNDRED:
            return self.__get_hundreds(n)
        else:
            return self.__get_tens_and_units(n)


nn = NamedNumbers()
print('Para salir utilice: Crtl + C')
while True:
    try:
        x = try_int(input('\nPorfavor ingrese un numero entre 0 (Cero) y 1 Millon: '))
        print((' ' * (7 - len(str(x)))) + str(x) + ' - ' + nn.get(x))
    except InvalidNumberException:
        print('[Error] Porfavor ingrese un numero valido.')
    except NumberOutOfRangeException:
        print('[Error] Porfavor ingrese un numero mayor o igual a 0 (Cero) y menor o igual a 1 Millon.')
    except KeyboardInterrupt:
        print('\n\nTerminando programa...')
        quit(0)
