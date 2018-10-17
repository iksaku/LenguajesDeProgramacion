var yamarcado;
var x1;
var y1;
var x;
var y;
var fondo;
function limpiartablero(){
	for(i=0; i<9; i++){
		for(j=0; j<9; j++){
			tablero[i][j] = 0;
			tablerocolor[i][j] = 0;
			tableroseleccion[i][j] = 0;
			tableropiezas[i][j] = 0;
			muertos[i][j] = 0;
			militantes[i][j] = 0;
			lideres[i][j] = 0;
			asesinos[i][j] = 0;
			necromoviles[i][j] = 0;
			provocadores[i][j] = 0;
			reporteros[i][j] = 0;
		}
	}
	//Fichas rojo
	for(i=0; i<3; i++){
		for(j=0; j<3; j++){
			tablero[i][j] = 1;
			tablerocolor[i][j] = 1;
			tableroseleccion[i][j] = 0;
		}
	}
	//Fichas azules
	for(i=6; i<9; i++){
		for(j=0; j<3; j++){
			tablero[i][j] = 1;
			tablerocolor[i][j] = 2;
			tableroseleccion[i][j] = 0;
		}
	}

	//Fichas amarillas
	for(i=6; i<9; i++){
		for(j=6; j<9; j++){
			tablero[i][j] = 1;
			tablerocolor[i][j] = 3;
			tableroseleccion[i][j] = 0;
		}
	}
	//Fichas verdes
	for(i=0; i<3; i++){
		for(j=6; j<9; j++){
			tablero[i][j] = 1;
			tablerocolor[i][j] = 4;
			tableroseleccion[i][j] = 0;
		}
	}
	//MATRIZ DE PIEZAS
	//Lideres
	tableropiezas[0][0] = 1;	
	tableropiezas[8][0] = 1;
	tableropiezas[8][8] = 1;
	tableropiezas[0][8] = 1;
	//Reporteros
	tableropiezas[0][1] = 2;
	tableropiezas[7][0] = 2;
	tableropiezas[8][7] = 2;
	tableropiezas[1][8] = 2;
	//Provocadores
	tableropiezas[1][1] = 3;
	tableropiezas[7][1] = 3;
	tableropiezas[7][7] = 3;
	tableropiezas[1][7] = 3;
	//Asesinos
	tableropiezas[1][0] = 4;
	tableropiezas[8][1] = 4;
	tableropiezas[7][8] = 4;
	tableropiezas[0][7] = 4;
	//Necromoviles
	tableropiezas[2][2] = 5;
	tableropiezas[6][2] = 5;
	tableropiezas[6][6] = 5;
	tableropiezas[2][6] = 5;
	//Militantes
	tableropiezas[0][2] = 6;
	tableropiezas[1][2] = 6;
	tableropiezas[2][1] = 6;
	tableropiezas[2][0] = 6;

	tableropiezas[6][0] = 6;
	tableropiezas[6][1] = 6;
	tableropiezas[7][2] = 6;
	tableropiezas[8][2] = 6;

	tableropiezas[8][6] = 6;
	tableropiezas[7][6] = 6;
	tableropiezas[6][7] = 6;
	tableropiezas[6][8] = 6;

	tableropiezas[2][8] = 6;
	tableropiezas[2][7] = 6;
	tableropiezas[1][6] = 6;
	tableropiezas[0][6] = 6;

	//MATRIZ MILITANTES 
	militantes[0][2] = 1; //militante_rojo1
	militantes[1][2] = 2; //militante_rojo2
	militantes[2][1] = 3; //militante_rojo3
	militantes[2][0] = 4; //militante_rojo4

	militantes[6][0] = 5; //militante_azul1
	militantes[6][1] = 6; //militante_azul2
	militantes[7][2] = 7; //militante_azul3
	militantes[8][2] = 8; //militante_azul4

	militantes[8][6] = 9; //militante_amarillo1
	militantes[7][6] = 10; //militante_amarillo2
	militantes[6][7] = 11; //militante_amarillo3
	militantes[6][8] = 12; //militante_amarillo4

	militantes[2][8] = 13; //militante_verde1
	militantes[2][7] = 14; //militante_verde2
	militantes[1][6] = 15; //militante_verde3
	militantes[0][6] = 16; //militante_verde4

	//MATRIZ DE LIDERES
	lideres[0][0] = 1; //lider_rojo
	lideres[8][0] = 2; //lider_azul
	lideres[8][8] = 3; //lider_amarillo
	lideres[0][8] = 4; //lider_verde

	//MATRIZ DE ASESINOS
	asesinos[1][0] = 1; //asesino_rojo
	asesinos[8][1] = 2; //asesino_azul
	asesinos[7][8] = 3; //asesino_amarillo
	asesinos[0][7] = 4; //asesino_verde

	//MATRIZ DE NECROMOVILES
	necromoviles[2][2] = 1; //necromovil_rojo
	necromoviles[6][2] = 2; //necromovil_azul
	necromoviles[6][6] = 3; //necromovil_amarillo
	necromoviles[2][6] = 4; //necromovil_verde

	//MATRIZ DE PROVOCADORES
	provocadores[1][1] = 1; //provocador_rojo
	provocadores[7][1] = 2; //provocador_azul
	provocadores[7][7] = 3; //provocador_amarillo
	provocadores[1][7] = 4; //provocador_verde

	//MATRIZ DE REPORTEROS
	reporteros[0][1] == 1; //reportero_rojo
	reporteros[7][0] == 2; //reportero_azul
	reporteros[8][7] == 3; //reportero_amarillo
	reporteros[1][8] == 4; //reportero_verde
}

