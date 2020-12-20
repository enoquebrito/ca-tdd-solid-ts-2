module.exports = {
  roots: ['<rootDir>/src'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageProvider: "v8",
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
};
