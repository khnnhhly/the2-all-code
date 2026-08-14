import type { StructureResolver } from 'sanity/structure'
import { CogIcon } from '@sanity/icons/Cog'
import { HomeIcon } from '@sanity/icons/Home'
import { InfoOutlineIcon } from '@sanity/icons/InfoOutline'
import { DocumentIcon } from '@sanity/icons/Document'
import { CaseIcon } from '@sanity/icons/Case'
import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { UlistIcon } from '@sanity/icons/Ulist'
import { CommentIcon } from '@sanity/icons/Comment'

const singleton = (S: any, typeName: string, title: string, documentId: string, icon: any) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(documentId)
        .title(title)
    )

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Nội dung website')
    .items([
      // 1. Pages directory (WordPress Style)
      S.listItem()
        .title('Trang (Pages)')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Danh sách trang')
            .items([
              // Singletons
              singleton(S, 'homePage', 'Trang chủ (Home)', 'site.home', HomeIcon),
              singleton(S, 'aboutPage', 'Về chúng tôi (About Us)', 'site.about', InfoOutlineIcon),
              singleton(S, 'servicesPage', 'Dịch vụ & Gói (Services)', 'site.services', DocumentIcon),
              singleton(S, 'worksPage', 'Trang portfolio (Our Works)', 'site.works', DocumentIcon),
              singleton(S, 'contactPage', 'Liên hệ (Contact)', 'site.contact', EnvelopeIcon),
              S.divider(),
              // Dynamic WP-style pages
              S.documentTypeListItem('page')
                .title('Tất cả trang tĩnh (All Pages)')
                .icon(UlistIcon),
            ])
        ),

      S.divider(),

      // 2. Our Works / Case Studies dynamic list
      S.listItem()
        .title('Dự án đã làm (Our Works)')
        .icon(CaseIcon)
        .child(
          S.documentTypeList('projectItem')
            .title('Danh sách dự án')
        ),

      // 3. Service Packages List
      S.listItem()
        .title('Gói dịch vụ (Service Items)')
        .icon(DocumentIcon)
        .child(
          S.documentTypeList('serviceItem')
            .title('Danh sách gói dịch vụ')
        ),

      // 4. Testimonials List
      S.listItem()
        .title('Chia sẻ từ khách hàng (Testimonials)')
        .icon(CommentIcon)
        .child(
          S.documentTypeList('testimonial')
            .title('Danh sách chia sẻ')
        ),

      S.divider(),

      // 5. Global Settings (ACF settings style)
      singleton(S, 'siteSettings', 'Cài đặt hệ thống (Site Settings)', 'site.settings', CogIcon),

      // Hide all explicit document types from catch-all list to keep everything clean
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['siteSettings', 'homePage', 'aboutPage', 'servicesPage', 'worksPage', 'contactPage', 'projectItem', 'serviceItem', 'page', 'navigation', 'service', 'project', 'author', 'post', 'category', 'blockContent', 'imageWithMeta', 'responsiveImage', 'link', 'seo', 'testimonial'].includes(
            listItem.getId() as string
          )
      ),
    ])
