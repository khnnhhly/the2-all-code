import {imageWithMeta, link, responsiveImage, seo} from './shared'
import {about, contact, home, navigation, project, service, servicesPage, siteSettings, worksPage} from './pages'
import blockContent from './blockContent'

export const schemaTypes = [
  imageWithMeta, responsiveImage, link, seo,
  blockContent,
  siteSettings, navigation,
  home, about, servicesPage, service, worksPage, project, contact,
]
