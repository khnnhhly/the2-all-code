import fs from 'node:fs/promises'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-21'})
const cache = new Map()
const pt = (text) => !text ? undefined : String(text).split(/\n\s*\n/).filter(Boolean).map((value, index) => ({_key: `b${index}`, _type: 'block', style: 'normal', markDefs: [], children: [{_key: `s${index}`, _type: 'span', marks: [], text: value}]}))

async function image(value) {
  if (!value?.src) return undefined
  if (cache.has(value.src)) return cache.get(value.src)
  let bytes, filename
  if (/^https?:\/\//.test(value.src)) {
    const response = await fetch(value.src)
    if (!response.ok) throw new Error(`Không tải được ảnh ${value.src}`)
    bytes = Buffer.from(await response.arrayBuffer())
    filename = new URL(value.src).pathname.split('/').pop() || 'image'
  } else { bytes = await fs.readFile(path.resolve(value.src)); filename = path.basename(value.src) }
  const asset = await client.assets.upload('image', bytes, {filename})
  const result = {_type: 'imageWithMeta', image: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}, alt: value.alt || '', caption: value.caption}
  cache.set(value.src, result)
  return result
}
async function images(record) {
  const value = {...record}
  for (const key of Object.keys(value)) {
    if (key.toLowerCase().includes('image') && value[key]?.src) value[key] = await image(value[key])
    if (key === 'gallery' && Array.isArray(value[key])) value[key] = await Promise.all(value[key].map(image))
  }
  return value
}
const ref = (id) => id ? {_type: 'reference', _ref: id} : undefined

async function run() {
  const file = path.resolve('migration/source/content.json')
  let data
  try { data = JSON.parse(await fs.readFile(file, 'utf8')) } catch { throw new Error(`Tạo ${file} từ migration/content.template.json trước.`) }
  const serviceIds = new Map((data.services || []).map((x) => [x.slug, `migration.service.${x.slug}`]))
  const projectIds = new Map((data.projects || []).map((x) => [x.slug, `migration.project.${x.slug}`]))
  for (const source of data.services || []) { const x = await images(source); await client.createOrReplace({_id: serviceIds.get(source.slug), _type: 'service', ...x, body: pt(x.body), relatedProjects: (source.relatedProjectSlugs || []).map((s) => ref(projectIds.get(s))).filter(Boolean)}) }
  for (const source of data.projects || []) { const x = await images(source); await client.createOrReplace({_id: projectIds.get(source.slug), _type: 'project', ...x, story: pt(x.story), services: (source.serviceSlugs || []).map((s) => ref(serviceIds.get(s))).filter(Boolean)}) }
  const home = await images(data.home || {}); await client.createOrReplace({_id: 'site.home', _type: 'homePage', ...home, introduction: pt(home.introduction), featuredServices: (data.home?.featuredServiceSlugs || []).map((s) => ref(serviceIds.get(s))).filter(Boolean), featuredProjects: (data.home?.featuredProjectSlugs || []).map((s) => ref(projectIds.get(s))).filter(Boolean)})
  const about = await images(data.about || {}); await client.createOrReplace({_id: 'site.about', _type: 'aboutPage', ...about, story: pt(about.story)})
  await client.createOrReplace({_id: 'site.contact', _type: 'contactPage', ...(await images(data.contact || {}))})
  await client.createOrReplace({_id: 'site.settings', _type: 'siteSettings', ...(await images(data.settings || {}))})
  await client.createOrReplace({_id: 'site.navigation', _type: 'navigation', ...(data.navigation || {})})
  console.log(`Đã import ${serviceIds.size} dịch vụ và ${projectIds.size} dự án.`)
}
run().catch((error) => { console.error(error); process.exitCode = 1 })
