import { ProductRepository } from '../repositories/ProductRepository';
import { Product } from '../models/Product';
import { uuid } from 'uuidv4';

class CreateProductService {
  private productRepository: ProductRepository;
  private forCreateProduct: Product;

  constructor(productRepositoryDependency: ProductRepository, newProduct: Product) {
    this.productRepository = productRepositoryDependency;
    this.forCreateProduct = newProduct;
  }

  public async execute(): Promise<Product> {
    const createdProduct = await this.productRepository.save({
      id: uuid(),
      name: this.forCreateProduct.name,
      value: this.forCreateProduct.value,
      description: this.forCreateProduct.description,
      menu: this.forCreateProduct.menu

    });

    return createdProduct;
  }
}

export default CreateProductService;