function resaltar(x,y){
	var margen = document.getElementById("c"+x+y);
	margen.style.border = "2px solid #0f0";
}

function reset(x,y){
	var margen = document.getElementById("c"+x+y);
	margen.style.border = "2px solid #000";
}


//Funciones de las casillas
function manager(x,y){
	//Identifica si hay una casilla marcada	
	if(contador == 1){ //Eventos
		for(i=0; i<9; i++){
			for(j=0; j<9; j++){
				if(tableroseleccion[i][j] == 1){
					x1 = i; //guarda la posicion de la casilla ya marcada
					y1 = j;
				}
			}
		}
		if(x1 == x && y1 == y){//Reestablece la misma casilla
			yamarcado = document.getElementById("c"+x1+y1);
			yamarcado.style.background = "#fff";	
			tableroseleccion[x][y] = 0;
			contador = 0;
		}
		else if(((tablero[x][y] == 1)&&(tablerocolor[x][y] == tablerocolor[x1][y1])) && ((x1 != x) || (y1 != y))) { //Reestablece casilla anterior marcada
			yamarcado = document.getElementById("c"+x1+y1);
			yamarcado.style.background = "#fff";
			tableroseleccion[x1][y1] = 0;
			tableroseleccion[x][y] = 1;
			pintar(x,y);
			contador = 1;
		}
		else if(((tablero[x][y] == 0 || (tablerocolor[x][y] != tablerocolor[x1][y1])) && (tableropiezas[x1][y1] != 2))){//Mover pieza si la casilla está sola
			if(tablero[x][y] == 1 && muertos[x][y] == 1){//Evita comer muertos
				alert("Movimiento Invalido");
				tableroseleccion[x1][y1] = 0;
				contador = 0;
				yamarcado = document.getElementById("c"+x1+y1);
				yamarcado.style.background = "#fff";
			}
			else{//Para mover y comer
				tableroseleccion[x1][y1] = 0;
				contador = 0;
				mover(x,y,x1,y1);
			}
			
		}
		else if(tablero[x][y] == 0 && tableropiezas[x1][y1] == 2){//Movimiento de reportero

		}
	}
	else if(contador == 3){
		if(tablero[x][y] == 0 && (!((x == 4) && (y == 4)))){
			militante(x,y,x1,y1,id);
			contador = 0;
			tableroseleccion[x1][y1] = 0;
		}
		else{
			alert("Casilla no valida, vuelve a intentarlo");
		}
		
	}
	else{ //Pinta cuando no hay casillas pintadas.
		pintar(x,y)
	}
	//Reestablece los bordes si algun borde quedó en verde, nada que afete la funcionalidad del juego
	var margen = document.getElementById("c"+x+y);
	margen.style.border = "2px solid #000";
}

function pintar(x,y){
	if(tablero[x][y] == 1 && muertos[x][y] == 0){
		tableroseleccion[x][y] = 1;
		fondo = document.getElementById("c"+x+y);
		fondo.style.background = "#0f0";
		contador = 1;
	}
}

