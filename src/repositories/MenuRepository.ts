import { EntityRepository, Repository } from 'typeorm';
import { Menu } from '../models/Menu';

interface IReportMenu {
  name: string;
  openedDays: number;
  isOpened: boolean;
}

//pegar todos os menus entre o periodo que ele abre até o período que ele fecha, e ver quantos dias ficou aberto e se ainda tá aberto
@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu> {
  // public getMenuByPeriods(since: Date, until: Date): IReportMenu[] {
  //   // TODO
  // }
}
