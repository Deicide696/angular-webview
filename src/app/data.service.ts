import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../../../webview/src/app/response/response';
import { ResponsePdf } from '../../../webview/src/app/response-pdf/response-pdf';
import { Request } from '../../../webview/src/app/request/request';

@Injectable()
export class DataService {
  /**
   * Concatena el proxy (target) con el String pasado como parametro
   */
  public url: string;

  /**
   * Variable global para la autenticación poblarla desde diferentes componentes
   */
  public auth: string;

  /**
   * Variable global para el partner poblarlo desde diferentes componentes
   */
  public partner: string;


  /**
   * Inicializa la URL a la que se va apuntar, esto esta relacionado con el proxy (proxy.conf.json)
   */
  constructor(private http: HttpClient) {
    this.url = 'api/web/v1/autos/';
  }

  /**
   * Pobla la tabla que muestra las cotizaciones dado su id. Es el llamado inicial con el que se carga el Webview
   * @param cotizacion_id: Id de la cotización
   * @param auth: Autenticacíon basica del usuario que esta cotizando
   * @param partner: Id del partner al que pertenece el usuario
   */
  getResponseWeb(cotizacion_id, auth, partner): Observable<Response> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Basic ' + auth);
    headers = headers.append('partner_id', partner);

    const params = JSON.stringify({cotizacion_id});

    console.log(this.http.post<Response>(this.url + 'precotizacion-autos', params, {headers: headers}));
        return this.http.post<Response>(this.url + 'precotizacion-autos', params, {headers: headers});
  }

  /**
   * Request que armana el PDF dadas las cotizaciones seleccionadas en el Webview
   * @param request: Objeto que trae las cotizaciones que selecciono el usuario
   * @param auth: Autenticacíon basica del usuario que esta cotizando
   * @param partner: Id del partner al que pertenece el usuario
   */
  postQuote(request, auth, partner): Observable<ResponsePdf> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Basic ' + auth);
    headers = headers.append('partner_id', partner);
    const params = request;

    console.log(this.http.post<ResponsePdf>(this.url + 'precotizacion-pdf', params, {headers: headers}));
        return this.http.post<ResponsePdf>(this.url + 'precotizacion-pdf', params, {headers: headers});
  }
}