function militante(x,y,x1,y1,id){
	if(contador == 3){
		cadaver_militante(x,y);
	}
	else if(((x - x1 == 1 || x - x1 == 2 || x - x1 == -1 || x - x1 == -2) && (y - y1 == 0)) || (((y - y1 == 1) || (y - y1 == 2) || (y - y1 == -1) || (y - y1 == -2)) && (x - x1 == 0))){
		if((x - x1) == 1 || (x - x1) == 2 || (x - x1) == -1 || (x - x1) == -2){//Validar piezas en el camino x
			if((x - x1) == 1){ //Si el desplazamiento es 1
				if(tablero[x][y] == 0 && !((x == 4) && (y == 4))){//Validar que el destino no sea la presidencia o una pieza enemiga
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);//mover y acabar turno
				}
				else if(tablero[x][y] == 1 && !((x == 4) && (y == 4))){
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);
					contador = 3;
					alert("Eliga una casilla libre para tirar el cadaver");//comer, despositar cadaver y terminar turno -omití el else intuyendo que siempre la pieza en la casilla debe ser enemiga
				}
				else{
					alert("Movimiento Invalido");
					yamarcado = document.getElementById("c"+x1+y1);
					yamarcado.style.background = "#fff";
					militantes[x][y] = aux;
					militantes[x1][y1] = aux1;
				}
			}
			else if((x - x1 == -1)){//Validar en y cuando el desplazamiento es -1
				if(tablero[x][y] == 0 && !((x == 4) && (y == 4))){//Validar que el destino no sea la presidencia o una pieza enemiga
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);//mover y acabar turno
				}
				else if(tablero[x][y] == 1 && !((x == 4) && (y == 4))){
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);
					contador = 3;
					alert("Eliga una casilla libre para tirar el cadaver");//comer, despositar cadaver y terminar turno -omití el else intuyendo que siempre la pieza en la casilla debe ser enemiga
				}
				else{
					alert("Movimiento Invalido");
					yamarcado = document.getElementById("c"+x1+y1);
					yamarcado.style.background = "#fff";
					militantes[x][y] = aux;
					militantes[x1][y1] = aux1;
				}
			}
			else if(x - x1 == 2){//Si el desplazamiento es 2, 
				if (tablero[x-1][y] == 0){ //evaluar la casilla anterior
					if(tablero[x][y] == 0 && !((x == 4) && (y == 4))){//Validar que el destino no sea la presidencia o una pieza enemiga
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);//mover y acabar turno
					}
					else if(tablero[x][y] == 1 && !((x == 4) && (y == 4))){
						crearyeliminarnodos(x,y,x1,y1,id);
						actualizar(x,y,x1,y1);
						contador = 3;
						alert("Eliga una casilla libre para tirar el cadaver");//comer, despositar cadaver y terminar turno -omití el else intuyendo que siempre la pieza en la casilla debe ser enemiga
					}
					else{
						alert("Movimiento Invalido");
						yamarcado = document.getElementById("c"+x1+y1);
						yamarcado.style.background = "#fff";
						militantes[x][y] = aux;
						militantes[x1][y1] = aux1;
					}
				}
				else{
					alert("Hay una casilla en su trayecto");
					yamarcado = document.getElementById("c"+x1+y1);
					yamarcado.style.background = "#fff";
					militantes[x][y] = aux;
					militantes[x1][y1] = aux1;
				}
			}
			else if(x - x1 == -2){//Si el desplazamiento es -2,
				if (tablero[x+1][y] == 0){ //evaluar la casilla anterior
					if(tablero[x][y] == 0 && !((x == 4) && (y == 4))){//Validar que el destino no sea la presidencia o una pieza enemiga
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);//mover y acabar turno
					}
					else if(tablero[x][y] == 1 && !((x == 4) && (y == 4))){
						crearyeliminarnodos(x,y,x1,y1,id);//comer, despositar cadaver y terminar turno -omití el else intuyendo que siempre la pieza en la casilla debe ser enemiga
						actualizar(x,y,x1,y1);
						contador = 3;
						alert("Eliga una casilla libre para tirar el cadaver");//comer, despositar cadaver y terminar turno -omití el else intuyendo que siempre la pieza en la casilla debe ser enemiga
					}
					else{
						alert("Movimiento Invalido");
						yamarcado = document.getElementById("c"+x1+y1);
						yamarcado.style.background = "#fff";
						militantes[x][y] = aux;
						militantes[x1][y1] = aux1;
					}
				}
				else{
					alert("Hay una casilla en su trayecto");
					yamarcado = document.getElementById("c"+x1+y1);
					yamarcado.style.background = "#fff";
					militantes[x][y] = aux;
					militantes[x1][y1] = aux1;
				}
			}
		}
		else if((y - y1) == 1 || (y - y1) == 2 || (y - y1) == -1 || (y - y1) == -2 ){//Validar piezas en el camino y
			if((y - y1) == 1){//Validar en y cuando el desplazamiento es 1
				if(tablero[x][y] == 0 && !((x == 4) && (y == 4))){//Validar que el destino no sea la presidencia o una pieza enemiga
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);//mover y acabar turno
					}
				else if(tablero[x][y] == 1 && !((x == 4) && (y == 4))){
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);
					contador = 3;
					alert("Eliga una casilla libre para tirar el cadaver");//comer, despositar cadaver y terminar turno -omití el else intuyendo que siempre la pieza en la casilla debe ser enemiga
				}
				else{
					alert("Movimiento Invalido");
					yamarcado = document.getElementById("c"+x1+y1);
					yamarcado.style.background = "#fff";
					militantes[x][y] = aux;
					militantes[x1][y1] = aux1;
				}
			}
			else if((y - y1 == -1)){//Validar en y cuando el desplazamiento es -1
				if(tablero[x][y] == 0 && !((x == 4) && (y == 4))){//Validar que el destino no sea la presidencia o una pieza enemiga
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);//mover y acabar turno
					}
				else if(tablero[x][y] == 1 && !((x == 4) && (y == 4))){
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);
					contador = 3;
					alert("Eliga una casilla libre para tirar el cadaver");//comer, despositar cadaver y terminar turno -omití el else intuyendo que siempre la pieza en la casilla debe ser enemiga
				}
				else{
					alert("Movimiento Invalido");
					yamarcado = document.getElementById("c"+x1+y1);
					yamarcado.style.background = "#fff";
					militantes[x][y] = aux;
					militantes[x1][y1] = aux1;
				}
			}
			else if(y - y1 == 2){//Si el desplazamiento es 2, 
				if (tablero[x][y-1] == 0){ //evaluar la casilla anterior
					if(tablero[x][y] == 0 && !((x == 4) && (y == 4))){//Validar que el destino no sea la presidencia o una pieza enemiga
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);//mover y acabar turno
					}
					else if(tablero[x][y] == 1 && !((x == 4) && (y == 4))){
						crearyeliminarnodos(x,y,x1,y1,id);//comer, despositar cadaver y terminar turno -omití el else intuyendo que siempre la pieza en la casilla debe ser enemiga
						actualizar(x,y,x1,y1);
						contador = 3;
						alert("Eliga una casilla libre para tirar el cadaver");
					}
					else{
						alert("Movimiento Invalido");
						yamarcado = document.getElementById("c"+x1+y1);
						yamarcado.style.background = "#fff";
						militantes[x][y] = aux;
						militantes[x1][y1] = aux1;
					}
				}
				else{
					alert("Hay una pieza en el trayecto");
					militantes[x][y] = aux;
					militantes[x1][y1] = aux1;
					yamarcado = document.getElementById("c"+x1+y1);
					yamarcado.style.background = "#fff";
				}
			}
			else if(y - y1 == -2){//Si el desplazamiento es -2,
				if (tablero[x][y+1] == 0){ //evaluar la casilla anterior
					if(tablero[x][y] == 0 && !((x == 4) && (y == 4))){//Validar que el destino no sea la presidencia o una pieza enemiga
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);//mover y acabar turno
					}
					else if(tablero[x][y] == 1 && !((x == 4) && (y == 4))){
						crearyeliminarnodos(x,y,x1,y1,id);//comer, despositar cadaver y terminar turno -omití el else intuyendo que siempre la pieza en la casilla debe ser enemiga
						actualizar(x,y,x1,y1);
						contador = 3;
						alert("Eliga una casilla libre para tirar el cadaver");
					}
					else{
						alert("Movimiento Invalido");
						militantes[x][y] = aux;
						militantes[x1][y1] = aux1;
						yamarcado = document.getElementById("c"+x1+y1);
						yamarcado.style.background = "#fff";
					}
				}
				else{
					alert("Hay una pieza en el trayecto");
					yamarcado = document.getElementById("c"+x1+y1);
					yamarcado.style.background = "#fff";
					militantes[x][y] = aux;
					militantes[x1][y1] = aux1;
				}
			}
		}
	}
	//MOVIMIENTOS EN DIAGONAL
	else if((x - x1 == 1 ||x - x1 == -1 || x - x1 == 2 || x - x1 == -2) && ((y - y1 == 1 ||y - y1 == -1 || y - y1 == 2 || y - y1 == -2))){//Validar Movimientos en diagonal (Pendiente)
		//Desplazamiento 1
		if((x - x1 == 1) && (y - y1 == 1)){//desplazamiento 1 a 45°
			if(tablero[x][y] == 0 && !((x == 4) && (y == 4))){//Validar que el destino no sea la presidencia o una pieza enemiga
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);//mover y acabar turno
					}
			else if(tablero[x][y] == 1 && !((x == 4) && (y == 4))){
				crearyeliminarnodos(x,y,x1,y1,id);
				actualizar(x,y,x1,y1);
				contador = 3;
				alert("Eliga una casilla libre para tirar el cadaver");//comer, despositar cadaver y terminar turno -omití el else intuyendo que siempre la pieza en la casilla debe ser enemiga
			}
			else{
				alert("Movimiento Invalido");
				yamarcado = document.getElementById("c"+x1+y1);
				yamarcado.style.background = "#fff";
				militantes[x][y] = aux;
				militantes[x1][y1] = aux1;
			}
		}
		else if((x - x1 == 1) && (y - y1 == -1)){ //desplazamiento 1 a -45°
			if(tablero[x][y] == 0 && !((x == 4) && (y == 4))){//Validar que el destino no sea la presidencia o una pieza enemiga
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);//mover y acabar turno
					}
			else if(tablero[x][y] == 1 && !((x == 4) && (y == 4))){
				crearyeliminarnodos(x,y,x1,y1,id);
				actualizar(x,y,x1,y1);
				contador = 3;
				alert("Eliga una casilla libre para tirar el cadaver");//comer, despositar cadaver y terminar turno -omití el else intuyendo que siempre la pieza en la casilla debe ser enemiga
			}
			else{
				alert("Movimiento Invalido");
				yamarcado = document.getElementById("c"+x1+y1);
				yamarcado.style.background = "#fff";
				militantes[x][y] = aux;
				militantes[x1][y1] = aux1;
			}
		}
		else if((x - x1 == -1) && (y - y1 == 1)){//desplazamiento 1 a 135
			if(tablero[x][y] == 0 && !((x == 4) && (y == 4))){//Validar que el destino no sea la presidencia o una pieza enemiga
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);//mover y acabar turno
					}
			else if(tablero[x][y] == 1 && !((x == 4) && (y == 4))){
				crearyeliminarnodos(x,y,x1,y1,id);//comer, despositar cadaver y terminar turno -omití el else intuyendo que siempre la pieza en la casilla debe ser enemiga
				actualizar(x,y,x1,y1);
				contador = 3;
				alert("Eliga una casilla libre para tirar el cadaver");
			}
			else{
				alert("Movimiento Invalido");
				yamarcado = document.getElementById("c"+x1+y1);
				yamarcado.style.background = "#fff";
				militantes[x][y] = aux;
				militantes[x1][y1] = aux1;
			}
		}
		else if((x - x1 == -1) && (y - y1 == -1)){//desplazamiento 1 a 225°
			if(tablero[x][y] == 0 && !((x == 4) && (y == 4))){//Validar que el destino no sea la presidencia o una pieza enemiga
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);//mover y acabar turno
					}
			else if(tablero[x][y] == 1 && !((x == 4) && (y == 4))){
				crearyeliminarnodos(x,y,x1,y1,id);
				actualizar(x,y,x1,y1);
				contador = 3;
				alert("Eliga una casilla libre para tirar el cadaver");//comer, despositar cadaver y terminar turno -omití el else intuyendo que siempre la pieza en la casilla debe ser enemiga
			}
			else{
				alert("Movimiento Invalido");
				yamarcado = document.getElementById("c"+x1+y1);
				yamarcado.style.background = "#fff";
				militantes[x][y] = aux;
				militantes[x1][y1] = aux1;
			}
		}
		//Desplazamiento 2
		else if((x - x1 == 2) && (y - y1 == 2)){//Desplazamiento 2 a 45° 
			if (tablero[x-1][y-1] == 0){ //evaluar la casilla anterior
				if(tablero[x][y] == 0 && !((x == 4) && (y == 4))){//Validar que el destino no sea la presidencia o una pieza enemiga
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);//mover y acabar turno
				}
				else if(tablero[x][y] == 1 && !((x == 4) && (y == 4))){
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);
					contador = 3;
					alert("Eliga una casilla libre para tirar el cadaver");//comer, despositar cadaver y terminar turno -omití el else intuyendo que siempre la pieza en la casilla debe ser enemiga
				}
				else{
					alert("Movimiento Invalido");
					yamarcado = document.getElementById("c"+x1+y1);
					yamarcado.style.background = "#fff";
					militantes[x][y] = aux;
					militantes[x1][y1] = aux1;
				}
			}
			else{
				alert("Hay una casilla en su trayecto");
				yamarcado = document.getElementById("c"+x1+y1);
				yamarcado.style.background = "#fff";
				militantes[x][y] = aux;
				militantes[x1][y1] = aux1;
			}
		}
		else if((x - x1 == -2) && (y - y1 == 2)){//Desplazamiento 2 a 135° 
			if (tablero[x+1][y-1] == 0){ //evaluar la casilla anterior
				if(tablero[x][y] == 0 && !((x == 4) && (y == 4))){//Validar que el destino no sea la presidencia o una pieza enemiga
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);//mover y acabar turno
				}
				else if(tablero[x][y] == 1 && !((x == 4) && (y == 4))){
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);
					contador = 3;
					alert("Eliga una casilla libre para tirar el cadaver");//comer, despositar cadaver y terminar turno -omití el else intuyendo que siempre la pieza en la casilla debe ser enemiga
				}
				else{
					alert("Movimiento Invalido");
					yamarcado = document.getElementById("c"+x1+y1);
					yamarcado.style.background = "#fff";
					militantes[x][y] = aux;
					militantes[x1][y1] = aux1;
				}
			}
			else{
				alert("Hay una casilla en su trayecto");
				yamarcado = document.getElementById("c"+x1+y1);
				yamarcado.style.background = "#fff";
				militantes[x][y] = aux;
				militantes[x1][y1] = aux1;
			}
		}
		else if((x - x1 == -2) && (y - y1 == -2)){//Desplazamiento 2 a 225° 
			if (tablero[x+1][y+1] == 0){ //evaluar la casilla anterior
				if(tablero[x][y] == 0 && !((x == 4) && (y == 4))){//Validar que el destino no sea la presidencia o una pieza enemiga
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);//mover y acabar turno
				}
				else if(tablero[x][y] == 1 && !((x == 4) && (y == 4))){
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);
					contador = 3;
					alert("Eliga una casilla libre para tirar el cadaver");//comer, despositar cadaver y terminar turno -omití el else intuyendo que siempre la pieza en la casilla debe ser enemiga
				}
				else{
					alert("Movimiento Invalido");
					yamarcado = document.getElementById("c"+x1+y1);
					yamarcado.style.background = "#fff";
					militantes[x][y] = aux;
					militantes[x1][y1] = aux1;
				}
			}
			else{
				alert("Hay una casilla en su trayecto");
				yamarcado = document.getElementById("c"+x1+y1);
				yamarcado.style.background = "#fff";
				militantes[x][y] = aux;
				militantes[x1][y1] = aux1;
			}
		}
		else if((x - x1 == 2) && (y - y1 == -2)){//Desplazamiento 2 a -45° 
			if (tablero[x-1][y+1] == 0){ //evaluar la casilla anterior
				if(tablero[x][y] == 0 && !((x == 4) && (y == 4))){//Validar que el destino no sea la presidencia o una pieza enemiga
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);//mover y acabar turno
				}
				else if(tablero[x][y] == 1 && !((x == 4) && (y == 4))){
					crearyeliminarnodos(x,y,x1,y1,id);
					actualizar(x,y,x1,y1);
					contador = 3;
					alert("Eliga una casilla libre para tirar el cadaver");//comer, despositar cadaver y terminar turno -omití el else intuyendo que siempre la pieza en la casilla debe ser enemiga
				}
				else{
					alert("Movimiento Invalido");
					yamarcado = document.getElementById("c"+x1+y1);
					yamarcado.style.background = "#fff";
					militantes[x][y] = aux;
					militantes[x1][y1] = aux1;	
				}
			}
			else{
				alert("Hay una casilla en su trayecto");
				yamarcado = document.getElementById("c"+x1+y1);
				yamarcado.style.background = "#fff";
				militantes[x][y] = aux;
				militantes[x1][y1] = aux1;	
			}
		}
		else{
			alert("Movimiento Invalido");
			yamarcado = document.getElementById("c"+x1+y1);
			yamarcado.style.background = "#fff";
			militantes[x][y] = aux;
			militantes[x1][y1] = aux1;
		}
	}
	//MOVIMIENTO INVALIDO
	else{
		alert("Movimiento Invalido");
		yamarcado = document.getElementById("c"+x1+y1);
		yamarcado.style.background = "#fff";
		militantes[x][y] = aux;
		militantes[x1][y1] = aux1;
	}
}

