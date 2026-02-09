import { defineType, defineField, defineArrayMember } from 'sanity'

export const dataTable = defineType({
  name: 'dataTable',
  title: 'Table',
  type: 'object',
  icon: () => '📊',
  fields: [
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional table caption shown above the table.',
    }),
    defineField({
      name: 'headers',
      title: 'Column Headers',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'row',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: { cells: 'cells' },
            prepare({ cells }) {
              return {
                title: cells?.join(' | ') || 'Empty row',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { caption: 'caption', headers: 'headers' },
    prepare({ caption, headers }) {
      return {
        title: caption || 'Table',
        subtitle: headers?.join(', ') || '',
      }
    },
  },
})
