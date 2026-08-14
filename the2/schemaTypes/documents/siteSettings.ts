import { CogIcon } from '@sanity/icons/Cog'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Cài đặt website (Settings)',
  type: 'document',
  icon: CogIcon,
  fields: [
    // Header
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Header Logo',
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
      name: 'headerNavigation',
      title: 'Header Navigation Links',
      type: 'array',
      of: [defineArrayMember({ type: 'navItem' })],
    }),

    // Language switcher config
    defineField({
      name: 'languageSwitcher',
      title: 'Language Switcher Config',
      type: 'object',
      fields: [
        defineField({
          name: 'defaultLanguage',
          title: 'Default Language Code',
          type: 'string',
          initialValue: 'vi',
        }),
        defineField({
          name: 'languages',
          title: 'Languages List',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'code', title: 'Language Code (e.g. en, vi)', type: 'string', validation: (r) => r.required() }),
                defineField({ name: 'label', title: 'Language Label (e.g. English, Tiếng Việt)', type: 'string', validation: (r) => r.required() }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Footer Brand Column
    defineField({
      name: 'footerBrandLogo',
      title: 'Footer Brand Logo Image',
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
      name: 'footerBrandTagline',
      title: 'Footer Brand Tagline / Short Bio',
      type: 'localeText',
    }),

    // Footer Navigation Columns
    defineField({
      name: 'exploreLinks',
      title: 'Footer Explore Links',
      type: 'array',
      of: [defineArrayMember({ type: 'navItem' })],
    }),
    defineField({
      name: 'servicesLinks',
      title: 'Footer Services Links',
      type: 'array',
      of: [defineArrayMember({ type: 'navItem' })],
    }),

    // Footer Contact Info Column
    defineField({
      name: 'email',
      title: 'Contact Email Address',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'phones',
      title: 'Contact Phone Numbers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'phoneNumber',
              title: 'Phone Number',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Name/Label (e.g. Ly, Nhi)',
              type: 'localeString',
            }),
          ],
          preview: {
            select: {
              title: 'phoneNumber',
              subtitle: 'label.en',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Profile Link',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Office Location Text & Note',
      description: 'E.g., "Based in Vietnam - Available for destination celebrations worldwide"',
      type: 'localeText',
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'localeString',
    }),

    // Meta SEO fields
    defineField({
      name: 'seoTitle',
      title: 'Default SEO Title',
      type: 'localeString',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Default SEO Description',
      type: 'localeText',
    }),
    defineField({
      name: 'seoImage',
      title: 'Default SEO Share Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'brandName',
    },
    prepare({ title }) {
      return {
        title: title || 'Global Settings',
        media: CogIcon,
      }
    },
  },
})