function mover(x,y,x1,y1){
	if(tablero[x][y] == 1){
		pieza2 = tableropiezas[x][y];
		asignarid2(x,y,pieza2);//pieza a eliminar
	}
	pieza = tableropiezas[x1][y1]; //pieza a mover
	asignarid(x,y,x1,y1,pieza);
	if(pieza == 6){
		militante(x,y,x1,y1,id);
	}
	else if(pieza == 5){
	}
	else if(pieza == 4){
	}
	else if(pieza == 3){
	}
	else if(pieza == 2){
	}
	else if(pieza == 1){
	}
}


function asignarid(x,y,x1,y1,pieza){
	if(pieza == 6){
		switch(militantes[x1][y1]){
			case 1:
				id = "militante_rojo1";
				break;
			case 2:
				id = "militante_rojo2";
				break;
			case 3:
				id = "militante_rojo3";
				break;
			case 4:
				id = "militante_rojo4";
				break;
			case 5:
				id = "militante_azul1";
				break;
			case 6:
				id = "militante_azul2";
				break;
			case 7:
				id = "militante_azul3";
				break;
			case 8:
				id = "militante_azul4";
				break;
			case 9:
				id = "militante_amarillo1";
				break;
			case 10:
				id = "militante_amarillo2";
				break;
			case 11:
				id = "militante_amarillo3";
				break;
			case 12:
				id = "militante_amarillo4";
				break;
			case 13:
				id = "militante_verde1";
				break;
			case 14:
				id = "militante_verde2";
				break;
			case 15:
				id = "militante_verde3";
				break;
			case 16:
				id = "militante_verde4";
				break;
		}
		aux = militantes[x][y];
		aux1 = militantes[x1][y1];
		militantes[x][y] = militantes[x1][y1];
		militantes[x1][y1] = 0;
	}
	else if(pieza == 5){
		switch(necromoviles[x1][y1]){
			case 1:
				id = "necromovil_rojo";
				break;
			case 2:
				id = "necromovil_azul";
				break;
			case 3:
				id = "necromovil_amarillo";
				break;
			case 4:
				id = "necromovil_verde";
				break;
		}
		necromoviles[x][y] = necromoviles[x1][y1];
		necromoviles[x1][y1] = 0;
	}
	else if(pieza == 4){
		switch(asesinos[x1][y1]){
			case 1:
				id = "asesino_rojo";
				break;
			case 2:
				id = "asesino_azul";
				break;
			case 3:
				id = "asesino_amarillo";
				break;
			case 4:
				id = "asesino_verde";
				break;
		}
		asesinos[x][y] = asesinos[x1][y1];
		asesinos[x1][y1] = 0;
	}
	else if(pieza == 3){
		switch(provocadores[x1][y1]){
			case 1:
				id = "provocador_rojo";
				break;
			case 2:
				id = "provocador_azul";
				break;
			case 3:
				id = "provocador_amarillo";
				break;
			case 4:
				id = "provocador_verde";
				break;
		}
		provocadores[x][y] = provocadores[x1][y1];
		provocadores[x1][y1] = 0;
	}
	else if(pieza == 2){
		switch(reporteros[x1][y1]){
			case 1:
				id = "reportero_rojo";
				break;
			case 2:
				id = "reportero_azul";
				break;
			case 3:
				id = "reportero_amarillo";
				break;
			case 4:
				id = "reportero_verde";
				break;
		}
		reporteros[x][y] = reporteros[x1][y1];
		reporteros[x1][y1] = 0;
	}
	else if(pieza == 1){
		switch(lideres[x1][y1]){
			case 1:
				id = "lider_rojo";
				break;
			case 2:
				id = "lider_azul";
				break;
			case 3:
				id = "lider_amarillo";
				break;
			case 4:
				id = "lider_verde";
				break;
		}
		lideres[x][y] = lideres[x1][y1];
		lideres[x1][y1] = 0;
	}
}

