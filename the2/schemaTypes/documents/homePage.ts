import { HomeIcon } from '@sanity/icons/Home'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'homePage',
  title: '1. Trang Chủ (Home)',
  type: 'document',
  icon: HomeIcon,
  fields: [
    // --- SECTION 1: HERO SECTION ---
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
          name: 'smallSubheading',
          title: 'Small Subheading',
          description: 'E.g., "the two · for you two"',
          type: 'localeString',
        }),
        defineField({
          name: 'mainHeadline',
          title: 'Main Headline',
          description: 'E.g., "Where your story becomes a lifetime moment"',
          type: 'localeString',
        }),
        defineField({
          name: 'description',
          title: 'Description Paragraph',
          type: 'localeText',
        }),
        defineField({
          name: 'ctaButtons',
          title: 'CTA Buttons',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Button Label', type: 'localeString', validation: (r) => r.required() }),
                defineField({ name: 'link', title: 'Link (URL or anchor)', type: 'string', validation: (r) => r.required() }),
                defineField({
                  name: 'variant',
                  title: 'Variant Style',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Primary (Dark/Solid)', value: 'primary' },
                      { title: 'Secondary (Light/Outline)', value: 'secondary' },
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'primary',
                }),
              ],
              preview: {
                select: {
                  title: 'label.en',
                  subtitle: 'link',
                },
              },
            }),
          ],
        }),
      ],
    }),

    // --- SECTION 2: WELCOME / LETTER SECTION ---
    defineField({
      name: 'letterSection',
      title: 'SECTION 2: WELCOME / LETTER SECTION',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'scriptTitle',
          title: 'Script Title',
          description: 'E.g., "Dear our beloved couple,"',
          type: 'localeString',
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          description: 'E.g., "Congratulations on your upcoming milestone!"',
          type: 'localeString',
        }),
        defineField({
          name: 'paragraphs',
          title: 'Paragraphs list',
          description: 'Add paragraphs in visual sequence',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'paragraphText',
                  title: 'Paragraph Text',
                  type: 'localeText',
                }),
              ],
              preview: {
                select: {
                  title: 'paragraphText.en',
                },
              },
            }),
          ],
        }),
        defineField({
          name: 'closingSignOff',
          title: 'Closing Sign-Off',
          description: 'E.g., "Warm regards,"',
          type: 'localeString',
        }),
      ],
    }),

    // --- SECTION 3: WEDDING SERVICES (SLIDER) ---
    defineField({
      name: 'weddingServicesSection',
      title: 'SECTION 3: WEDDING SERVICES (SLIDER)',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'mainHeader',
          title: 'Main Header',
          description: 'E.g., "We sketch and provide"',
          type: 'localeString',
        }),
        defineField({
          name: 'categoryLabel',
          title: 'Category Label',
          description: 'E.g., "Wedding services"',
          type: 'localeString',
        }),
        defineField({
          name: 'servicesList',
          title: 'Services List (Slider items)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'serviceNumber',
                  title: 'Service Number (e.g. 01, 02)',
                  type: 'string',
                  validation: (r) => r.required(),
                }),
                defineField({
                  name: 'title',
                  title: 'Service Title',
                  type: 'localeString',
                  validation: (r) => r.required(),
                }),
                defineField({
                  name: 'shortDescription',
                  title: 'Short Description',
                  type: 'localeText',
                }),
                defineField({
                  name: 'bgImage',
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
                  name: 'scopeItems',
                  title: 'Scope items list',
                  type: 'array',
                  of: [defineArrayMember({ type: 'localeString' })],
                }),
                defineField({
                  name: 'ctaLink',
                  title: 'CTA Link Redirect',
                  type: 'string',
                }),
              ],
              preview: {
                select: {
                  title: 'title.en',
                  subtitle: 'serviceNumber',
                  media: 'bgImage',
                },
              },
            }),
          ],
        }),
      ],
    }),

    // --- SECTION 4: OTHER EVENT SERVICES ---
    defineField({
      name: 'eventServicesSection',
      title: 'SECTION 4: OTHER EVENT SERVICES',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'headerTitle',
          title: 'Header Title',
          description: 'E.g., "Event services"',
          type: 'localeString',
        }),
        defineField({
          name: 'eventItems',
          title: 'Event Services Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'number', title: 'Number (e.g. 01)', type: 'string' }),
                defineField({ name: 'title', title: 'Title', type: 'localeString', validation: (r) => r.required() }),
                defineField({ name: 'description', title: 'Description', type: 'localeText' }),
              ],
              preview: {
                select: {
                  title: 'title.en',
                  subtitle: 'number',
                },
              },
            }),
          ],
        }),
      ],
    }),

    // --- SECTION 5: STATS & PARTNER LOGOS ---
    defineField({
      name: 'statsAndPartnersSection',
      title: 'SECTION 5: STATS & PARTNER LOGOS',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'stats',
          title: 'Statistics List',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'value', title: 'Value (e.g. 50+)', type: 'string', validation: (r) => r.required() }),
                defineField({ name: 'label', title: 'Label (e.g. weddings planned)', type: 'localeString', validation: (r) => r.required() }),
              ],
              preview: {
                select: {
                  title: 'value',
                  subtitle: 'label.en',
                },
              },
            }),
          ],
        }),
        defineField({
          name: 'partnerHeader',
          title: 'Partner Section Header',
          description: 'E.g., "We have worked with"',
          type: 'localeString',
        }),
        defineField({
          name: 'partnerLogos',
          title: 'Partner Logos',
          type: 'array',
          of: [
            defineArrayMember({
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
          ],
        }),
      ],
    }),

    // --- SECTION 6: WEDDING SHOWCASE ---
    defineField({
      name: 'showcaseSection',
      title: 'SECTION 6: WEDDING SHOWCASE',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'categoryTag',
          title: 'Category Tag',
          description: 'E.g., "Wedding showcase"',
          type: 'localeString',
        }),
        defineField({
          name: 'mainTitle',
          title: 'Main Title',
          description: 'E.g., "Love is in the air"',
          type: 'localeString',
        }),
        defineField({
          name: 'instructionText',
          title: 'Instruction Text (Help helper)',
          description: 'E.g., "scroll, drag, or hover to explore"',
          type: 'localeString',
        }),
        defineField({
          name: 'gallery',
          title: 'Gallery Showcase Images',
          type: 'array',
          of: [
            defineArrayMember({
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
          ],
        }),
        defineField({
          name: 'ctaButton',
          title: 'CTA Button',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'localeString' }),
            defineField({ name: 'link', title: 'Link (URL)', type: 'string' }),
          ],
        }),
      ],
    }),

    // --- SECTION 7: TESTIMONIALS / VIDEO SHOWCASE ---
    defineField({
      name: 'testimonialVideoSection',
      title: 'SECTION 7: TESTIMONIALS / VIDEO SHOWCASE',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'quoteTitle',
          title: 'Testimonial Quote / Title',
          type: 'localeText',
        }),
        defineField({
          name: 'coupleDetails',
          title: 'Couple Details',
          description: 'E.g., "Tony and Myriam - Saigon - 2025"',
          type: 'localeString',
        }),
        defineField({
          name: 'videoUrl',
          title: 'Video Embed URL',
          type: 'string',
        }),
        defineField({
          name: 'coverImage',
          title: 'Video Cover Image',
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
      ],
    }),

    // --- SECTION 8: BOTTOM CONTACT BANNER (PRE-FOOTER CTA) ---
    defineField({
      name: 'preFooterCtaSection',
      title: 'SECTION 8: BOTTOM CONTACT BANNER (PRE-FOOTER CTA)',
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
          name: 'darkOverlay',
          title: 'Enable Dark Overlay?',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'bannerHeadline',
          title: 'Banner Headline',
          description: 'E.g., "Let\'s create your happily ever after together"',
          type: 'localeString',
        }),
        defineField({
          name: 'bannerSubtext',
          title: 'Banner Subtext',
          description: 'E.g., "Based in Vietnam · available worldwide · thetwoplanner@gmail.com"',
          type: 'localeString',
        }),
        defineField({
          name: 'ctaButtonText',
          title: 'CTA Button Text',
          description: 'E.g., "Tell us your story"',
          type: 'localeString',
        }),
        defineField({
          name: 'ctaButtonLink',
          title: 'CTA Button Link URL',
          type: 'string',
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
      title: 'heroSection.mainHeadline.en',
    },
    prepare({ title }) {
      return {
        title: title || 'Home Page Content',
        media: HomeIcon,
      }
    },
  },
})
