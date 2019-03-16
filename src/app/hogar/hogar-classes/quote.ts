import {Bien} from './bien';
import {Insurance} from './insurance';

export class Quote {
  id: number;
  name_user: string;
  last_name: string;
  email: string;
  identify: string;
  bien: Bien;
  insurances: Insurance;
}
