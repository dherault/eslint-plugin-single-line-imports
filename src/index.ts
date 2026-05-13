import { enforceSingleLineImports } from './rules/enforce-single-line-imports'
import type {Config} from 'eslint/config'

type ConfigurationName = 'recommended'

const plugin = {
  meta: {
    name: 'eslint-plugin-single-line-imports',
    version: '1.0.0',
  },
  rules: {
    'enforce-single-line-imports': enforceSingleLineImports,
  },
  configs: {} as Record<ConfigurationName, Config>,
}

Object.assign(plugin.configs, {
  recommended: {
    plugins: {
      'single-line-imports': plugin,
    },
    rules: {
      'single-line-imports/enforce-single-line-imports': 'error',
    },
  },
})

export default plugin
