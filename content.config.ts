import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '*.md',
    }),
    // Default examples (English)
    examples: defineCollection({
      type: 'page',
      source: 'examples/*.md',
    }),
    // Localized examples
    examplesDe: defineCollection({
      type: 'page',
      source: 'examples/de/*.md',
    }),
    examplesEs: defineCollection({
      type: 'page',
      source: 'examples/es/*.md',
    }),
    examplesFr: defineCollection({
      type: 'page',
      source: 'examples/fr/*.md',
    }),
    examplesIt: defineCollection({
      type: 'page',
      source: 'examples/it/*.md',
    }),
    examplesJa: defineCollection({
      type: 'page',
      source: 'examples/ja/*.md',
    }),
    examplesNl: defineCollection({
      type: 'page',
      source: 'examples/nl/*.md',
    }),
    examplesPl: defineCollection({
      type: 'page',
      source: 'examples/pl/*.md',
    }),
    examplesPtBr: defineCollection({
      type: 'page',
      source: 'examples/pt-BR/*.md',
    }),
    examplesRu: defineCollection({
      type: 'page',
      source: 'examples/ru/*.md',
    }),
    examplesSv: defineCollection({
      type: 'page',
      source: 'examples/sv/*.md',
    }),
    examplesZhCn: defineCollection({
      type: 'page',
      source: 'examples/zh-CN/*.md',
    }),
  },
})
