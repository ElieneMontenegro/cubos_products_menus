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
  
  public async getProductWithMenus(): Promise<IProductMenu[]> {
    
    const allProducts = await this.createQueryBuilder("allProducts").getMany();

    const Products: IProductMenu[] = allProducts.map(item => {

      console.log(item.menus)

      return {
        productName: item.name,
        description: item.description,
        value: item.value,
        menus: item.menus
      }
    })
  
    return Products;

  }

}
