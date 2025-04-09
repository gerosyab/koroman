// @name: Koroman.java
// @project: Koroman
// @author: Donghe Youn (Daissue)
// @date: 2025-04-02
// @description: This code provides functions to decompose Hangul syllables into their constituent jamo (consonants and vowels), recompose them, and convert them into Romanized forms. It includes pronunciation rules for accurate Romanization and allows for different casing options.
// @license: MIT License
// @version: 1.0.0
// @dependencies: None
// @usage: This code can be used in any JavaScript environment (Node.js, browser) to romanize Korean text. It provides functions for splitting Hangul into jamo, recomposing them, and converting them to Romanized forms with various options for pronunciation rules and casing.
// 자모 분해 및 조합 + 로마자 변환 (초성/중성/종성 실제 유니코드 문자 사용 버전)

package app.daissue.koroman;

import java.util.HashMap;
import java.util.Map;

public class Koroman {

    private static final char HANGUL_BASE = 0xAC00;
    private static final char HANGUL_END = 0xD7A3;

    public enum CasingOption {
        LOWERCASE,
        UPPERCASE,
        CAPITALIZE_WORD,
        CAPITALIZE_LINE
    }

    private static final String[] CHO = {
        "ᄀ", "ᄁ", "ᄂ", "ᄃ", "ᄄ", "ᄅ", "ᄆ", "ᄇ", "ᄈ", "ᄉ",
        "ᄊ", "ᄋ", "ᄌ", "ᄍ", "ᄎ", "ᄏ", "ᄐ", "ᄑ", "ᄒ"
    };

    private static final String[] JUNG = {
        "ᅡ", "ᅢ", "ᅣ", "ᅤ", "ᅥ", "ᅦ", "ᅧ", "ᅨ", "ᅩ", "ᅪ", "ᅫ",
        "ᅬ", "ᅭ", "ᅮ", "ᅯ", "ᅰ", "ᅱ", "ᅲ", "ᅳ", "ᅴ", "ᅵ"
    };

    private static final String[] JONG = {
        "", "ᆨ", "ᆩ", "ᆪ", "ᆫ", "ᆬ", "ᆭ", "ᆮ", "ᆯ", "ᆰ", "ᆱ", "ᆲ",
        "ᆳ", "ᆴ", "ᆵ", "ᆶ", "ᆷ", "ᆸ", "ᆹ", "ᆺ", "ᆻ", "ᆼ", "ᆽ", "ᆾ",
        "ᆿ", "ᇀ", "ᇁ", "ᇂ"
    };

    private static final Map<String, String> ROMAN_MAP = new HashMap<>() {{
        put("ᄀ", "g"); put("ᄁ", "kk"); put("ᄂ", "n"); put("ᄃ", "d"); put("ᄄ", "tt");
        put("ᄅ", "r"); put("ᄆ", "m"); put("ᄇ", "b"); put("ᄈ", "pp"); put("ᄉ", "s"); put("ᄊ", "ss");
        put("ᄋ", ""); put("ᄌ", "j"); put("ᄍ", "jj"); put("ᄎ", "ch"); put("ᄏ", "k");
        put("ᄐ", "t"); put("ᄑ", "p"); put("ᄒ", "h");

        put("ᅡ", "a"); put("ᅢ", "ae"); put("ᅣ", "ya"); put("ᅤ", "yae"); put("ᅥ", "eo"); put("ᅦ", "e");
        put("ᅧ", "yeo"); put("ᅨ", "ye"); put("ᅩ", "o"); put("ᅪ", "wa"); put("ᅫ", "wae");
        put("ᅬ", "oe"); put("ᅭ", "yo"); put("ᅮ", "u"); put("ᅯ", "wo"); put("ᅰ", "we");
        put("ᅱ", "wi"); put("ᅲ", "yu"); put("ᅳ", "eu"); put("ᅴ", "ui"); put("ᅵ", "i");

        put("ᆨ", "k"); put("ᆩ", "k"); put("ᆪ", "k"); put("ᆫ", "n"); put("ᆬ", "n"); put("ᆭ", "n");
        put("ᆮ", "t"); put("ᆯ", "l"); put("ᆰ", "k"); put("ᆱ", "m"); put("ᆲ", "p"); put("ᆳ", "t");
        put("ᆴ", "t"); put("ᆵ", "p"); put("ᆶ", "h"); put("ᆷ", "m"); put("ᆸ", "p"); put("ᆹ", "p");
        put("ᆺ", "t"); put("ᆻ", "t"); put("ᆼ", "ng"); put("ᆽ", "t"); put("ᆾ", "t"); put("ᆿ", "k");
        put("ᇀ", "t"); put("ᇁ", "p"); put("ᇂ", "h");
    }};

