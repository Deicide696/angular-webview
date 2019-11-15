import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Request } from './autos/autos-classes/request';

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
   * JSON raiz del request para generar el PDF
   */
  public request: Request;

  /**
   * Inicializa la URL a la que se va apuntar, esto esta relacionado con el proxy (proxy.conf.json)
   */
  constructor(private http: HttpClient) {
    this.url = 'api/web/v1/';
  }

  /**
   * Pobla la tabla que muestra las cotizaciones dado su id. Es el llamado inicial con el que se carga el Webview
   * @param cotizacion_id: Id de la cotización
   * @param auth: Autenticacíon basica del usuario que esta cotizando
   * @param partner: Id del partner al que pertenece el usuario
   */
  getResponseWeb(cotizacion_id, productName): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Basic ' + this.auth);
    headers = headers.append('partner', this.partner);

    const params = JSON.stringify({cotizacion_id});

    return this.http.post(this.url + productName + '/precotizacion-webview', params, {headers: headers});
  }

  /**
   * Request que armana el PDF dadas las cotizaciones seleccionadas en el Webview
   * @param request: Objeto que trae las cotizaciones que selecciono el usuario
   * @param auth: Autenticacíon basica del usuario que esta cotizando
   * @param partner: Id del partner al que pertenece el usuario
   */
  postQuote(request, productName): Observable<any> {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Basic ' + this.auth);
    headers = headers.append('partner', this.partner);

    const params = request;

    return this.http.post(this.url + productName + '/precotizacion-cotizaciones-seleccionadas', params, {headers: headers});
  }

    newPostQuote(request): Observable<any> {

        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        // headers = headers.append('Authorization', 'Bearer hdsbfjhsbdfjhbsdhjafjhasfv');
        headers = headers.append('Authorization', 'Basic cHJ1ZWJhc2FkbWluQHZpdm9vLmNvOjEyMzQ1Njc=');
        headers = headers.append('partner', '17');

        const params = request;

        console.log(headers);

        return this.http.post('http://staging.vivoo.co/api/web/v1/autos/precotizacion-cotizaciones-seleccionadas', params, {headers: headers});
    }
}
