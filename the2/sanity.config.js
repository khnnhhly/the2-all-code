import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {websiteTool} from './websiteTool'
import {deskStructure} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'the2',

  projectId: 'quhr7leo',
  dataset: 'production',

  plugins: [structureTool({structure: deskStructure}), visionTool(), websiteTool()],

  document: {
    newDocumentOptions: (previous, {creationContext}) =>
      creationContext.type === 'global'
        ? previous.filter((item) => !['siteSettings', 'navigation', 'homePage', 'aboutPage', 'servicesPage', 'worksPage', 'contactPage'].includes(item.templateId))
        : previous,
  },

  schema: {
    types: schemaTypes,
  },
})