function asignarid2(x,y,pieza2){
	if(pieza2 == 6){
		switch(militantes[x][y]){
			case 1:
				id2 = "militante_rojo1";
				break;
			case 2:
				id2 = "militante_rojo2";
				break;
			case 3:
				id2 = "militante_rojo3";
				break;
			case 4:
				id2 = "militante_rojo4";
				break;
			case 5:
				id2 = "militante_azul1";
				break;
			case 6:
				id2 = "militante_azul2";
				break;
			case 7:
				id2 = "militante_azul3";
				break;
			case 8:
				id2 = "militante_azul4";
				break;
			case 9:
				id2 = "militante_amarillo1";
				break;
			case 10:
				id2 = "militante_amarillo2";
				break;
			case 11:
				id2 = "militante_amarillo3";
				break;
			case 12:
				id2 = "militante_amarillo4";
				break;
			case 13:
				id2 = "militante_verde1";
				break;
			case 14:
				id2 = "militante_verde2";
				break;
			case 15:
				id2 = "militante_verde3";
				break;
			case 16:
				id2 = "militante_verde4";
				break;
		}
	}
	else if(pieza2 == 5){
		switch(necromoviles[x][y]){
			case 1:
				id2 = "necromovil_rojo";
				break;
			case 2:
				id2 = "necromovil_azul";
				break;
			case 3:
				id2 = "necromovil_amarillo";
				break;
			case 4:
				id2 = "necromovil_verde";
				break;
		}
	}
	else if(pieza2 == 4){
		switch(asesinos[x][y]){
			case 1:
				id2 = "asesino_rojo";
				break;
			case 2:
				id2 = "asesino_azul";
				break;
			case 3:
				id2 = "asesino_amarillo";
				break;
			case 4:
				id2 = "asesino_verde";
				break;
		}
	}
	else if(pieza2 == 3){
		switch(provocadores[x][y]){
			case 1:
				id2 = "provocador_rojo";
				break;
			case 2:
				id2 = "provocador_azul";
				break;
			case 3:
				id2 = "provocador_amarillo";
				break;
			case 4:
				id2 = "provocador_verde";
				break;
		}
	}
	else if(pieza2 == 2){
		switch(reporteros[x][y]){
			case 1:
				id2 = "reportero_rojo";
				break;
			case 2:
				id2 = "reportero_azul";
				break;
			case 3:
				id2 = "reportero_amarillo";
				break;
			case 4:
				id2 = "reportero_verde";
				break;
		}
	}
	else if(pieza2 == 1){
		switch(lideres[x][y]){
			case 1:
				id2 = "lider_rojo";
				break;
			case 2:
				id2 = "lider_azul";
				break;
			case 3:
				id2 = "lider_amarillo";
				break;
			case 4:
				id2 = "lider_verde";
				break;
		}
	}
}

