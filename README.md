![jackedgarf](https://i.ytimg.com/vi/F47-cFmq2ZI/hqdefault.jpg)

# garfbot
[![Circle CI](https://circleci.com/gh/doeg/garfbot.svg?style=shield)](https://circleci.com/gh/doeg/garfbot)

gotta go fast

![garfweb](https://pbs.twimg.com/media/CbSRCfnVIAA3LDS.jpg)

## Prerequisites
- node 7.2 (you can check your installed version with `node -v`)
- npm (check your installed version with `npm -v`)

## Setting up
Install the dependencies with:

```bash
npm install
```

Garfbot requires many :crystal_ball: secrets :crystal_ball:. Garfbot uses the [config](https://www.npmjs.com/package/config) package to manage them.

First, make a local config file. (This is done by copying the template, since `config/local.json` is in the [`.gitignore`](.gitignore) file to keep the secrets safe.) We will be editing it as we go.

```bash
cp ./config/local-template.js ./config/local.js
```

Second, you'll want to [sign up for an mLab account](https://mlab.com/signup/) to create your development database. (Alternately, if you hate yourself, you could [run mongodb locally.](https://docs.mongodb.com/v3.2/administration/install-community/). In this case, you can jump right to the third step.)

Once you've signed up for an mLab account, [create a new database](https://mlab.com/create). Choose the "single-node" plan, and the "sandbox" (free) tier. The default MongoDB version is fine. Name the database `garfbot-dev`.

Once the database is created, [create a new user your local garfbot](https://mlab.com/databases/garfbot-dev#users). Click "+ Add database user". Use `garfbot` for the username, and choose a secure password (henceforth referred to as your `$MONGODB_PASSWORD`).

Third, add your mongodb credentials to the `mongo` section of your [`config/local.js`](config/local.js).

Fourth, [create a Slack bot for your garfbot](https://goodsonicfanart.slack.com/apps/A0F7YS25R-bots). Click "Add Configuration". Choose a unique username for your bot. Add your API Token as the `slack.api_token` property of your [`config/local.js](config/local.js).

Fifth, grab the garfbot tokens for the Google Images and Twitter APIs from someone that has them. Add these to your [`config/local.js`](config/local.js) as well. (Alternately, you can set up your own Twitter app for your local garfbot at [http://apps.twitter.com/](http://apps.twitter.com/) if you prefer.)

Sixth, confirm that everything is working by running the tests. (You should not see any test failures!)

```bash
npm run test
```

Finally, start up your local garfbot server:

```bash
npm start
```

## Adding plugins
Create a file named [plugin].js in the plugins/ folder. A plugin in its simplest form defines a regex, for matching Slack messages, and a `fn` function, for generating a string with which to reply. Take a look at `plugins/hello.js` for a simple example.

## Testing
Testing is done with [Mocha](https://mochajs.org/) using the [Chai assertion](http://chaijs.com/api/assert/) library.

Create a file named [plugin]-test.js in the `test/plugins/` folder. Take a look at `test/plugins/hello-test.js` as an example.

Run the tests with `npm run test`.

## Deploying
Deployment is done by CircleCI after a PR is successfully merged to master.
