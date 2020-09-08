import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

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

menuRouter.put('/', async (request, response) => {
  try {
    const menuRepository = getCustomRepository(MenuRepository);

    let menu = await menuRepository.findOne(request.body.id);
    if (!menu) {
      throw new Error("Menu doesn't exist");
    }

    menu.name = request.body.name;
    // menu.openedAt = new Date();
    // menu.closedAt = new Date();

    await menuRepository.save(menu);

    return response.status(201).json({ menu: menu });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

menuRouter.delete('/:menuId', async (request, response) => {
  try {
    const menuRepository = getCustomRepository(MenuRepository);

    console.log(request.body, request.params)

    let menuToRemove = await menuRepository.findOne(request.params.menuId);
    console.log(menuToRemove);
    if (!menuToRemove) {
      throw new Error("Menu doesn't exist");
    }

    await menuRepository.delete(menuToRemove);

    return response
      .status(201)
      .json({ message: 'Menu deleted', menu: menuToRemove });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

menuRouter.get('/', async (request, response) => {
  try {
    const menuRepository = getCustomRepository(MenuRepository);

    const menus = await menuRepository.find();

    return response.status(201).json({ message: 'All menus', menus: menus });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default menuRouter;