function crearyeliminarnodos(x,y,x1,y1,id){
	var hijoaeliminar = document.getElementById(id),
		copia = hijoaeliminar.cloneNode(true),
		origen = document.getElementById("c"+x1+y1),
		destino = document.getElementById("c"+x+y);
	if((tablerocolor[x][y] != tablerocolor[x1][y1]) && (tablerocolor[x][y] != 0)){
		var hijoaeliminar2 = document.getElementById(id2);
		destino.removeChild(hijoaeliminar2);
	}
	origen.removeChild(hijoaeliminar);
	destino.appendChild(copia);
}

function actualizar(x,y,x1,y1){
	//ACTUALIZAR MATRICES CUANDO ES UN MOVIMIENTO SIMPLE
	tablero[x1][y1] = 0;
	tablero[x][y] = 1;
	tablerocolor[x][y] = tablerocolor[x1][y1];
	tablerocolor[x1][y1] = 0;
	yamarcado = document.getElementById("c"+x1+y1);
	yamarcado.style.background = "#fff";
	tableropiezas[x][y] = tableropiezas[x1][y1];
	tableropiezas[x1][y1] = 0;
}

function cadaver_militante(x,y){
	n += 1; //Variable global que controla el numero de id de los muertos
	idmuerto = "muerto_" + n;
	var destino = document.getElementById("c"+x+y),
		muerto = document.createElement("IMG");
	muerto.setAttribute("src","imagenes djambi/muerto.png");
	muerto.setAttribute("id",idmuerto);
	destino.appendChild(muerto);
	muertos[x][y] = n;
	tablero[x][y] = 1;
}
