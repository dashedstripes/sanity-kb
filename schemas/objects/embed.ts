import { defineType, defineField } from 'sanity'

export const embed = defineType({
  name: 'embed',
  title: 'Embed',
  type: 'object',
  icon: () => '🔗',
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description:
        'Paste a URL from YouTube, Loom, Figma, CodeSandbox, etc.',
      validation: (rule) =>
        rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional description shown below the embed.',
    }),
  ],
  preview: {
    select: { url: 'url', caption: 'caption' },
    prepare({ url, caption }) {
      let provider = 'Embed'
      if (url) {
        if (url.includes('youtube') || url.includes('youtu.be'))
          provider = '▶️ YouTube'
        else if (url.includes('loom.com')) provider = '🎥 Loom'
        else if (url.includes('figma.com')) provider = '🎨 Figma'
        else if (url.includes('codesandbox')) provider = '📦 CodeSandbox'
      }
      return {
        title: caption || url || 'Embed',
        subtitle: provider,
      }
    },
  },
})
