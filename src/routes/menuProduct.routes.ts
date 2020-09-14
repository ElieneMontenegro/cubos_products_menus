import { Router } from 'express';
import { getCustomRepository, createQueryBuilder, getRepository } from 'typeorm';
import { ProductRepository } from '../repositories/ProductRepository';
import { MenuRepository } from '../repositories/MenuRepository';
import { networkInterfaces } from 'os';

const menuProductRouter = Router();

//recebe id do menu e id do produto, adiciona na tabela menuproductmenus um produto a um menu
menuProductRouter.post('/', async (request, response) => {
  try {

    const ProductMenuToAdd = await getCustomRepository(MenuRepository)
    .createQueryBuilder("products_menu_menus")
    .insert()
    .into("products_menu_menus")
    .values({productsId: request.body.productsId, menusId: request.body.menusId })
    .execute()

    return response.status(200).json({ message: "adicionando na tabela de produtos e menus", menu: ProductMenuToAdd.identifiers })

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

//recebe id do produto e do menu, apaga 
menuProductRouter.delete('/', async (request, response) => {
  try {

    const productToDelete = await getCustomRepository(MenuRepository)
    .createQueryBuilder("products_menu_delete")
    .delete()
    .from("products_menu_menus")
    .where("productsId = productsId", { productsId: request.body.productsId} )
    .andWhere("menusId = menusId", { menusId: request.body.menusId })
    .execute()

    return response.status(200).json({ message: "produto deletado deste menu" })

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default menuProductRouter;
