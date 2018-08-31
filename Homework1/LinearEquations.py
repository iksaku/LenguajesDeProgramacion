# Linear equations are present in the form ax + b = c
# Maybe we could use RegEx for that?
# Example inputs:
#   3x - 4z + 5y = 0
#   4y - 7x +  z  = 0
# RegEx pattern: /((\+|\-|)\d*\w)/i

import re

"""while True:
    try:
        print('')
    except KeyboardInterrupt:
        print('\nSaliendo del programa...')
        quit(0)"""

whitespace = re.compile('[\s+]')
element_finder = re.compile('(=?[+-]?\d*\w)', re.IGNORECASE)
variable_finder = re.compile('([a-z])', re.IGNORECASE)

equations = {}

test = ['3x - 4z + 5y = 0', '4y - 7x +  z  = 0']

for i in range(0, len(test)):
    current_equation = whitespace.sub('', test[i])
    print('Equation: ' + current_equation)
    matches = element_finder.findall(current_equation)

    for element in matches:
        variables = variable_finder.findall(element)
        if len(variables) == 1:
            print('\t\'' + element + '\' has variable \'' + str(variables[0]) + '\'')

    print('-------')