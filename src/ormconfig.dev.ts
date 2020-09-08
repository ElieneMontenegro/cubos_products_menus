export default {
  type: 'postgres',
  host: 'localhost',
  port: 5488,
  username: 'postgres',
  password: 'postgres',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [__dirname + '/models/**/*.ts'],
  migrations: [__dirname + '/migration/**/*.ts'],
  subscribers: [__dirname + '/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'models',
    migrationsDir: 'migration',
    subscribersDir: 'subscriber',
  },
};
