import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

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

productRouter.put('/:productId', async (request, response) => {
  try {
    const productRepository = getCustomRepository(ProductRepository);

    let product = await productRepository.findOne(request.params.productId);
    if(!product){
      throw new Error("Product doesn't exist")
    }

    product.name = request.body.name;
    product.description = request.body.description;
    product.value=request.body.vale;
    product.menu = request.body.menu;

    await productRepository.save(product)

    return response.status(200).json({ message:"Product modified", product: product });

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

productRouter.delete('/:productId', async (request, response) => {
  try {
    const productRepository = getCustomRepository(ProductRepository);

    const productToRemove = await productRepository.findOne(request.params.productId);
    if(!productToRemove){
      throw new Error("Menu doesn't exist")
    }

    await productRepository.remove(productToRemove);

    return response.status(200).json({ message:"Product deleted", product: productToRemove });
    
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

productRouter.get('/', async (request, response) => {
  try {
    const productRepository = getCustomRepository(ProductRepository);

    const products = await productRepository.find();

    return response.status(200).json({ message:"All products", product: products });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default productRouter;
