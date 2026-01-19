/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.test.ts',
    '**/tests/**/*.spec.ts'
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  coverageThreshold: {
    global: {
      branches: 40,    
      functions: 55,   
      lines: 60,       
      statements: 60   
    }
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/plugins/react.ts',
    '!src/utils/string-utils.ts'
  ],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@plugins/(.*)$': '<rootDir>/src/plugins/$1',
    '^@presets/(.*)$': '<rootDir>/src/presets/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@advanced/(.*)$': '<rootDir>/src/advanced/$1'
  }
};