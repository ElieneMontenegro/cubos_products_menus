import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import app from './app';

getConnectionOptions()
  .then(async options => {
    return createConnection({
      ...options,
      migrationsRun: false,
    });
  })
  .then(() => {
    app.listen(3333, () => {
      console.log('🚀 Server started on port 3333!');
    });
  })
  .catch(error => console.error(error));
