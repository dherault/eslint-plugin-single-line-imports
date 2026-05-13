import { RuleTester } from 'eslint'
import * as tsParser from '@typescript-eslint/parser'

import { enforceSingleLineImports } from './enforce-single-line-imports'

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
})

describe('enforce-single-line-imports', () => {
  ruleTester.run(`Enforce single-line imports`, enforceSingleLineImports, {
    valid: [
      {
        code: 'import { a } from "module"',
      },
      {
        code: 'import { a, b } from "module"',
      },
      {
        code: 'import { a, b, c } from "module"',
      },
      {
        code: 'import type { A } from "module"',
      },
      {
        code: 'import type { A, B } from "module"',
      },
      {
        code: 'import { a, type A } from "module"',
      },
      {
        code: 'import { a, b, type A, type B } from "module"',
      },
      {
        code: 'import defaultExport from "module"',
      },
      {
        code: 'import defaultExport, { a, b } from "module"',
      },
      {
        code: 'import * as ns from "module"',
      },
      {
        code: 'import "module"',
      },
      // Multiple separate single-line imports are fine
      {
        code: 'import { a } from "module-a"\nimport { b } from "module-b"',
      },
    ],
    invalid: [
      // Regular multi-line import
      {
        code: 'import {\n  a,\n  b,\n} from "module"',
        errors: [{ messageId: 'useSingleLineImport' }],
        output: 'import { a, b } from "module"',
      },
      {
        code: 'import {\n  a,\n  b,\n  c,\n} from "module"',
        errors: [{ messageId: 'useSingleLineImport' }],
        output: 'import { a, b, c } from "module"',
      },
      // No trailing comma
      {
        code: 'import {\n  a,\n  b\n} from "module"',
        errors: [{ messageId: 'useSingleLineImport' }],
        output: 'import { a, b } from "module"',
      },
      // Type import multi-line
      {
        code: 'import type {\n  A,\n  B,\n} from "module"',
        errors: [{ messageId: 'useSingleLineImport' }],
        output: 'import type { A, B } from "module"',
      },
      {
        code: 'import type {\n  A,\n  B,\n  C,\n} from "module"',
        errors: [{ messageId: 'useSingleLineImport' }],
        output: 'import type { A, B, C } from "module"',
      },
      // Mixed (inline type) multi-line
      {
        code: 'import {\n  a,\n  type A,\n} from "module"',
        errors: [{ messageId: 'useSingleLineImport' }],
        output: 'import { a, type A } from "module"',
      },
      {
        code: 'import {\n  a,\n  b,\n  type A,\n  type B,\n} from "module"',
        errors: [{ messageId: 'useSingleLineImport' }],
        output: 'import { a, b, type A, type B } from "module"',
      },
      // Default plus named multi-line
      {
        code: 'import defaultExport, {\n  a,\n  b,\n} from "module"',
        errors: [{ messageId: 'useSingleLineImport' }],
        output: 'import defaultExport, { a, b } from "module"',
      },
      // Extra whitespace inside
      {
        code: 'import {\n\n  a,\n\n  b,\n\n} from "module"',
        errors: [{ messageId: 'useSingleLineImport' }],
        output: 'import { a, b } from "module"',
      },
      // Only opening brace on new line
      {
        code: 'import { a,\n  b } from "module"',
        errors: [{ messageId: 'useSingleLineImport' }],
        output: 'import { a, b } from "module"',
      },
    ],
  })
})
