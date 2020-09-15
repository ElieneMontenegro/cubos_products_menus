import request from 'supertest';
import { isUuid, uuid } from 'uuidv4';
import app from '../app';
import { ProductRepository } from '../repositories/ProductRepository';
import { response } from 'express';

describe('ProdutosMenus', () => {
  it('should create a valid menu', async () => {
    const response = await request(app).post('/menus').send({
      name: 'Menuzinho'
    });

    expect(isUuid(response.body.menu.id)).toBe(true);
  });

  it('Should create a new product', async () => {
    const response = await request(app).post('/products').send({
      name: "Burger big boy",
      value: 35,
      description: "burgerzao bom dms da conta"
    })

    expect(response.status).toBe(200);
  })

  it('Should create a new relationship product menu', async () => {
    const product = await request(app).get('/products');
    const menu = await request(app).get('/menus');

    const relation = await request(app).post('/menus-products').send({
      productId: product.body.product[0].productId,
      menuId: menu.body.menus[0].id
    })

    expect(relation.status).toBe(200);
  })

  it('Should show all existing products', async() =>{
    const response = await request(app).get('/products')

    expect(response.status).toBe(200);
  })

  it('Should delete an existing relationship', async() => {
    const product = await request(app).get('/products');
    const menu = await request(app).get('/menus');

    const deleteRelation = await request(app).delete('/menus-products').send({
      productId: product.body.product[0].productId,
      menuId: menu.body.menus[0].id
    })

    expect(deleteRelation.status).toBe(200);
  })

  it('Should show all existing products', async() =>{
    const response = await request(app).get('/products')

    expect(response.status).toBe(200);
  })

})

