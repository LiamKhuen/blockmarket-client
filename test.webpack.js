// Ensures that all requires are reset in between test cases.

var projectContext = require.context('./src/js', true, /^((?!\.spec\.).)*\.tsx?$/);

// Extract the module ids that Webpack uses to track modules.
var projectModuleIds = projectContext.keys().map(function (module) {
  return String(projectContext.resolve(module));
});

beforeEach(function () {
  // Remove our modules from the require cache before each test case.
  projectModuleIds.forEach(function (id) {
    delete require.cache[id]
  });
});

// Pull in all test code
var context = require.context('./src/js', true, /(.spec\.ts)/);
context.keys().forEach(context);