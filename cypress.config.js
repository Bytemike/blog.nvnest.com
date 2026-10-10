const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "smvz27",
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
    // Paper's desktop navigation is shown at the `lg` breakpoint (>= 1024px)
    viewportWidth: 1280,
    viewportHeight: 800
  },
});
