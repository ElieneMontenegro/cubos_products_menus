import { Connection } from 'typeorm';
import { createConnection } from 'typeorm';

import ormConfig from '../../ormconfig.dev';
import { AuroraDataApiConnectionOptions } from 'typeorm/driver/aurora-data-api/AuroraDataApiConnectionOptions';

export async function createDatabaseConnection() {
  return await createConnection({
    ...((ormConfig as unknown) as AuroraDataApiConnectionOptions),
    migrationsRun: false,
  });
}

let conn: Connection | undefined;

beforeAll(async () => {
  conn = await createDatabaseConnection();
});

afterAll(async () => {
  await conn?.dropDatabase();
  await conn?.close();
});
