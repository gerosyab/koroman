# KOROMAN - 한국어 로마자 변환기 (Standard Korean Romanizer)

**KOROMAN**은 한국어 텍스트를 **최신 국어 로마자 표기법([문화체육관광부고시 제2024-27호](https://github.com/whoshe/koroman/blob/master/docs/notice_2024_27.md))** 및 레거시 규정(제2000-8호)에 따라 로마자로 변환해주는 다국어 라이브러리입니다. 

자바스크립트, 파이썬, 자바 환경에서 모두 사용할 수 있으며, 지명 사전 기반의 **스마트 모드**와 표준 발음 규칙을 완벽하게 지원합니다.

## 🌟 최신 업데이트 (v1.1.0)
- **최신 고시 준수**: [문화체육관광부고시 제2024-27호]의 예외 규정(체언에서 ㅎ 밝혀 적기) 반영.
- **스마트 모드**: 약 790여 개의 행정구역 및 지명에 대한 표준 영문 표기 사전 통합 (`Seoul`, `Jongno-gu` 등).
- **멀티 버전 지원**: 레거시(2000-8)와 최신(2024-27) 규정을 선택하여 비교 변환 가능.

## 🌐 온라인 데모 (v1.1.0 적용)
- [KOROMAN 실시간 데모 및 버전 비교](https://daissue.app/romanizer)

---

## 📦 주요 기능
- **표준 로마자 표기법 지원**: 최신 고시(2024-27) 및 레거시(2000-8) 선택 가능.
- **스마트 지명 인식 (useDictionary)**:
  - 사전 매칭 시 발음 규칙을 우회하고 표준 표기 우선 적용.
  - 고유명사 첫 글자 대문자(Capitalization) 자동 처리.
- **발음 규칙 정밀 적용**:
  - 연음화, 비음화, 유음화, 구개음화 지원.
  - **격음화 예외 처리**: `묵호(Mukho)`, `집현전(Jiphyeonjeon)` 등 체언 내 ㅎ 보존.
- **프리미엄 반응형 UI**:
  - 사용자 중심의 현대적이고 세련된 데모 레이아웃(중앙 정렬 및 고가독성 타이포그래피).
  - 모바일 최적화 및 실시간 버전 비교 대조 기능.
- **다국어 환경 최적화**: JavaScript(ESM/CJS), Python, Java 엔진 로직 100% 일치.

---

## 📁 프로젝트 구조
```
koroman/
├── java/                      # Java implementation
├── js/                        # JavaScript implementation
└── python/                    # Python implementation
```

---

## 🚀 로컬 개발 및 데모 실행 (Local Development)

프로젝트 루트 디렉토리에서 다음 명령어를 사용하여 데모 페이지를 실행하거나 라이브러리를 빌드할 수 있습니다.

### 1. 데모 페이지 실행 (Development)
```bash
npm run dev
```
*   라이브러리를 최신 소스로 빌드하고, 로컬 웹 서버(`http://localhost:3000`)를 통해 데모 페이지를 실행합니다.

### 2. 라이브러리 빌드 (Build)
```bash
npm run build
```
*   `js/src`의 소스 코드를 `koroman.browser.js`로 빌드하여 `dist/` 및 `demo/js/` 폴더로 복사합니다.

---

## 🚀 시작하기

### JavaScript (Browser/Node.js)
```javascript
import { romanize } from 'koroman';

// 1. 최신 고시(2024-27) 기반 스마트 변환 (기본값)
romanize("서울특별시 종로구"); // → "Seoul Jongno-gu"
romanize("묵호");            // → "Mukho" (ㅎ 보존)

// 2. 레거시(2000-8) 기반 변환 (사전 미사용, 격음화 축약)
romanize("묵호", { version: "2000-8" }); // → "muko"

// 3. 발음 규칙 및 대소문자 옵션
romanize("해돋이", { casingOption: "capitalize-word" }); // → "Haedoji"
```

### Python
```python
from koroman import romanize

# 최신 고시 기준 스마트 모드
print(romanize("서울특별시")) # → Seoul

# 레거시 기준 변환
print(romanize("묵호", version="2000-8")) # → muko
```

### Java
```java
import app.daissue.koroman.Koroman;

// 최신 고시 기반 (기본)
String result = Koroman.romanize("집현전"); // → Jiphyeonjeon

// 옵션 지정 (useDictionary=true, version="2000-8")
String legacy = Koroman.romanize("묵호", true, Koroman.CasingOption.LOWERCASE, false, "2000-8"); // → muko
```

---

## 📦 버전 매핑

| 기능 / 변경사항                  | JS (npm)  | Python (PyPI)  | Java (JitPack) | 설명                                              |
|----------------------------------|-----------|----------------|----------------|---------------------------------------------------|
| 스마트 모드 및 최신 고시 대응     | 1.1.0     | 1.1.0          | 1.1.0          | 제2024-27호 예외 규정 반영 및 지명 사전 통합       |
| 최초 안정 릴리스                 | 1.0.12    | 1.0.0          | 1.0.12         | 국립국어원 표기법 기반의 기본 로마자 변환 기능     |

---

## 📜 라이선스
[MIT License](LICENSE)

2025 ⓒ Donghe Youn (Daissue)

