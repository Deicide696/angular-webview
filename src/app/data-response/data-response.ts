import { Cotizacion } from '../../../../webview/src/app/cotizacion/cotizacion';

export class DataResponse{
  internal_message: Cotizacion[];
  status_code: number;
  user_message: string;  
}