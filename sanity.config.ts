import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'portfolio',

  projectId: 'rrt4k613',
  dataset: 'production',

  plugins: [
    structureTool({
      // A custom menu replaces the generated one, so every item is listed here on purpose
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: opens the one Skills document directly instead of a list
            S.listItem()
              .title('Skills')
              .id('skills')
              .child(S.document().schemaType('skills').documentId('skills')),
            // Drag to reorder: the order is saved in each project's orderRank field
            orderableDocumentListDeskItem({type: 'project', title: 'Projects', S, context}),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  // Exactly one `skills` document, with the fixed id "skills"
  document: {
    singletons: ['skills'],
  },
})
