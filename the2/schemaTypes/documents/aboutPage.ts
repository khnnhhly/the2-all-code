import { InfoOutlineIcon } from '@sanity/icons/InfoOutline'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Us Page',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    // SECTION 1: HERO SECTION
    defineField({
      name: 'heroSection',
      title: 'SECTION 1: HERO SECTION',
      type: 'object',
      options: { collapsible: true, collapsed: false },
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
          name: 'overlayOpacity',
          title: 'Overlay Opacity (%)',
          description: 'Dark overlay opacity behind text (0 to 100, step 5)',
          type: 'number',
          initialValue: 30,
          validation: (rule) => rule.min(0).max(100).precision(0).custom((val) => {
            if (val !== undefined && val % 5 !== 0) return 'Must be a multiple of 5'
            return true
          }),
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
      ],
    }),

    // SECTION 2: MISSION & VISION
    defineField({
      name: 'missionVisionSection',
      title: 'SECTION 2: MISSION & VISION',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'mission',
          title: 'Mission Block',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'localeString',
              initialValue: {
                en: 'Mission',
                vi: 'Sứ mệnh',
              },
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'localeText',
            }),
          ],
        }),
        defineField({
          name: 'vision',
          title: 'Vision Block',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'localeString',
              initialValue: {
                en: 'Vision',
                vi: 'Tầm nhìn',
              },
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'localeText',
            }),
          ],
        }),
      ],
    }),

    // SECTION 3: TESTIMONIALS GRID
    defineField({
      name: 'testimonialsSection',
      title: 'SECTION 3: TESTIMONIALS GRID',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'categoryTag',
          title: 'Category Tag',
          type: 'localeString',
          initialValue: {
            en: 'testimonials',
            vi: 'lời chứng thực',
          },
        }),
        defineField({
          name: 'mainHeadline',
          title: 'Main Headline',
          type: 'localeString',
        }),
        defineField({
          name: 'testimonialCards',
          title: 'Testimonial Cards Grid',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'reference',
              to: [{ type: 'testimonial' }],
            }),
          ],
        }),
      ],
    }),

    // SECTION 4: OUR TEAM
    defineField({
      name: 'teamSection',
      title: 'SECTION 4: OUR TEAM',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'categoryTag',
          title: 'Category Tag',
          type: 'localeString',
          initialValue: {
            en: 'our team',
            vi: 'đội ngũ',
          },
        }),
        defineField({
          name: 'mainHeadline',
          title: 'Main Headline',
          type: 'localeString',
        }),
        defineField({
          name: 'members',
          title: 'Team Members',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'teamMember',
              title: 'Team Member',
              type: 'object',
              fields: [
                defineField({
                  name: 'fullName',
                  title: 'Full Name',
                  type: 'string',
                  validation: (r) => r.required(),
                }),
                defineField({
                  name: 'role',
                  title: 'Role',
                  type: 'localeString',
                }),
                defineField({
                  name: 'portrait',
                  title: 'Portrait Image',
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
                  name: 'stats',
                  title: 'Stats / Experience',
                  type: 'localeString',
                }),
                defineField({
                  name: 'strengths',
                  title: 'Strengths',
                  type: 'localeString',
                }),
                defineField({
                  name: 'bio1',
                  title: 'Biography Paragraph 1',
                  type: 'localeText',
                }),
                defineField({
                  name: 'bio2',
                  title: 'Biography Paragraph 2',
                  type: 'localeText',
                }),
                defineField({
                  name: 'bio3',
                  title: 'Biography Paragraph 3',
                  type: 'localeText',
                }),
                defineField({
                  name: 'quote',
                  title: 'Personal Quote',
                  type: 'localeString',
                }),
              ],
              preview: {
                select: {
                  title: 'fullName',
                  subtitle: 'role.en',
                  media: 'portrait',
                },
              },
            }),
          ],
        }),
      ],
    }),

    // SECTION 5: BOTTOM CONTACT BANNER (PRE-FOOTER CTA)
    defineField({
      name: 'preFooterCtaSection',
      title: 'SECTION 5: BOTTOM CONTACT BANNER (PRE-FOOTER CTA)',
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
        title: title || 'About Us Page Content',
        media: InfoOutlineIcon,
      }
    },
  },
})
