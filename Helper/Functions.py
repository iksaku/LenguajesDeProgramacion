from Helper.Exceptions import InvalidNumberException


def try_float(x):
    if isinstance(x, float):
        return x

    try:
        return float(x)
    except ValueError:
        raise InvalidNumberException

def try_int(x):
    if isinstance(x, int):
        return x

    try:
        return int(x)
    except ValueError:
        raise InvalidNumberException

def try_number(x):
    if is_number(x):
        return x

    try:
        return int(x)
    except ValueError:
        try:
            return float(x)
        except ValueError:
            raise InvalidNumberException

def is_number(x):
    return isinstance(x, int) or isinstance(x, float)

def should_continue():
    input('\nPresione [Enter] para continuar...')
    if input('¿Desea continuar? (S/n): ').lower() == 'n':
        raise KeyboardInterrupt