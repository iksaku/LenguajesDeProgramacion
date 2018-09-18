from enum import Enum
from Helper.Exceptions import InvalidNumberException, InvalidTemperatureScaleException
from Helper.Functions import try_float, should_continue


class TemperatureScale(Enum):
    CELSIUS: int = 1
    FAHRENHEIT: int = 2
    KELVIN: int = 3
    RANKINE: int = 4


class Temperature(object):
    def __init__(self, temperature: float, scale: TemperatureScale):
        self.__temperature: float = float(temperature)

        if not scale in TemperatureScale:
            raise InvalidTemperatureScaleException

        self.__scale: TemperatureScale = scale

    def scale(self) -> TemperatureScale:
        return self.__scale

    def temperature(self) -> float:
        return self.__temperature

    def __float__(self) -> float:
        return self.__temperature

    def __str__(self) -> str:
        return '< Temperature: ' + str(self.__temperature) + ', Scale: ' + str(self.__scale.name) + '>'


def convert(temperature: Temperature, to_scale: TemperatureScale) -> Temperature:
    if not to_scale in TemperatureScale:
        raise InvalidTemperatureScaleException

    if temperature.scale() == to_scale:
        return temperature

    if temperature.scale() == TemperatureScale.CELSIUS:
        if to_scale == TemperatureScale.FAHRENHEIT:
            return Temperature((float(temperature) * 1.8) + 32, TemperatureScale.FAHRENHEIT)
        elif to_scale == TemperatureScale.KELVIN:
            return Temperature(float(temperature) + 273.15, TemperatureScale.KELVIN)
        elif to_scale == TemperatureScale.RANKINE:
            kelvin = convert(temperature, TemperatureScale.KELVIN)
            return Temperature(float(kelvin) * 1.8, TemperatureScale.RANKINE)

    elif temperature.scale() == TemperatureScale.FAHRENHEIT:
        if to_scale == TemperatureScale.CELSIUS:
            return Temperature((float(temperature) - 32) / 1.8, TemperatureScale.CELSIUS)
        elif to_scale == TemperatureScale.KELVIN:
            celsius = convert(temperature, TemperatureScale.CELSIUS)
            return convert(celsius, TemperatureScale.KELVIN)
        elif to_scale == TemperatureScale.RANKINE:
            return Temperature(float(temperature) + 459.67, TemperatureScale.RANKINE)

    elif temperature.scale() == TemperatureScale.KELVIN:
        if to_scale == TemperatureScale.CELSIUS:
            return Temperature(float(temperature) - 273.15, TemperatureScale.CELSIUS)
        elif to_scale == TemperatureScale.FAHRENHEIT:
            celsius = convert(temperature, TemperatureScale.CELSIUS)
            return convert(celsius, TemperatureScale.FAHRENHEIT)
        elif to_scale == TemperatureScale.RANKINE:
            return Temperature(float(temperature) * 1.8, TemperatureScale.RANKINE)

    elif temperature.scale() == TemperatureScale.RANKINE:
        if to_scale == TemperatureScale.CELSIUS:
            return Temperature((float(temperature) - 491.67) / 1.8, TemperatureScale.CELSIUS)
        elif to_scale == TemperatureScale.FAHRENHEIT:
            return Temperature(float(temperature) - 459.67, TemperatureScale.FAHRENHEIT)
        elif to_scale == TemperatureScale.KELVIN:
            return Temperature(float(temperature) / 1.8, TemperatureScale.KELVIN)

def get_scale(scale: str) -> TemperatureScale:
    if scale== 'c':
        return TemperatureScale.CELSIUS
    elif scale== 'f':
        return TemperatureScale.FAHRENHEIT
    elif scale== 'k':
        return TemperatureScale.KELVIN
    elif scale== 'r':
        return TemperatureScale.RANKINE
    else:
        raise InvalidTemperatureScaleException

print('Presione Ctrl+C para salir...')
while True:
    try:
        while True:
            print('\nPor favor seleccione la escala de temperatura de origen:')
            print('  (C). Celsius')
            print('  (F). Fahrenheit')
            print('  (K). Kelvin')
            print('  (R). Rankine')
            option = input('-> ').lower()

            try:
                scale = get_scale(option)
            except InvalidTemperatureScaleException:
                print('[Error] Opcion invalida, por favor intentelo nuevamente.\n')
                continue

            break

        temperature: Temperature
        while True:
            try:
                temperature_input = try_float(input('Por favor ingrese la temperatura a convertir: '))

                temperature = Temperature(temperature_input, scale)

                if float(convert(temperature, TemperatureScale.KELVIN)) < 0:
                    print('[Error] La temperatura no puede ser menor al 0 absoluto (Kelvin o Rankine), por favor ingrese otra temperatura\n')
                    continue
            except InvalidNumberException:
                print('[Error] Numero invalido, por favor ingrese un numero valido')
                continue

            break

        while True:
            print('Por favor seleccione la escala de temperatura destino:')
            if temperature.scale() != TemperatureScale.CELSIUS:
                print('  (C). Celsius')
            if temperature.scale() != TemperatureScale.FAHRENHEIT:
                print('  (F). Fahrenheit')
            if temperature.scale() != TemperatureScale.KELVIN:
                print('  (K). Kelvin')
            if temperature.scale() != TemperatureScale.RANKINE:
                print('  (R). Rankine')
            option = input('-> ').lower()

            try:
                scale = get_scale(option)
                if temperature.scale() == scale:
                    raise InvalidTemperatureScaleException
            except InvalidTemperatureScaleException:
                print('[Error] Opcion invalida, por favor intentelo nuevamente.\n')
                continue

            break

        print('\nConvirtiendo ' + str(float(temperature)) + '° de escala ' + temperature.scale().name + ' a ' + scale.name + '...')
        print('Resultado: ' + str(round(float(convert(temperature, scale)), 2)) + ' °' + scale.name[0])

        should_continue()
    except KeyboardInterrupt:
        print('\nSaliendo del programa...')
        quit(0)