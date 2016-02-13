const _ = require('lodash');
const logger = require('../utils/logger');
const ngram = require('simple-ngram-markov');
const twitter = require('../lib/twitter');

const regex = /markov (\w+)/;

// @see https://www.npmjs.com/package/simple-ngram-markov
const options = {
  length: 2, // ngram size; default is 2
  stripPunctuation: true // default is true
};

/**
  * @param {string} handle - a Twitter username without the '@' (e.g., 'garfbot')
  * @resolves {string[]} - an array of tweets (just the text)
  */
function getTweetsForUser(handle) {
  return twitter.get('statuses/user_timeline', {
    screen_name: handle,
    exclude_replies: true,
    include_rts: false,
    count: 200
  }).then(response => {
    const tweets = response.data;
    const texts = _.map(tweets, t => t.text);
    return texts;
  });
}

function stripTweet(text) {
  const sansURLs = text.replace(/(https?:\/\/)?(www\.|\S+?\.)(\S+?\.)?\S+$\s*/mg, '');
  return sansURLs;
}

/**
 * @param {string[]} tweets - an array of texts (tweets or otherwise)
 * @returns {string} - a markov-generated sentence
 */
function generateSentence(tweets) {
  logger.info(`Seeding markov with ${tweets.length} tweets`);

  const model = ngram.createModel(options);

  _.each(tweets, tweet => {
    var text = stripTweet(tweet);
    console.log(text);
    ngram.addSentenceToModel(model, text);
  });

  return ngram.generateSentence(model, 10);
}

module.exports = {
  regex,

  fn(message) {
    const handle = regex.exec(message)[1];
    return getTweetsForUser(handle)
      .then(tweets => {
        const sentence = generateSentence(tweets);
        return sentence;
      });
  }
}