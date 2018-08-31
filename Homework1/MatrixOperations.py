from typing import Dict, Union
from Helper.Exceptions import InvalidMatricesException, InvalidNumberException, MatrixMultiplicationSizeException, MatrixSummationSizeException
from Helper.Functions import try_int, try_number, is_number, should_continue


class Matrix(object):
    def __init__(self, rows: int, columns: int):
        self.__rows: int = rows
        self.__columns: int = columns
        self.__data: Dict[int, Dict[int, Union[int, float]]] = {}

    @staticmethod
    def create_from(l: list):
        m = Matrix(len(l), len(l[0]))
        for row in range(0, m.row_count()):
            for column in range(0, m.column_count()):
                m.set_value_at(row, column, l[row][column])
        return m

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

        elif a.column_count() == b.row_count():
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
                    value = 0
                    for i in range(0, a.column_count()):
                        value += a.value_at(row, i) * b.value_at(i, column)
                    c.set_value_at(row, column, value)
        else:
            raise MatrixMultiplicationSizeException

    return c

"""test1 = Matrix.create_from([[1, 2, 3],
                            [ 4, 5, 6]])

test2 = Matrix.create_from([[ 7, 8],
                        [ 9, 10],
                        [11, 12]])

test_result = multiply(test1, test2)

print(test1)
print('------------------')
print(test2)
print('------------------')
print(test_result)"""

while True:
    try:
        print('Seleccione una opcion:')
        print('  1. Suma de Matrices')
        print('  2. Multiplicación de Matrices')
        print('  3. Salir')
        option = input('-> ')
        print('')

        if option == '1':
            print('NOTA: La suma de matrices requiere que las 2 matrices sean del mismo tamaño.')

            rows: int = None
            while rows is None:
                try:
                    rows = try_int(input('Ingrese el número de filas de las matrices: '))
                except InvalidNumberException:
                    print('[Error] Numero invalido, por favor ingrese un numero sin decimales')

            columns: int = None
            while columns is None:
                try:
                    columns = try_int(input('Ingrese el número de columnas de las matrices: '))
                except InvalidNumberException:
                    print('[Error] Numero invalido, por favor ingrese un numero sin decimales')

            print('Proceda a ingresar los datos de ambas matrices...')

            matrices: Dict[int, Matrix] = {}
            for i in range(0, 2):
                m = matrices[i] = Matrix(rows, columns)
                print('')
                for row in range(0, m.row_count()):
                    for column in range(0, m.column_count()):
                        while m.value_at(row, column) is None:
                            try:
                                m.set_value_at(row, column, try_number(input(
                                    'Matriz #' + str(i + 1) + ' | '
                                    'Valor para la posicion [' + str(row) + '][' + str(column) + ']: '
                                )))
                            except InvalidNumberException:
                                print('[Error] Numero invalido, '
                                      'por favor ingrese un numero con o sin decimales, '
                                      'y sin caracteres especiales')
                print('Matriz #' + str(i + 1) + ':\n' + str(m))

            print('\nResultado de la Suma de ambas matrices:\n' + str(sum_matrices(matrices[0], matrices[1])))

        elif option == '2':
            while True:
                print('Seleccione una opcion:')
                print('  1. Multiplicar una matriz por un numero')
                print('  2. Multiplicacion de 2 matrices')
                second_option = input('-> ')
                print('')

                if second_option == '1':
                    n: Union[int, float] = None
                    while n is None:
                        try:
                            n = try_number(input('Ingrese el numero por el que se multiplicara la matriz: '))
                        except InvalidNumberException:
                            print('[Error] Numero invalido, '
                                  'por favor ingrese un numero con o sin decimales, '
                                  'y sin caracteres especiales')

                    rows: int = None
                    while rows is None:
                        try:
                            rows = try_int(input('Ingrese el número de filas de las matriz: '))
                        except InvalidNumberException:
                            print('[Error] Numero invalido, por favor ingrese un numero sin decimales')

                    columns: int = None
                    while columns is None:
                        try:
                            columns = try_int(input('Ingrese el número de columnas de las matriz: '))
                        except InvalidNumberException:
                            print('[Error] Numero invalido, por favor ingrese un numero sin decimales')

                    print('Proceda a ingresar los datos de la matriz...')

                    matrix = Matrix(rows, columns)
                    for row in range(0, matrix.row_count()):
                        for column in range(0, matrix.column_count()):
                            while matrix.value_at(row, column) is None:
                                try:
                                    matrix.set_value_at(row, column, try_number(input(
                                        'Valor para la posicion [' + str(row) + '][' + str(column) + ']: '
                                    )))
                                except InvalidNumberException:
                                    print('[Error] Numero invalido, '
                                          'por favor ingrese un numero con o sin decimales, '
                                          'y sin caracteres especiales')
                    print('Matriz:\n' + str(Matrix))

                    print('\nResultado de la multiplicacion:\n' + str(multiply(n, matrix)))

                elif second_option == '2':
                    matrices: Dict[int, Matrix] = {}
                    print('')
                    for i in range(0, 2):
                        rows: int = None
                        while rows is None:
                            try:
                                rows = try_int(input('Ingrese el número de filas de las matriz #' + str(i + 1) + ': '))
                            except InvalidNumberException:
                                print('[Error] Numero invalido, por favor ingrese un numero sin decimales')

                        columns: int = None
                        while columns is None:
                            try:
                                columns = try_int(input('Ingrese el número de columnas de las matriz #' + str(i + 1) + ': '))
                            except InvalidNumberException:
                                print('[Error] Numero invalido, por favor ingrese un numero sin decimales')

                        m = matrices[i] = Matrix(rows, columns)
                        for row in range(0, m.row_count()):
                            for column in range(0, m.column_count()):
                                while m.value_at(row, column) is None:
                                    try:
                                        m.set_value_at(row, column, try_number(input(
                                            'Valor para la posicion [' + str(row) + '][' + str(column) + ']: '
                                        )))
                                    except InvalidNumberException:
                                        print('[Error] Numero invalido, '
                                              'por favor ingrese un numero con o sin decimales, '
                                              'y sin caracteres especiales')
                        print('Matriz #' + str(i + 1) + ':\n' + str(m))

                    print('\nResultado de la mutliplicacion de las matrices:\n' + str(multiply(matrices[0], matrices[1])))
                else:
                    print('[Error] Opción invalida, por favor intentelo nuevamente.')
                    continue

                break
        elif option == '3':
            raise KeyboardInterrupt
        else:
            print('[Error] Opción invalida, por favor intentelo nuevamente.')
            continue

        should_continue()
    except KeyboardInterrupt:
        print('\nSaliendo del programa...')
        quit(0)