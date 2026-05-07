> 🇰🇷 [한국어로 보기](./README.ko.md)

# KOROMAN - Korean Romanizer

**KOROMAN** is a multilingual Romanizer for Korean text, based on the Revised Romanization system (국립국어원 표기법) with additional pronunciation rules. It converts Hangul syllables into Romanized Latin script across multiple languages: **JavaScript, Python, and Java**.

## 🌐 Live Demo
- [한국어 버전](https://daissue.app/romanizer)
- [English version](https://daissue.app/en/romanizer)

---

## 📦 Features
- Supports Revised Romanization of Korean
- Applies key Korean phonological rules:
  - Liaison (연음화)
  - Nasal assimilation (비음화)
  - Lateralization (유음화)
  - Fortis/tense consonants (경음화)
- Provides casing options (lower, upper, capitalized) — accepts full names, short aliases, or numeric codes (1.0.14+)
- Fully tested in each language

---

## 🚀 Getting Started

### Python
```bash
pip install koroman
```
```python
from koroman import romanize

# Basic usage
romanize("한글")  # → "hangul"

# With pronunciation rules disabled
romanize("해돋이", use_pronunciation_rules=False)  # → "haedodi"

# With pronunciation rules enabled (default)
romanize("해돋이")  # → "haedoji"

# With different casing options (full names)
romanize("한글", casing_option="uppercase")  # → "HANGEUL"
romanize("안녕 한글", casing_option="capitalize-word")  # → "Annyeong Hangeul"
romanize("안녕\n한글 로마자 변환", casing_option="capitalize-line")  # → "Annyeong\nHangeul romaja byeonhwan"

# 1.0.14+ : short aliases / numeric codes are also accepted
romanize("한글", casing_option="u")    # → "HANGEUL"
romanize("한글", casing_option="uc")   # → "HANGEUL"
romanize("한글", casing_option=1)      # → "HANGEUL"
romanize("안녕 한글", casing_option="cw")   # → "Annyeong Hangeul"
romanize("안녕\n한글 로마자 변환", casing_option=2)  # → "Annyeong\nHangeul romaja byeonhwan"

# Combining options
romanize("해돋이", use_pronunciation_rules=False, casing_option="uc")  # → "HAEDODI"
romanize("해돋이", use_pronunciation_rules=False, casing_option=1)     # → "HAEDODI"
```

### casingOption aliases (1.0.14+)

| Canonical          | Aliases                              | Numeric   |
|--------------------|--------------------------------------|-----------|
| `lowercase`        | `lower`, `l`, `lc`                   | `0`       |
| `uppercase`        | `upper`, `u`, `uc`                   | `1`       |
| `capitalize-line`  | `cap-line`, `cline`, `cl`            | `2`       |
| `capitalize-word`  | `cap-word`, `cword`, `cw`            | `3`       |

Case-insensitive. Unknown / `None` falls back to `lowercase`.
---

## 📜 LICENSE
[MIT License](LICENSE)

2025 ⓒ Donghe Youn (Daissue)

