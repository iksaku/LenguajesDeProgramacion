#!/usr/bin/perl
use Moose;
use Try::Tiny;
use Safe::Isa;
use FindBin;
use lib "$FindBin::Bin/../Helper";
use Exceptions;

sub gcd {
    my ($x, $y) = @_;

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

        #my @loops = 
    }
}

#try {
#    die Exceptions::InvalidNumber->new(message => "Test");
#} catch {
#    my $e = $_;
#
#    if ($e->isa("Exceptions::InvalidNumber")) {
#        warn "Caught InvalidNumber Exception:\n$e";
#        
#    } else {
#        print "Not an InvalidNumber Exception :(";
#    }
#};

print "\n";