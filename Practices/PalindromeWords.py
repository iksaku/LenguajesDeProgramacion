def is_palindrome(w):
    iteration_count = int(len(w) / 2)

    for s in range(0, iteration_count):
        e = len(w) - (s + 1)
        if w[s] != w[e]:
            return False

    return True


word = input('Por favor ingrese una palabra: ')
print('La palabra \'' + word + '\'' + (' ' if is_palindrome(word) else ' no ') + 'es capicua')
