#!/usr/bin/env escript
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

try_number(Input) ->
    {FloatVal, _} = string:to_float(Input),
    if
        FloatVal == error ->
            {IntVal, _} = string:to_integer(Input),
            if
                IntVal == error -> {error, []};
                true -> {ok, IntVal}
            end;
        true -> {ok, FloatVal}
    end.

inputNumber(Lado) ->
    {_, [Input]} = io:fread("Porfavor ingrese la medida del " ++ Lado ++ " lado del Triangulo: ", "~s"),
    {Status, Value} = try_number(Input),
    if
        Status == ok ->
            if
                Value < 1 ->
                    io:fwrite("~n[Error] Por favor introduzca un numero mayor a cero.~n"),
                    inputNumber(Lado);
                true -> Value % Returns Input number when valid :D
            end;
        true ->
            io:fwrite("~n[Error] Numero invalido, por favor intentelo denuevo.~n"),
            inputNumber(Lado)
    end.

bySides() ->
    A = inputNumber("primer"),
    B = inputNumber("segundo"),
    C = inputNumber("tercer"),

    if
        (A == B) and (A == C) -> Type = "Equilatero";
        (A == C) or (A == B) or (B == C) -> Type = "Isosceles";
        true -> Type = "Escaleno"
    end,

    io:fwrite("~nLas medidas de su triangulo son: ~w, ~w, ~w.~n", [A, B, C]),
    io:fwrite("Su triangulo es de tipo '~s'~n", [Type]).

main(_) -> bySides().