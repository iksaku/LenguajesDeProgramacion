class InsufficientArgumentsException(Exception):
    """ Error thrown when there are insufficient arguments/parameters to run an instruction """
    pass


class InvalidNumberException(Exception):
    """ Error thrown when the given input is not a number """
    pass


class NumberOutOfRangeException(Exception):
    """ Error thrown when a number is not inside the allowed range of possible numbers """
    pass


class RepeatedNumberException(Exception):
    """ Error thrown when a number  """
    pass
