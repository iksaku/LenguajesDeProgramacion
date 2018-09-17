from Helper.Exceptions import InsufficientArgumentsException, InvalidNumberException, NumberOutOfRangeException, RepeatedNumberException
from Helper.Functions import try_int, should_continue


def gcd(x, y):
    if y == 0:
        return x

    return gcd(y, x % y)


def lcm(number_list):
    result = number_list.pop(0)
    for x in number_list:
        result = (x * result) / gcd(x, result)
    return result


while True:
    try:
        numbers = []
        loops = try_int(input('\nPor favor especifique la cantidad de numeros a procesar: '))
        if loops < 2:
            raise InsufficientArgumentsException

        c_loop = 1
        while c_loop <= loops:
            try:
                n = try_int(input('\nPor favor ingrese el ' + str(c_loop) + '° numero: '))

                if n < 1:
                    raise NumberOutOfRangeException
                elif n in numbers:
                    raise RepeatedNumberException

                numbers.append(n)
                c_loop += 1
            except InvalidNumberException:
                print('[Error] Por favor ingrese un numero valido.')
            except NumberOutOfRangeException:
                print('[Error] Por favor ingrese un numero mayor a 0.')
            except RepeatedNumberException:
                print('[Error] Numero repetido, por favor ingrese un numero diferente.')

        print('Calculando Minimo Comun Multiplo de: ' + (', '.join(str(n) for n in numbers)) + '...')
        numbers.sort(reverse=True)
        print('Resultado: ' + str(int(lcm(numbers))))

        should_continue()
    except InsufficientArgumentsException:
        print('[Error] Es necesario especificar minimo 2 numeros para continuar con el calculo.')
        print('        Por favor ingrese uno o mas numeros para continuar.')
    except InvalidNumberException:
        print('[Error] Por favor ingrese un numero valido.')
    except KeyboardInterrupt:
        print('\nSaliendo del programa...')
        quit(0)
