import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-21'})

const testimonialDoc = {
  _id: 'testimonial.tony-myriam',
  _type: 'testimonial',
  title: 'Tony and Myriam',
  serviceCategory: 'full wedding planning',
  location: 'Saigon',
  year: '2025',
  cardImage: {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-1cb241da07ea438dd0ff75a2790c3abf209a6ec4-1168x1168-jpg',
    },
    alt: 'Tony and Myriam card view portrait',
  },
  shortQuote: 'An intimate cross-cultural celebration bringing together Australian and Indonesian families through warmth, food, music, and connection.',
  heroImage: {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-35de1292fd4e751ee3cb669f2439549b617a0cf1-1280x450-png',
    },
    alt: 'Tony and Myriam wedding high-res horizontal banner',
  },
  detailedQuote: 'We had an absolute dream of a wedding planning experience. The team at The TWO Planner understood our vision from day one and executed it with incredible precision, calmness, and heart. Our families from Australia and Indonesia were blown away by how seamless the entire day felt. Every detail, from the personalized menu cards to the ambient lighting and flow of music, was thoughtfully designed to reflect us. We couldn\'t have asked for a better partner to help start our story.',
  highlightQuote: 'A day that felt exactly like us, held together by real emotion.',
  gallery: [
    {
      _key: 'g1',
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-227a1a8edbef8b15a9c8a59030c2c9efc0d2f0e4-6000x4000-jpg',
      },
      alt: 'Tony and Myriam ceremony setting',
    },
    {
      _key: 'g2',
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-2698bc0525039c05539a3073365f2a878e19041f-6501x4334-jpg',
      },
      alt: 'Dinner tables under warm lights',
    },
    {
      _key: 'g3',
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-310725a2ecf9f6829f3c46a2ff80a23a90f7f9f9-4024x6048-jpg',
      },
      alt: 'Tony and Myriam couple dancing',
    },
    {
      _key: 'g4',
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-35d3313af4bea074a356ccd0acacb9c27373d65e-4182x6273-jpg',
      },
      alt: 'Black and white wedding details portrait',
    },
  ],
  ctaLink: '/our-works',
}

async function run() {
  console.log('Seeding testimonial document...')
  await client.createOrReplace(testimonialDoc)
  console.log('Testimonial seeded successfully!')

  // Update site.about and drafts.site.about
  const docsToUpdate = ['site.about', 'drafts.site.about']
  for (const id of docsToUpdate) {
    try {
      const doc = await client.getDocument(id)
      if (doc) {
        console.log(`Updating document ${id}...`)
        await client
          .patch(id)
          .set({
            'testimonialsSection.testimonialCards': [
              {
                _key: 'ref-tony-myriam',
                _type: 'reference',
                _ref: 'testimonial.tony-myriam',
              },
            ],
          })
          .commit()
        console.log(`Updated ${id} successfully.`)
      } else {
        console.log(`Document ${id} not found, skipping.`)
      }
    } catch (err) {
      console.warn(`Could not update ${id}:`, err.message)
    }
  }
}

run().catch(console.error)
