import request from 'supertest';
import { isUuid, uuid } from 'uuidv4';
import app from '../app';
import { MenuRepository } from '../repositories/MenuRepository';
import { response } from 'express';

describe('Menu', () => {
  it('should create a valid menu', async () => {
    const response = await request(app).post('/menus').send({
      name: 'Menuzinho'
    });

    expect(isUuid(response.body.menu.id)).toBe(true);
  });

  it('should update an existing menu', async () => {
    const response = await request(app).get('/menus');

    const id = response.body.menus[0].id;

    await request(app).put('/menus?menuId=${uuid}').send({
      name: 'Novo nome'
    })
   
    expect(response.status).toBe(201);

  });

  it('should delete an existing menu', async () => {
    const response = await request(app).get('/menus');

    const id = response.body.menus[0].id;

    await request(app).delete(`/menus/${id}`).send({});

    expect(response.status).toBe(201);

  });

  it('should show all menus created', async () => {
    const response = await request(app).get('/menus');

    expect(response.status).toBe(201);

  })

  
});

describe('Produto', () => {
  it('Should create a new product', async () => {
      const response = await request(app).post('/products').send({
          name: 'Burger big boy',
          value: '35',
          description: 'burgerzao bom dms da conta',
          menu: 'lilas'

      })

      const response1 = await request(app).get('/products');

      console.log(response1.body)

      expect(response.status).toBe(201);
  })
})

