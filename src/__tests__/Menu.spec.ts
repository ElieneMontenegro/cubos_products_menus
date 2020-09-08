import request from 'supertest';
import { isUuid, uuid } from 'uuidv4';
import app from '../app';
import { MenuRepository } from '../repositories/MenuRepository';
import { response } from 'express';

describe('Menu', () => {
  it.only('should create a valid menu', async () => {
    const response = await request(app).post('/menus').send({
      name: 'Menuzinho'
    });

    //console.log(response.body.menu);

    expect(isUuid(response.body.menu.id)).toBe(true);
  });

  it('should update an existing menu', async () => {
    const response = await request(app).get('/menus');

    const id = response.body.menus[0].id;

    request(app).put('/menus?menuId=${uuid}').send({
      name: 'Novo nome'
    })

    console.log(response.body.menus)
   
    expect(response.status).toBe(201);

  });

  it.only('should delete an existing menu', async () => {
    const response = await request(app).get('/menus');

    const id = response.body.menus[0].id;
    //console.log(id)

    request(app).del(`/menus/${id}`)
    const response1 = await request(app).get('/menus');

    //console.log(response1.body.menus)

    expect(response.status).toBe(201);

  });

  it('should show all menus created', async () => {
    const response = await request(app).get('/menus');
    console.log(response.body.menus)
    expect(response.status).toBe(201);

  })

  



});

