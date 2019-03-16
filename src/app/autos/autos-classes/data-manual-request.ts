import {RceObject} from './rce-object';

export class DataManualRequest {
  id: number;
  rce: RceObject[];
  deducible_rce: string;
  ptd: boolean;
  pth: boolean;
  ppd: string;
  pph: string;
  conductor: string;
  carro_taller: boolean;
  grua: boolean;
  gastos_transporte: number;
  vrpt: string;
  vrpp: string;
  ap: boolean;
  prima: number;
}
