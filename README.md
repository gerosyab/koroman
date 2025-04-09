<<<<<<< HEAD
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
- Provides casing options (lower, upper, capitalized)
- Cross-platform support (Node.js, Python, Java)
- Fully tested in each language

---

## 📁 Project Structure
```
koroman/
├── README.md            ← Project overview (this file)
├── js/                  ← JavaScript core & dual-module support (ESM/CJS)
│   ├── koroman.core.js
│   ├── koroman.mjs
│   ├── koroman.cjs
│   └── package.json
├── python/              ← Python version
│   ├── koroman/__init__.py
│   ├── setup.py
│   └── pyproject.toml
├── java/                ← Java version (JDK 8+)
│   ├── build.gradle / pom.xml
│   └── src/main/java/app/daissue/koroman/Koroman.java
├── test/                ← Language-specific test files
│   ├── js/test_koroman.js
│   ├── python/test_koroman.py
│   └── java/KoromanTest.java
```

---

## 🔤 Example Usage

### Input
```
해돋이와 문래역 그리고 선릉역, 역량 개발
```

### Output (Romanized)
```
haedojiwa munnaeyeok geurigo seollleungyeok, yeongnyang gaebal
```

---

## 🚀 Getting Started

### JavaScript (Node.js)
```bash
npm install koroman
```
```js
import { romanize } from 'koroman';

// Basic usage
romanize("한글"); // → "hangul"

// With pronunciation rules disabled
romanize("해돋이", { usePronunciationRules: false }); // → "haedodi"

// With pronunciation rules enabled (default)
romanize("해돋이"); // → "haedoji"

// With different casing options
romanize("한글", { casingOption: "uppercase" }); // → "HANGUL"
romanize("안녕 한글", { casingOption: "capitalize-word" }); // → "Annyeong hangeul"
romanize("안녕\n한글 로마자 변환", { casingOption: "capitalize-line" }); // → "Annyeong\nHangeul Romaja Byeonhwan"
```

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

# With different casing options
romanize("한글", casing_option="uppercase")  # → "HANGUL"
romanize("안녕 한글", casing_option="capitalize-word")  # → "Annyeong Hangeul"
romanize("안녕\n한글 로마자 변환", casing_option="capitalize-line")  # → "Annyeong\nHangeul Romaja Byeonhwan"

# Combining options
romanize("해돋이", use_pronunciation_rules=False, casing_option="uppercase")  # → "HAEDODI"
```

### Java (JitPack)
```gradle
implementation 'com.github.gerosyab:koroman:1.0.0'
```
```java
import app.daissue.koroman.Koroman;
import java.util.HashMap;
import java.util.Map;

// Basic usage (default: with pronunciation rules, lowercase)
String result = Koroman.romanize("한글"); // → "hangul"

// With pronunciation rules disabled
Map<String, Object> options = new HashMap<>();
options.put("usePronunciationRules", false);
String result = Koroman.romanize("해돋이", options); // → "haedodi"

// With pronunciation rules enabled (default)
String result = Koroman.romanize("해돋이"); // → "haedoji"

// With different casing options
options = new HashMap<>();
options.put("casingOption", "uppercase");
String result = Koroman.romanize("한글", options); // → "HANGUL"

options.put("casingOption", "capitalize-word");
String result = Koroman.romanize("안녕 한글", options); // → "Annyeong Hangeul"

options.put("casingOption", "capitalize-line");
String result = Koroman.romanize("안녕\n한글 로마자 변환", options); // → "Annyeong\nHangeul Romaja Byeonhwan"

// Combining options
options = new HashMap<>();
options.put("usePronunciationRules", false);
options.put("casingOption", "uppercase");
String result = Koroman.romanize("해돋이", options); // → "HAEDODI"
```

---

## 🧪 Testing
```
=======
# koroman
한국어 로마자 변환기 Korean Romanizer with pronunciation rules based on 국립국어원 표기법
>>>>>>> e445a59a5355323b58d505f24b64647cccf83852
