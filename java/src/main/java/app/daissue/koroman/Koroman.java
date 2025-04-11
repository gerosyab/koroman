// @name: Koroman.java
// @project: Koroman
// @author: Donghe Youn (Daissue)
// @date: 2025-04-02
// @description: This code provides functions to decompose Hangul syllables into their constituent jamo (consonants and vowels), recompose them, and convert them into Romanized forms. It includes pronunciation rules for accurate Romanization and allows for different casing options.
// @license: MIT License
// @version: 1.0.12
// @dependencies: None
// @usage: This code can be used in any JavaScript environment (Node.js, browser) to romanize Korean text. It provides functions for splitting Hangul into jamo, recomposing them, and converting them to Romanized forms with various options for pronunciation rules and casing.
// 자모 분해 및 조합 + 로마자 변환 (초성/중성/종성 실제 유니코드 문자 사용 버전)

package app.daissue.koroman;

import java.util.HashMap;
import java.util.Map;
import java.util.LinkedHashMap;
import java.util.regex.Pattern;

public class Koroman {

    private static final char HANGUL_BASE = 0xAC00;
    private static final char HANGUL_END = 0xD7A3;

    public enum CasingOption {
        LOWERCASE,
        UPPERCASE,
        CAPITALIZE_WORDS,
        CAPITALIZE_LINES
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

    public static final Map<String, String> ROMAN_MAP = new HashMap<String, String>() {{
        // 초성
        put("ᄀ", "g"); put("ᄁ", "kk"); put("ᄂ", "n"); put("ᄃ", "d"); put("ᄄ", "tt");
        put("ᄅ", "r"); put("ᄆ", "m"); put("ᄇ", "b"); put("ᄈ", "pp"); put("ᄉ", "s"); put("ᄊ", "ss");
        put("ᄋ", ""); put("ᄌ", "j"); put("ᄍ", "jj"); put("ᄎ", "ch"); put("ᄏ", "k");
        put("ᄐ", "t"); put("ᄑ", "p"); put("ᄒ", "h");

        // 중성
        put("ᅡ", "a"); put("ᅢ", "ae"); put("ᅣ", "ya"); put("ᅤ", "yae"); put("ᅥ", "eo"); put("ᅦ", "e");
        put("ᅧ", "yeo"); put("ᅨ", "ye"); put("ᅩ", "o"); put("ᅪ", "wa"); put("ᅫ", "wae");
        put("ᅬ", "oe"); put("ᅭ", "yo"); put("ᅮ", "u"); put("ᅯ", "wo"); put("ᅰ", "we");
        put("ᅱ", "wi"); put("ᅲ", "yu"); put("ᅳ", "eu"); put("ᅴ", "ui"); put("ᅵ", "i");

        // 종성
        put("ᆨ", "k"); put("ᆩ", "k"); put("ᆪ", "k"); put("ᆫ", "n"); put("ᆬ", "n"); put("ᆭ", "n"); put("ᆮ", "d");
        put("ᆯ", "l"); put("ᆰ", "k"); put("ᆱ", "m"); put("ᆲ", "p"); put("ᆳ", "t"); put("ᆴ", "t"); put("ᆵ", "p"); put("ᆶ", "h");
        put("ᆷ", "m"); put("ᆸ", "p"); put("ᆹ", "p"); put("ᆺ", "t"); put("ᆻ", "t"); put("ᆼ", "ng");
        put("ᆽ", "t"); put("ᆾ", "t"); put("ᆿ", "k"); put("ᇀ", "t"); put("ᇁ", "p"); put("ᇂ", "h");
    }};

