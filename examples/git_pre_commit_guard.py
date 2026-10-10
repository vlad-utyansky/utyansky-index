# -*- coding: utf-8 -*-
"""
🏛️ [IDX: 00000-00027] АППАРАТНЫЙ ПРЕДОХРАНИТЕЛЬ GIT PRE-COMMIT (UTYANSKY PRE-COMMIT GUARD)
Регламент v2.6.2: Контроль коммитов на уровне операционной системы.

Защищает кодовую базу от:
1. Деструктивного массового удаления (> 150 строк / ковровая бомбардировка внешними скриптами).
2. Мутаций и взлома защитных пломб Zero-Trust [IDX: 00000] и капсул 00000_capsules/.
3. Синтаксических ошибок JavaScript (сломанные обработчики, неэкранированные кавычки) через `node --check`.
4. Случайных утечек секретов и API-ключей (sk-, ghp_, private_key).
5. Нарушения предела чистого контекста (Закон Утянского: > 400 строк на файл).

Установка в любой проект:
  cp examples/git_pre_commit_guard.py .git/hooks/pre-commit
  chmod +x .git/hooks/pre-commit
"""

import sys
import os
import subprocess
import re
import tempfile

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

MAX_DELETED_LINES_PER_FILE = 150
MAX_A4_LINES = 400
ALLOW_OVERRIDE_ENV = "ALLOW_MASS_EDIT"

# Общие паттерны утечек секретов для открытых репозиториев
GENERIC_SECRET_PATTERNS = [
    (re.compile(r'ghp_[A-Za-z0-9_]{36}'), "GitHub Personal Access Token"),
    (re.compile(r'sk-[A-Za-z0-9]{32,}'), "OpenAI / OpenRouter API Key"),
    (re.compile(r'AIza[0-9A-Za-z-_]{35}'), "Google Cloud / Gemini API Key"),
    (re.compile(r'-----BEGIN\s+(?:RSA\s+)?PRIVATE\s+KEY-----'), "Private Cryptographic Key")
]

def run_cmd(cmd):
    res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='ignore')
    return res.stdout.strip()

def get_staged_files():
    out = run_cmd(['git', 'diff', '--cached', '--name-only'])
    if not out:
        return []
    return [f.strip() for f in out.split('\n') if f.strip()]

def check_syntax_js_in_html(content, filename):
    """Извлекает inline <script> из html и проверяет через node --check"""
    scripts = re.findall(r'<script\b[^>]*>(.*?)</script>', content, re.DOTALL | re.IGNORECASE)
    for idx, script_body in enumerate(scripts, 1):
        if 'application/ld+json' in script_body or not script_body.strip():
            continue
        with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as tf:
            tf.write(script_body)
            temp_path = tf.name
        try:
            res = subprocess.run(['node', '--check', temp_path], capture_output=True, text=True, encoding='utf-8')
            if res.returncode != 0:
                err = res.stderr.replace(temp_path, f"{filename} (inline script #{idx})")
                return f"Синтаксическая ошибка JS в {filename}:\n{err}"
        finally:
            if os.path.exists(temp_path):
                os.remove(temp_path)
    return None

def check_syntax_js(filepath):
    if not os.path.exists(filepath):
        return None
    res = subprocess.run(['node', '--check', filepath], capture_output=True, text=True, encoding='utf-8')
    if res.returncode != 0:
        return f"Синтаксическая ошибка JS в {filepath}:\n{res.stderr}"
    return None

