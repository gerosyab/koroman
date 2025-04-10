import { romanize } from '../src/koroman.core.js';
import assert from 'assert';

// Debug function
function debugRomanize(str, options) {
  console.log('Input:', str);
  console.log('Options:', options);
  const result = romanize(str, options);
  console.log('Result:', result);
  return result;
}

// Test cases with pronunciation rules
assert.strictEqual(debugRomanize("굳이", { usePronunciationRules: true }), "guji");
assert.strictEqual(debugRomanize("해돋이", { usePronunciationRules: true }), "haedoji");

// Test cases without pronunciation rules
assert.strictEqual(debugRomanize("굳이", { usePronunciationRules: false }), "gudi");
assert.strictEqual(debugRomanize("해돋이", { usePronunciationRules: false }), "haedodi");

// Basic Tests
console.log('Running basic tests...');
assert.strictEqual(romanize("한글"), "hangeul");
assert.strictEqual(romanize("굳이"), "guji");  // Default: usePronunciationRules: true
assert.strictEqual(romanize("문래"), "mullae");
assert.strictEqual(romanize("해돋이"), "haedoji");  // Default: usePronunciationRules: true
assert.strictEqual(romanize("로마자"), "romaja");
assert.strictEqual(romanize("안녕하세요"), "annyeonghaseyo");
assert.strictEqual(romanize("테스트"), "teseuteu");
console.log('✅ Basic tests passed');

// Casing Tests
console.log('\nRunning casing tests...');
assert.strictEqual(romanize("한글", { casingOption: "lowercase" }), "hangeul");
assert.strictEqual(romanize("한글", { casingOption: "uppercase" }), "HANGEUL");
assert.strictEqual(romanize("한글 로마자 안녕하세요", { casingOption: "capitalize-word" }), "Hangeul Romaja Annyeonghaseyo");
assert.strictEqual(romanize("한글 로마자 안녕하세요", { casingOption: "capitalize-line" }), "Hangeul romaja annyeonghaseyo");
console.log('✅ Casing tests passed');

// Pronunciation Rules Tests
console.log('\nRunning pronunciation rules tests...');
assert.strictEqual(romanize("해돋이"), "haedoji");
assert.strictEqual(romanize("해돋이", { usePronunciationRules: false }), "haedodi");
assert.strictEqual(romanize("문래역"), "mullaeyeok");
assert.strictEqual(romanize("문래역", { usePronunciationRules: false }), "munraeyeok");
assert.strictEqual(romanize("선릉역"), "seolleungyeok");
assert.strictEqual(romanize("선릉역", { usePronunciationRules: false }), "seonreungyeok");
assert.strictEqual(romanize("역량"), "yeongnyang");
assert.strictEqual(romanize("역량", { usePronunciationRules: true }), "yeongnyang");
console.log('✅ Pronunciation rules tests passed');

// Multiline and Spacing Tests
console.log('\nRunning multiline and spacing tests...');
assert.strictEqual(
    romanize("여기는 선릉역 입니다.\n해돋이와 문래역 그리고 역량 개발."),
    "yeogineun seolleungyeok imnida.\nhaedojiwa mullaeyeok geurigo yeongnyang gaebal."
);
assert.strictEqual(
    romanize("여기는 선릉역 입니다.\r\n해돋이와 문래역 그리고 역량 개발."),
    "yeogineun seolleungyeok imnida.\r\nhaedojiwa mullaeyeok geurigo yeongnyang gaebal."
);
assert.strictEqual(
    romanize("여기는 선릉역 입니다.\n\r해돋이와 문래역 그리고 역량 개발."),
    "yeogineun seolleungyeok imnida.\n\rhaedojiwa mullaeyeok geurigo yeongnyang gaebal."
);
console.log('✅ Multiline and spacing tests passed');

console.log('\n✅ All tests passed!');
