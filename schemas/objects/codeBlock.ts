import { defineType, defineField } from 'sanity'

export const codeBlock = defineType({
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  icon: () => '💻',
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 10,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      description:
        'Select a language or type any Shiki/Prism language ID (e.g., "elixir", "terraform").',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'Python', value: 'python' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'JSON', value: 'json' },
          { title: 'GROQ', value: 'groq' },
          { title: 'Bash / Shell', value: 'bash' },
          { title: 'SQL', value: 'sql' },
          { title: 'YAML', value: 'yaml' },
          { title: 'Markdown', value: 'markdown' },
          { title: 'Go', value: 'go' },
          { title: 'Rust', value: 'rust' },
          { title: 'Java', value: 'java' },
          { title: 'C#', value: 'csharp' },
          { title: 'PHP', value: 'php' },
          { title: 'Ruby', value: 'ruby' },
          { title: 'Swift', value: 'swift' },
          { title: 'Kotlin', value: 'kotlin' },
          { title: 'GraphQL', value: 'graphql' },
          { title: 'Terraform / HCL', value: 'hcl' },
          { title: 'Dockerfile', value: 'dockerfile' },
          { title: 'Plain Text', value: 'text' },
        ],
      },
      initialValue: 'javascript',
    }),
    defineField({
      name: 'filename',
      title: 'Filename',
      type: 'string',
      description:
        'Optional filename shown above the code block (e.g., "schema.ts").',
    }),
    defineField({
      name: 'highlightLines',
      title: 'Highlight Lines',
      type: 'string',
      description:
        'Line numbers to highlight, e.g., "1,3-5,10". Supports individual lines and ranges.',
    }),
  ],
  preview: {
    select: { language: 'language', filename: 'filename', code: 'code' },
    prepare({ language, filename, code }) {
      return {
        title: filename || `Code (${language || 'text'})`,
        subtitle: code ? code.substring(0, 80) + '…' : '',
      }
    },
  },
})
