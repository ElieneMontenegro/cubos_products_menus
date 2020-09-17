import { Router } from 'express';
import { getCustomRepository, createQueryBuilder, getRepository, Connection, ConnectionManager } from 'typeorm';
import { ProductRepository } from '../repositories/ProductRepository';
import { MenuRepository } from '../repositories/MenuRepository';
import { networkInterfaces } from 'os';
import { Product } from '../models/Product';
import { Menu } from '../models/Menu';

import { getConnection } from "typeorm";

const menuProductRouter = Router();

//recebe id do menu e id do produto, adiciona na tabela menuproductmenus um produto a um menu
menuProductRouter.post('/', async (request, response) => {
  try {

    //guarda os ids na tabela
    const ProductMenuToAdd = await getCustomRepository(MenuRepository)
    .createQueryBuilder("products_menu_menus")
    .insert()
    .into("products_menu_menus")
    .values({productsId: request.body.productId, menusId: request.body.menuId })
    .execute() 
    
    return response.status(201).json({ message: "produto adicionado ao menu" })

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
    .where("productsId =:productId", { productId: request.body.productId} )
    .andWhere("menusId =:menuId", { menuId: request.body.menuId })
    .execute()

    return response.status(200).json({ message: "produto deletado deste menu" })

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default menuProductRouter;
