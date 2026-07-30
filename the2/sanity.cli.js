import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'quhr7leo',
    dataset: 'production'
  },
  studioHost: 'thetwoplanner',
  deployment: {
    appId: 'r3wdsuke8y246hyqwjyk7a9f',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
