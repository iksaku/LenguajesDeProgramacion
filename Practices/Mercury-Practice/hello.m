:- module hello.
:- interface.
:- import_module io.
:- pred main(io::di, io::uo) is det.
:- implementation.

main(IOState_in, IOState_out) :-
    io.write_string("Greetings from Mercury!\n", IOState_in, IOState_out).