import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import { MenuRepository } from '../repositories/MenuRepository';
import CreateMenuService from '../services/CreateMenuService';

const menuRouter = Router();

menuRouter.post('/', async (request, response) => {
  try {

    const menuRepository = getCustomRepository(MenuRepository);
    const menuService = new CreateMenuService(menuRepository, request.body);

    const createdMenu = await menuService.execute();

    return response.status(201).json({ menu: createdMenu });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

menuRouter.put('/:id', async (request, response) => {
  try {
    const menuToChange = await getCustomRepository(MenuRepository).update(request.params.id, {
      name: request.body.name,
      openedAt: request.body.openedAt,
      closedAt: request.body.closedAt
    });

    if (!menuToChange.affected) {
      throw new Error("Menu doesn't exist");
    }

    const menuChanged = await getCustomRepository(MenuRepository).findOne(request.params.id)

    return response.status(200).json({ message:"menu modified", menu: menuChanged });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

menuRouter.delete('/:id', async (request, response) => {
  try {
    const menuToRemove = await getCustomRepository(MenuRepository).delete(request.params.id);

    if (!menuToRemove.affected) {
      throw new Error("Menu doesn't exist");
    }

    return response
      .status(200)
      .json({ message: 'Menu deleted' });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

menuRouter.get('/', async (request, response) => {
  try {
    const menus = await getCustomRepository(MenuRepository);
    const allMenus = await menus.find();
    const menuzinhos = await menus.getMenuByPeriods();
    
    let cont = -1;
    let isOpen: boolean;
    const menuToPrint = allMenus.map(item => {

      cont++;
      isOpen = menuzinhos[cont].isOpened;

      return({...item, isOpen })
      
    });

    return response.status(200).json({ message: 'All menus', menus: menuToPrint });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default menuRouter;
