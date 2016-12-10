/* eslint-disable no-cond-assign */
const EMOJI_REGEX = /(\:{1}\S+\:{1})/g;

/**
 * @param {string} str - a string, where emoji are formatted between two :s
 * @returns {string[]} a list of emoji
 */
const parse = (str) => {
  const emojis = [];
  var match;
  while ((match = EMOJI_REGEX.exec(str)) !== null) {
    emojis.push(match[1]);
  }
  return emojis;
};

module.exports = {
  parse,
};
