import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../../../webview/src/app/response/response';
import { ResponsePdf } from '../../../webview/src/app/response-pdf/response-pdf';
import { Request } from '../../../webview/src/app/request/request';

@Injectable()
export class DataService {
	public url: string;
  constructor(private http: HttpClient){
	  this.url = "http://54.173.24.54/vivoo-backend/api/web/v1/autos/";
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
	
	getResponseWeb(cotizacion_id): Observable<Response> {
		
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Content-Type','application/json');	
		headers = headers.append('Authorization','Basic aG9sYUB2aXZvby5jbzoxMjM0NTY=');
		headers = headers.append('partner_id','4');
		let params = JSON.stringify({cotizacion_id});		
		
		console.log(this.http.post<Response>(this.url+"precotizacion-autos", params, {headers: headers}));		
        return this.http.post<Response>(this.url+"precotizacion-autos", params, {headers: headers});    
	}	
	
	postQuote(Request): Observable<ResponsePdf> {
		
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Content-Type','application/json');	
		headers = headers.append('Authorization','Basic aG9sYUB2aXZvby5jbzoxMjM0NTY=');
		headers = headers.append('partner_id','4');
		let params = JSON.stringify({Request});		
		
		console.log(this.http.post<ResponsePdf>(this.url+"precotizacion-pdf", params, {headers: headers}));		
        //return this.http.post<ResponsePdf>(this.url+"precotizacion-pdf", params, {headers: headers});    
		window.location.href = "https://s3.amazonaws.com/dev.vivoo/cotizacion/quote-4100.pdf";
	}
}
