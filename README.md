# Portfolio Studio

[Sanity](https://www.sanity.io) Studio for the content of [zkrstic.dev](https://zkrstic.dev). The site itself lives in [my-portfolio](https://github.com/krsticzoran/my-portfolio) and reads this content through the Sanity API.

The Studio is kept in its own repo on purpose: the site only needs a small read client, so the Studio's dependencies stay out of the site's build, audits and Dependabot updates.

## Content

| Type | What it is |
| --- | --- |
| `skills` | Singleton (one document, id `skills`). Ordered list of skills shown in the hero's code block. |

More types (projects, testimonials) will move here step by step, while the site keeps working.

## Getting started

Requires Node 22.12+ and access to the Sanity project.

```bash
npm install
npm run dev     # Studio on http://localhost:3333
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Run the Studio locally |
| `npm run build` | Build the Studio into `dist/` |
| `npm run deploy` | Deploy the Studio to Sanity hosting |

## Notes

- The project ID in `sanity.config.ts` is public by design: the dataset is public and read-only without a token. API tokens never go into this repo.
- Schemas live in `schemaTypes/`, one file per type, registered in `schemaTypes/index.ts`.
