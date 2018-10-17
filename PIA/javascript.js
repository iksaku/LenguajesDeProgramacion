var tablero = new Array(9); //0 = Libre, 1 = Ocupado
var tablerocolor = new Array(9); //0 = Rojo, 1 = Azul, 2 = Amarillo, 3 = Verde
var tableroseleccion = new Array(9); // 0 = No seleccionado 1 = Seleccionado
var tableropiezas = new Array(9);
var muertos = new Array(9);
var militantes = new Array(9);
var lideres = new Array;
var asesinos = new Array;
var necromoviles = new Array;
var provocadores = new Array;
var reporteros = new Array;
var victoria = 0;
var turno = 0;
var contador = 0;
var aux;
var aux1;
var pieza;
var pieza2;
var id;
var id2;
var n = 0;
function jugar(){
	for(i=0;i<9;i++){
		tablero[i] = new Array(9);
		tablerocolor[i] = new Array(9);
		tableroseleccion[i] = new Array(9);
		tableropiezas[i] = new Array(9);
		muertos[i] = new Array(9);
		militantes[i] = new Array;
		lideres[i] = new Array;
		asesinos[i] = new Array;
		necromoviles[i] = new Array;
		provocadores[i] = new Array;
		reporteros[i] = new Array;
	}
	limpiartablero();

}


//0 = espacio vacio
//1 = espacio ocupado