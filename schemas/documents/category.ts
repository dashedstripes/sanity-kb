import { defineType, defineField } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: () => '📁',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'What this category covers. Shown on the category landing page.',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Leave empty for top-level categories.',
      options: {
        // Hides the current document from the reference picker
        filter: '_id != $document._id',
      },
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value?._ref === context.document?._id) {
            return 'A category cannot be its own parent'
          }
          return true
        }),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji icon for this category (e.g., 📚, 🚀, 🐛).',
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      description: 'Position within parent. Lower numbers appear first.',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
      parentTitle: 'parent.title',
    },
    prepare({ title, icon, parentTitle }) {
      return {
        title: `${icon || '📁'} ${title}`,
        subtitle: parentTitle ? `↳ ${parentTitle}` : 'Top-level',
      }
    },
  },
  orderings: [
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
