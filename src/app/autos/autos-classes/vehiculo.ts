export class Vehiculo {
	codigo_fasecolda: string;
    clase: string;
    servicio: string;
    placa: string;
    marca: string;
    tipo: string;
    cilindraje: string;
    model: string;
    valor: string;
    valor_accesorios: string;

    constructor(codigo_fasecolda: string, clase: string, servicio: string, placa: string, marca: string, tipo: string, cilindrage: string, model: string, valor: string, valor_accesorios: string){
    	this.codigo_fasecolda = codigo_fasecolda;
    	this.clase = clase;
    	this.servicio = servicio;
    	this.placa = placa;
    	this.marca = marca;
    	this.tipo = tipo;
    	this.cilindraje = cilindrage;
    	this.model = model;
    	this.valor = valor;
    	this.valor_accesorios = valor_accesorios;
    }
}
