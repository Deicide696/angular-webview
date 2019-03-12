export class Request{
  cotizacion_id: number;
  // TODO: Toca optimizar el 'any' para que se pueda hacer el cast correspondiente
  cotizaciones_automaticas: any[];
  cotizaciones_manuales: any[];
}
