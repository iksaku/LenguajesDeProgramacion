# Contents

1. [Database #1](#database-1).
2. [Database #2](#database-2).
3. [Diameter of the nth segment of mollusk's shell using the "Golden Ratio"](#diameter-of-nth-segment).
4. Fill the `scheme` column in the given Haskell-Erlang-Scheme document.
5. [Determine the type of a triangle by the size of its sides](#determine-the-type-of-triangle).
6. First PIA's progress review.
7. [Surprise program in a surprise language](#surprise-program).


### Database #1

- This script must be written in CommonLisp
- Database of 25 contacts with 4 attributes (Besides the name, which is the PK).
- We need to be able to add, remove or print the db in console.
- We need to be able to save the DB to a file and load it aswell.


### Database #2

- This script must be written in CommonLisp
- List of 100 city names, each one of **one word** without _special characters_
- Requirements of the program:
  + Show all elements that contain the particle "as".
  + Show all elements that contains the letters "a", "r" and "s".
  + Show all elements that contains the particle "ca" or "za".


### Diameter of nth segment

- This script must be written in Haskell
- A segment is specified, then the diameter is calculating by using the _Fibonacci Sequence_ and the next formula:
![img](http://latex.codecogs.com/svg.latex?d_%7Bi-1%7D%20%3D%20d_%7Bi%7D%20*%20%5Cfrac%7Bf_%7Bi-1%7D%7D%7Bf_%7Bi%7D%7D)


### Determine the type of triangle

- This script must be written in Erlang
- User gives out the size of each of the triangle's sides and we will tell the type of the triangle based on the sizes.


## Surprise program
- Program will be written in Scala.
- Part A: Hours that a person has lived. Using as inputs the birthday and today dates.
- Part B: Display Hours, minutes and seconds lived by a person, but:
  + Specifying the birthday date and city.
  + The actual date and city its living.


## On-going Notes

- We can open an Erlang Console in the cli by running `erl`, and exit by running the command `halt().` inside the Console.
- We can skip Erlang's compilation process by using [Erlang Scripts](http://erlang.org/doc/man/escript.html)
- We can also skip Haskell's compilation process by using [Haskell's runghc](http://downloads.haskell.org/~ghc/latest/docs/html/users_guide/runghc.html).
- We can open a Haskell Console in the cli by running `ghci`, and exit by running the command `:quit` inside the Console.