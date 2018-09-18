#!/usr/bin/perl
package TemperatureScale;
use Moose;
use constant {
    CELSIUS => 1,
    FAHRENHEIT => 2,
    KELVIN => 3,
    RANKINE => 4,
};

package Temperature;
use Moose;
has 'temperature' => (
    is => 'rw',
    isa => 'Num',
    required => 1,
);
has 'scale' => (
    is => 'rw',
    isa => 'Int',
    required => 1,
);

package main;
use Moose;
use Try::Tiny;
use Safe::Isa;
use FindBin;
use lib "$FindBin::RealBin/../Helper";
use Exceptions;
use Functions;

sub convert {
    my $temperature = shift;
    my $to_scale = shift;

    if (($to_scale < 1) && ($to_scale > 4)) {
        die Exceptions::InvalidTemperatureScale->new(message => "");
    }

    if ($temperature->scale == $to_scale) {
        return $temperature;
    }

    if ($temperature->scale == TemperatureScale::CELSIUS) {
        if ($to_scale == TemperatureScale::FAHRENHEIT) {
            return Temperature->new(temperature => ($temperature->temperature * 1.8) + 32, scale => $to_scale);
        }
        elsif ($to_scale == TemperatureScale::KELVIN) {
            return Temperature->new(temperature => ($temperature->temperature + 273.15), scale => $to_scale);
        }
        elsif ($to_scale == TemperatureScale::RANKINE) {
            my $kelvin = convert($temperature, TemperatureScale::KELVIN);
            return Temperature->new(temperature => ($kelvin * 1.8), scale => $to_scale);
        }
    }
    elsif ($temperature->scale == TemperatureScale::FAHRENHEIT) {
        if ($to_scale == TemperatureScale::CELSIUS) {
            return Temperature->new(temperature => ($temperature->temperature - 32) / 1.8, scale => $to_scale);
        }
        elsif ($to_scale == TemperatureScale::KELVIN) {
            my $celsius = convert($temperature, TemperatureScale::CELSIUS);
            return convert($celsius, TemperatureScale::KELVIN);
        }
        elsif ($to_scale == TemperatureScale::RANKINE) {
            return Temperature->new(temperature => ($temperature->temperature + 459.67), scale => $to_scale);
        }
    }
    elsif ($temperature->scale == TemperatureScale::KELVIN) {
        if ($to_scale == TemperatureScale::CELSIUS) {
            return Temperature->new(temperature => ($temperature->temperature - 273.15), scale => $to_scale);
        }
        elsif ($to_scale == TemperatureScale::FAHRENHEIT) {
            my $celsius = convert($temperature, TemperatureScale::CELSIUS);
            return convert($celsius, TemperatureScale::FAHRENHEIT);
        }
        elsif ($to_scale == TemperatureScale::RANKINE) {
            return Temperature->new(temperature => ($temperature->temperature * 1.8), scale => $to_scale);
        }
    }
    elsif ($temperature->scale == TemperatureScale::RANKINE) {
        if ($to_scale == TemperatureScale::CELSIUS) {
            return Temperature->new(temperature => ($temperature->temperature - 491.67) / 1.8, scale => $to_scale);
        }
        elsif ($to_scale == TemperatureScale::FAHRENHEIT) {
            return Temperature->new(temperature => ($temperature->temperature - 459.67), scale => $to_scale);
        }
        elsif ($to_scale == TemperatureScale::KELVIN) {
            return Temperature->new(temperature => ($temperature->temperature / 1.8), scale => $to_scale);
        }
    }
}

sub get_scale {
    my $scale = shift;

    if ($scale == "c") {
        return TemperatureScale::CELSIUS;
    }
    elsif ($scale == "f") {
        return TemperatureScale::FAHRENHEIT;
    }
    elsif ($scale == "k") {
        return TemperatureScale::KELVIN;
    }
    elsif ($scale == "r") {
        return TemperatureScale::RANKINE;
    }
    else {
        die Exceptions::InvalidTemperatureScale->new(message => "");
    }
}

sub scale_name {
    my $scale = shift;

    if ($scale == TemperatureScale::CELSIUS) {
        return "Celsius";
    }
    elsif ($scale == TemperatureScale::FAHRENHEIT) {
        return "Fahrenheit";
    }
    elsif ($scale == TemperatureScale::KELVIN) {
        return "Kelvin";
    }
    elsif ($scale == TemperatureScale::RANKINE) {
        return "Rankine";
    }
    else {
        die Exceptions::InvalidTemperatureScale->new(message => "");
    }
}

my $min_temperature = Temperature->new(temperature => 0, scale => TemperatureScale::KELVIN);
print "Presione Ctrl+C para salir...\n";
while (1) {
    try {
        my $temperature;
        my $scale;
        while (1) {
            print "\nPor favor seleccione la escala de temperatura de origen:\n";
            print "  (C). Celsius\n";
            print "  (F). Fahrenheit\n";
            print "  (K). Kelvin\n";
            print "  (R). Rankine\n";
            my $option = lc Functions::prompt("-> ");

            try {
                $scale = get_scale($option);
            } catch {
                my $e = $_;
                if ($e->isa("Exceptions::InvalidTemperatureScale")) {
                    print "\n[Error] Opcion invalida, por favor intentelo nuevamente.\n";
                    continue;
                }
            }
            
            last;
        }
        
        while (1) {
            try {
                my $temperature_input = Functions::try_float(Functions::prompt("Por favor ingrese la temperatura a convertir: "));
                $temperature = Temperature->new(temperature => $temperature_input, scale => $scale);

                if (convert($temperature, TemperatureScale::KELVIN)->temperature < 0) {
                    print("\n[Error] La temperatura no puede ser menor al 0 absoluto (Kelvin o Rankine), por favor ingrese otra temperatura.\n");
                    continue;
                }
            } catch {
                my $e = $_;

                if ($e->isa("Exceptions::InvalidNumber")) {
                    print "\n[Error] Numero invalido, por favor ingrese un numero valido.\n";
                    continue;
                }
            }

            last;
        }

        while (1) {
            print "\nPor favor seleccione la escala de temperatura destino:\n";
            if (temperature->scale != TemperatureScale::CELSIUS) {
                print "  (C). Celsius\n";
            }
            if (temperature->scale != TemperatureScale::FAHRENHEIT) {
                print "  (F). Fahrenheit\n";
            }
            if (temperature->scale != TemperatureScale::KELVIN) {
                print "  (K). Kelvin\n";
            }
            if (temperature->scale != TemperatureScale::RANKINE) {
                print "  (R). Rankine\n";
            }
            my $option = lc Functions::prompt("-> ");

            try {
                $scale = get_scale($option);
                if ($temperature->scale == $scale) {
                    die Exceptions::InvalidTemperatureScale->new(message => "");
                }
            } catch {
                my $e = $_;
                if ($e->isa("Exceptions::InvalidTemperatureScale")) {
                    print "\n[Error] Opcion invalida, por favor intentelo nuevamente.\n";
                    continue;
                }
            }

            last;
        }

        print "\nConvirtiendo " . $temperature->temperature . " ° de escala " . scale_name($temperature->scale) . " a " . scale_name($scale) . "...\n";
        print "\nResultado: " . convert($temperature, $scale)->temperature . "° " . (substr scale_name($temperature->scale), 0, 1);
    } catch {
        my $e = $_;
        if ($e->isa("Exceptions::KeyboardInterrupt")) {
            print "\nSaliendo del programa...\n";
            exit(0);
        }
    }
}