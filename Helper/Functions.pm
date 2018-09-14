#!/usr/bin/perl
package Functions;
use Moose;
use IO::Prompter;
use Data::Types qw/:all/;
use Exceptions;

sub try_float {
    my $x = shift;

    if (!is_float($x) or is_int($x)) {
        die Exceptions::InvalidNumber->new(message => "");
    }

    return to_float($x);
}

sub try_int {
    my $x = shift;

    if (!is_int($x)) {
        die Exceptions::InvalidNumber->new(message => "");
    }

    return to_int($x);
}

sub try_number {
    my $x = shift;

    if (!is_number($x)) {
        die Exceptions::InvalidNumber->new(message => "");
    }

    return to_decimal($x);
}

sub is_number {
    my $x = shift;

    return is_decimal($x);
}

sub should_continue {
    print "\nPresione [Enter] para continuar...";
    <STDIN>;

    my $in = prompt("¿Desea continuar? (Y/n): ", -yn);

    if ((lc $in) == "n") {
        die Exceptions::KeyboardInterrupt->new(message => "");
    }
}