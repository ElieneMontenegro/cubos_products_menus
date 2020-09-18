import request from 'supertest';
import app from '../app';

describe('Produto', () => {
  it('Should create a new product', async () => {
    
    const response = await request(app).post('/products').send({
      name: "Burger big boy",
      value: 35,
      description: "burgerzao bom dms da conta"
    })

    expect(response.status).toBe(201);
  })

  it('Should update an existing product', async () =>{
    const productCreated = await request(app).post('/products').send({
      name: "Burger big boy",
      value: 35,
      description: "burgerzao bom dms da conta"
    })

    const update = await request(app).put(`/products/${productCreated.body.product.id}`).send({
      name: "Burger little boy",
      value: 35,
      description: "burgerzao bom dms da conta"
    })

    expect(update.status).toBe(200);
  })

  it('Should delete an existing product', async() => {
    const productCreated = await request(app).post('/products').send({
      name: "Burger big boy",
      value: 35,
      description: "burgerzao bom dms da conta"
    })

    const productTODelete = await request(app).delete(`/products/${productCreated.body.product.id}`).send({});

    expect(productTODelete.status).toBe(200);
  })

  it('Should show all existing products', async() =>{
    
    const productCreated1 = await request(app).post('/products').send({
      name: "Burger big boy",
      value: 35,
      description: "burgerzao bom dms da conta"
    })
    const productCreated2 = await request(app).post('/products').send({
      name: "Burger little boy",
      value: 35,
      description: "burgerzao bom dms da conta"
    })
    const response = await request(app).get('/products')

    expect(response.status).toBe(200);
  })

})

