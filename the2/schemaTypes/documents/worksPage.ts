import { CaseIcon } from '@sanity/icons/Case'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'worksPage',
  title: 'Our Works Page',
  type: 'document',
  icon: CaseIcon,
  fields: [
    // SECTION 1: HERO SECTION & REGIONAL LISTINGS
    defineField({
      name: 'heroSection',
      title: 'SECTION 1: HERO SECTION & REGIONAL LISTINGS',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'localeString',
            }),
          ],
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'localeString',
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'localeString',
        }),
        defineField({
          name: 'regions',
          title: 'Regional Listings',
          type: 'array',
          of: [defineArrayMember({ type: 'regionGroup' })],
        }),
      ],
    }),

    // SECTION 2: PORTFOLIO GRID & FILTER TABS
    defineField({
      name: 'portfolioSection',
      title: 'SECTION 2: PORTFOLIO GRID & FILTER TABS',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'filterTabs',
          title: 'Filter Tabs Categories',
          description: 'Custom categories for frontend filtering (e.g. all, wedding, events, destination)',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
          initialValue: ['all', 'wedding', 'events', 'destination'],
        }),
        defineField({
          name: 'featuredProjects',
          title: 'Featured Projects (Ordered)',
          description: 'Pin and order specific projects to display first.',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'reference',
              to: [{ type: 'projectItem' }],
            }),
          ],
        }),
      ],
    }),

    // SECTION 3: BOTTOM CONTACT BANNER (PRE-FOOTER CTA)
    defineField({
      name: 'preFooterCtaSection',
      title: 'SECTION 3: BOTTOM CONTACT BANNER (PRE-FOOTER CTA)',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'localeString',
            }),
          ],
        }),
        defineField({
          name: 'headline',
          title: 'Banner Headline',
          type: 'localeString',
        }),
        defineField({
          name: 'ctaButton',
          title: 'CTA Button',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'localeString', validation: (r) => r.required() }),
            defineField({ name: 'link', title: 'Link (URL)', type: 'string', validation: (r) => r.required() }),
          ],
        }),
      ],
    }),

    // SEO Section
    defineField({
      name: 'seoTitle',
      title: 'SEO Page Title',
      type: 'localeString',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Page Description',
      type: 'localeText',
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Social Sharing Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'heroSection.headline.en',
    },
    prepare({ title }) {
      return {
        title: title || 'Our Works Page Content',
        media: CaseIcon,
      }
    },
  },
})
