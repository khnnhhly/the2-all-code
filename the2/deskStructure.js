const singleton = (S, typeName, title, documentId) =>
  S.listItem().title(title).child(S.document().schemaType(typeName).documentId(documentId).title(title))

export const deskStructure = (S) =>
  S.list()
    .title('Nội dung website')
    .items([
      singleton(S, 'siteSettings', 'Cài đặt website', 'site.settings'),
      singleton(S, 'navigation', 'Menu & Footer', 'site.navigation'),
      S.divider(),
      singleton(S, 'homePage', '1. Trang Chủ (Home)', 'site.home'),
      singleton(S, 'aboutPage', '2. Về Chúng Tôi (About Us)', 'site.about'),
      S.listItem().title('3. Dịch vụ (Services)').child(S.list().title('Dịch vụ').items([
        singleton(S, 'servicesPage', 'Nội dung trang Dịch vụ', 'site.services'),
        S.divider(),
        S.documentTypeListItem('service').title('Danh sách dịch vụ'),
      ])),
      S.listItem().title('4. Dự án Đã Làm (Our Works)').child(S.list().title('Dự án đã làm').items([
        singleton(S, 'worksPage', 'Nội dung trang Dự án', 'site.works'),
        S.divider(),
        S.documentTypeListItem('project').title('Danh sách dự án'),
      ])),
      singleton(S, 'contactPage', '5. Liên Hệ (Contact)', 'site.contact'),
    ])
