import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

    @Output() clickableQuote: EventEmitter<any> = new EventEmitter();

    selectedQuote(checked, quote) {
        this.clickableQuote.emit({checked, quote});
    }
}
