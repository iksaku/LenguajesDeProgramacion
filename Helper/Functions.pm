#!/usr/bin/perl
package Functions;
use Moose;
use Data::Types qw/:all/;
use Exceptions;

sub prompt {
    my $prompt = shift;
    
    print $prompt;
    my $input = <STDIN>;
    chomp($input);

    return $input;
}

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
    prompt("\n\nPresione [Enter] para continuar...");
    if ((lc prompt("¿Desea continuar? (S/n): ")) eq "n") {
        die Exceptions::KeyboardInterrupt->new(message => "");
    }
}

1;