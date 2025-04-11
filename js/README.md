# KOROMAN - Korean Romanizer

**KOROMAN** is a multilingual Romanizer for Korean text, based on the Revised Romanization system (국립국어원 표기법) with additional pronunciation rules. It converts Hangul syllables into Romanized Latin script across multiple languages: **JavaScript, Python, and Java**.

**KOROMAN**은 한국어 텍스트를 **로마자 표기법(국립국어원 표준)**에 따라 로마자로 변환해주는 다국어 라이브러리입니다. 자바스크립트, 파이썬, 자바 환경에서 모두 사용할 수 있으며, 실제 발음에 가까운 표기를 위해 **발음 규칙**도 적용할 수 있습니다.

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
- ESM/CJS/TS support
- Fully tested in each language

---

## 📦 주요 기능
- 표준 로마자 표기법 기반 변환 (국립국어원)
- 발음 규칙 적용 지원:
  - 연음화 (예: 해돋이 → haedoji)
  - 비음화, 유음화, 경음화 등
- 대소문자 옵션 지원 (소문자, 대문자, 단어/줄 단위 대문자 등)
- 자바스크립트 ESM/CJS/TS 대응 지원
- 각 언어별 테스트 코드 포함

---

## 🚀 Getting Started

### JavaScript (jsDeliver)
```html
<script src="https://cdn.jsdelivr.net/gh/gerosyab/koroman@v1.0.11/dist/koroman.browser.js"></script>
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
---

## 📜 LICENSE
[MIT License](LICENSE)

2025 ⓒ Donghe Youn (Daissue)
