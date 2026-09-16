import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-21'})

const singletons = [
  {type: 'siteSettings', id: 'site.settings'},
  {type: 'homePage', id: 'site.home'},
  {type: 'aboutPage', id: 'site.about'},
  {type: 'servicesPage', id: 'site.services'},
  {type: 'worksPage', id: 'site.works'},
  {type: 'contactPage', id: 'site.contact'},
]

const cleanDocument = (document, id) => {
  const {_id, _rev, _createdAt, _updatedAt, ...content} = document
  return {_id: id, _type: document._type, ...content}
}

async function normalizeSingletons() {
  const documents = await client.fetch(
    '*[!(_id in path("drafts.**")) && _type in $types]{_id, _type, _updatedAt, ...}',
    {types: singletons.map((singleton) => singleton.type)},
  )

  const operations = []
  for (const singleton of singletons) {
    const canonical = documents.find((document) => document._id === singleton.id)
    const source = canonical || documents
      .filter((document) => document._type === singleton.type)
      .sort((a, b) => (b._updatedAt || '').localeCompare(a._updatedAt || ''))[0]

    if (!source) {
      console.log(`SKIP ${singleton.type}: chưa có dữ liệu`)
      continue
    }

    if (!canonical) {
      operations.push(client.createOrReplace(cleanDocument(source, singleton.id)))
      console.log(`COPY ${source._id} -> ${singleton.id}`)
    } else {
      console.log(`OK ${singleton.id}`)
    }
  }

  await Promise.all(operations)
  console.log(`Đã chuẩn hóa ${operations.length} singleton document.`)
}

normalizeSingletons().catch((error) => {
  console.error(error)
  process.exitCode = 1
})