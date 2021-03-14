module.exports = {
  roots: ['<rootDir>/src'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.protocol.ts',
    '!<rootDir>/src/**/*.protocols.ts',
    '!**/protocols/**',
    '!**/repository/**',
    '!**/3. domain/**'
  ],
  preset: '@shelf/jest-mongodb',
  coverageProvider: "v8",
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
};
