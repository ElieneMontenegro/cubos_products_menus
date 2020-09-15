import request from 'supertest';
import { isUuid, uuid } from 'uuidv4';
import app from '../app';
import { ProductRepository } from '../repositories/ProductRepository';
import { response } from 'express';

describe('Produto', () => {
  it('Should create a new product', async () => {
    
    const response = await request(app).post('/products').send({
      name: "Burger big boy",
      value: 35,
      description: "burgerzao bom dms da conta"
    })

    expect(response.status).toBe(200);
  })

  it('Should update an existing product', async () =>{
    const response = await request(app).get('/products')

    const id = response.body.product[0].productId;
    const update = await request(app).put(`/products/${id}`).send({
      name: "Burger little boy",
      value: 35,
      description: "burgerzao bom dms da conta"
    })

    expect(update.status).toBe(200);
  })

  it('Should delete an existing product', async() => {
    const response = await request(app).get('/products')

    const id = response.body.product[0].productId
    const productTODelete = await request(app).delete(`/products/${id}`).send({});

    expect(productTODelete.status).toBe(200);
  })

  it('Should show all existing products', async() =>{
    const response = await request(app).get('/products')

    expect(response.status).toBe(200);
  })

})

