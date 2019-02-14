import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../../../webview/src/app/response/response';
import { ResponsePdf } from '../../../webview/src/app/response-pdf/response-pdf';
import { Request } from '../../../webview/src/app/request/request';

@Injectable()
export class DataService {
	public url: string;
	public auth:string;
	public partner:string;

  constructor(private http: HttpClient){
	  this.url = "api/web/v1/autos/";
  }

    /**
     * Returns the Observable object containing the list of quote
     * @returns The list of quotes in real time
     */
    getResponse(): Observable<Response> {		
        console.log('Mis datos json: ' + this.http.get<Response>( '../assets/json/autos.json' ));
        return this.http.get<Response>( '../assets/json/autos.json' );    
	}	
	
	getResponse2(): Observable<Response> {
        console.log('Mis datos json: ' + this.http.get<Response>( '../assets/json/autos2.json' ));
        return this.http.get<Response>( '../assets/json/autos2.json' );    
	}	
	
	getResponseWeb(cotizacion_id, auth, partner): Observable<Response> {		
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Content-Type','application/json');	
		headers = headers.append('Authorization','Basic '+auth);
		headers = headers.append('partner_id',partner);
		let params = JSON.stringify({cotizacion_id});				
		console.log(this.http.post<Response>(this.url+"precotizacion-autos", params, {headers: headers}));		
        return this.http.post<Response>(this.url+"precotizacion-autos", params, {headers: headers});    
	}	
	
	postQuote(request, auth, partner): Observable<ResponsePdf> {		
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Content-Type','application/json');	
		headers = headers.append('Authorization','Basic '+auth);
		headers = headers.append('partner_id',partner);
		let params = request;
		//JSON.stringify({request});				
		
		console.log(this.http.post<ResponsePdf>(this.url+"precotizacion-pdf", params, {headers: headers}));		
        return this.http.post<ResponsePdf>(this.url+"precotizacion-pdf", params, {headers: headers});    
		
	}
}
