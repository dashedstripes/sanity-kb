import { defineType, defineField, defineArrayMember } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: () => '📄',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description:
        'Brief description for search results and previews. Aim for ~160 characters.',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        // Standard Portable Text blocks (paragraphs, headings, lists, etc.)
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strikethrough', value: 'strike-through' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto'],
                      }),
                  }),
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal Article Link',
                icon: () => '🔗',
                fields: [
                  defineField({
                    name: 'reference',
                    type: 'reference',
                    title: 'Article',
                    to: [{ type: 'article' }],
                  }),
                ],
              },
            ],
          },
        }),
        // Images
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Describe the image for accessibility.',
              validation: (rule) => rule.warning('Alt text improves accessibility and is used as fallback if the image fails to load.'),
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }),
          ],
        }),
        // Custom block types
        defineArrayMember({ type: 'codeBlock' }),
        defineArrayMember({ type: 'callout' }),
        defineArrayMember({ type: 'dataTable' }),
        defineArrayMember({ type: 'embed' }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Freeform tags for cross-cutting discovery.',
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'article' }],
        }),
      ],
      validation: (rule) => rule.max(5),
      description: 'Up to 5 related articles shown at the bottom of the page.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'When this article was first published.',
    }),
    defineField({
      name: 'lastReviewedAt',
      title: 'Last Reviewed At',
      type: 'datetime',
      description:
        'When this article was last verified as accurate. Used for stale content detection.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      categoryTitle: 'category.title',
      categoryIcon: 'category.icon',
    },
    prepare({ title, categoryTitle, categoryIcon }) {
      return {
        title,
        subtitle: categoryTitle
          ? `${categoryIcon || '📁'} ${categoryTitle}`
          : 'Uncategorized',
      }
    },
  },
  orderings: [
    {
      title: 'Recently Updated',
      name: 'updatedDesc',
      by: [{ field: '_updatedAt', direction: 'desc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
