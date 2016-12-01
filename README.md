![jackedgarf](https://i.ytimg.com/vi/F47-cFmq2ZI/hqdefault.jpg)

# garfbot
[![Circle CI](https://circleci.com/gh/doeg/garfbot.svg?style=shield)](https://circleci.com/gh/doeg/garfbot)

gotta go fast

![garfweb](https://pbs.twimg.com/media/CbSRCfnVIAA3LDS.jpg)

## Prerequisites
- node 7.2 (you can check your installed version with `node -v`)
- npm (check your installed version with `npm -v`)

## Setting up
Garfbot requires many :crystal_ball: secrets :crystal_ball:. Garfbot uses the [config](https://www.npmjs.com/package/config) package to manage them.

First, make a local config file. (This is done by copying the template, since `config/local.json` is in the [`.gitignore`](.gitignore) file to keep the secrets safe.)

```bash
cp ./config/local-template.js ./config/local.js
```

## Adding plugins
Create a file named [plugin].js in the plugins/ folder. A plugin in its simplest form defines a regex, for matching Slack messages, and a `fn` function, for generating a string with which to reply. Take a look at `plugins/hello.js` for a simple example.

## Testing
Testing is done with [Mocha](https://mochajs.org/) using the [Chai assertion](http://chaijs.com/api/assert/) library.

Create a file named [plugin]-test.js in the `test/plugins/` folder. Take a look at `test/plugins/hello-test.js` as an example.

Run the tests with `npm run test`.

## Deploying
Deployment is done by CircleCI after a PR is successfully merged to master.