    public static final Map<Pattern, String> PRONUNCIATION_RULES = new LinkedHashMap<Pattern, String>() {{
        put(Pattern.compile("\u11a7"), "");  // 1. 무효화 처리
        put(Pattern.compile("[\u11b8\u11c1\u11b9\u11b2\u11b5](?=[\u1102\u1106])"), "\u11b7");  // 2. 비음화
        put(Pattern.compile("[\u11ae\u11c0\u11bd\u11be\u11ba\u11bb\u11c2](?=[\u1102\u1106])"), "\u11ab");  // 3. 비음화
        put(Pattern.compile("[\u11a8\u11a9\u11bf\u11aa\u11b0](?=[\u1102\u1106])"), "\u11bc");  // 4. 비음화
        put(Pattern.compile("\u11a8\u110b(?=[\u1163\u1164\u1167\u1168\u116d\u1172])"), "\u11bc\u1102");  // 5. 연음
        put(Pattern.compile("\u11af\u110b(?=[\u1163\u1164\u1167\u1168\u116d\u1172])"), "\u11af\u1105");  // 6. 연음
        put(Pattern.compile("[\u11a8\u11bc]\u1105"), "\u11bc\u1102");  // 7. 연음
        put(Pattern.compile("\u11ab\u1105(?=\u1169)"), "\u11ab\u1102");  // 8. 연음
        put(Pattern.compile("\u11af\u1102|\u11ab\u1105"), "\u11af\u1105");  // 9. 연음
        put(Pattern.compile("[\u11b7\u11b8]\u1105"), "\u11b7\u1102");  // 10. 연음
        put(Pattern.compile("\u11b0\u1105"), "\u11a8\u1105");  // 11. 연음
        put(Pattern.compile("\u11a8\u110f"), "\u11a8-\u110f");  // 12. 격음화
        put(Pattern.compile("\u11b8\u1111"), "\u11b8-\u1111");  // 13. 격음화
        put(Pattern.compile("\u11ae\u1110"), "\u11ae-\u1110");  // 14. 격음화
        put(Pattern.compile("\u11aa"), "\u11a8\u11ba");  // 15. 복합 종성
        put(Pattern.compile("\u11ac"), "\u11ab\u11bd");  // 16. 복합 종성
        put(Pattern.compile("\u11ad"), "\u11ab\u11c2");  // 17. 복합 종성
        put(Pattern.compile("\u11b0"), "\u11af\u11a8");  // 18. 복합 종성
        put(Pattern.compile("\u11b1"), "\u11af\u11b7");  // 19. 복합 종성
        put(Pattern.compile("\u11b2"), "\u11af\u11b8");  // 20. 복합 종성
        put(Pattern.compile("\u11b3"), "\u11af\u11ba");  // 21. 복합 종성
        put(Pattern.compile("\u11b4"), "\u11af\u11c0");  // 22. 복합 종성
        put(Pattern.compile("\u11b5"), "\u11af\u11c1");  // 23. 복합 종성
        put(Pattern.compile("\u11b6"), "\u11af\u11c2");  // 24. 복합 종성
        put(Pattern.compile("\u11b9"), "\u11b8\u11ba");  // 25. 복합 종성
        put(Pattern.compile("\u11ae\u110b\u1175"), "\u110c\u1175");  // 26. '굳이' → '구지'
        put(Pattern.compile("\u11c0\u110b\u1175"), "\u110e\u1175");  // 27. '같이' → '가치'
        put(Pattern.compile("\u11a8\u110b"), "\u1100");  // 28. 받침 탈락
        put(Pattern.compile("\u11a9\u110b"), "\u1101");  // 29. 받침 탈락
        put(Pattern.compile("\u11ae\u110b"), "\u1103");  // 30. 받침 탈락
        put(Pattern.compile("\u11af\u110b"), "\u1105");  // 31. 받침 탈락
        put(Pattern.compile("\u11b8\u110b"), "\u1107");  // 32. 받침 탈락
        put(Pattern.compile("\u11ba\u110b"), "\u1109");  // 33. 받침 탈락
        put(Pattern.compile("\u11bb\u110b"), "\u110a");  // 34. 받침 탈락
        put(Pattern.compile("\u11bd\u110b"), "\u110c");  // 35. 받침 탈락
        put(Pattern.compile("\u11be\u110b"), "\u110e");  // 36. 받침 탈락
        put(Pattern.compile("\u11c2\u110b"), "");  // 37. 받침 탈락
        put(Pattern.compile("\u11c2\u1100|\u11a8\u1112"), "\u110f");  // 38. 격음화
        put(Pattern.compile("\u11c2\u1103|\u11ae\u1112"), "\u1110");  // 39. 격음화
        put(Pattern.compile("\u11c2\u110c|\u11bd\u1112"), "\u110e");  // 40. 격음화
        put(Pattern.compile("\u11c2\u1107"), "\u1107");  // 41. 격음화
        put(Pattern.compile("\u11b8\u1112"), "\u1111");  // 42. 격음화
        put(Pattern.compile("\u11af\u1105"), "ll");  // 43. 특수 처리
        put(Pattern.compile("\u11c2(?!\\s|$)"), "");  // 44. 특수 처리
    }};

