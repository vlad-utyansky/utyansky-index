#!/usr/bin/env python3
"""
guard_utyansky_slots.py — Страж архитектуры Индекса Утянского
Запуск: python scripts/guard_utyansky_slots.py
Pre-commit: подключается в .git/hooks/pre-commit

Проверяет:
  1. Синтаксис [IDX: XXXXX] — только цифры и тире
  2. Лимит 4 листов А4 — файлы длиннее 450 строк
  3. Коллизии IDX — дублирование адресов
  4. Замок 00000 — попытка правки залоченных капсул
"""

import os, re, sys, json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCAN_DIRS = ['src', 'capsules']
MAX_LINES = 450

IDX_RE = re.compile(r'\[IDX:\s*([0-9\-]+)\]', re.IGNORECASE)
DATA_IDX_RE = re.compile(r'data-idx="([0-9\-]+)"', re.IGNORECASE)
DATA_LOCK_RE = re.compile(r'data-lock="([0-9]+)"', re.IGNORECASE)
BAD_IDX_RE = re.compile(r'\[IDX:\s*([0-9\-]*[a-zA-Zа-яА-Я_][0-9a-zA-Zа-яА-Я_\-]*)\]', re.IGNORECASE)

errors = []
registry = {}

def walk(d):
    for root, _, files in os.walk(d):
        for fn in files:
            yield os.path.join(root, fn)

for sub in SCAN_DIRS:
    scan_path = os.path.join(ROOT, sub)
    if not os.path.isdir(scan_path):
        continue
    for fpath in walk(scan_path):
        rel = os.path.relpath(fpath, ROOT)
        with open(fpath, encoding='utf-8') as f:
            text = f.read()
        lines = text.count('\n') + 1

        # 1. Буквы в IDX
        for m in BAD_IDX_RE.finditer(text):
            errors.append(f'BAD_IDX: {rel} — буквы внутри [IDX: ...] запрещены')

        # 2. Лимит строк
        if lines > MAX_LINES:
            errors.append(f'LIMIT: {rel} — {lines} строк > {MAX_LINES}. Декомпозируйте.')

        # 3. Коллизии
        file_indices = set()
        for m in IDX_RE.finditer(text):
            file_indices.add(m.group(1))
        for m in DATA_IDX_RE.finditer(text):
            file_indices.add(m.group(1))
        
        # Если это JSON капсула с полем "idx"
        if fpath.endswith('.json'):
            try:
                js = json.loads(text)
                if isinstance(js, dict) and '_meta' in js and 'idx' in js['_meta']:
                    file_indices.add(str(js['_meta']['idx']))
            except:
                pass

        for idx in file_indices:
            if idx in registry and registry[idx] != rel:
                errors.append(f'COLLISION: [IDX: {idx}] — {rel} конфликтует с {registry[idx]}')
            else:
                registry[idx] = rel

        # 4. Замок на капсулах
        is_capsule = os.path.basename(fpath).startswith('00000-')
        has_html_lock = bool(DATA_LOCK_RE.search(text))
        has_json_lock = '"lock": "00000"' in text or '"lock":"00000"' in text
        if is_capsule and not (has_html_lock or has_json_lock):
            errors.append(f'NO_LOCK: {rel} — капсула без data-lock="00000" или "lock": "00000"')

# 5. Закон 4 Индекса Утянского v2.6.3: Коллективный Страж Зеркал (Collective Mirror Guard)
manifest_file = os.path.join(ROOT, 'guard_manifest.json')
if not os.path.exists(manifest_file):
    errors.append(
        "NO_MANIFEST: Файл связей 'guard_manifest.json' отсутствует или был удален! "
        "Аппаратный запрет на стирание связей эталонов Индекса Утянского v2.6.3."
    )
else:
    try:
        with open(manifest_file, encoding='utf-8') as mf:
            m_data = json.load(mf)
        pairs = m_data.get('guarded_pairs', [])
        if not pairs:
            errors.append("EMPTY_MANIFEST: Манифест связей пуст! Попытка затереть эталонные связи заблокирована.")
        for pair in pairs:
            w_file = os.path.join(ROOT, pair.get('working_file', ''))
            m_file = os.path.join(ROOT, pair.get('mirror_file', ''))
            if not os.path.exists(w_file):
                errors.append(f"MISSING_WORKING_FILE: Рабочий файл '{pair.get('working_file')}' отсутствует!")
            elif not os.path.exists(m_file):
                errors.append(f"MISSING_MIRROR_FILE: Эталонное зеркало '{pair.get('mirror_file')}' отсутствует!")
            else:
                with open(w_file, encoding='utf-8') as f1, open(m_file, encoding='utf-8') as f2:
                    if f1.read().strip() != f2.read().strip():
                        errors.append(
                            f"MIRROR_TAMPER: [{pair.get('id', 'CANON')}] Файл '{pair.get('working_file')}' "
                            f"не совпадает с эталонным зеркалом '{pair.get('mirror_file')}'! "
                            f"Несанкционированная мутация заблокирована Стражем Утянского v2.6.3."
                        )
    except Exception as ex:
        errors.append(f"MANIFEST_ERR: Ошибка чтения guard_manifest.json: {ex}")

if errors:
    print('\n=== 🛡️ Utyansky Guard v2.6.3: нарушения найдены ===\n')
    for e in errors:
        print(f'  • {e}')
    print(f'\nВсего нарушений: {len(errors)}. Коммит заблокирован.\n')
    sys.exit(1)
else:
    print(f'\nGuard: OK. {len(registry)} слотов, нарушений нет.\n')
    sys.exit(0)
