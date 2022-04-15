/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  if (config.testingType === "component") {
    require("@cypress/react/plugins/react-scripts")(on, config);
  }

  return config;
};
