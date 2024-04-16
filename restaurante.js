const fs = require('fs');


class Mesa {
    constructor(){
        this.consumiciones = [];
        this.libre = true;
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
    }

    //metodos

    cargarJson(json){
        fs.readFile(json, (err, datos) =>{
            const lista = JSON.parse(datos);
            const lista_carta = [];
            for(let list of lista){
                lista_carta.push(list);
            }
            //console.log(lista_carta);
        });
    }

    generarMesas(num_mesas){
        let lista_mesas = [];
        for(let i=0;i<num_mesas;i++){
            lista_mesas.push(new Mesa());
        }
        console.log(lista_mesas);
    }
}

let mesa1 = new Mesa();
let a = mesa1.verEstado();
console.log(a);

let restaurante1 = new Restaurante(3, 'carta.json', 132);
restaurante1.cargarJson('carta.json');
restaurante1.generarMesas();