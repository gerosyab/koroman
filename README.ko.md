# KOROMAN - 한국어 로마자 변환기

**KOROMAN**은 한국어 텍스트를 **로마자 표기법(국립국어원 표준)**에 따라 로마자로 변환해주는 다국어 라이브러리입니다. 자바스크립트, 파이썬, 자바 환경에서 모두 사용할 수 있으며, 실제 발음에 가까운 표기를 위해 **발음 규칙**도 적용할 수 있습니다.

## 🌐 온라인 데모
- [한국어 데모 바로가기](https://daissue.app/romanizer)
- [영문 데모 보기](https://daissue.app/en/romanizer)

---

## 📦 주요 기능
- 표준 로마자 표기법 기반 변환 (국립국어원)
- 발음 규칙 적용 지원:
  - 연음화 (예: 해돋이 → haedoji)
  - 비음화, 유음화, 경음화 등
- 대소문자 옵션 지원 (소문자, 대문자, 단어/줄 단위 대문자 등)
- 자바스크립트, 파이썬, 자바 모두 지원 (ESM/CJS 대응)
- 각 언어별 테스트 코드 포함

---

## 📁 프로젝트 구조
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
│   │   └── koroman.brower.js  # Distribution for browers
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
    └── test/                          
        └── test_koroman.py
```

---

## 🔤 사용 예시

### 입력
```
해돋이와 문래역 그리고 선릉역, 역량 개발
```

### 출력 (로마자 변환)
```
haedojiwa munnaeyeok geurigo seollleungyeok, yeongnyang gaebal
```

---

## 🚀 시작하기

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

// 기본 사용법
koroman.romanize("한글"); // → "hangul"

// 발음 규칙 비활성화
koroman.romanize("해돋이", { usePronunciationRules: false }); // → "haedodi"

// 발음 규칙 활성화 (기본값)
koroman.romanize("해돋이"); // → "haedoji"

// 대소문자 옵션
koroman.romanize("한글", { casingOption: "uppercase" }); // → "HANGUL"
koroman.romanize("안녕 한글", { casingOption: "capitalize-word" }); // → "Annyeong hangeul"
koroman.romanize("안녕\n한글 로마자 변환", { casingOption: "capitalize-line" }); // → "Annyeong\nHangeul Romaja Byeonhwan"
```
#### ESM (package.json 내 "type":"module" 설정 필요)
```js
import { romanize } from 'koroman';

// 기본 사용법
romanize("한글"); // → "hangul"

// 발음 규칙 비활성화
romanize("해돋이", { usePronunciationRules: false }); // → "haedodi"

// 발음 규칙 활성화 (기본값)
romanize("해돋이"); // → "haedoji"

// 대소문자 옵션
romanize("한글", { casingOption: "uppercase" }); // → "HANGUL"
romanize("안녕 한글", { casingOption: "capitalize-word" }); // → "Annyeong hangeul"
romanize("안녕\n한글 로마자 변환", { casingOption: "capitalize-line" }); // → "Annyeong\nHangeul Romaja Byeonhwan"
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

# 기본 사용법
romanize("한글")  # → "hangul"

# 발음 규칙 비활성화
romanize("해돋이", use_pronunciation_rules=False)  # → "haedodi"

# 발음 규칙 활성화 (기본값)
romanize("해돋이")  # → "haedoji"

# 대소문자 옵션
romanize("한글", casing_option="uppercase")  # → "HANGUL"
romanize("안녕 한글", casing_option="capitalize-word")  # → "Annyeong Hangeul"
romanize("안녕\n한글 로마자 변환", casing_option="capitalize-line")  # → "Annyeong\nHangeul Romaja Byeonhwan"

# 옵션 조합
romanize("해돋이", use_pronunciation_rules=False, casing_option="uppercase")  # → "HAEDODI"
```

### Java (JitPack)
```gradle
implementation 'app.daissue:koroman:1.0.11'
```
```java
import app.daissue.koroman.Koroman;
import java.util.HashMap;
import java.util.Map;

// 기본 사용법 (기본값: 발음 규칙 적용, 소문자)
String result = Koroman.romanize("한글"); // → "hangul"

// 발음 규칙 비활성화
Map<String, Object> options = new HashMap<>();
options.put("usePronunciationRules", false);
String result = Koroman.romanize("해돋이", options); // → "haedodi"

// 발음 규칙 활성화 (기본값)
String result = Koroman.romanize("해돋이"); // → "haedoji"

// 대소문자 옵션
options = new HashMap<>();
options.put("casingOption", "uppercase");
String result = Koroman.romanize("한글", options); // → "HANGUL"

options.put("casingOption", "capitalize-word");
String result = Koroman.romanize("안녕 한글", options); // → "Annyeong Hangeul"

options.put("casingOption", "capitalize-line");
String result = Koroman.romanize("안녕\n한글 로마자 변환", options); // → "Annyeong\nHangeul Romaja Byeonhwan"

// 옵션 조합
options = new HashMap<>();
options.put("usePronunciationRules", false);
options.put("casingOption", "uppercase");
String result = Koroman.romanize("해돋이", options); // → "HAEDODI"
```

---

## 📜 라이선스
[MIT License](LICENSE)

2025 ⓒ Donghe Youn (Daissue)

