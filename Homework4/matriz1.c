/*
Arreglos Bidimensionales
*/
/*
Autor: Juan Carlos Muñoz Bojorquez
Matricula: 1889239
*/

#include <stdio.h>
#include <windows.h>

void crear();
void imprimir();
void sumaMatriz();
void multiplicacionMatriz();
int i, j, f,f2,c2, c,k, matriz[50][50];
int matriz2[50][50], result[50][50], resultMult[50][50];

main(){
	crear();
	sumaMatriz();
	multiplicacionMatriz();
	imprimir();
	printf("\n");
	system("pause");
}

void crear(){
		printf("=== Ingresar datos para la Matriz 1\n");

	do{
		printf("Cantidad de filas de la matriz 1 --->");
		scanf("%d", &f);
		printf("Cantidad de columnas de la matriz 1 --->");
		scanf("%d", &c);
		
		
	}while(f!=c);
	printf("\n\n\n");
	printf("=== Ingresar datos para la segunda matriz ===\n");
	
	do{
		printf("Cantidad de filas de la matriz 2 --->");
		scanf("%d", &f2);
		printf("Cantidad de columnas de la matriz 2 ---> ");
		scanf("%d", &c2);
	}while(f2!=c2);
	
	for(i=0; i<f; i++){
		for(j=0; j<c; j++){
			printf("Ingresa el dato de la casilla [%d][%d] de la matriz 1 --->", i+1, j+1);
			scanf("%d", &matriz[i][j]);
		}
	}
	printf("\n\n");
	for(i=0; i<f2; i++){
		for(j=0; j<c2; j++){
			printf("Ingresa el dato en la casilla [%d][%d] de la matriz 2 --->", i+1,j+1);
			scanf("%d", &matriz2[i][j]);
		}	
	}
	
}

void sumaMatriz (){
	for (i=0;i<f;i++){
		for (j=0;j<c; j++){
			result[i][j] = matriz[i][j] + matriz2[i][j];			
		}
	}

}
void multiplicacionMatriz (){
	for(i=0;i<f;i++){
		for(j=0;j<f;j++){
			resultMult[i][j] = 0;
			for(k=0;k<f2;k++){
				resultMult[i][j] = resultMult[i][j] + matriz[i][k] * matriz2[k][j];
			}
		}
	}
	
}

void imprimir(){
	system ("cls");
	for(i=0; i<f; i++){
		for(j=0; j<c; j++){
			printf("Elemento Matriz 1 [%d][%d]:%d\n", i+1, j+1, matriz[i][j]);
		}
	}
	printf("\n\n\n");
	for(i=0; i<f2; i++){
		for(j=0; j<c2; j++){
			printf("Elemento Matriz 2 [%d][%d]:%d\n", i+1, j+1, matriz2[i][j]);
		}
	}
	for(i=0; i<f2; i++){
		for(j=0; j<c2; j++){
			printf("Resultado de la suma [%d][%d]:%d\n", i+1, j+1, result[i][j]);
		}
	}
	for(i=0; i<f2; i++){
		for(j=0; j<c2; j++){
			printf("Resultado de la multiplicacion [%d][%d]:%d\n", i+1, j+1, resultMult[i][j]);
		}
	}
	system("pause");
}
