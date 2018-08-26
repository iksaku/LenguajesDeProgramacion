from typing import Dict, Union
from Helper.Exceptions import InvalidMatricesException, InvalidNumberException, MatrixMultiplicationSizeException, MatrixSummationSizeException
from Helper.Functions import is_number


class Matrix(object):
    def __init__(self, rows: int, columns: int):
        self.__rows: int = rows
        self.__columns: int = columns
        self.__data: Dict[int, Dict[int, Union[int, float]]] = {}

    def row_count(self) -> int:
        return self.__rows

    def column_count(self) -> int:
        return self.__columns

    def value_at(self, row, column):
        try:
            return self.__data[row][column]
        except KeyError:
            return None
        except IndexError:
            return None

    def set_value_at(self, row: int, column: int, value):
        if not row in self.__data:
            self.__data[row] = {}

        self.__data[row][column] = value

    def get_data(self):
        return self.__data

    def __str__(self):
        result = ''
        for row in range(0, self.row_count()):
            if row > 0:
                result += '\n'
            for column in range(0, self.column_count()):
                result += '\t' + str(self.value_at(row, column))

        return result

def sum_matrices(a: Matrix, b: Matrix) -> Matrix:
    if (a.column_count() != b.column_count()) or (a.row_count() != b.row_count()):
        raise MatrixSummationSizeException

    c = Matrix(a.row_count(), a.column_count())
    for row in range(0, a.row_count()):
        for column in range(0, a.column_count()):
            c.set_value_at(row, column, a.value_at(row, column) + b.value_at(row, column))

    return c

def multiply(a, b) -> Matrix:
    if is_number(a) and is_number(b):
        raise InvalidMatricesException

    if is_number(b):
        """ In case we have a scalar in second place and matrix in first, just flip them """
        tmp = a
        a: Union[int, float] = b
        b: Matrix = tmp

    c: Matrix
    if not isinstance(a, Matrix):
        """ In case we have a scalar... """
        c = Matrix(b.row_count(), b.column_count())

        for row in range(0, c.row_count()):
            for column in range(0, c.column_count()):
                c.set_value_at(row, column, a * b.value_at(row, column))

    else:
        """ In case they're both matrices... """

        if a.column_count() == b.column_count() and a.row_count() == b.row_count():
            """ In case they're both equally sized """
            c = Matrix(a.row_count(), a.column_count())

            for row in range(0, c.row_count()):
                for column in range(0, c.column_count()):
                    c.set_value_at(row, column, a.value_at(row, column) * b.value_at(row, column))

        elif a.row_count() == b.column_count():
            """
            In case they comply with the 'nm x mp' rule, where:
             - n is the row count of the first matrix
             - m is the count of first matrix's columns and second matrix's rows
             - p is the column count of the second matrix
            
                'nm x mp' -> '(row 1)(col 1) x (row 2)(col 2)
            """
            c = Matrix(a.row_count(), b.column_count())

            for row in range(0, c.row_count()):
                for column in range(0, c.column_count()):
                    # TODO: Fix Dot Product
                    c.set_value_at(row, column, a.value_at(row, column) * b.value_at(column, row))
        else:
            raise MatrixMultiplicationSizeException

    return c

a = Matrix(2, 3)
b = Matrix(3, 2)

i = 1
for r in range(0, a.row_count()):
    for col in range(0, a.column_count()):
        a.set_value_at(r, col, i)
        i += 1
for r in range(0, b.row_count()):
    for col in range(0, b.column_count()):
        b.set_value_at(r, col, i)
        i += 1