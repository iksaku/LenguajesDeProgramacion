#!/usr/bin/perl
use Moose;
use Try::Tiny;
use Safe::Isa;
use FindBin;
use lib '$FindBin::Bin/../Helper';
use Exceptions;

try {
    my $ex = Exceptions::InvalidNumber->new(message => 'Test');
    die $ex;
} catch {
    #if ($_->isa('Exceptions::InvalidNumber')) {
    #    print "Yay!"
    #}

    my $e = $_;

    if ($e->isa('Exceptions::Base')) {
        print "Heh";
    } else {
        warn '$e';
    }
};
