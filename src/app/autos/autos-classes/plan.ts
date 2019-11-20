import {Amparo} from './amparo';
import {Asistencia} from './asistencia';

export class Plan {
	plan_name: string;
	status: boolean; // TODO: Validar porque al parecer no se esta usando
	no_cotizacion: string; // TODO: Validar porque al parecer no se esta usando
	mensaje_validacion: string; // TODO: Validar porque al parecer no se esta usando
	prima_total: string;
	limite: number;
	limitedbt: number;
	limitemup: number;
	limitemdp: number;
	amparos: Amparo;
	asistencia: Asistencia;
	rc_exceso: number; // TODO: Validar porque al parecer no se esta usando
	gastos_expedicion: number;
}
