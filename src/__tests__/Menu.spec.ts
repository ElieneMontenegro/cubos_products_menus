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

    const update = await request(app).put(`/menus/${id}`).send({
      name: 'Novo nome',
      openedAt: new Date(),
      closedAt: '2021-09-14T15:00:56.419Z'
    })
   
    expect(update.status).toBe(200);

  });

  it('should delete an existing menu', async () => {
    const response = await request(app).get('/menus');

    const id = response.body.menus[0].id;

    const menuDelete = await request(app).delete(`/menus/${id}`).send({});

    expect(menuDelete.status).toBe(200);

  });

  it('should show all menus created', async () => {
    const response = await request(app).get('/menus');

    expect(response.status).toBe(200);

  })

});
