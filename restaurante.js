'use strict';

const { time } = require('console');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Mesa {
    constructor(){
        this.consumiciones = [];
        this.libre = false;
    }

    //metodos
    verEstado(){
        return this.libre;
    }
}


class Restaurante {
    constructor(num_mesas, nombre_json, precio_menu){
        this.num_mesas = num_mesas;
        this.nombre_json = nombre_json;
        this.precio_menu = precio_menu;
        this.mesas = this.generarMesas();
        this.carta = [];
    }

    //metodos
    cargarJson(){
        fs.readFile(this.nombre_json, (err, datos) =>{
            this.carta = JSON.parse(datos);
        });
    }

    generarMesas(){
        let lista_mesas = [];
        for(let i=0;i<this.num_mesas;i++){
            lista_mesas.push(new Mesa());
        }
        //console.log(lista_mesas);
        return lista_mesas;
    }
    
    verMesas(){
        console.log("========================");
        console.log("=====Mesas ocupadas=====");
        console.log("========================");
        
        for(let i=0; i < this.mesas.length; i++){
            let mesa = this.mesas[i];
            if(!mesa.libre){    //libre: false  pasa
                console.log("La mesa "+ (i+1) +" esta ocupada y estas son sus consumiciones: ");
                for(let i=0; i < mesa.consumiciones.length; i++){
                    console.log("\t"+mesa.consumiciones[i].nombre);
                }
            }else{
                console.log("La mesa esta libre");
            }
        }
        setTimeout(() => {
            mostrarMenu(this);
        }, 1500);
    }

    buscarVacias(){
        for(let i=0;i < this.mesas.length; i++){
            if(this.mesas[i].libre){
                this.mesas[i].libre = false;    //se pone ocupada
                mostrarMenuMesa(this, i);
                break;
            }else{
                console.log("La mesa "+ (i+1)+ " esta ocupada");
                setTimeout(() => {
                    mostrarMenu(this);
                }, 1500);
            }
        }
    }

    seleccionarMesa(){
        console.log("===========================");
        console.log("==Lista de Mesas Ocupadas==");
        console.log("===========================");

        for(let i=0; i<this.mesas.length; i++){
            if(!this.mesas[i].libre){
                console.log("Mesa "+(i+1));
            }
        }
        
        rl.question("Selecciona una mesa: ", (opcion) =>{
            let seleccion = parseInt(opcion)-1; // -1 para comparar en el if
            if(seleccion >= 0 && seleccion < this.mesas.length && !this.mesas[seleccion].libre){
                console.log("Entrando al menú de la mesa "+ (seleccion+1));
                setTimeout(() => {
                    mostrarMenuMesa(this, seleccion);
                }, 500);
            }else{
                console.log("Opción no valida, intentalo de nuevo");
                setTimeout(() => {
                    this.seleccionarMesa();
                }, 500);
            }
        });
    }

    pedirConsumicion(numMesa){
        console.log("======================");
        console.log("=========Carta========");
        console.log("======================");
        for(let i=0;i<this.carta.length;i++){
            console.log((i+1)+". "+this.carta[i].nombre);
        }

        rl.question("Seleccione una consumición: ", (opcion) => {
            let elegida = parseInt(opcion) - 1;
            if(elegida >= 0 && elegida < this.carta.length){
                console.log("Has seleccionado: "+ this.carta[elegida].nombre);
                let consu = this.carta[elegida];
                //console.log(consu);
                this.mesas[numMesa].consumiciones.push(consu);
                setTimeout(() => {
                    mostrarMenuMesa(this, numMesa);
                }, 500);
            }else{
                console.log("Consumición no disponible, intentelo de nuevo");
                setTimeout(() => {
                    this.pedirConsumicion(numMesa);
                }, 500);
                
            }
        })

    }


}

function mostrarMenuMesa(restaurante, numMesa){
    console.log("=======================");
    console.log("===Menú de la Mesa "+(numMesa+1)+"===");
    console.log("=======================");
    console.log("1. Pedir consumición");
    console.log("2. Pedir cuenta");
    console.log("3. Volver al menú principal");

    rl.question('Elige la opción: ', (opcion) => {
        switch(opcion) {
            case '1':
                restaurante.pedirConsumicion(numMesa);
                break;
            case '2':
                
                break;
            case '3':
                console.log("Saliendo...");
                mostrarMenu(restaurante);
                break;
            default:
                console.log("Opción no válida");
                mostrarMenuMesa(restaurante, numMesa);
                break;
        }
    });

}

function mostrarMenu(restaurante) {
    console.log("=======================");
    console.log("=========Menú==========");
    console.log("=======================");
    console.log("1. Mostrar mesas");
    console.log("2. Buscar mesa vacía");
    console.log("3. Seleccionar mesa");
    console.log("4. Salir");

    rl.question('Elige la opción: ', (opcion) => {
        switch(opcion) {
            case '1':
                restaurante.verMesas();
                break;
            case '2':
                restaurante.buscarVacias();
                break;
            case '3':
                restaurante.seleccionarMesa();
                break;
            case '4':
                console.log("Saliendo...");
                rl.close();
                break;
            default:
                console.log("Opción no válida");
                mostrarMenu(restaurante);
                break;
            }
        });
}


let restaurante1 = new Restaurante(3, 'carta.json', 132);
restaurante1.cargarJson();
mostrarMenu(restaurante1);






