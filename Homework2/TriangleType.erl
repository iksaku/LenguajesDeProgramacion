%%%-------------------------------------------------------------------
%%% @author Jorge González
%%% @copyright (C) 2018, Equipo Negro de Lenguajes de Programación
%%% @doc
%%%
%%% @end
%%% Created : 12. Sep 2018 11:24 AM
%%%-------------------------------------------------------------------
-module('TriangleType').
-author("Jorge González").
%% API
-export([bySides/0]).

tryInt(Lado) ->
    {Status, Tmp} = io:fread("Porfavor ingrese la medida del " ++ Lado ++ " lado del Triangulo: ", "~d"),
    if
        Status == ok ->
            [Value] = Tmp,
            if
                Value < 1 ->
                    io:fwrite("~n[Error] Por favor introduzca un numero mayor a cero.~n"),
                    tryInt(Lado);
                true -> Value % Returns Input number when valid :D
            end;
        true ->
            io:fwrite("~n[Error] Numero invalido, por favor intentelo denuevo.~n"),
            tryInt(Lado)
    end.

bySides() ->
    A = tryInt("primer"),
    B = tryInt("segundo"),
    C = tryInt("tercer"),

    if
        (A == B) and (A == C) -> Type = "Equilatero";
        (A == C) or (A == B) or (B == C) -> Type = "Isoceles";
        true -> Type = "Escaleno"
    end,

    io:fwrite("~nLas medidas de su triangulo son: ~w, ~w, ~w.~n", [A, B, C]),
    io:fwrite("Su triangulo es de tipo '~s'~n", [Type]).
