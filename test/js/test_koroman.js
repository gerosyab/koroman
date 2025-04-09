const { romanize } = require('../js/koroman.cjs');
const assert = require('assert');

describe('Koroman', () => {
    describe('Basic Tests', () => {
        it('should convert basic Korean text', () => {
            assert.strictEqual(romanize("한글"), "hangeul");
            assert.strictEqual(romanize("로마자"), "romaja");
            assert.strictEqual(romanize("안녕하세요"), "annyeonghaseyo");
            assert.strictEqual(romanize("테스트"), "teseuteu");
        });
    });

    describe('Casing Tests', () => {
        it('should handle different casing options', () => {
            assert.strictEqual(romanize("한글", { casingOption: "lowercase" }), "hangeul");
            assert.strictEqual(romanize("한글", { casingOption: "uppercase" }), "HANGEUL");
            assert.strictEqual(romanize("한글 로마자 안녕하세요", { casingOption: "capitalize-word" }), "Hangeul Romaja Annyeonghaseyo");
            assert.strictEqual(romanize("한글 로마자 안녕하세요", { casingOption: "capitalize-line" }), "Hangeul romaja annyeonghaseyo");
        });
    });

    describe('Pronunciation Rules Tests', () => {
        it('should apply pronunciation rules correctly', () => {
            assert.strictEqual(romanize("해돋이"), "haedoji");
            assert.strictEqual(romanize("해돋이", { usePronunciationRules: false }), "haedodi");
            assert.strictEqual(romanize("문래역"), "mullaeyeok");
            assert.strictEqual(romanize("문래역", { usePronunciationRules: false }), "munraeyeok");
            assert.strictEqual(romanize("선릉역"), "seollleungyeok");
            assert.strictEqual(romanize("선릉역", { usePronunciationRules: false }), "seonreungyeok");
            assert.strictEqual(romanize("역량"), "yeongnyang");
            assert.strictEqual(romanize("역량", { usePronunciationRules: true }), "yeongnyang");
        });
    });

    describe('Multiline and Spacing Tests', () => {
        it('should handle multiline text and different line endings', () => {
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
        });
    });
});
