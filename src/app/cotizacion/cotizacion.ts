import { Vehiculo } from '../../../../webview/src/app/vehiculo/vehiculo';
import { Aseguradora } from '../../../../webview/src/app/aseguradora/aseguradora';


export class Cotizacion {
	id: number;
    name_user: string;
    email: string;
    identify: string;
    gender: string;
    //address: string;
    telephone: string;
    vehiculo: Vehiculo;
    insurances: Aseguradora;
	internal_message: string;
	status_code: number;
	user_message: string; 
}
