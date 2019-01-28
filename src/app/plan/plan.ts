import {Amparo} from '../../../../webview/src/app/amparo/amparo';
import {Asistencia} from '../../../../webview/src/app/asistencia/asistencia';

export class Plan {
	plan_name: string;
	status: boolean;
	no_cotizacion: string;
	mensaje_validacion: string;
	prima_total: string;
	limite: number;
	limitedbt: number;
	limitemup: number;
	limitemdp: number;
	amparos: Amparo;
	asistencia: Asistencia;
	rc_exceso: number;
	gastos_expedicion: number;
}