    private static String capitalizeWords(String input) {
        StringBuilder result = new StringBuilder();
        boolean capitalizeNext = true;
        
        for (char c : input.toCharArray()) {
            if (Character.isWhitespace(c)) {
                capitalizeNext = true;
                result.append(c);
            } else {
                if (capitalizeNext) {
                    result.append(Character.toUpperCase(c));
                    capitalizeNext = false;
                } else {
                    result.append(Character.toLowerCase(c));
                }
            }
        }
        return result.toString();
    }

    private static String capitalizeLines(String input) {
        StringBuilder result = new StringBuilder();
        boolean capitalizeNext = true;
        
        for (char c : input.toCharArray()) {
            if (c == '\n') {
                capitalizeNext = true;
                result.append(c);
            } else {
                if (capitalizeNext) {
                    result.append(Character.toUpperCase(c));
                    capitalizeNext = false;
                } else {
                    result.append(Character.toLowerCase(c));
                }
            }
        }
        return result.toString();
    }

    private static String applyPronunciationRules(String jamoStr) {
        // 발음 규칙 패턴과 대체 문자열 정의
        String[][] replaceArr = {
            // ==============================
            // 1. 무효화 처리
            // ==============================
            
            { "\u11a7", "" }, // 'ᆧ'(U+11A7) → 제거 (사용되지 않는 종성)
            
            // ==============================
            // 2. 비음화 (ㄴ, ㅁ, ㅇ)
            // ==============================
            
            { "[\u11b8\u11c1\u11b9\u11b2\u11b5](?=[\u1102\u1106])", "\u11b7" },
            // 종성 'ᆸ(ㅂ)' 'ᇁ(ㅍ)' 'ᆹ(ㅂㅅ)' 'ᆲ(ㄹㅂ)' 'ᆵ(ㄹㅍ)' + 다음 초성 'ᄂ(ㄴ)' or 'ᄆ(ㅁ)' → 'ᆷ'
            
            { "[\u11ae\u11c0\u11bd\u11be\u11ba\u11bb\u11c2](?=[\u1102\u1106])", "\u11ab" },
            // 종성 'ᆮ(ㄷ)' 'ᇀ(ㅌ)' 'ᆽ(ㅈ)' 'ᆾ(ㅊ)' 'ᆺ(ㅅ)' 'ᆻ(ㅆ)' 'ᇂ(ㅎ)' + 다음 초성 'ᄂ(ㄴ)' or 'ᄆ(ㅁ)' → 'ᆫ'
            
            { "[\u11a8\u11a9\u11bf\u11aa\u11b0](?=[\u1102\u1106])", "\u11bc" },
            // 종성 'ᆨ(ㄱ)' 'ᆩ(ㄲ)' 'ᆿ(ㅋ)' 'ᆪ(ㄱㅅ)' 'ᆰ(ㄹㄱ)' + 다음 초성 'ᄂ'/'ᄆ' → 'ᆼ'
            
            // ==============================
            // 3. 연음/연철
            // ==============================
            
            { "\u11a8\u110b(?=[\u1163\u1164\u1167\u1168\u116d\u1172])", "\u11bc\u1102" },
            // 'ᆨ' + 'ᄋ' + 중성 'ㅑㅒㅕㅖㅛㅠ' → 'ᆼᄂ' (연음화)
            
            { "\u11af\u110b(?=[\u1163\u1164\u1167\u1168\u116d\u1172])", "\u11af\u1105" },
            // 'ᆯ' + 'ᄋ' + 중성 위와 같음 → 'ᆯᄅ'
            
            { "[\u11a8\u11bc]\u1105", "\u11bc\u1102" },
            // 'ᆨ(ㄱ)', 'ᆼ(ㅇ)' + 'ᄅ(ㄹ)' → 'ᆼᄂ'
            
            { "\u11ab\u1105(?=\u1169)", "\u11ab\u1102" },
            // 'ᆫ(ㄴ)' + 'ᄅ' + 중성 'ㅗ' → 'ᆫᄂ'
            
            { "\u11af\u1102|\u11ab\u1105", "\u11af\u1105" },
            // 'ᆯ(ㄹ)' + 'ᄂ(ㄴ)', 'ᆫ(ㄴ)' + 'ᄅ(ㄹ)' → 'ᆯᄅ'
            
            { "[\u11b7\u11b8]\u1105", "\u11b7\u1102" },
            // 'ᆷ(ㅁ)', 'ᆸ(ㅂ)' + 'ᄅ' → 'ᆷᄂ'
            
            { "\u11b0\u1105", "\u11a8\u1105" },
            // 'ᆰ(ㄹㄱ)' + 'ᄅ' → 'ᆨᄅ'
            
            // ==============================
            // 4. 격음화 / 자음군 분해
            // ==============================
            
            { "\u11a8\u110f", "\u11a8-\u110f" }, // 'ᆨ' + 'ᄏ' → 'ᆨ-ᄏ'
            { "\u11b8\u1111", "\u11b8-\u1111" }, // 'ᆸ' + 'ᄑ' → 'ᆸ-ᄑ'
            { "\u11ae\u1110", "\u11ae-\u1110" }, // 'ᆮ' + 'ᄐ' → 'ᆮ-ᄐ'
            
            // ==============================
            // 5. 복합 종성 분해
            // ==============================
            
            { "\u11aa", "\u11a8\u11ba" }, // 'ᆪ(ㄱㅅ)' → 'ᆨᆺ'
            { "\u11ac", "\u11ab\u11bd" }, // 'ᆬ(ㄴㅈ)' → 'ᆫᆽ'
            { "\u11ad", "\u11ab\u11c2" }, // 'ᆭ(ㄴㅎ)' → 'ᆫᇂ'
            { "\u11b0", "\u11af\u11a8" }, // 'ᆰ(ㄹㄱ)' → 'ᆯᆨ'
            { "\u11b1", "\u11af\u11b7" }, // 'ᆱ(ㄹㅁ)' → 'ᆯᆷ'
            { "\u11b2", "\u11af\u11b8" }, // 'ᆲ(ㄹㅂ)' → 'ᆯᆸ'
            { "\u11b3", "\u11af\u11ba" }, // 'ᆳ(ㄹㅅ)' → 'ᆯᆺ'
            { "\u11b4", "\u11af\u11c0" }, // 'ᆴ(ㄹㅌ)' → 'ᆯᇀ'
            { "\u11b5", "\u11af\u11c1" }, // 'ᆵ(ㄹㅍ)' → 'ᆯᇁ'
            { "\u11b6", "\u11af\u11c2" }, // 'ᆶ(ㄹㅎ)' → 'ᆯᇂ'
            { "\u11b9", "\u11b8\u11ba" }, // 'ᆹ(ㅂㅅ)' → 'ᆸᆺ'
            
            // ==============================
            // 6. 경음화/축약 등 특수 규칙
            // ==============================
            
            { "\u11ae\u110b\u1175", "지" }, // 'ᆮ' + 'ᄋ' + 'ᅵ' → '지'
            { "\u11c0\u110b\u1175", "치" }, // 'ᇀ' + 'ᄋ' + 'ᅵ' → '치'
            
            // ==============================
            // 7. 받침 탈락 또는 이음자 제거
            // ==============================
            
            { "\u11a8\u110b", "\u1100" }, // 'ᆨ' + 'ᄋ' → 'ᄀ'
            { "\u11a9\u110b", "\u1101" }, // 'ᆩ' + 'ᄋ' → 'ᄁ'
            { "\u11ae\u110b", "\u1103" }, // 'ᆮ' + 'ᄋ' → 'ᄃ'
            { "\u11af\u110b", "\u1105" }, // 'ᆯ' + 'ᄋ' → 'ᄅ'
            { "\u11b8\u110b", "\u1107" }, // 'ᆸ' + 'ᄋ' → 'ᄇ'
            { "\u11ba\u110b", "\u1109" }, // 'ᆺ' + 'ᄋ' → 'ᄉ'
            { "\u11bb\u110b", "\u110a" }, // 'ᆻ' + 'ᄋ' → 'ᄊ'
            { "\u11bd\u110b", "\u110c" }, // 'ᆽ' + 'ᄋ' → 'ᄌ'
            { "\u11be\u110b", "\u110e" }, // 'ᆾ' + 'ᄋ' → 'ᄎ'
            { "\u11c2\u110b", "" },       // 'ᇂ' + 'ᄋ' → 제거
            
            // ==============================
            // 8. 격음화 (종성 + ㅎ/히읗)
            // ==============================
            
            { "\u11c2\u1100|\u11a8\u1112", "\u110f" }, // 'ᇂ'+'ᄀ' 또는 'ᆨ'+'ᄒ' → 'ᄏ'
            { "\u11c2\u1103|\u11ae\u1112", "\u1110" }, // 'ᇂ'+'ᄃ' 또는 'ᆮ'+'ᄒ' → 'ᄐ'
            { "\u11c2\u110c|\u11bd\u1112", "\u110e" }, // 'ᇂ'+'ᄌ' 또는 'ᆽ'+'ᄒ' → 'ᄎ'
            { "\u11c2\u1107", "\u1107" },              // 'ᇂ'+'ᄇ' → 'ᄇ'
            { "\u11b8\u1112", "\u1111" },              // 'ᆸ'+'ᄒ' → 'ᄑ'
            
            // ==============================
            // 9. 특수 처리 및 최종 정리
            // ==============================
            
            { "\u11af\u1105", "ll" },                  // 'ᆯ' + 'ᄅ' → ll
            { "\u11c2(?!\\s|$)", "" },                 // 'ᇂ' (종성) 단독 → 제거
            { "([\u11a8-\u11c2])([\u11a8-\u11c2])", "$1" } // 이중 종성 제거
        };

        // 모든 규칙 적용
        for (String[] rule : replaceArr) {
            jamoStr = jamoStr.replaceAll(rule[0], rule[1]);
        }

        return jamoStr;
    } 

    public static String romanize(String text, Map<String, Object> options) {
        boolean usePronunciationRules = (boolean) options.getOrDefault("usePronunciationRules", true);
        String casingOption = (String) options.getOrDefault("casingOption", "lowercase");
        
        String jamoStr = splitHangulToJamos(text);
        if (usePronunciationRules) {
            jamoStr = applyPronunciationRules(jamoStr);
        }
        String result = convertJamosToRoman(jamoStr);
        
        switch (casingOption) {
            case "uppercase":
                return result.toUpperCase();
            case "capitalize-word":
                return capitalizeWords(result);
            case "capitalize-line":
                return capitalizeLines(result);
            default:  // lowercase
                return result.toLowerCase();
        }
    }

    // For backward compatibility
    public static String romanize(String text) {
        return romanize(text, new HashMap<>());
    }

    public static String romanize(String text, boolean usePronunciationRules, String casingOption) {
        Map<String, Object> options = new HashMap<>();
        options.put("usePronunciationRules", usePronunciationRules);
        options.put("casingOption", casingOption);
        return romanize(text, options);
    }
} 
