# eslint-plugin-single-line-imports

An ESLint plugin to enforce that imports are written on a single line.

## Installation

```bash
npm install --save-dev eslint-plugin-single-line-imports
```

## Configuration

Add the plugin to your ESLint config (`eslint.config.js`):

```javascript
import singleLineImports from 'eslint-plugin-single-line-imports'

export default [
  // ... other configs
  singleLineImports.configs.recommended,
]
```

Or enable the rule manually:

```javascript
import singleLineImports from 'eslint-plugin-single-line-imports'

export default [
  {
    plugins: {
      'single-line-imports': singleLineImports,
    },
    rules: {
      'single-line-imports/enforce-single-line-imports': 'error',
    },
  },
]
```

## Rules

### `enforce-single-line-imports`

Enforces that every `import` declaration fits on a single line. This rule is auto-fixable.

**Bad:**
```typescript
import {
  a,
  b,
  c,
} from 'module'
```

**Good:**
```typescript
import { a, b, c } from 'module'
```

Works with type imports, inline type specifiers, default imports, and mixed forms:

```typescript
import type { A, B } from 'module'
import { a, type A } from 'module'
import defaultExport, { a, b } from 'module'
```

## License

MIT
