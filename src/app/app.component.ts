import { Component} from '@angular/core';

import { DataService } from '../../../webview/src/app/data.service';
import { Response } from '../../../webview/src/app/response/response';
import { Request } from '../../../webview/src/app/request/request';
import { DataResponse } from '../../../webview/src/app/data-response/data-response';
import { DataAutomaticRequest } from './data-automatic-request/data-automatic-request';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{

  title = 'webview';
}
