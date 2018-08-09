from Homework1 import InvalidNumberException, NumberOutOfRangeException, NamedNumbers


def to_int(n):
    try:
        return int(n)
    except ValueError:
        raise InvalidNumberException


nn = NamedNumbers()
print('Para salir utilice: Crtl + C')
while True:
    try:
        i = to_int(input('Porfavor ingrese un numero entre 0 (Cero) y 1 Millon: '))
        print((' ' * (7 - len(str(i)))) + str(i) + ' - ' + nn.get(i))
    except InvalidNumberException:
        print('[Error] Porfavor ingrese un numero valido.')
    except NumberOutOfRangeException:
        print('[Error] Porfavor ingrese un numero mayor o igual a 0 (Cero) y menor o igual a 1 Millon.')
    except KeyboardInterrupt:
        print('\nTerminando programa...')
        quit(0)
