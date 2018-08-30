class InsufficientArgumentsException(Exception):
    """ Error thrown when there are insufficient arguments/parameters to run an instruction """
    pass


class InvalidNumberException(Exception):
    """ Error thrown when the given input is not a number """
    pass


class InvalidMatricesException(Exception):
    """ Error thrown when neither of the given arguments is a matrix """
    pass


class InvalidTemperatureScaleException(Exception):
    """ Error thrown when trying to convert to an unavailable temperature scale """
    pass


class MatrixMultiplicationSizeException(Exception):
    """
    Error thrown when trying to multiply the given matrices and they
    are not equally size or doesn't comply with the 'nm x mp' rule
    """
    pass


class MatrixSummationSizeException(Exception):
    """ Error thrown when trying to sum the given matrices and they are not equally sized """
    pass


class NumberOutOfRangeException(Exception):
    """ Error thrown when a number is not inside the allowed range of possible numbers """
    pass


class RepeatedNumberException(Exception):
    """ Error thrown when a number  """
    pass
