import re

HANGUL_BASE = 0xAC00
HANGUL_END = 0xD7A3

CHO = [
    "ᄀ", "ᄁ", "ᄂ", "ᄃ", "ᄄ", "ᄅ", "ᄆ", "ᄇ", "ᄈ", "ᄉ",
    "ᄊ", "ᄋ", "ᄌ", "ᄍ", "ᄎ", "ᄏ", "ᄐ", "ᄑ", "ᄒ"
]

JUNG = [
    "ᅡ", "ᅢ", "ᅣ", "ᅤ", "ᅥ", "ᅦ", "ᅧ", "ᅨ", "ᅩ", "ᅪ", "ᅫ",
    "ᅬ", "ᅭ", "ᅮ", "ᅯ", "ᅰ", "ᅱ", "ᅲ", "ᅳ", "ᅴ", "ᅵ"
]

JONG = [
    "", "ᆨ", "ᆩ", "ᆪ", "ᆫ", "ᆬ", "ᆭ", "ᆮ", "ᆯ", "ᆰ", "ᆱ", "ᆲ",
    "ᆳ", "ᆴ", "ᆵ", "ᆶ", "ᆷ", "ᆸ", "ᆹ", "ᆺ", "ᆻ", "ᆼ", "ᆽ", "ᆾ",
    "ᆿ", "ᇀ", "ᇁ", "ᇂ"
]

ROMAN_MAP = {
    "ᄀ": "g", "ᄁ": "kk", "ᄂ": "n", "ᄃ": "d", "ᄄ": "tt",
    "ᄅ": "r", "ᄆ": "m", "ᄇ": "b", "ᄈ": "pp", "ᄉ": "s", "ᄊ": "ss",
    "ᄋ": "", "ᄌ": "j", "ᄍ": "jj", "ᄎ": "ch", "ᄏ": "k",
    "ᄐ": "t", "ᄑ": "p", "ᄒ": "h",

    "ᅡ": "a", "ᅢ": "ae", "ᅣ": "ya", "ᅤ": "yae", "ᅥ": "eo", "ᅦ": "e",
    "ᅧ": "yeo", "ᅨ": "ye", "ᅩ": "o", "ᅪ": "wa", "ᅫ": "wae",
    "ᅬ": "oe", "ᅭ": "yo", "ᅮ": "u", "ᅯ": "wo", "ᅰ": "we",
    "ᅱ": "wi", "ᅲ": "yu", "ᅳ": "eu", "ᅴ": "ui", "ᅵ": "i",

    "ᆨ": "k", "ᆩ": "k", "ᆪ": "k", "ᆫ": "n", "ᆬ": "n", "ᆭ": "n", "ᆮ": "d",
    "ᆯ": "l", "ᆰ": "k", "ᆱ": "m", "ᆲ": "p", "ᆳ": "t", "ᆴ": "t", "ᆵ": "p", "ᆶ": "h",
    "ᆷ": "m", "ᆸ": "p", "ᆹ": "p", "ᆺ": "t", "ᆻ": "t", "ᆼ": "ng",
    "ᆽ": "t", "ᆾ": "t", "ᆿ": "k", "ᇀ": "t", "ᇁ": "p", "ᇂ": "h"
}

