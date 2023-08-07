process.env.NODE_ENV = 'test';
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/*.(ts|tsx)'],
};
