import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../models/Product';

interface IProductMenu {
  productName: string;
  description: string;
  value: number;
  menus: {
    id: string;
    name: string;
  }[];
}

//pegar produto e ver em quais menus ele ta
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  // public getProductWithMenus(productId: string): IProductMenu {
  //   // TODO
  // }
}
