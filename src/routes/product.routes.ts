import { Router } from 'express';
import { getCustomRepository, createQueryBuilder } from 'typeorm';

import { ProductRepository } from '../repositories/ProductRepository';
import CreateProductService from '../services/CreateProductService';

const productRouter = Router();

productRouter.post('/', async (request, response) => {
  try {
    const productRepository = getCustomRepository(ProductRepository);
    const productService = new CreateProductService(productRepository, request.body);

    const createdProduct = await productService.execute();

    return response.status(200).json({ product: createdProduct });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

productRouter.put('/:id', async (request, response) => {
  try {
    const productToChange = await getCustomRepository(ProductRepository).update(request.params.id, {
      name: request.body.name,
      description: request.body.description,
      value: request.body.value
    })

    if(!productToChange.affected){
      throw new Error("Product doesn't exist")
    }

    const productChanged = await getCustomRepository(ProductRepository).findOne(request.params.id)

    return response.status(200).json({ message:"Product modified", product: productChanged });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

productRouter.delete('/:id', async (request, response) => {
  try {
    const productToRemove = await getCustomRepository(ProductRepository).delete(request.params.id);

    if(!productToRemove.affected){
      throw new Error("Menu doesn't exist")
    }

    const productChanged = await getCustomRepository(ProductRepository).findOne(request.params.id)

   return response.status(200).json({ message:"Product deleted"});
    
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

productRouter.get('/', async (request, response) => {
  try {
    const repo = await getCustomRepository(ProductRepository)

    const productsWithMenus = await repo.getProductWithMenus();

    return response.status(200).json({ message:"All products", product: productsWithMenus });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default productRouter;
