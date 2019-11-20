import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Response} from '../autos-classes/response';
import {ListaComponent} from '../lista/lista.component';
import {ListaService} from '../lista/lista.service';

@Component({
    selector: 'tr.app-autos-row-list',
    templateUrl: './autos-row-list.component.html',
    styleUrls: ['./autos-row-list.component.scss']
})
export class AutosRowListComponent implements OnInit {

    @Input('quote') quote: Response;

    constructor( private listaService: ListaService) {}

    ngOnInit() {
        // console.log(this.quote);
    }

    selectedQuote(element, quote)
    {
        this.listaService.selectedQuote(element.checked, quote)
    }
}
