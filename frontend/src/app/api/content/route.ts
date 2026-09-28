import {NextResponse} from 'next/server'
import {
  getAboutData,
  getContactData,
  getHomeData,
  getServicesData,
  getWorksData,
} from '../../../lib/sanityFetch'
import {sanityConfig} from '../../../lib/sanity'

export const revalidate = 300

export async function GET() {
  try {
    const [home, about, services, works, contact] = await Promise.all([
      getHomeData(),
      getAboutData(),
      getServicesData(),
      getWorksData(),
      getContactData(),
    ])

    return NextResponse.json(
      {
        settings: home?.settings || about?.settings || services?.settings || works?.settings || contact?.settings || null,
        home: home?.home || null,
        about: about?.about || null,
        services: services?.services || null,
        works: works?.works || null,
        contact: contact?.contact || null,
        testimonials: home?.testimonials || about?.testimonials || [],
        projects: works?.projects || home?.projects || [],
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
          'X-Sanity-Project': sanityConfig.projectId,
          'X-Sanity-Dataset': sanityConfig.dataset,
          'X-Sanity-Read-Token': sanityConfig.hasReadToken ? 'configured' : 'missing',
        },
      },
    )
  } catch (error) {
    console.error('Content API error:', error)
    return NextResponse.json({message: 'Unable to load website content'}, {status: 500})
  }
}