def apply_pronunciation_rules(jamo_str):
    # ==============================
    # 1. 무효화 처리
    # ==============================
    rules = [
        (r"\u11a7", ""),  # 'ᆧ'(U+11A7) → 제거 (사용되지 않는 종성)
        
        # ==============================
        # 2. 비음화 (ㄴ, ㅁ, ㅇ)
        # ==============================
        (r"[\u11b8\u11c1\u11b9\u11b2\u11b5](?=[\u1102\u1106])", "\u11b7"),
        # 종성 'ᆸ(ㅂ)' 'ᇁ(ㅍ)' 'ᆹ(ㅂㅅ)' 'ᆲ(ㄹㅂ)' 'ᆵ(ㄹㅍ)' + 다음 초성 'ᄂ(ㄴ)' or 'ᄆ(ㅁ)' → 'ᆷ'
        
        (r"[\u11ae\u11c0\u11bd\u11be\u11ba\u11bb\u11c2](?=[\u1102\u1106])", "\u11ab"),
        # 종성 'ᆮ(ㄷ)' 'ᇀ(ㅌ)' 'ᆽ(ㅈ)' 'ᆾ(ㅊ)' 'ᆺ(ㅅ)' 'ᆻ(ㅆ)' 'ᇂ(ㅎ)' + 다음 초성 'ᄂ(ㄴ)' or 'ᄆ(ㅁ)' → 'ᆫ'
        
        (r"[\u11a8\u11a9\u11bf\u11aa\u11b0](?=[\u1102\u1106])", "\u11bc"),
        # 종성 'ᆨ(ㄱ)' 'ᆩ(ㄲ)' 'ᆿ(ㅋ)' 'ᆪ(ㄱㅅ)' 'ᆰ(ㄹㄱ)' + 다음 초성 'ᄂ'/'ᄆ' → 'ᆼ'
        
        # ==============================
        # 3. 연음/연철
        # ==============================
        (r"\u11a8\u110b(?=[\u1163\u1164\u1167\u1168\u116d\u1172])", "\u11bc\u1102"),
        # 'ᆨ' + 'ᄋ' + 중성 'ㅑㅒㅕㅖㅛㅠ' → 'ᆼᄂ' (연음화)
        
        (r"\u11af\u110b(?=[\u1163\u1164\u1167\u1168\u116d\u1172])", "\u11af\u1105"),
        # 'ᆯ' + 'ᄋ' + 중성 위와 같음 → 'ᆯᄅ'
        
        (r"[\u11a8\u11bc]\u1105", "\u11bc\u1102"),
        # 'ᆨ(ㄱ)', 'ᆼ(ㅇ)' + 'ᄅ(ㄹ)' → 'ᆼᄂ'
        
        (r"\u11ab\u1105(?=\u1169)", "\u11ab\u1102"),
        # 'ᆫ(ㄴ)' + 'ᄅ' + 중성 'ㅗ' → 'ᆫᄂ'
        
        (r"\u11af\u1102|\u11ab\u1105", "\u11af\u1105"),
        # 'ᆯ(ㄹ)' + 'ᄂ(ㄴ)', 'ᆫ(ㄴ)' + 'ᄅ(ㄹ)' → 'ᆯᄅ'
        
        (r"[\u11b7\u11b8]\u1105", "\u11b7\u1102"),
        # 'ᆷ(ㅁ)', 'ᆸ(ㅂ)' + 'ᄅ' → 'ᆷᄂ'
        
        (r"\u11b0\u1105", "\u11a8\u1105"),
        # 'ᆰ(ㄹㄱ)' + 'ᄅ' → 'ᆨᄅ'
        
        # ==============================
        # 4. 격음화 / 자음군 분해
        # ==============================
        (r"\u11a8\u110f", "\u11a8-\u110f"),  # 'ᆨ' + 'ᄏ' → 'ᆨ-ᄏ'
        (r"\u11b8\u1111", "\u11b8-\u1111"),  # 'ᆸ' + 'ᄑ' → 'ᆸ-ᄑ'
        (r"\u11ae\u1110", "\u11ae-\u1110"),  # 'ᆮ' + 'ᄐ' → 'ᆮ-ᄐ'
        
        # ==============================
        # 5. 복합 종성 분해
        # ==============================
        (r"\u11aa", "\u11a8\u11ba"),  # 'ᆪ(ㄱㅅ)' → 'ᆨᆺ'
        (r"\u11ac", "\u11ab\u11bd"),  # 'ᆬ(ㄴㅈ)' → 'ᆫᆽ'
        (r"\u11ad", "\u11ab\u11c2"),  # 'ᆭ(ㄴㅎ)' → 'ᆫᇂ'
        (r"\u11b0", "\u11af\u11a8"),  # 'ᆰ(ㄹㄱ)' → 'ᆯᆨ'
        (r"\u11b1", "\u11af\u11b7"),  # 'ᆱ(ㄹㅁ)' → 'ᆯᆷ'
        (r"\u11b2", "\u11af\u11b8"),  # 'ᆲ(ㄹㅂ)' → 'ᆯᆸ'
        (r"\u11b3", "\u11af\u11ba"),  # 'ᆳ(ㄹㅅ)' → 'ᆯᆺ'
        (r"\u11b4", "\u11af\u11c0"),  # 'ᆴ(ㄹㅌ)' → 'ᆯᇀ'
        (r"\u11b5", "\u11af\u11c1"),  # 'ᆵ(ㄹㅍ)' → 'ᆯᇁ'
        (r"\u11b6", "\u11af\u11c2"),  # 'ᆶ(ㄹㅎ)' → 'ᆯᇂ'
        (r"\u11b9", "\u11b8\u11ba"),  # 'ᆹ(ㅂㅅ)' → 'ᆸᆺ'
        
        # ==============================
        # 6. 경음화/축약 등 특수 규칙
        # ==============================
        (r"\u11ae\u110b\u1175", "\u110c\u1175"),  # 'ᆮ' + 'ᄋ' + 'ᅵ' → '지'
        (r"\u11c0\u110b\u1175", "\u110e\u1175"),  # 'ᇀ' + 'ᄋ' + 'ᅵ' → '치'
        
        # ==============================
        # 7. 받침 탈락 또는 이음자 제거
        # ==============================
        (r"\u11a8\u110b", "\u1100"),  # 'ᆨ' + 'ᄋ' → 'ᄀ'
        (r"\u11a9\u110b", "\u1101"),  # 'ᆩ' + 'ᄋ' → 'ᄁ'
        (r"\u11ae\u110b", "\u1103"),  # 'ᆮ' + 'ᄋ' → 'ᄃ'
        (r"\u11af\u110b", "\u1105"),  # 'ᆯ' + 'ᄋ' → 'ᄅ'
        (r"\u11b8\u110b", "\u1107"),  # 'ᆸ' + 'ᄋ' → 'ᄇ'
        (r"\u11ba\u110b", "\u1109"),  # 'ᆺ' + 'ᄋ' → 'ᄉ'
        (r"\u11bb\u110b", "\u110a"),  # 'ᆻ' + 'ᄋ' → 'ᄊ'
        (r"\u11bd\u110b", "\u110c"),  # 'ᆽ' + 'ᄋ' → 'ᄌ'
        (r"\u11be\u110b", "\u110e"),  # 'ᆾ' + 'ᄋ' → 'ᄎ'
        (r"\u11c2\u110b", ""),        # 'ᇂ' + 'ᄋ' → 제거
        
        # ==============================
        # 8. 격음화 (종성 + ㅎ/히읗)
        # ==============================
        (r"\u11c2\u1100|\u11a8\u1112", "\u110f"),  # 'ᇂ'+'ᄀ' 또는 'ᆨ'+'ᄒ' → 'ᄏ'
        (r"\u11c2\u1103|\u11ae\u1112", "\u1110"),  # 'ᇂ'+'ᄃ' 또는 'ᆮ'+'ᄒ' → 'ᄐ'
        (r"\u11c2\u110c|\u11bd\u1112", "\u110e"),  # 'ᇂ'+'ᄌ' 또는 'ᆽ'+'ᄒ' → 'ᄎ'
        (r"\u11c2\u1107", "\u1107"),               # 'ᇂ'+'ᄇ' → 'ᄇ'
        (r"\u11b8\u1112", "\u1111"),               # 'ᆸ'+'ᄒ' → 'ᄑ'
        
        # ==============================
        # 9. 특수 처리 및 최종 정리
        # ==============================
        (r"\u11af\u1105", "ll"),                   # 'ᆯ' + 'ᄅ' → ll
        (r"\u11c2(?!\s|$)", ""),                  # 'ᇂ' (종성) 단독 → 제거
        (r"([\u11a8-\u11c2])([\u11a8-\u11c2])", r"\1")  # 이중 종성 제거
    ]

    for pattern, repl in rules:
        jamo_str = re.sub(pattern, repl, jamo_str)
    return jamo_str

