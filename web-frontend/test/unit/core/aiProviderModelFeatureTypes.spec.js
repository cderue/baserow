import { getEnabledModelsForAIProviderFeature } from '@baserow/modules/core/aiProviderModelFeatureTypes'

describe('getEnabledModelsForAIProviderFeature', () => {
  test('uses the feature-filtered models when the backend provides them', () => {
    const workspace = {
      generative_ai_models_enabled: {
        openai: ['agent-model', 'other-model'],
      },
      ai_features: {
        ai_agent: {
          models: { openai: ['agent-model'] },
        },
      },
    }

    expect(
      getEnabledModelsForAIProviderFeature(workspace, 'ai_agent')
    ).toEqual({ openai: ['agent-model'] })
  })

  test('falls back to generic models when feature availability is missing', () => {
    const workspace = {
      generative_ai_models_enabled: { openai: ['legacy-model'] },
    }

    expect(
      getEnabledModelsForAIProviderFeature(workspace, 'ai_agent')
    ).toEqual({ openai: ['legacy-model'] })
  })

  test('an explicit empty feature allowlist never falls back to generic models', () => {
    const workspace = {
      generative_ai_models_enabled: { openai: ['updated-legacy-model'] },
      ai_features: {
        ai_agent: { models: {} },
      },
    }

    expect(
      getEnabledModelsForAIProviderFeature(workspace, 'ai_agent')
    ).toEqual({})
  })
})
