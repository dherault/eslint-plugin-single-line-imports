import type { Rule } from 'eslint'

export const enforceSingleLineImports: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce single line imports',
      recommended: true,
      url: 'https://github.com/dherault/eslint-plugin-single-line-imports',
    },
    fixable: 'code',
    schema: [
      {
        type: 'array',
        items: {
          type: 'string',
        },
        uniqueItems: true,
      },
    ],
    messages: {
      useSingleLineImport: 'Imports should take a single line.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode

    return {
      ImportDeclaration(node) {
        if (node.loc && node.loc.start.line === node.loc.end.line) {
          return
        }

        context.report({
          node,
          messageId: 'useSingleLineImport',
          fix(fixer) {
            const importText = sourceCode.getText(node)
            const openBraceIndex = importText.indexOf('{')
            const closeBraceIndex = importText.lastIndexOf('}')

            if (openBraceIndex === -1 || closeBraceIndex === -1 || closeBraceIndex < openBraceIndex) {
              return fixer.replaceText(node, importText.replace(/\s+/g, ' ').trim())
            }

            const beforeBrace = importText.slice(0, openBraceIndex)
            const insideBraces = importText.slice(openBraceIndex + 1, closeBraceIndex)
            const afterBrace = importText.slice(closeBraceIndex + 1)

            const specifiers = insideBraces
              .split(',')
              .map((specifier) => specifier.replace(/\s+/g, ' ').trim())
              .filter((specifier) => specifier.length > 0)

            const fixedBeforeBrace = beforeBrace.replace(/\s+/g, ' ').replace(/\s*$/, ' ')
            const fixedAfterBrace = afterBrace.replace(/\s+/g, ' ').replace(/^\s*/, ' ')

            return fixer.replaceText(
              node,
              `${fixedBeforeBrace}{ ${specifiers.join(', ')} }${fixedAfterBrace}`,
            )
          },
        })
      },
    }
  },
}
