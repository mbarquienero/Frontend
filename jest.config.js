module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testMatch: ['**/__tests__/**/*.+(js|jsx|ts|tsx)', '**/?(*.)+(spec|test).+(js|jsx|ts|tsx)'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  };