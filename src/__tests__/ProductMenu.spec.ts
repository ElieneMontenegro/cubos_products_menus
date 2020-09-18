import request from 'supertest';
import app from '../app';

describe('ProdutosMenus', () => {

  it('Should create a new relationship product menu', async () => {
    const createdMenu = await request(app).post('/menus').send({
      name: 'Menuzinho'
    });
    const createdProduct = await request(app).post('/products').send({
      name: "Burger big boy",
      value: 35,
      description: "burgerzao bom dms da conta"
    })

    const relation = await request(app).post('/menus-products').send({
      productId: createdProduct.body.product.id,
      menuId: createdMenu.body.menu.id
    })

    expect(relation.status).toBe(201);
  })

  it('Should delete an existing relationship', async() => {
    const createdMenu = await request(app).post('/menus').send({
      name: 'Menuzinho'
    });
    const createdProduct = await request(app).post('/products').send({
      name: "Burger big boy",
      value: 35,
      description: "burgerzao bom dms da conta"
    })

    const deleteRelation = await request(app).delete('/menus-products').send({
      productId: createdProduct.body.product.id,
      menuId: createdMenu.body.menu.id
    })

    expect(deleteRelation.status).toBe(200);
  })

})

