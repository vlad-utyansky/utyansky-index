/**
 * Utyansky Index v2.5 Industrial Edition (Vibe Coding Iron Dome)
 * Module: [IDX: 10450] Deterministic AST Slot Isolation & Zero-Trust Engine
 * 
 * Rospatent State Reg. Application: № 2026603415 (Gosuslugi Docket: 7927650015)
 * License: MIT
 * 
 * Industrial Features:
 * 1. Physical O(1) LLM context window isolation (sub-tree extraction).
 * 2. Top-level ImportDeclaration harvesting for dependency context.
 * 3. [ERR: 10452] Fail-safe check for missing coordinates.
 * 4. [ERR: 10451] Defensive auto-healing & validation of root data-idx coordinate integrity.
 * 5. [ERR: 10454] Zero-Trust Lock Guard: blocks unmandated writes to data-lock="00000" sealed slots.
 * 6. Deterministic AST replacement via replaceWith (anti-regression lock).
 */

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default || require('@babel/traverse');
const generate = require('@babel/generator').default || require('@babel/generator');
const t = require('@babel/types');

/**
 * 1. Extracts strictly the isolated AST subtree of targetIdx along with imports.
 * @param {string} sourceCode - Full source code of the component.
 * @param {string|number} targetIdx - 5-digit Utyansky Index (e.g. 71080).
 * @returns {object} { isolatedSlotCode, imports, targetIdx, isLocked, ast }
 */
function extractSlotAST(sourceCode, targetIdx) {
  const normalizedIdx = String(targetIdx);
  
  const ast = parser.parse(sourceCode, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
  });

  const imports = [];
  let isolatedSlotCode = null;
  let isLocked = false;
  let found = false;

  traverse(ast, {
    // Collect top-level imports for context awareness
    ImportDeclaration(path) {
      imports.push(generate(path.node).code);
    },

    JSXOpeningElement(path) {
      const idxAttr = path.node.attributes.find(
        attr => attr.name && attr.name.name === 'data-idx' && 
        ((attr.value && attr.value.value === normalizedIdx) || 
         (attr.value && attr.value.expression && attr.value.expression.value === normalizedIdx))
      );

      if (idxAttr) {
        found = true;
        // Check for Zero-Trust lock
        const lockAttr = path.node.attributes.find(
          attr => attr.name && attr.name.name === 'data-lock' &&
          ((attr.value && attr.value.value === '00000') ||
           (attr.value && attr.value.expression && attr.value.expression.value === '00000'))
        );
        if (lockAttr) {
          isLocked = true;
        }

        const slotElement = path.parentPath.node;
        isolatedSlotCode = generate(slotElement).code;
        path.stop(); // Immediate O(1) cutoff
      }
    }
  });

  if (!found || !isolatedSlotCode) {
    throw new Error(`[ERR: 10452] Target coordinate [IDX: ${normalizedIdx}] not found in source AST.`);
  }

  return {
    isolatedSlotCode,
    imports,
    targetIdx: normalizedIdx,
    isLocked,
    ast
  };
}

/**
 * 2. Injects LLM modified slot deterministically back into source AST.
 * Enforces [ERR: 10451] coordinate retention lock & [ERR: 10454] Zero-Trust seal protection.
 * @param {object} ast - Parsed Babel AST.
 * @param {string|number} targetIdx - 5-digit Utyansky Index.
 * @param {string} newSlotCode - LLM response containing modified JSX element.
 * @param {boolean} allowOverrideLock - Explicit developer consent to edit data-lock="00000" slot.
 * @returns {object} { updatedCode, success: true }
 */
function injectModifiedSlot(ast, targetIdx, newSlotCode, allowOverrideLock = false) {
  const normalizedIdx = String(targetIdx);
  
  // Expression parser strictly isolates expressions and blocks root statement injections
  const newSubAst = parser.parseExpression(newSlotCode, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
  });

  // [ERR: 10451] Defensive verification of root coordinate persistence
  let hasValidIdx = false;
  if (newSubAst.openingElement && newSubAst.openingElement.attributes) {
    const idxAttr = newSubAst.openingElement.attributes.find(
      attr => attr.name && attr.name.name === 'data-idx'
    );
    if (idxAttr && (idxAttr.value.value === normalizedIdx || (idxAttr.value.expression && idxAttr.value.expression.value === normalizedIdx))) {
      hasValidIdx = true;
    } else if (!idxAttr) {
      // Auto-healing: If LLM dropped data-idx, restore it automatically
      newSubAst.openingElement.attributes.unshift(
        t.jsxAttribute(t.jsxIdentifier('data-idx'), t.stringLiteral(normalizedIdx))
      );
      hasValidIdx = true;
    }
  }

  if (!hasValidIdx) {
    throw new Error(`[ERR: 10451] LLM replacement violates coordinate integrity for [IDX: ${normalizedIdx}].`);
  }

  let replaced = false;

  traverse(ast, {
    JSXOpeningElement(path) {
      const idxAttr = path.node.attributes.find(
        attr => attr.name && attr.name.name === 'data-idx' && 
        ((attr.value && attr.value.value === normalizedIdx) || 
         (attr.value && attr.value.expression && attr.value.expression.value === normalizedIdx))
      );

      if (idxAttr) {
        // [ERR: 10454] Zero-Trust Seal Check
        const lockAttr = path.node.attributes.find(
          attr => attr.name && attr.name.name === 'data-lock' &&
          ((attr.value && attr.value.value === '00000') ||
           (attr.value && attr.value.expression && attr.value.expression.value === '00000'))
        );

        if (lockAttr && !allowOverrideLock) {
          throw new Error(`[ERR: 10454] Slot [IDX: ${normalizedIdx}] is sealed with data-lock="00000". Explicit developer override required.`);
        }

        path.parentPath.replaceWith(newSubAst);
        replaced = true;
        path.stop();
      }
    }
  });

  if (!replaced) {
    throw new Error(`[ERR: 10453] Failed to inject replacement into coordinate [IDX: ${normalizedIdx}].`);
  }

  const updatedCode = generate(ast, { retainLines: false }).code;
  return { updatedCode, success: true };
}

module.exports = {
  extractSlotAST,
  injectModifiedSlot
};
