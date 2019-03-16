import { Vehiculo } from './vehiculo';
import { Aseguradora } from './aseguradora';


export class Cotizacion {
	  id: number;
    name_user: string;
    last_name: string;
    email: string;
    identify: string;
    gender: string;
    telephone: string;
    vehiculo: Vehiculo;
    insurances: Aseguradora;
    list_all_insurances: Aseguradora[];
	  internal_message: string;
	  status_code: number;
	  user_message: string;
}
