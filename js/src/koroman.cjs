// js/koroman.cjs
// KOROMAN: Korean Romanizer (CommonJS Entry)

const { romanize, splitHangulToJamos, composeJamos, formatRoman, applyPronunciationRules, applyRomanMapping } = require('./koroman.core.js');

module.exports = { romanize, splitHangulToJamos, composeJamos, formatRoman, applyPronunciationRules, applyRomanMapping };
