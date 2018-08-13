class InvalidNumberException(Exception):
    """ Error thrown when the given input is invalid """
    pass


class NumberOutOfRangeException(Exception):
    """ Error thrown when a number is less than zero or over 1 million """
    pass
