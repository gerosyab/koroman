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

def apply_pronunciation_rules(jamo_str, preserve_h=True):
    # ==============================
    # 1. 무효화 처리
    # ==============================
    rules = [
        (r"\u11a7", ""),  # 'ᆧ'(U+11A7) → 제거 (사용되지 않는 종성)
        
        # ==============================
        # 2. 비음화 (ㄴ, ㅁ, ㅇ)
        # ==============================
        (r"[\u11b8\u11c1\u11b9\u11b2\u11b5](?=[\u1102\u1106])", "\u11b7"),
        (r"[\u11ae\u11c0\u11bd\u11be\u11ba\u11bb\u11c2](?=[\u1102\u1106])", "\u11ab"),
        (r"[\u11a8\u11a9\u11bf\u11aa\u11b0](?=[\u1102\u1106])", "\u11bc"),
        
        # ==============================
        # 3. 연음/연철
        # ==============================
        (r"\u11a8\u110b(?=[\u1163\u1164\u1167\u1168\u116d\u1172])", "\u11bc\u1102"),
        (r"\u11af\u110b(?=[\u1163\u1164\u1167\u1168\u116d\u1172])", "\u11af\u1105"),
        (r"[\u11a8\u11bc]\u1105", "\u11bc\u1102"),
        (r"\u11ab\u1105(?=\u1169)", "\u11ab\u1102"),
        (r"\u11af\u1102|\u11ab\u1105", "\u11af\u1105"),
        (r"[\u11b7\u11b8]\u1105", "\u11b7\u1102"),
        (r"\u11b0\u1105", "\u11a8\u1105"),
        
        # ==============================
        # 4. 격음화 / 자음군 분해
        # ==============================
        (r"\u11a8\u110f", "\u11a8-\u110f"),
        (r"\u11b8\u1111", "\u11b8-\u1111"),
        (r"\u11ae\u1110", "\u11ae-\u1110"),
        
        # ==============================
        # 5. 복합 종성 분해
        # ==============================
        (r"\u11aa", "\u11a8\u11ba"),
        (r"\u11ac", "\u11ab\u11bd"),
        (r"\u11ad", "\u11ab\u11c2"),
        (r"\u11b0", "\u11af\u11a8"),
        (r"\u11b1", "\u11af\u11b7"),
        (r"\u11b2", "\u11af\u11b8"),
        (r"\u11b3", "\u11af\u11ba"),
        (r"\u11b4", "\u11af\u11c0"),
        (r"\u11b5", "\u11af\u11c1"),
        (r"\u11b6", "\u11af\u11c2"),
        (r"\u11b9", "\u11b8\u11ba"),
        
        # ==============================
        # 6. 경음화/축약 등 특수 규칙
        # ==============================
        (r"\u11ae\u110b\u1175", "\u110c\u1175"),
        (r"\u11c0\u110b\u1175", "\u110e\u1175"),
        
        # ==============================
        # 7. 받침 탈락 또는 이음자 제거
        # ==============================
        (r"\u11a8\u110b", "\u1100"),
        (r"\u11a9\u110b", "\u1101"),
        (r"\u11ae\u110b", "\u1103"),
        (r"\u11af\u110b", "\u1105"),
        (r"\u11b8\u110b", "\u1107"),
        (r"\u11ba\u110b", "\u1109"),
        (r"\u11bb\u110b", "\u110a"),
        (r"\u11bd\u110b", "\u110c"),
        (r"\u11be\u110b", "\u110e"),
        (r"\u11c2\u110b", ""),
    ]

    # 격음화 (종성 + ㅎ/히읗) - 2024-27호에서는 체언에서 ㅎ을 밝혀 적음
    if not preserve_h:
        rules.extend([
            (r"\u11c2\u1100|\u11a8\u1112", "\u110f"),
            (r"\u11c2\u1103|\u11ae\u1112", "\u1110"),
            (r"\u11c2\u110c|\u11bd\u1112", "\u110e"),
            (r"\u11b8\u1112", "\u1111"),
        ])
    
    # 공통 격음화 (ㅎ+ㅂ은 항상 ㅂ)
    rules.append((r"\u11c2\u1107", "\u1107"))

    # 최종 정리
    rules.extend([
        (r"\u11af\u1105", "ll"),
        (r"\u11c2(?!\s|$)", ""),
        (r"([\u11a8-\u11c2])([\u11a8-\u11c2])", r"\1")
    ])

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

from .dictionary import DICTIONARY

def romanize(text, **options):
    """
    Convert Korean text to Romanized form.
    
    Args:
        text (str): Korean text to romanize
        **options: Optional parameters:
            - use_pronunciation_rules (bool): Whether to apply pronunciation rules (default: True)
            - casing_option (str): Casing option (default: "lowercase")
            - use_dictionary (bool): Whether to use place name dictionary (default: Depends on version)
            - version (str): Version of the rules (default: "2024-27")
    
    Returns:
        str: Romanized text
    """
    version = options.get('version', "2024-27")
    is_legacy = version == "2000-8"
    
    use_pronunciation_rules = options.get('use_pronunciation_rules', True)
    casing_option = options.get('casing_option', "lowercase")
    use_dictionary = options.get('use_dictionary', not is_legacy)
    preserve_h = not is_legacy
    
    if not text:
        return ""

    processed_text = text
    protections = []

    if use_dictionary:
        # DICTIONARY keys are already sorted by length descending
        for ko, en in DICTIONARY.items():
            if ko in processed_text:
                escaped_ko = re.escape(ko)
                
                def replace_func(match):
                    idx = len(protections)
                    # Capitalize first letter as it is a proper noun
                    capitalized = en[0].upper() + en[1:] if en else ""
                    protections.append(capitalized)
                    return f"__KRM_{idx}__"
                
                processed_text = re.sub(escaped_ko, replace_func, processed_text)

    # Split by placeholders
    parts = re.split(r'(__KRM_\d+__)', processed_text)
    romanized_parts = []
    
    for part in parts:
        match = re.match(r'__KRM_(\d+)__', part)
        if match:
            idx = int(match.group(1))
            romanized_parts.append(protections[idx])
        else:
            jamo_str = split_hangul_to_jamos(part)
            if use_pronunciation_rules:
                jamo_str = apply_pronunciation_rules(jamo_str, preserve_h=preserve_h)
            romanized_part = "".join(ROMAN_MAP.get(c, c) for c in jamo_str)
            
            # Apply casing to non-dictionary part
            if casing_option == "uppercase":
                romanized_part = romanized_part.upper()
            elif casing_option == "capitalize-word":
                romanized_part = capitalize_words(romanized_part)
            elif casing_option == "capitalize-line":
                romanized_part = capitalize_lines(romanized_part)
            else:
                romanized_part = romanized_part.lower()
                
            romanized_parts.append(romanized_part)

    final_result = "".join(romanized_parts)
    
    # Global uppercase enforcement
    if casing_option == "uppercase":
        final_result = final_result.upper()
        
    return final_result