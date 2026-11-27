import {orderRankField} from '@sanity/orderable-document-list'
import {defineArrayMember, defineField, defineType} from 'sanity'

// One project card on the site; the modal shows `content`.
// The order on the site is set by dragging in the "Projects" list (orderRank, see sanity.config.ts).
export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) =>
        rule.required().custom(async (title, context) => {
          if (!title) return true // `required` already reports an empty title

          // While a published project is edited there are two documents with the same title:
          // the published one and its draft, so both ids of this project are excluded
          const id = context.document?._id.replace(/^drafts\./, '')
          const client = context.getClient({apiVersion: '2026-11-01'})
          const taken = await client.fetch<number>(
            `count(*[_type == "project" && lower(title) == lower($title) && !(_id in [$id, $draftId])])`,
            {title: title.trim(), id, draftId: `drafts.${id}`},
          )
          return taken === 0 || 'Another project already has this title'
        }),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'Used by the filter tabs on the site.',
      options: {
        list: [
          {title: 'Client', value: 'client'},
          {title: 'Personal', value: 'personal'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Tech stack',
      type: 'string',
      description: 'Shown under the title on the card, e.g. "Next.js, TypeScript, Tailwind CSS".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'Text, so a range like "2024 - Present" also works.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      // The card crops the image; the hotspot picks the part that stays visible
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Modal text',
      type: 'array',
      // Only paragraphs and bold: the modal is not designed for headings, lists or links
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [{title: 'Strong', value: 'strong'}],
            annotations: [],
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'ctaLink',
      title: 'Live site',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'github',
      title: 'GitHub',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
    // Hidden key that keeps the drag order; new projects start at the top
    orderRankField({type: 'project', newItemPosition: 'before'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'year', media: 'image'},
  },
})
