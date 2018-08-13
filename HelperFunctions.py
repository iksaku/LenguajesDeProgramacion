from Exceptions import InvalidNumberException


def try_int(x):
    try:
        return int(x)
    except ValueError:
        raise InvalidNumberException

