var koroman = (function (exports) {
  'use strict';

  // @name: koroman.core.js
  // @project: Koroman
  // @author: Donghe Youn (Daissue)
  // @date: 2025-04-02
  // @description: This module provides core functionality for romanizing Korean Hangul text.
  //               It includes functions to decompose Hangul syllables into their constituent jamo (initial, medial, final),
  //               apply Korean pronunciation rules, and convert them into Latin (Romanized) script.
  //               This module is used by both CommonJS and ESModule entry points and is not intended to be used directly.
  // @license: MIT License
  // @version: 1.0.0
  // @dependencies: None
  // @usage: Import this from koroman.mjs or koroman.cjs to access the romanize() function.
  // 자모 분해 및 조합 + 로마자 변환 (초성/중성/종성 실제 유니코드 문자 사용 버전)

  // 초성: 19자 (U+1100~U+1112)
  const CHO = [
      "ᄀ", "ᄁ", "ᄂ", "ᄃ", "ᄄ", "ᄅ", "ᄆ", "ᄇ", "ᄈ", "ᄉ",
      "ᄊ", "ᄋ", "ᄌ", "ᄍ", "ᄎ", "ᄏ", "ᄐ", "ᄑ", "ᄒ"
    ];
    
    // 중성: 21자 (U+1161~U+1175)
    const JUNG = [
      "ᅡ", "ᅢ", "ᅣ", "ᅤ", "ᅥ", "ᅦ", "ᅧ", "ᅨ", "ᅩ", "ᅪ", "ᅫ",
      "ᅬ", "ᅭ", "ᅮ", "ᅯ", "ᅰ", "ᅱ", "ᅲ", "ᅳ", "ᅴ", "ᅵ"
    ];
    
    // 종성: 28자 (첫 번째는 없음, 나머지 U+11A8~U+11C2)
    const JONG = [
      "", "ᆨ", "ᆩ", "ᆪ", "ᆫ", "ᆬ", "ᆭ", "ᆮ", "ᆯ", "ᆰ", "ᆱ", "ᆲ",
      "ᆳ", "ᆴ", "ᆵ", "ᆶ", "ᆷ", "ᆸ", "ᆹ", "ᆺ", "ᆻ", "ᆼ", "ᆽ", "ᆾ",
      "ᆿ", "ᇀ", "ᇁ", "ᇂ"
    ];

    const ZWSP = '\u200A'; // Hair Space (조합 방지용)
  //   const ZWSP = '\u200B'; // zero-width space (조합 방지용)
    
    function formatRoman(str, casingOption = "lowercase") {
      switch (casingOption) {
        case "uppercase": return str.toUpperCase();
        case "capitalize-line": return str.split('\n').map(line => line.length > 0 ? line.charAt(0).toUpperCase() + line.slice(1) : '').join('\n');
        case "capitalize-word": return str.split('\n').map(line => line.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join('\n');
        default: return str.toLowerCase();
      }
    }
    
    function splitHangulToJamos(str) {
      const result = [];
      let jamoString = '';
      let plainJamoString = '';
      for (let char of str) {
        const code = char.charCodeAt(0);
        if (code < 0xAC00 || code > 0xD7A3) {
          result.push({ char, type: 'non-hangul' });
          jamoString += char;
          plainJamoString += char;
          continue;
        }
        const syllableIndex = code - 0xAC00;
        const cho = Math.floor(syllableIndex / (21 * 28));
        const jung = Math.floor((syllableIndex % (21 * 28)) / 28);
        const jong = syllableIndex % 28;
        const jamo = { 초성: CHO[cho], 중성: JUNG[jung], 종성: JONG[jong] || null };
        result.push(jamo);
        jamoString += jamo.초성 + jamo.중성 + (jamo.종성 || '');
        plainJamoString += jamo.초성 + ZWSP + jamo.중성;
        if (jamo.종성) plainJamoString += ZWSP + jamo.종성;
      }
      return { jamoArray: result, jamoString, plainJamoString };
    }
    
    function composeJamos(jamoArray) {
      let result = '';
      for (let jamo of jamoArray) {
        if (jamo.type === 'non-hangul') {
          result += jamo.char;
          continue;
        }
        const choIndex = CHO.indexOf(jamo.초성);
        const jungIndex = JUNG.indexOf(jamo.중성);
        const jongIndex = jamo.종성 ? JONG.indexOf(jamo.종성) : 0;
        if (choIndex < 0 || jungIndex < 0 || jongIndex < 0) {
          result += '?';
          continue;
        }
        const code = 0xAC00 + (choIndex * 21 + jungIndex) * 28 + jongIndex;
        result += String.fromCharCode(code);
      }
      return result;
    }
    
    function applyPronunciationRules(jamoStr) {
      const replaceArr = [

          // ==============================
          // 1. 무효화 처리
          // ==============================
        
          { p: /\u11a7/g, r: "" }, // 'ᆧ'(U+11A7) → 제거 (사용되지 않는 종성)
        
          // ==============================
          // 2. 비음화 (ㄴ, ㅁ, ㅇ)
          // ==============================
        
          { p: /[\u11b8\u11c1\u11b9\u11b2\u11b5](?=[\u1102\u1106])/g, r: "ᆷ" }, 
          // 종성 'ᆸ(ㅂ)' 'ᇁ(ㅍ)' 'ᆹ(ㅂㅅ)' 'ᆲ(ㄹㅂ)' 'ᆵ(ㄹㅍ)' + 다음 초성 'ᄂ(ㄴ)' or 'ᄆ(ㅁ)' → 'ᆷ'
        
          { p: /[\u11ae\u11c0\u11bd\u11be\u11ba\u11bb\u11c2](?=[\u1102\u1106])/g, r: "ᆫ" },
          // 종성 'ᆮ(ㄷ)' 'ᇀ(ㅌ)' 'ᆽ(ㅈ)' 'ᆾ(ㅊ)' 'ᆺ(ㅅ)' 'ᆻ(ㅆ)' 'ᇂ(ㅎ)' + 다음 초성 'ᄂ(ㄴ)' or 'ᄆ(ㅁ)' → 'ᆫ'
        
          { p: /[\u11a8\u11a9\u11bf\u11aa\u11b0](?=[\u1102\u1106])/g, r: "ᆼ" },
          // 종성 'ᆨ(ㄱ)' 'ᆩ(ㄲ)' 'ᆿ(ㅋ)' 'ᆪ(ㄱㅅ)' 'ᆰ(ㄹㄱ)' + 다음 초성 'ᄂ'/'ᄆ' → 'ᆼ'
        
          // ==============================
          // 3. 연음/연철
          // ==============================
        
          { p: /\u11a8\u110b(?=[\u1163\u1164\u1167\u1168\u116d\u1172])/g, r: "ᆼᄂ" },
          // 'ᆨ' + 'ᄋ' + 중성 'ㅑㅒㅕㅖㅛㅠ' → 'ᆼᄂ' (연음화)
        
          { p: /\u11af\u110b(?=[\u1163\u1164\u1167\u1168\u116d\u1172])/g, r: "ᆯᄅ" }, 
          // 'ᆯ' + 'ᄋ' + 중성 위와 같음 → 'ᆯᄅ'
        
          { p: /[\u11a8\u11bc]\u1105/g, r: "ᆼᄂ" }, 
          // 'ᆨ(ㄱ)', 'ᆼ(ㅇ)' + 'ᄅ(ㄹ)' → 'ᆼᄂ'
        
          { p: /\u11ab\u1105(?=\u1169)/g, r: "ᆫᄂ" }, 
          // 'ᆫ(ㄴ)' + 'ᄅ' + 중성 'ㅗ' → 'ᆫᄂ'
        
          { p: /\u11af\u1102|\u11ab\u1105/g, r: "ᆯᄅ" }, 
          // 'ᆯ(ㄹ)' + 'ᄂ(ㄴ)', 'ᆫ(ㄴ)' + 'ᄅ(ㄹ)' → 'ᆯᄅ'
        
          { p: /[\u11b7\u11b8]\u1105/g, r: "ᆷᄂ" }, 
          // 'ᆷ(ㅁ)', 'ᆸ(ㅂ)' + 'ᄅ' → 'ᆷᄂ'
        
          { p: /\u11b0\u1105/g, r: "ᆨᄅ" }, 
          // 'ᆰ(ㄹㄱ)' + 'ᄅ' → 'ᆨᄅ'
        
          // ==============================
          // 4. 격음화 / 자음군 분해
          // ==============================
        
          { p: /\u11a8\u110f/g, r: "ᆨ-ᄏ" }, // 'ᆨ' + 'ᄏ' → 'ᆨ-ᄏ'
          { p: /\u11b8\u1111/g, r: "ᆸ-ᄑ" }, // 'ᆸ' + 'ᄑ' → 'ᆸ-ᄑ'
          { p: /\u11ae\u1110/g, r: "ᆮ-ᄐ" }, // 'ᆮ' + 'ᄐ' → 'ᆮ-ᄐ'
        
          // ==============================
          // 5. 복합 종성 분해
          // ==============================
        
          { p: /\u11aa/g, r: "ᆨᆺ" }, // 'ᆪ(ㄱㅅ)' → 'ᆨᆺ'
          { p: /\u11ac/g, r: "ᆫᆽ" }, // 'ᆬ(ㄴㅈ)' → 'ᆫᆽ'
          { p: /\u11ad/g, r: "ᆫᇂ" }, // 'ᆭ(ㄴㅎ)' → 'ᆫᇂ'
          { p: /\u11b0/g, r: "ᆯᆨ" }, // 'ᆰ(ㄹㄱ)' → 'ᆯᆨ'
          { p: /\u11b1/g, r: "ᆯᆷ" }, // 'ᆱ(ㄹㅁ)' → 'ᆯᆷ'
          { p: /\u11b2/g, r: "ᆯᆸ" }, // 'ᆲ(ㄹㅂ)' → 'ᆯᆸ'
          { p: /\u11b3/g, r: "ᆯᆺ" }, // 'ᆳ(ㄹㅅ)' → 'ᆯᆺ'
          { p: /\u11b4/g, r: "ᆯᇀ" }, // 'ᆴ(ㄹㅌ)' → 'ᆯᇀ'
          { p: /\u11b5/g, r: "ᆯᇁ" }, // 'ᆵ(ㄹㅍ)' → 'ᆯᇁ'
          { p: /\u11b6/g, r: "ᆯᇂ" }, // 'ᆶ(ㄹㅎ)' → 'ᆯᇂ'
          { p: /\u11b9/g, r: "ᆸᆺ" }, // 'ᆹ(ㅂㅅ)' → 'ᆸᆺ'
        
          // ==============================
          // 6. 경음화/축약 등 특수 규칙
          // ==============================
        
          { p: /\u11ae\u110b\u1175/g, r: "지" }, // 'ᆮ' + 'ᄋ' + 'ᅵ' → '지'
          { p: /\u11c0\u110b\u1175/g, r: "치" }, // 'ᇀ' + 'ᄋ' + 'ᅵ' → '치'

        
          // ==============================
          // 7. 받침 탈락 또는 이음자 제거
          // ==============================
        
          { p: /\u11a8\u110b/g, r: "ᄀ" }, // 'ᆨ' + 'ᄋ' → 'ᄀ'
          { p: /\u11a9\u110b/g, r: "ᄁ" }, // 'ᆩ' + 'ᄋ' → 'ᄁ'
          { p: /\u11ae\u110b/g, r: "ᄃ" }, // 'ᆮ' + 'ᄋ' → 'ᄃ'
          { p: /\u11af\u110b/g, r: "ᄅ" }, // 'ᆯ' + 'ᄋ' → 'ᄅ'
          { p: /\u11b8\u110b/g, r: "ᄇ" }, // 'ᆸ' + 'ᄋ' → 'ᄇ'
          { p: /\u11ba\u110b/g, r: "ᄉ" }, // 'ᆺ' + 'ᄋ' → 'ᄉ'
          { p: /\u11bb\u110b/g, r: "ᄊ" }, // 'ᆻ' + 'ᄋ' → 'ᄊ'
          { p: /\u11bd\u110b/g, r: "ᄌ" }, // 'ᆽ' + 'ᄋ' → 'ᄌ'
          { p: /\u11be\u110b/g, r: "ᄎ" }, // 'ᆾ' + 'ᄋ' → 'ᄎ'
          { p: /\u11c2\u110b/g, r: "" },  // 'ᇂ' + 'ᄋ' → 제거
        
          // ==============================
          // 8. 격음화 (종성 + ㅎ/히읗)
          // ==============================
        
          { p: /\u11c2\u1100|\u11a8\u1112/g, r: "ᄏ" }, // 'ᇂ'+'ᄀ' 또는 'ᆨ'+'ᄒ' → 'ᄏ'
          { p: /\u11c2\u1103|\u11ae\u1112/g, r: "ᄐ" }, // 'ᇂ'+'ᄃ' 또는 'ᆮ'+'ᄒ' → 'ᄐ'
          { p: /\u11c2\u110c|\u11bd\u1112/g, r: "ᄎ" }, // 'ᇂ'+'ᄌ' 또는 'ᆽ'+'ᄒ' → 'ᄎ'
          { p: /\u11c2\u1107/g, r: "ᄇ" },               // 'ᇂ'+'ᄇ' → 'ᄇ'
          { p: /\u11b8\u1112/g, r: "ᄑ" },               // 'ᆸ'+'ᄒ' → 'ᄑ'
        
          // ==============================
          // 9. 특수 처리 및 최종 정리
          // ==============================
        
          { p: /\u11af\u1105/g, r: "ll" }, // 'ᆯ' + 'ᄅ' → ll
          { p: /\u11c2(?!\s|$)/g, r: "" }, // 'ᇂ' (종성) 단독 → 제거
          { p: /([\u11a8-\u11c2])([\u11a8-\u11c2])/g, r: "$1" } // 이중 종성 제거
        ];
        
      for (const { p, r } of replaceArr) {
        jamoStr = jamoStr.replace(p, r);
      }
      return jamoStr;
    }
    
    function applyRomanMapping(jamoStr) {
      const map = {
        'ᄀ': 'g', 'ᄁ': 'kk', 'ᄂ': 'n', 'ᄃ': 'd', 'ᄄ': 'tt',
        'ᄅ': 'r', 'ᄆ': 'm', 'ᄇ': 'b', 'ᄈ': 'pp', 'ᄉ': 's', 'ᄊ': 'ss',
        'ᄋ': '', 'ᄌ': 'j', 'ᄍ': 'jj', 'ᄎ': 'ch', 'ᄏ': 'k',
        'ᄐ': 't', 'ᄑ': 'p', 'ᄒ': 'h',
    
        'ᅡ': 'a', 'ᅢ': 'ae', 'ᅣ': 'ya', 'ᅤ': 'yae', 'ᅥ': 'eo', 'ᅦ': 'e',
        'ᅧ': 'yeo', 'ᅨ': 'ye', 'ᅩ': 'o', 'ᅪ': 'wa', 'ᅫ': 'wae',
        'ᅬ': 'oe', 'ᅭ': 'yo', 'ᅮ': 'u', 'ᅯ': 'wo', 'ᅰ': 'we',
        'ᅱ': 'wi', 'ᅲ': 'yu', 'ᅳ': 'eu', 'ᅴ': 'ui', 'ᅵ': 'i',
    
        'ᆨ': 'k', 'ᆩ': 'k', 'ᆪ': 'k', 'ᆫ': 'n', 'ᆬ': 'n', 'ᆭ': 'n', 'ᆮ': 'd',
        'ᆯ': 'l', 'ᆰ': 'k', 'ᆱ': 'm', 'ᆲ': 'p', 'ᆳ': 't', 'ᆴ': 't', 'ᆵ': 'p', 'ᆶ': 'h',
        'ᆷ': 'm', 'ᆸ': 'p', 'ᆹ': 'p', 'ᆺ': 't', 'ᆻ': 't', 'ᆼ': 'ng',
        'ᆽ': 't', 'ᆾ': 't', 'ᆿ': 'k', 'ᇀ': 't', 'ᇁ': 'p', 'ᇂ': 'h'
      };
      return [...jamoStr].map(ch => map[ch] ?? ch).join('');
    }
    
    function romanize(str, { usePronunciationRules = true, casingOption = "lowercase" } = {}) {
      const { jamoString } = splitHangulToJamos(str);
      const replaced = usePronunciationRules ? applyPronunciationRules(jamoString) : jamoString;
      const romanized = applyRomanMapping(replaced);
      return formatRoman(romanized, casingOption);
    }

  exports.applyPronunciationRules = applyPronunciationRules;
  exports.applyRomanMapping = applyRomanMapping;
  exports.composeJamos = composeJamos;
  exports.formatRoman = formatRoman;
  exports.romanize = romanize;
  exports.splitHangulToJamos = splitHangulToJamos;

  return exports;

})({});
