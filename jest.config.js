module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/__tests__/test-utils/db-env.ts'],
  maxWorkers: 1,
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};
