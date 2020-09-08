import request from 'supertest';
import { isUuid, uuid } from 'uuidv4';
import app from '../app';

describe('Menu', () => {
  it('should create a valid menu', async () => {
    const response = await request(app).post('/menus').send({
      name: 'Menuzinho',
    });

    console.log(response.body.menu);

    expect(isUuid(response.body.menu.id)).toBe(true);
  });
});
