module.exports = function() {
  return {
    files: ['src/**/*.ts'],
    tests: ['src/**/*spec.ts', 'test/**/*spec.ts'],
    env: {
      type: 'node',
    },
    testFramework: 'jest',
  };
};
