const { defineConfig } = require('cypress');

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  e2e: {
    defaultCommandTimeout: 800000,
    video: false,
    setupNodeEvents(on, config) {},
    specPattern: 'cypress/e2e/*.js', // Move specPattern under the e2e testing type property
  },
  env: {
    API_KEY : '62c3694e94e312a68edb8054f49e62b114b0df8ed68f58740b04c8499abfd87a',
    myVariable: 'myValue', // Define your environment variables
  },
});
