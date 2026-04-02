import json
import os

syn_path = '/Users/changwoonam/sandbox/bookshopmap-miniapp/src/data/synonyms.json'
reg_path = '/Users/changwoonam/sandbox/bookshopmap-miniapp/src/data/regions.json'

with open(syn_path, 'r', encoding='utf-8') as f: s = json.load(f)
with open(reg_path, 'r', encoding='utf-8') as f: r = json.load(f)

d = {}
for k, v in s.items():
    if v: d[k] = v[0]

for item in r:
    en = item.get('local_name_en')
    if not en: continue
    en = en.split(',')[0].strip()
    for k_attr in ['local_name_full', 'local_name_regular', 'local_name_short', 'basic']:
        k = item.get(k_attr)
        if k and k not in d: d[k] = en

sd = dict(sorted(d.items(), key=lambda x: len(x[0]), reverse=True))

def java_esc(s):
    # json.dumps handles most escapes; we just need to handle Java-specific things if any
    return json.dumps(s)[1:-1]

java_code = 'package app.daissue.koroman;\n\nimport java.util.LinkedHashMap;\nimport java.util.Map;\n\npublic class DictionaryData {\n    public static final Map<String, String> DICTIONARY = new LinkedHashMap<>();\n    static {\n'
for k, v in sd.items():
    java_code += f'        DICTIONARY.put("{java_esc(k)}", "{java_esc(v)}");\n'
java_code += '    }\n}\n'

os.makedirs('java/src/main/java/app/daissue/koroman', exist_ok=True)
output_path = 'java/src/main/java/app/daissue/koroman/DictionaryData.java'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(java_code)

print(f'Java DictionaryData class generated at {output_path}')
