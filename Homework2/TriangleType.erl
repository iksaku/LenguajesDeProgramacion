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
-import(io, []).
-export([bySides/0]).

try_input(Side) ->
  try
      io:fread("Por favor ingrese un numero -> " ++ Side, "~d"),
  catch
      io: -> "Meh"
  end.

bySides() -> 0.

  %if
  %  (A == B) and (A == C) -> 'Equilatero';
  %  A == C -> 'Isoceles';
  %  true -> 'Escaleno'
  %end.
