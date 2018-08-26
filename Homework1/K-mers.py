"""
    K-mer, con K = 1
                    Frecuencia
                    K * Frecuencia = Caomero mas repetido
"""

word = input('Por favor ingrese una palabra: ')
#word = "10111111000001011110" -> length: 20

#particle => frecuency
counter = {}

# particle => step
highest = ('', 0)

L = len(word)
for k in range(1, L + 1):
    for x in range(0, L - k + 1):
        particle = word[x:x + k]
        if particle in counter:
            continue
        for y in range(0, L - k + 1):
            stepped_particle = word[y:y + k]
            if not particle in counter:
                counter[particle] = 0

            if particle == stepped_particle:
                counter[particle] += 1

            if (len(highest[0]) < 1) or ((counter[particle] * k) > (counter[highest[0]] * highest[1])):
                highest = (particle, k)
        print('Step: ' + str(k) + ' | Particle: ' + particle + ' | Frequency: ' + str(counter[particle]) + ' | Result: ' + str(counter[particle] * k))

print(highest)