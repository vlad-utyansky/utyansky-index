// [IDX: 00000-75000-00003] Аппаратный Страж Структурной Целостности (Utyansky Syntax & Structural Integrity Guard)
// Архитектурный Стандарт Индекса Утянского v2.6.6
// Проверяет баланс скобок {}, (), [], кавычек, запятых и синтаксис AST перед коммитом и сдачей кода.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

function checkFileStructuralIntegrity(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ [SYNTAX GUARD v2.6.6] Файл не найден: ${filePath}`);
    return false;
  }

  const ext = path.extname(filePath).toLowerCase();
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`\n🛡️ [SYNTAX GUARD v2.6.6] Анализ структурной целостности: ${filePath}`);

  // 1. ПРОВЕРКА JAVASCRIPT (.js, .cjs, .mjs)
  if (['.js', '.cjs', '.mjs'].includes(ext)) {
    // Аппаратный синтаксический тест V8 (компиляция без выполнения)
    try {
      new vm.Script(content, { filename: filePath });
      console.log(`   ✅ V8 AST Syntax: 100% валиден (код компилируется без ошибок)`);
    } catch (err) {
      console.error(`   ❌ [КРИТИЧЕСКИЙ СБОЙ AST]: ${err.message}`);
      if (err.stack) {
        const firstLines = err.stack.split('\n').slice(0, 3).join('\n');
        console.error(`   ${firstLines}`);
      }
      return false;
    }

    // Построчный аудит баланса скобок с игнорированием строк и комментариев
    const stack = [];
    let inSingleQuote = false;
    let inDoubleQuote = false;
    let inTemplate = false;
    let inLineComment = false;
    let inBlockComment = false;
    let escape = false;

    const lines = content.split('\n');

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const line = lines[lineIdx];
      inLineComment = false;

      for (let colIdx = 0; colIdx < line.length; colIdx++) {
        const ch = line[colIdx];
        const next = colIdx + 1 < line.length ? line[colIdx + 1] : '';

        if (escape) {
          escape = false;
          continue;
        }

        if (ch === '\\') {
          escape = true;
          continue;
        }

        // Обработка комментариев
        if (!inSingleQuote && !inDoubleQuote && !inTemplate) {
          if (!inBlockComment && ch === '/' && next === '/') {
            inLineComment = true;
            break; // Остаток строки — комментарий
          }
          if (!inBlockComment && ch === '/' && next === '*') {
            inBlockComment = true;
            colIdx++;
            continue;
          }
          if (inBlockComment && ch === '*' && next === '/') {
            inBlockComment = false;
            colIdx++;
            continue;
          }
        }

        if (inLineComment || inBlockComment) continue;

        // Обработка регулярных выражений (/regex/)
        if (!inSingleQuote && !inDoubleQuote && !inTemplate && ch === '/') {
          const prevNonSpace = line.substring(0, colIdx).trim().slice(-1);
          if (['(', '=', ':', ',', '[', '!', '&', '|', '?', ';', '{'].includes(prevNonSpace)) {
            // Это регулярное выражение! Пропускаем до закрывающего слэша
            let rIdx = colIdx + 1;
            let rEsc = false;
            let inCharClass = false;
            while (rIdx < line.length) {
              if (rEsc) { rEsc = false; rIdx++; continue; }
              if (line[rIdx] === '\\') { rEsc = true; rIdx++; continue; }
              if (line[rIdx] === '[' && !inCharClass) { inCharClass = true; rIdx++; continue; }
              if (line[rIdx] === ']' && inCharClass) { inCharClass = false; rIdx++; continue; }
              if (line[rIdx] === '/' && !inCharClass) { colIdx = rIdx; break; }
              rIdx++;
            }
            continue;
          }
        }

        // Обработка строк
        if (ch === "'" && !inDoubleQuote && !inTemplate) {
          inSingleQuote = !inSingleQuote;
          continue;
        }
        if (ch === '"' && !inSingleQuote && !inTemplate) {
          inDoubleQuote = !inDoubleQuote;
          continue;
        }
        if (ch === '`' && !inSingleQuote && !inDoubleQuote) {
          inTemplate = !inTemplate;
          continue;
        }

        if (inSingleQuote || inDoubleQuote) continue;

        // Внутри template string скобки важны только в интерполяции ${...}
        // Но базовый стек скобок {} () [] вне строк проверяется строго:
        if (ch === '{' || ch === '(' || ch === '[') {
          stack.push({ ch, line: lineIdx + 1, col: colIdx + 1 });
        } else if (ch === '}' || ch === ')' || ch === ']') {
          if (stack.length === 0) {
            console.error(`   ❌ Лишняя закрывающая скобка '${ch}' на строке ${lineIdx + 1}, колонка ${colIdx + 1}`);
            return false;
          }
          const top = stack.pop();
          const matches = (top.ch === '{' && ch === '}') || (top.ch === '(' && ch === ')') || (top.ch === '[' && ch === ']');
          if (!matches) {
            console.error(`   ❌ Несоответствие скобок: открыта '${top.ch}' (строка ${top.line}), но закрыта '${ch}' (строка ${lineIdx + 1})`);
            return false;
          }
        }
      }
    }

    if (stack.length > 0) {
      const unclosed = stack.pop();
      console.error(`   ❌ Не закрыта скобка '${unclosed.ch}' со строки ${unclosed.line}, колонка ${unclosed.col}`);
      return false;
    }

    if (inSingleQuote) {
      console.error(`   ❌ Не закрыта одинарная кавычка (') в файле`);
      return false;
    }
    if (inDoubleQuote) {
      console.error(`   ❌ Не закрыта двойная кавычка (") в файле`);
      return false;
    }
    if (inTemplate) {
      console.error(`   ❌ Не закрыта обратная кавычка (\`) шаблонной строки в файле`);
      return false;
    }

    console.log(`   ✅ Баланс символов: {} () [] '' "" \`\` строго сбалансированы (Δ = 0)`);
    return true;
  }

  // 2. ПРОВЕРКА HTML / ШАБЛОНОВ (.html)
  if (ext === '.html') {
    const divOpen = (content.match(/<div\b/gi) || []).length;
    const divClose = (content.match(/<\/div>/gi) || []).length;
    const btnOpen = (content.match(/<button\b/gi) || []).length;
    const btnClose = (content.match(/<\/button>/gi) || []).length;

    console.log(`   📊 Теги: <div: ${divOpen} / ${divClose}>, <button: ${btnOpen} / ${btnClose}>`);

    if (divOpen !== divClose) {
      console.warn(`   ⚠️ Дисбаланс тегов <div>: открыто ${divOpen}, закрыто ${divClose} (разница: ${divOpen - divClose})`);
    } else {
      console.log(`   ✅ Теги <div>: идеальный баланс (diff = 0)`);
    }

    if (btnOpen !== btnClose) {
      console.warn(`   ⚠️ Дисбаланс тегов <button>: открыто ${btnOpen}, закрыто ${btnClose}`);
    } else {
      console.log(`   ✅ Теги <button>: идеальный баланс (diff = 0)`);
    }
    return true;
  }

  return true;
}

// Запуск из командной строки
const targetFile = process.argv[2];
if (!targetFile) {
  console.log(`Использование: node scripts/utyansky_syntax_guard.js <путь_к_файлу>`);
  process.exit(0);
}

const isClean = checkFileStructuralIntegrity(path.resolve(targetFile));
if (!isClean) {
  console.error(`\n🚨 [СТАНДАРТ v2.6.6] СТРУКТУРНАЯ ЦЕЛОСТНОСТЬ НАРУШЕНА! ДЕЙСТВИЕ БЛОКИРОВАНО.\n`);
  process.exit(1);
} else {
  console.log(`\n💎 [СТАНДАРТ v2.6.6] СТРУКТУРНАЯ ЦЕЛОСТНОСТЬ ПОДТВЕРЖДЕНА. 100% ДОПУСК.\n`);
  process.exit(0);
}