    public static String applyPronunciationRules(String jamoStr) {
        String result = jamoStr;
        System.out.println("Input: " + toUnicodeString(jamoStr));  // Debug log
        for (Map.Entry<Pattern, String> rule : PRONUNCIATION_RULES.entrySet()) {
            String before = result;
            result = rule.getKey().matcher(result).replaceAll(rule.getValue());
            if (!before.equals(result) && rule.getKey().pattern().contains("\\u11ae\\u110b\\u1175")) {
                System.out.println("굳이 rule applied:");
                System.out.println("Before: " + toUnicodeString(before));
                System.out.println("After: " + toUnicodeString(result));
            }
        }
        return result;
    }

    public static String romanize(String text) {
        return romanize(text, true, CasingOption.LOWERCASE);
    }

    public static String romanize(String text, boolean usePronunciationRules) {
        return romanize(text, usePronunciationRules, CasingOption.LOWERCASE);
    }

    public static String romanize(String text, CasingOption casingOption) {
        return romanize(text, true, casingOption);
    }

    public static String romanize(String text, boolean usePronunciationRules, CasingOption casingOption) {
        if (text == null || text.isEmpty()) {
            return text;
        }

        String jamoStr = splitHangulToJamos(text);
        System.out.println("Original jamo: " + toUnicodeString(jamoStr));  // Debug log
        
        if (usePronunciationRules) {
            String beforeRules = jamoStr;
            jamoStr = applyPronunciationRules(jamoStr);
            System.out.println("Before rules: " + toUnicodeString(beforeRules));  // Debug log
            System.out.println("After rules: " + toUnicodeString(jamoStr));  // Debug log
        }
        
        String result = convertJamosToRoman(jamoStr);
        return applyCasing(result, casingOption);
    }

    public static String splitHangulToJamos(String text) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (c >= HANGUL_BASE && c <= HANGUL_END) {
                int base = c - HANGUL_BASE;
                int jong = base % 28;
                int jung = ((base - jong) / 28) % 21;
                int cho = ((base - jong) / 28 - jung) / 21;

                result.append((char) (0x1100 + cho));
                result.append((char) (0x1161 + jung));
                if (jong > 0) {
                    result.append((char) (0x11A7 + jong));
                }
            } else {
                result.append(c);
            }
        }
        return result.toString();
    }

    public static String convertJamosToRoman(String text) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < text.length(); i++) {
            String c = String.valueOf(text.charAt(i));
            result.append(ROMAN_MAP.getOrDefault(c, c));
        }
        return result.toString();
    }

    public static String applyCasing(String text, CasingOption option) {
        switch (option) {
            case UPPERCASE:
                return text.toUpperCase();
            case CAPITALIZE_WORDS:
                String[] words = text.split("\\s+");
                for (int i = 0; i < words.length; i++) {
                    if (!words[i].isEmpty()) {
                        words[i] = words[i].substring(0, 1).toUpperCase() + words[i].substring(1).toLowerCase();
                    }
                }
                return String.join(" ", words);
            case CAPITALIZE_LINES:
                String[] lines = text.split("\n");
                for (int i = 0; i < lines.length; i++) {
                    if (!lines[i].isEmpty()) {
                        lines[i] = lines[i].substring(0, 1).toUpperCase() + lines[i].substring(1).toLowerCase();
                    }
                }
                return String.join("\n", lines);
            default:
                return text.toLowerCase();
        }
    }

    public static String toUnicodeString(String str) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < str.length(); i++) {
            char c = str.charAt(i);
            if (c >= 0x1100 && c <= 0x11FF) {  // Hangul Jamo range
                sb.append(String.format("\\u%04x", (int)c));
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }
} 
