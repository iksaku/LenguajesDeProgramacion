#!/usr/bin/perl
use Moose;
use Try::Tiny;
use Safe::Isa;
use FindBin;
use lib "$FindBin::RealBin/../Helper";
use Exceptions;
use Functions;

sub gcd {
    my $x = shift;
    my $y = shift;

    if ($y == 0) {
        return $x;
    }

    return gcd($y, $x % $y);
}

sub lcm {
    my @number_list = @_;

    my $result = shift @number_list;
    foreach my $x (@number_list) {
        $result = ($x * $result) / gcd($x, $result);
    }

    return $result;
}

while (1) {
    try {
        my @numbers = ();

        my $loops = Functions::try_int(Functions::prompt("\nPor favor especifique la cantidad de numeros a procesar: "));
        if ($loops < 2) {
            die Exceptions::InsufficientArguments->new(message => "");
        }

        my $c_loops = 1;
        while($c_loops <= $loops) {
            try {
                my $n = Functions::try_int(Functions::prompt("Porfavor ingrese el " . $c_loops . "° numero: "));

                if ($n < 1) {
                    die Exceptions::NumberOutOfRange->new(message => "");
                }
                elsif (grep {$_ eq $n} @numbers) {
                    die Exceptions::RepeatedNumber->new(message => "");
                }

                push @numbers, $n;
                ++$c_loops;
            } catch {
                my $e = $_;

                if ($e->isa("Exceptions::InvalidNumber")) {
                    print "\n[Error] Por favor ingrese un numero valido.";
                }
                elsif ($e->isa("Exceptions::NumberOutOfRange")) {
                    print "\n[Error] Por favor ingrese un numero mayor a 0.";
                }
                elsif ($e->isa("Exceptions::RepeatedNumber")) {
                    print "\n[Error] Numero repetido, por favor ingrese un numero diferente.";
                }
            }
        }

        print "\nCalculando Minimo Comun Multiplo de: " . (join(', ', @numbers)) . "...";
        @numbers = sort {$b <=> $a} @numbers; # Sort in reverse order
        print "\nResultado: " . lcm(@numbers);

        Functions::should_continue();
    } catch {
        my $e = $_;

        if ($e->isa("Exceptions::InsufficientArguments")) {
            print "\n[Error] Es necesario especificar minimo 2 numeros para continuar con el calculo.\n";
            print "        Por favor ingrese uno o mas numeros para continuar.";
        }
        elsif ($e->isa("Exceptions::InvalidNumber")) {
            print "\n[Error] Por favor ingrese un numero valido.";
        }
        elsif ($e->isa("Exceptions::KeyboardInterrupt")) {
            print "\nSaliendo del programa...\n";
            exit(0);
        }
    }
}