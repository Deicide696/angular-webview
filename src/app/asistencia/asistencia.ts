export class Asistencia{
    asistencia_pena_civil: boolean;
    asistencia_viaje: boolean;
    conductor_elegido: boolean;
    vehiculo_remplazo: boolean;
    grua: boolean;
    carro_taller: boolean;

    constructor(asistencia_pena_civil: boolean, asistencia_viaje: boolean, conductor_elegido: boolean, vehiculo_remplazo: boolean, grua: boolean, carro_taller: boolean){
    	this.asistencia_pena_civil = asistencia_pena_civil;
    	this.asistencia_viaje = asistencia_viaje;
    	this.conductor_elegido = conductor_elegido;
    	this.vehiculo_remplazo = vehiculo_remplazo;
    	this.grua = grua;
    	this.carro_taller = carro_taller;
    }
}
