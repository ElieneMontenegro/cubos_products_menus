import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { Menu } from '../models/Menu';
import { response } from 'express';
import { networkInterfaces } from 'os';

interface IReportMenu {
  name: string;
  openedDays: number;
  isOpened: boolean;
}

//pegar todos os menus entre o periodo que ele abre até o período que ele fecha, e ver quantos dias ficou aberto e se ainda tá aberto
@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu> {
  
  public async getMenuByPeriods(): Promise<IReportMenu[]> {

    const allMenus = await this.createQueryBuilder("menus")
    .getMany();

    const Menus: IReportMenu[] = allMenus.map(item => {

      var openDays = item.closedAt.getTime()-item.openedAt.getTime();
      openDays = openDays / (1000 * 3600 * 24);
      
      const today = new Date();
      let isOpen: boolean;
      if(item.closedAt.getTime() <= today.getTime()) {
        isOpen = false;
      } else {
        isOpen = true;
      }

      return {
        name: item.name,
        openedDays: openDays,
        isOpened: isOpen
      }

    })

    return Menus;

  }
}
