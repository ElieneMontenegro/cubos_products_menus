import request from 'supertest';
import { isUuid, uuid } from 'uuidv4';
import app from '../app';
import { MenuRepository } from '../repositories/MenuRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { response } from 'express';

describe('Menu', () => {
  it.only('should create a valid menu', async () => {
    const response = await request(app).post('/menus').send({
      name: 'Menuzinho'
    });

    expect(isUuid(response.body.menu.id)).toBe(true);
  });

  it.only('should update an existing menu', async () => {
    const response = await request(app).get('/menus');

    const id = response.body.menus[0].id;

    const update = await request(app).put(`/menus/${id}`).send({
      name: 'Novo nome',
      openedAt: new Date(),
      closedAt: '2021-09-14T15:00:56.419Z'
    })
   
    expect(update.status).toBe(200);

  });

  it.only('should delete an existing menu', async () => {
    const response = await request(app).get('/menus');

    const id = response.body.menus[0].id;

    const menuDelete = await request(app).delete(`/menus/${id}`).send({});

    expect(menuDelete.status).toBe(200);

  });

  it.only('should show all menus created', async () => {
    const response = await request(app).get('/menus');

    expect(response.status).toBe(200);

  })

});

describe('Produto', () => {
  it('Should create a new product', async () => {
    
    const response = await request(app).post('/products').send({
     
      name: "Burger big boy",
      value: 35,
      description: "burgerzao bom dms da conta",
      menu: "lilas"

    })

    console.log(response.body)

    expect(response.status).toBe(200);

  })

  it('Should update an existing product', async () =>{
    const response = await request(app).get('/products')

    console.log(response.body)

    const id = response.body.product[0].id

    await request(app).put(`/products/${id}`).send({
      
      name: "Burger little boy",
      value: 35,
      description: "burgerzao bom dms da conta",
      menu: "lilas"

    })

    expect(response.status).toBe(200);
  })

  it('Should delete an existing product', async() => {
    const response = await request(app).get('/products')

    console.log(response.body)
    const id = response.body.product[0].id

    await request(app).del(`/products/${id}`).send({});

    expect(response.status).toBe(200);

  })

  it('Should show all existing products', async() =>{
    const response = await request(app).get('/products')

    console.log(response.body);

    expect(response.status).toBe(200);


  })

})

