import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { websiteTool } from './websiteTool'
import { deskStructure } from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'the2',

  projectId: 'quhr7leo',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    // Click any text or image on the live site and edit it in place. Points at
    // localhost during development and the deployed site otherwise; the target
    // turns on Next's draft mode so unpublished edits are visible.
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'https://thetwo.site',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool(),
    websiteTool(),
  ],

  document: {
    newDocumentOptions: (previous, { creationContext }) =>
      creationContext.type === 'global'
        ? previous.filter(
            (item) =>
              ![
                'siteSettings',
                'homePage',
                'aboutPage',
                'servicesPage',
                'worksPage',
                'contactPage',
              ].includes(item.templateId)
          )
        : previous,
  },

  schema: {
    types: schemaTypes,
  },
})
