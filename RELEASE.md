# Release Guide

Quick reference for testing, building, and publishing **koroman** (JS / Python / Java).

> Replace `1.0.14` with the current version. Tag convention: `js-v<ver>`, `python-v<ver>`, `java-v<ver>`.

---

## 1. Test

### JavaScript (`js/`)
```bash
cd js
npm test
```

### Python (`python/`)
```bash
cd python
python -m unittest tests.test_koroman -v
```

### Java (`java/`)
```bash
cd java
gradle test
# or, if wrapper exists:
./gradlew test
```

---

## 2. Build

### JavaScript (browser bundle for jsDelivr)
```bash
cd js
npm run build
# output: js/dist/koroman.browser.js
```

### Python (sdist + wheel)
```bash
cd python

# clean previous artifacts (Windows PowerShell)
Remove-Item -Recurse -Force dist, build, koroman.egg-info -ErrorAction SilentlyContinue
# or (bash)
rm -rf dist build koroman.egg-info

# install build tools (one-time)
pip install --upgrade build twine

python -m build
# output: python/dist/koroman-<ver>-py3-none-any.whl, python/dist/koroman-<ver>.tar.gz
```

### Java
No local build needed for JitPack — it builds on demand from a git tag.
For local sanity check:
```bash
cd java
gradle build
```

---

## 3. Commit & Tag

Run from repo root.

```bash
git add -A
git commit -m "release 1.0.14: <summary>"
git push origin main

# language-specific tags (jsDelivr / JitPack rely on these)
git tag js-v1.0.14
git tag python-v1.0.14
git tag java-v1.0.14
git push origin --tags
```

Delete a wrong tag:
```bash
git push --delete origin js-v1.0.14
git tag -d js-v1.0.14
```

---

## 4. Publish

### npm (JavaScript)
```bash
cd js
npm login        # one-time
npm publish      # add --access public on first publish
```
Verify: <https://www.npmjs.com/package/koroman>

### PyPI (Python)
```bash
cd python
twine upload dist/*
# test on TestPyPI first (optional):
# twine upload --repository testpypi dist/*
```
Auth: username `__token__`, password = PyPI API token (or set in `~/.pypirc`).
Verify: <https://pypi.org/project/koroman/>

### JitPack (Java)
Tag push triggers JitPack. To force the build & confirm it compiles:

1. Open <https://jitpack.io/#gerosyab/koroman>
2. Find `java-v1.0.14`, click **Get it**
3. Wait for green status; check log if red

### jsDelivr (JS browser CDN)
No publish step. Active automatically once `js/dist/koroman.browser.js` is committed under tag `js-v1.0.14`:

```
https://cdn.jsdelivr.net/gh/gerosyab/koroman@js-v1.0.14/js/dist/koroman.browser.js
```

Alternative (via npm, faster cache):
```
https://cdn.jsdelivr.net/npm/koroman@1.0.14/dist/koroman.browser.js
```

---

## 5. End-to-end recipe (copy/paste)

```bash
# from repo root
cd js && npm run build && npm test && cd ..
cd python
Remove-Item -Recurse -Force dist, build, koroman.egg-info -ErrorAction SilentlyContinue
python -m unittest tests.test_koroman -v
python -m build
cd ..

git add -A
git commit -m "release 1.0.14: casingOption aliases & numeric codes"
git push origin main

git tag js-v1.0.14
git tag python-v1.0.14
git tag java-v1.0.14
git push origin --tags

cd js && npm publish && cd ..
cd python && twine upload dist/* && cd ..

# Trigger JitPack build by visiting:
#   https://jitpack.io/#gerosyab/koroman
```

---

## Pre-flight checklist

- [ ] Version bumped in **all** locations:
  - `js/package.json` `version`
  - `js/src/koroman.core.js` `@version` comment
  - `python/setup.py` `version`
  - `python/koroman/__init__.py` `__version__`
  - `java/build.gradle` `version`
  - `java/src/main/java/app/daissue/koroman/Koroman.java` `@version` comment
  - README version-mapping tables and CDN/JitPack URLs
- [ ] All three test suites pass
- [ ] `js/dist/koroman.browser.js` rebuilt **before** committing the release tag (jsDelivr serves from git)
- [ ] `python/dist/` cleaned before `python -m build` (avoids re-uploading old versions)
- [ ] npm version is unique (cannot republish same version)
- [ ] `~/.pypirc` token or `TWINE_PASSWORD` env set
- [ ] Tags pushed with `git push origin --tags` (local-only tags do nothing)
