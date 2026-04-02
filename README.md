> 🇰🇷 [한국어로 보기](./README.ko.md)

# KOROMAN - Standard Korean Romanizer

**KOROMAN** is a multilingual Romanizer for Korean text, strictly following the **Latest Revised Romanization system ([Notice 2024-27](docs/국어의_로마자_표기법(문화체육관광부고시_제2024-27호).md))** and the legacy standard (Notice 2000-8). It supports **JavaScript, Python, and Java** with a unified core engine.

## 🌟 What's New (v1.1.0)
- **Notice 2024-27 Compliance**: Correctly preserves 'h' (ㅎ) in nouns as per the latest government exception rule (e.g., `Mukho`, `Jiphyeonjeon`).
- **Smart Mode**: Integrated dictionary with ~790 major administrative districts and landmarks for standardized spelling and automatic capitalization (e.g., `Seoul`, `Jongno-gu`).
- **Version Branching**: Easily toggle between legacy (2000-8) and modern (2024-27) rules.

## 🌐 Live Demo (v1.1.0)
- [KOROMAN Real-time Demo & Version Comparison](https://daissue.app/romanizer)

---

## 📦 Key Features
- **Official Standards**: Supports both the latest (2024-27) and legacy (2000-8) notices.
- **Smart Proper Noun Recognition (useDictionary)**:
  - Bypasses standard pronunciation rules for matched dictionary entries.
  - Automatic capitalization for place names and landmarks.
- **Precise Phonological Rules**:
  - Liaison, Nasalization, Lateralization, and Palatalization support.
  - **Aspiration Exceptions**: Preserves 'h' in nouns to comply with the 2024-27 standard.
- **Modern Centered UI**:
  - A clean, premium responsive demo with a centered layout and high-readability typography.
  - Mobile-ready with real-time version comparison.
- **Multilingual Core**: 100% identical logic across JS (ESM/CJS), Python, and Java.

---

## 🚀 Getting Started

### JavaScript (Browser/Node.js)
```javascript
import { romanize } from 'koroman';

// 1. Smart Romanization (Notice 2024-27, default)
romanize("서울특별시 종로구"); // → "Seoul Jongno-gu"
romanize("묵호");            // → "Mukho" (h preserved)

// 2. Legacy Romanization (Notice 2000-8, merged aspiration)
romanize("묵호", { version: "2000-8" }); // → "muko"

// 3. Pronunciation & Casing Options
romanize("해돋이", { casingOption: "capitalize-word" }); // → "Haedoji"
```

### Python
```bash
pip install koroman
```
```python
from koroman import romanize

# Modern Smart Mode
print(romanize("서울특별시")) # → Seoul

# Legacy Mode
print(romanize("묵호", version="2000-8")) # → muko
```

### Java
```java
import app.daissue.koroman.Koroman;

// Modern Smart Mode (Default)
String result = Koroman.romanize("집현전"); // → Jiphyeonjeon

// Legacy Mode (useDictionary=false, version="2000-8")
String legacy = Koroman.romanize("묵호", true, Koroman.CasingOption.LOWERCASE, false, "2000-8"); // → muko
```

---

## 📦 Version Mapping

| Feature / Upgrade                | JS (npm)  | Python (PyPI)  | Java (JitPack) | Description                                 |
|---------------------------------|-----------|----------------|----------------|---------------------------------------------|
| Smart Mode & Notice 2024-27     | 1.1.0     | 1.1.0          | 1.1.0          | Notice 2024-27 support & Place Dictionary   |
| Initial stable release          | 1.0.12    | 1.0.0          | 1.0.12         | Initial Romanizer based on 2000-8 standard  |

---

## 📜 LICENSE
[MIT License](LICENSE)

2025 ⓒ Donghe Youn (Daissue)

