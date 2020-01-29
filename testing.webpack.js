// This entire methodology is derived from the following blog post:
// http://kentor.me/posts/testing-react-and-flux-applications-with-karma-and-webpack/
import "@babel/polyfill";

// Create a Webpack require context so we can dynamically require our
// project's modules. Exclude test files in this context.
var projectContext = require.context('./test', true, /^((?!tests).)*.jsx?$/);
// Extract the module ids that Webpack uses to track modules.
var projectModuleIds = projectContext.keys().map(module =>
  String(projectContext.resolve(module))
);

beforeEach(() => {
  // Remove our modules from the require cache before each test case.
  projectModuleIds.forEach(id => delete require.cache[id]);
});

var context = require.context('./test', true, /-test\.js?$/);
context.keys().forEach(context);