def main():
    staged_files = get_staged_files()
    if not staged_files:
        return 0

    print("🛡️ [UTYANSKY PRE-COMMIT GUARD v2.6.2] Проверка staged изменений...", flush=True)
    violations = []
    warnings = []
    allow_override = os.environ.get(ALLOW_OVERRIDE_ENV) == "1"

    for rel_path in staged_files:
        norm_path = rel_path.replace('\\', '/')
        if norm_path.endswith('git_pre_commit_guard.py'):
            continue

        # 1. Защита капсул 00000_*
        if '00000_capsules' in norm_path or norm_path.startswith('00000-'):
            if not allow_override:
                violations.append(f"🛑 [ЗАМОК КАПСУЛЫ] Попытка модификации изолированной капсулы: '{rel_path}'. Требуется ALLOW_MASS_EDIT=1.")

        # 2. Проверка объема удалений
        diff_out = run_cmd(['git', 'diff', '--cached', '-U0', '--', rel_path])
        deleted_lines_count = sum(1 for line in diff_out.split('\n') if line.startswith('-') and not line.startswith('---'))

        if deleted_lines_count > MAX_DELETED_LINES_PER_FILE and not allow_override:
            violations.append(
                f"🛑 [АНТИ-БОМБАРДИРОВКА] Файл '{rel_path}': удалено {deleted_lines_count} строк (лимит {MAX_DELETED_LINES_PER_FILE}). "
                f"Защита от неконтролируемой перезаписи кода! Используйте точечный replace."
            )

        # 3. Проверка взлома существующих замков [IDX: 00000]
        for line in diff_out.split('\n'):
            if line.startswith('-') and not line.startswith('---'):
                if 'data-lock="00000"' in line or '[IDX: 00000]' in line or 'data-lock="00000-00000"' in line:
                    if not allow_override:
                        violations.append(
                            f"🛑 [ВЗЛОМ ПЛОМБЫ] В файле '{rel_path}' удалена или модифицирована строка с замком [IDX: 00000]:\n   {line.strip()}"
                        )
                        break

        # 4. Проверка синтаксиса JS
        if os.path.exists(rel_path):
            if rel_path.endswith('.js') or rel_path.endswith('.mjs'):
                err = check_syntax_js(rel_path)
                if err:
                    violations.append(f"🛑 [СИНТАКСИС JS] {err}")
            elif rel_path.endswith('.html') or rel_path.endswith('.htm'):
                try:
                    with open(rel_path, 'r', encoding='utf-8', errors='ignore') as f:
                        html_text = f.read()
                    err = check_syntax_js_in_html(html_text, rel_path)
                    if err:
                        violations.append(f"🛑 [СИНТАКСИС JS] {err}")
                except Exception as ex:
                    warnings.append(f"⚠️ Не удалось прочитать HTML {rel_path}: {ex}")

        # 5. Проверка утечек секретов в staged диффе
        for line in diff_out.split('\n'):
            if line.startswith('+') and not line.startswith('+++'):
                for pattern, desc in GENERIC_SECRET_PATTERNS:
                    if pattern.search(line):
                        violations.append(f"🛑 [УТЕЧКА СЕКРЕТА] Обнаружен {desc} в '{rel_path}':\n   {line[:80].strip()}...")
                        break

        # 6. Предупреждение о превышении 4 Листов А4
        if os.path.exists(rel_path) and not rel_path.endswith(('.json', '.svg', '.png', '.jpg', '.lock', '.min.js', '.min.css')):
            try:
                with open(rel_path, 'r', encoding='utf-8', errors='ignore') as f:
                    line_count = sum(1 for _ in f)
                if line_count > MAX_A4_LINES:
                    warnings.append(f"⚠️ [ЗАКОН УТЯНСКОГО] Файл '{rel_path}' содержит {line_count} строк (рекомендуемый лимит 4 листа А4: ~400 строк). Рекомендуется декомпозиция.")
            except Exception:
                pass

    for w in warnings:
        print(w, flush=True)

    if violations:
        print("\n❌ КОММИТ ЗАБЛОКИРОВАН АППАРАТНЫМ ПРЕДОХРАНИТЕЛЕМ GIT PRE-COMMIT:", flush=True)
        for v in violations:
            print(f"  • {v}", flush=True)
        print("\n💡 Для санкционированного массового рефакторинга выполните:", flush=True)
        print("  Windows PowerShell: $env:ALLOW_MASS_EDIT=\"1\"; git commit ...", flush=True)
        print("  Bash/Linux:         ALLOW_MASS_EDIT=1 git commit ...", flush=True)
        return 1

    print("✅ [UTYANSKY PRE-COMMIT GUARD] Все проверки пройдены успешно.", flush=True)
    return 0

if __name__ == '__main__':
    sys.exit(main())
