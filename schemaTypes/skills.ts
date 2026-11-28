import {defineArrayMember, defineField, defineType} from 'sanity'

// One document holding the ordered list of skills shown in the hero's code block.
// Registered as a singleton in sanity.config.ts, so there is only ever one.
export const skillsType = defineType({
  name: 'skills',
  title: 'Skills',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Skills',
      description: 'Shown in this order on the site. Drag to reorder.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          // Each name must be filled in, not only the list: an empty row would otherwise publish,
          // the site would reject it, and the site would quietly keep the old list
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required().min(1).unique(),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Skills'}),
  },
})
