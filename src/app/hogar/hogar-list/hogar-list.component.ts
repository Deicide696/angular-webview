import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import {ActivatedRoute} from '@angular/router';
import {ResponsePdf} from '../../autos/autos-classes/response-pdf';
import {Quote} from '../hogar-classes/quote';
import {Response} from '../hogar-classes/response';
import {DataRequest} from '../hogar-classes/data-request';

declare interface TableData {
  headerRow: string[];
  // dataRows: string[][];
}

@Component({
  selector: 'app-hogar-list',
  templateUrl: './hogar-list.component.html',
  styleUrls: ['./hogar-list.component.scss'],
  styles: [`
    :host >>> .alert-custom {
      color: #99004d;
      background-color: #f169b470;
      border-color: #800040;
    }
  `]
})

export class HogarListComponent implements OnInit {

  public tableDataHeaders: TableData;
  public color:string; // ???
  public inputs:string;
  public auth:string;
  public errores:any;
  public quoteCounter:number;
  public manualEnable: boolean;
  loading: boolean;

  public productName = 'hogar';
  response: Response;
  responsepdf: ResponsePdf;
  data: Quote;
  buttonQuoteEnabled: boolean;
  quotesArray = [];

  constructor(private dataService: DataService, private route: ActivatedRoute) {

    // Inicializo el contador de cotizaciones en 0
    this.quoteCounter = 0;

    // Recibe los parametros por GET
    this.inputs = this.route.snapshot.params['precotizacion'];

    // Pobla el servicio global (DataService) con el id de la cotización e inicializa cotizaciones manuales y automaticas
    dataService.request = {
      cotizacion_id: +this.inputs,
      cotizaciones_automaticas: null,
      cotizaciones_manuales: null,
    };

    this.route.queryParamMap.subscribe(params => {
      // TODO: Cambiarlo porque no solo trae los errores sino también la auth
      this.errores = params;

      // TODO: Optimizar esto!!!
      let mensaje_errores = [];
      for (let error_index in this.errores.params) {
        if (error_index != 'auth') {
          if (error_index != 'partner_id') {
            mensaje_errores.push(this.errores.params[error_index]);            
          }
        }
      }
      dataService.auth = this.errores.params.auth;
      dataService.partner = this.errores.params.partner_id;

      this.errores = mensaje_errores;      
    });
  }

  getResponseWeb(cotizacion): void {
    this.dataService.getResponseWeb(cotizacion, this.productName)
      .subscribe(response => {
          this.response = response;
          this.data = response.data;
          this.loading=false;
        }
      );
  }

  getResponsePdf(request): void{
    this.dataService.postQuote(request, this.productName)
      .subscribe(responsepdf => {
        this.responsepdf = responsepdf;
        this.responsepdf.data = responsepdf.data;
        if(this.responsepdf.status){
          window.location.href = this.responsepdf.data.internal_message;
        }
        else{
          alert(this.responsepdf.data.internal_message);
        }
      });
  }

  // Función para encontrar la posición del objeto buscado dentro de un array.
  deepIndexOf(arr, obj) {
    return arr.findIndex(function (cur) {
      return Object.keys(obj).every(function (key) {
        return obj[key] === cur[key];
      });
    });
  }

  // Función para invocar el EndPoint de precotización-pdf
  sendRequest() {
    this.loading=true;
    console.log(this.dataService.request);
    this.getResponsePdf(this.dataService.request);
  }

  // Compañia selecionada/deseleccionada
  select(selectedId, element) {

    let quotesSelected = {} as DataRequest;

    // Valida si el checkbox ha sido activado
    if(element == true){
      // Asigna el valor de las propiedades de DataRequest {Aseguradora}, con los parametros de esta función.
      quotesSelected.id = selectedId;

      // Inserta cotización seleccionada en el array de cotizaciones
      this.quotesArray.push(quotesSelected);
      // Actualiza la propiedad cotizaciones de la clase Request con la cotización seleccionada.
      this.dataService.request.cotizaciones_automaticas = this.quotesArray;
    }
    else { // Si se desactiva el checkbox
      // Asigna el valor de las propiedades de DataRequest {Aseguradora}, con los parametros de esta función.
      quotesSelected.id = selectedId;

      // Se elimina del array el elemento desactivado, se utiliza la función
      // deepIndexOf para encontrar la posición del arreglo de este elemento
      this.quotesArray.splice(this.deepIndexOf(this.quotesArray ,quotesSelected), 1);

      // Actualiza la propiedad cotizaciones de la clase Request
      this.dataService.request.cotizaciones_automaticas = this.quotesArray;
    }
  }

  ngOnInit() {
    this.loading=true;
    this.buttonQuoteEnabled = true;

    // Llamado para poblar la tabla con las cotizaciones dado el id de cotización
    this.getResponseWeb(this.inputs);

    this.tableDataHeaders = {
      headerRow: [ 'Tipo Aseguramiento', 'Daños a terceros', 'Deducible Terremoto', 'Contenidos especiales', 'Asistencia', 'Prima']
    };
  }

}
