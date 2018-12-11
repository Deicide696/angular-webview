import { Component} from '@angular/core';

import { DataService } from '../../../webview/src/app/data.service';
import { Response } from '../../../webview/src/app/response/response';
import { DataResponse } from '../../../webview/src/app/data-response/data-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{

  title = 'webview';
}
