from Exceptions import InvalidNumberException
from HelperFunctions import try_int


def gcd(x, y):
    if y == 0:
        return x

    return gcd(y, x % y)


def lcm(number_list):
    result = number_list.pop(0)
    for x in number_list:
        result = (x * result) / gcd(x, result)
    return result


print('Para salir utilice: Ctrl + C')
while True:
    try:
        numbers = []

        while True:
            try:
                c_input = input('Porfavor ingrese un número entero (Deje vacio para calcular): ')
                if len(c_input) == 0:
                    if len(numbers) < 2:
                        print('[Error] Es necesario contar con minimo 2 numeros para continuar con el calculo.')
                        print('        Porfavor ingrese uno o mas numeros para continuar.')
                        continue
                    else:
                        break
                else:
                    numbers.append(try_int(c_input))
            except InvalidNumberException:
                print('[Error] Porfavor ingrese un numero valido.')

        n_str = ', '.join(str(n) for n in numbers)
        print('Calculando Minimo Comun Multiplo de: ' + n_str + '...')
        numbers.sort(reverse=True)
        print('Resultado: ' + str(int(lcm(numbers))) + '\n')
    except KeyboardInterrupt:
        print('\n\nTerminando programa...')
        quit(0)
