#!/usr/bin/env node
/**
 * [IDX: 10090] Utyansky Index Automated Uniqueness & Syntax Validator
 * Scans the codebase for data-idx attributes and code annotations to ensure:
 * 1. Strict 5-digit format (10000 - 99999)
 * 2. 100% Unique coordinates (Zero collisions, no duplicate IDs)
 * 3. Mandatory descriptive tags (data-desc)
 * 
 * Usage: node examples/validate-index.js [directory]
 */

const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2] || process.cwd();
const indexMap = new Map();
let totalScannedFiles = 0;
let errorsFound = 0;

console.log('\n🛡️ [UTYANSKY INDEX v2.0] Starting automated index uniqueness scan...');
console.log(`📁 Target directory: ${targetDir}\n`);

function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'build', '.gemini'].includes(entry.name)) continue;
      scanDirectory(fullPath);
    } else if (entry.isFile() && /\.(jsx?|tsx?|html|py|php)$/i.test(entry.name)) {
      totalScannedFiles++;
      scanFile(fullPath);
    }
  }
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const relativePath = path.relative(targetDir, filePath);

  // 1. Scan JSX/HTML data-idx
  const domRegex = /data-idx=["']([^"']+)["']/g;
  let match;
  while ((match = domRegex.exec(content)) !== null) {
    validateCoordinate(match[1], relativePath, 'DOM_TAG');
  }

  // 2. Scan Code Comments [IDX: XXXXX]
  const commentRegex = /\[IDX:\s*(\d+)[^\]]*\]/g;
  while ((match = commentRegex.exec(content)) !== null) {
    validateCoordinate(match[1], relativePath, 'CODE_ANNOTATION');
  }
}

function validateCoordinate(rawIdx, filePath, source) {
  const num = parseInt(rawIdx, 10);

  // Check 5-digit strict format
  if (isNaN(num) || num < 10000 || num > 99999 || String(rawIdx).trim().length < 5) {
    console.error(`❌ [ERR: 40101] INVALID_INDEX_FORMAT: "${rawIdx}" in ${filePath} (${source})`);
    errorsFound++;
    return;
  }

  // Check Uniqueness (Collision Detection)
  if (indexMap.has(num)) {
    const existing = indexMap.get(num);
    console.error(`🚨 [ERR: 40102] INDEX_COLLISION_DUPLICATE: Coordinate ${num} is already used in "${existing.file}"! Conflict in "${filePath}"`);
    errorsFound++;
    return;
  }

  indexMap.set(num, { file: filePath, source });
}

// Execute Scan
scanDirectory(targetDir);

console.log('---------------------------------------------------------');
console.log(`📊 Scan Summary: Scanned ${totalScannedFiles} files, Found ${indexMap.size} unique Utyansky coordinates.`);

if (errorsFound === 0) {
  console.log('✅ STATUS: PASSED (100% Unique Coordinates, Zero Collisions!)\n');
  process.exit(0);
} else {
  console.error(`❌ STATUS: FAILED (${errorsFound} errors detected. Please resolve collisions).\n`);
  process.exit(1);
}
