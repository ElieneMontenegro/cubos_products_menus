import request from 'supertest';
import { isUuid } from 'uuidv4';
import app from '../app';

describe('Menu', () => {
  it('should create a valid menu', async () => {
    const response = await request(app).post('/menus').send({
      name: 'Menuzinho'
    });

    expect(isUuid(response.body.menu.id)).toBe(true);
  });

  it('should update an existing menu', async () => {
    const menuCreated = await request(app).post('/menus').send({
      name: "Meu Menu"
    })
    
    const response = await request(app).put(`/menus/${menuCreated.body.menu.id}`).send({
      name: 'Novo nome',
      openedAt: new Date(),
      closedAt: '2021-09-14T15:00:56.419Z'
    });
   
    expect(response.status).toBe(200);

  });

  it('should delete an existing menu', async () => {

    const menuCreated = await request(app).post('/menus').send({
      name: "Meu Menu"
    })

    const menuDelete = await request(app).delete(`/menus/${menuCreated.body.menu.id}`).send({});

    expect(menuDelete.status).toBe(200);

  });

  it('should show all menus created', async () => {
    const menu1 = await request(app).post('/menus').send({
      name: "Menuzao"
    })
    const menu2 = await request(app).post('/menus').send({
      name: "Menuzinho"
    })

    const response = await request(app).get('/menus');

    expect(response.status).toBe(200);

  })

});
