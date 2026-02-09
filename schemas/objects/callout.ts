import { defineType, defineField, defineArrayMember } from 'sanity'

export const callout = defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  icon: () => '💡',
  fields: [
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      options: {
        list: [
          { title: '💡 Tip', value: 'tip' },
          { title: 'ℹ️ Info', value: 'info' },
          { title: '⚠️ Warning', value: 'warning' },
          { title: '🚨 Danger', value: 'danger' },
        ],
        layout: 'radio',
      },
      initialValue: 'info',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'Optional heading for the callout. If omitted, the tone label is shown (e.g., "Tip", "Warning").',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
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
                  }),
                ],
              },
            ],
          },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { tone: 'tone', title: 'title' },
    prepare({ tone, title }) {
      const icons: Record<string, string> = {
        tip: '💡',
        info: 'ℹ️',
        warning: '⚠️',
        danger: '🚨',
      }
      const toneLabel = tone
        ? `${tone.charAt(0).toUpperCase()}${tone.slice(1)}`
        : 'Info'
      return {
        title: `${icons[tone] || 'ℹ️'} ${title || `${toneLabel} callout`}`,
      }
    },
  },
})
