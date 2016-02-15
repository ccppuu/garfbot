![jackedgarf](https://i.ytimg.com/vi/F47-cFmq2ZI/hqdefault.jpg)

# garfbot
[![Circle CI](https://circleci.com/gh/doeg/garfbot.svg?style=shield)](https://circleci.com/gh/doeg/garfbot)

gotta go fast

## How to add a plugin
### Getting started
1. Create a `config/local.json` with all your secrets :crystal_ball:
2. `npm install`
3. `npm start`

### Developing
Create a file named [plugin].js in the plugins/ folder. A plugin in its simplest form defines a regex, for matching Slack messages, and a `fn` function, for generating a string with which to reply. Take a look at `plugins/hello.js` for a simple example.

### Testing
Testing is done with [Mocha](https://mochajs.org/) using the [Chai assertion](http://chaijs.com/api/assert/) library.

Create a file named [plugin]-test.js in the `test/plugins/` folder. Take a look at `test/plugins/hello-test.js` as an example.

Run the tests with `npm run test`.

### Deploying
Deployment is done by CircleCI after a PR is successfully merged to master.