import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../../../webview/src/app/response/response';

@Injectable()
export class DataService {
	public url: string;
  constructor(private http: HttpClient){
	  this.url = "http://54.173.24.54/vivoo-backend/api/web/v1/autos/precotizacion-autos";
  }

    /**
     * Returns the Observable object containing the list of quote
     * @returns The list of quotes in real time
     */
    getResponse(): Observable<Response> {
        console.log('Mis datos json: ' + this.http.get<Response>( '../assets/json/autos.json' ));
        return this.http.get<Response>( '../assets/json/autos.json' );    
	}	
	
	getResponseWeb(): Observable<Response> {
		let names = "ALGUIEN";
		let document = 1;
		let identify = 52696276;
		let first_surname = "APELLIDO";
		let gender = 2;
		let idCity = 1;
		let address = "Cra 19 A # 84 82 Ofic 201";
		let cellphone = "3014752020";
		let code_fasecolda = "801311";
		let birthDate = "1977-09-27";
		let model = 2013;
		let nuevo = "NO";
		let idCityAuto =820;
		let placa ="CBA321";
		let email ="correo@mail.com";
		let valor =9650000;
		let value_accessorio = 0;
		let second_surname = "";
		let document_driver = 1143964504;
		let name_company = "";
		
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Content-Type','application/json');	
		headers = headers.append('Authorization','Basic aG9sYUB2aXZvby5jbzoxMjM0NTY=');
		headers = headers.append('partner_id','4');
		let params = JSON.stringify({names, document, identify, first_surname, gender, idCity, address, cellphone, code_fasecolda, birthDate, model, nuevo, idCityAuto, placa, email, valor, value_accessorio, second_surname, document_driver, name_company});		
		
		console.log(this.http.post<Response>(this.url, params, {headers: headers}));		
        return this.http.post<Response>(this.url, params, {headers: headers});    
	}	
}
