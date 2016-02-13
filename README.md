# garfbot
gotta go fast

## How to add a plugin
### Developing
Create a file named [plugin].js in the plugins/ folder. A plugin in its simplest form defines a regex, for matching Slack messages, and a `fn` function, for generating a string with which to reply. Take a look at `plugins/hello.js` for a simple example.

### Testing
Testing is done with [Mocha](https://mochajs.org/) using the [Chai assertion](http://chaijs.com/api/assert/) library.

Create a file named [plugin]-test.js in the `test/plugins/` folder. Take a look at `test/plugins/hello-test.js` as an example.

Run the tests with `npm run test`.
