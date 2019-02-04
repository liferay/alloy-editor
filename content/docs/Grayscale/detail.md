---
title: "Theme Detail"
weight: 2
---

## `Content` folder
For changes on content, you could use the `content` folder located on the root of the generated project. Note that markdown receives some variables(called `frontmatter`) on top of the file, we will use a lot of them to personalize content, rules of visualization and website integration with services like Auth for example.
Note that we have a folder for each template and each template has his particularities.

>Note that this page is exactly the same as `pages` folder on Electric.

## `Pages` folder
We could create static OOTB(out of the box, without a template) pages using this folder. Check this [link](https://www.gatsbyjs.org/docs/creating-and-modifying-pages/).

## `Static` folder
Here, we can host our static assets, like images, videos, JSON to our application consume. Note that during build process all folders and files will be served on the root of the output build folder, called `public`.

## GraphQL
Gatsby uses GraphQL to load data into project's React components during Server-Side Rendering, check this [link](https://www.gatsbyjs.org/docs/querying-with-graphql/), thereby, you must be familiar with this tool to provide better customizations(like new frontmatter fields, API changes) for your web app.

## Markdown Rendering
On Theming Site all content that will be inserted on each page it's inserted using Markdown, the same content template language of Electric. Check [this](https://guides.github.com/features/mastering-markdown/) 3 minutes tutorial to be familiar with Markdown if you aren't familiar.

Theming Site uses [Gatsby MDX](https://github.com/ChristopherBiscardi/gatsby-mdx) for render Markdown.

## Last but not least important
- We don't use `layout` frontmatter variable as a variable to define what template can be used because Theming Site resolves it for us using the folder name. This variable is called internally `templateKey` if you want to check how it's implemented.

- Note that, like Electric, our page URL is the same as the name of the correspondent Markdown file.