def split_hangul_to_jamos(text):
    result = ""
    for char in text:
        code = ord(char)
        if code < HANGUL_BASE or code > HANGUL_END:
            result += char
            continue
        index = code - HANGUL_BASE
        cho = CHO[index // (21 * 28)]
        jung = JUNG[(index % (21 * 28)) // 28]
        jong = JONG[index % 28]
        result += cho + jung + jong
    return result

def capitalize_words(text):
    result = []
    capitalize_next = True
    for char in text:
        if char.isspace():
            capitalize_next = True
            result.append(char)
        else:
            if capitalize_next:
                result.append(char.upper())
                capitalize_next = False
            else:
                result.append(char.lower())
    return "".join(result)

def capitalize_lines(text):
    result = []
    capitalize_next = True
    for char in text:
        if char == "\n":
            capitalize_next = True
            result.append(char)
        else:
            if capitalize_next:
                result.append(char.upper())
                capitalize_next = False
            else:
                result.append(char.lower())
    return "".join(result)

def romanize(text, **options):
    """
    Convert Korean text to Romanized form.
    
    Args:
        text (str): Korean text to romanize
        **options: Optional parameters:
            - use_pronunciation_rules (bool): Whether to apply pronunciation rules (default: True)
            - casing_option (str): Casing option (default: "lowercase")
    
    Returns:
        str: Romanized text
    """
    use_pronunciation_rules = options.get('use_pronunciation_rules', True)
    casing_option = options.get('casing_option', "lowercase")
    
    jamo_str = split_hangul_to_jamos(text)
    if use_pronunciation_rules:
        jamo_str = apply_pronunciation_rules(jamo_str)
    result = "".join(ROMAN_MAP.get(c, c) for c in jamo_str)
    
    if casing_option == "uppercase":
        return result.upper()
    elif casing_option == "capitalize-word":
        return capitalize_words(result)
    elif casing_option == "capitalize-line":
        return capitalize_lines(result)
    else:  # LOWERCASE
        return result.lower()