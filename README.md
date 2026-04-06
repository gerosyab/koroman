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
├── java/                      # Java implementation
│   ├── src/
│   │   ├── main/
│   │   │   └── java/
│   │   │       └── app/
│   │   │           └── daissue/
│   │   │               └── koroman/
│   │   │                   └── Koroman.java
│   │   └── test/
│   │       └── java/
│   │           └── app/
│   │               └── daissue/
│   │                   └── koroman/
│   │                       └── KoromanTest.java
│   └── build.gradle
│
├── js/                        # JavaScript implementation
│   ├── dist                   
│   │   └── koroman.browser.js  # Distribution for browsers
│   ├── src    
│   │   ├── koroman.cjs        # CommonJS support
│   │   ├── koroman.core.js    # Core implementation
│   │   ├── koroman.d.ts       # Typescript support
│   │   └── koroman.mjs        # ESM supoort
│   └── tests/
│       └── test_koroman.js
│
└── python/                    # Python implementation
    ├── koroman/              
    │   ├── __init__.py       
    │   └── core.py           
    ├── test/                          
    │   └── test_koroman.py
    └── setup.py
```

---

## 🚀 Getting Started

### JavaScript (jsDeliver)
```html
<script src="https://cdn.jsdelivr.net/gh/gerosyab/koroman@js-v1.0.13/js/dist/koroman.browser.js"></script>
<script>
  const result = koroman.romanize("안녕하세요");
  console.log(result); // → annyeonghaseyo
</script>
```
### JavaScript (Node.js)
```bash
npm install koroman
```
#### CommonJS
```js
const koroman = require('koroman');

// Basic usage
koroman.romanize("한글"); // → "hangul"

// With pronunciation rules disabled
koroman.romanize("해돋이", { usePronunciationRules: false }); // → "haedodi"

// With pronunciation rules enabled (default)
koroman.romanize("해돋이"); // → "haedoji"

// With different casing options
koroman.romanize("한글", { casingOption: "uppercase" }); // → "HANGUL"
koroman.romanize("안녕 한글", { casingOption: "capitalize-word" }); // → "Annyeong hangeul"
koroman.romanize("안녕\n한글 로마자 변환", { casingOption: "capitalize-line" }); // → "Annyeong\nHangeul Romaja Byeonhwan"
```
#### ESM (requires "type": "module" in package.json)
```js
import { romanize } from 'koroman';

romanize("한글"); // → "hangul"

```
#### Typescript
```ts
import { romanize } from 'koroman';

const result: string = romanize("로마자", {
  usePronunciationRules: true,
  casingOption: "capitalize-line"
}); // → "Romaja"
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

### Java (JitPack -> https://jitpack.io/#gerosyab/koroman/java-v1.0.13)
```gradle
repositories {
    mavenCentral()
    maven { url 'https://jitpack.io' }
}

dependencies {
    implementation 'com.github.gerosyab:koroman:java-v1.0.13'
}

tasks.withType(JavaCompile) {
    options.encoding = 'UTF-8'
}
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

## 📦 Version Mapping

| Feature / Change                 | JS (npm)  | Python (PyPI)  | Java (JitPack) | Description                                 |
|----------------------------------|-----------|----------------|----------------|---------------------------------------------|
| Initial stable release           | 1.0.13    | 1.0.13          | 1.0.13          | Basic romanization based on 국립국어원 표기법  |

> ℹ️ Each version is managed independently per language.  
> Major feature additions aim to stay consistent across platforms, but release timing may vary.
---

## 📜 LICENSE
[MIT License](LICENSE)

2025 ⓒ Donghe Youn (Daissue)

