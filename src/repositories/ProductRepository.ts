import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../models/Product';

interface IProductMenu {
  productId: string;
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

    const productsWithMenus = await this.find({relations:["menus"]} );

    const Products: IProductMenu[] = productsWithMenus.map(item => {
     
      const menus = item.menus.map(item => {
        return({id: item.id, name: item.name})
      })

      return {
        productId: item.id,
        productName: item.name, 
        description: item.description,
        value: item.value,
        menus: menus
      }
    })
  
    return Products;

  }

}
