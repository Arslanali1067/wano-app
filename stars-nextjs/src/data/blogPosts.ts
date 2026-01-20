export interface BlogPost {
  slug: string
  date: string
  title: string
  description: string
  imageUrl: string
  content: string
}

// Original blog image URLs from HTML
export const blogPosts: BlogPost[] = [
  {
    slug: '20-myths-about-web-design',
    date: 'September 18, 2023',
    title: '20 Myths About Web Design Right Now',
    description: 'Et quo ea fugiat qui et dignissimos possimus quia ut. A qui magni veritatis similique.',
    imageUrl: 'https://wubflow-shield.nocodexport.dev/65085bda4c2393ac25665f74/65085ce17c9d9e7da3cba6ae_google-deepmind-vHa_8A1_340-unsplash.jpg',
    content: `
      <h2>Eveniet minus architecto doloremque tempore nulla dicta perferendis.</h2>
      <p>Repudiandae eos ducimus nobis molestiae. Dolorum rerum et et ut omnis. Ipsum minus necessitatibus qui saepe eum. Et culpa velit rem qui veritatis.</p>
      <h3>Id quia enim adipisci.</h3>
      <blockquote>Sit qui consequatur totam nisi aspernatur rerum. Doloremque magni repudiandae sint incidunt sint praesentium quia fugiat sed. Excepturi consectetur velit fugit.</blockquote>
      <p>Sed dolorem id laboriosam pariatur dicta atque. Ut nulla sed. Iure eius quo.</p>
      <p>Ipsa minima fugit tempore autem nihil quibusdam ea. Doloremque ab sit dolores ex commodi. Non molestias voluptatem fugit nobis reiciendis. Enim ut quaerat fugiat provident molestiae consequatur reprehenderit iusto. Doloremque ducimus dicta est eos optio eaque.</p>
      <h2>Consequatur hic qui sed accusamus explicabo dolorem est.</h2>
      <p>Qui consequatur natus est molestiae unde tempore doloribus necessitatibus ad. Aut blanditiis eum. Enim sit et. Debitis labore commodi et et iste.</p>
      <h3>Eaque velit id nisi doloremque.</h3>
      <blockquote>Facilis quis fugiat omnis molestias. In dolore voluptate animi enim et hic quo. Quia commodi est non distinctio harum voluptas explicabo dolore ducimus.</blockquote>
      <p>Et voluptatem dolorem ut alias nemo voluptates. Optio qui aut. Necessitatibus assumenda animi sequi.</p>
      <p>Quia ipsa a eos delectus nemo rem et illo totam. Ut odio sint quaerat nesciunt culpa eius consequuntur. Qui quibusdam quibusdam. Vitae est praesentium.</p>
    `,
  },
  {
    slug: 'the-worst-advice-weve-ever-heard-about-web-design',
    date: 'September 18, 2023',
    title: "The Worst Advice We've Ever Heard About Web Design",
    description: 'Nulla nemo iure voluptatem omnis hic culpa ullam rerum. Praesentium necessitatibus voluptatem autem consectetur in et.',
    imageUrl: 'https://wubflow-shield.nocodexport.dev/65085bda4c2393ac25665f74/65085cec270106fa065ef0d9_google-deepmind-Sqg9QWERMDU-unsplash.jpg',
    content: `
      <h2>The Worst Advice We've Ever Heard About Web Design</h2>
      <p>This is a placeholder for the content of the second blog post. It would contain detailed information about the worst advice in web design.</p>
      <p>More content here...</p>
    `,
  },
  {
    slug: 'how-to-improve-web-design-process',
    date: 'September 18, 2023',
    title: 'How to improve Web Design Process Now',
    description: 'Laudantium temporibus ut necessitatibus aliquam iure. Eos molestiae voluptatibus quo et consequatur voluptatem doloremque ullam.',
    imageUrl: 'https://wubflow-shield.nocodexport.dev/65085bda4c2393ac25665f74/65085cf7056db19f3377486a_google-deepmind-RN6Pip2bR3Q-unsplash.jpg',
    content: `
      <h2>How to improve Web Design Process Now</h2>
      <p>This is a placeholder for the content of the third blog post. It would contain detailed information on improving the web design process.</p>
      <p>More content here...</p>
    `,
  },
  {
    slug: '7-of-the-best-examples-of-beautiful-blog-design',
    date: 'September 18, 2023',
    title: '7 of the Best Examples of Beautiful Blog Design',
    description: 'Et vel est voluptas rerum ipsa cumque dolore natus maxime. Dolorem facilis repellat tempore incidunt et nobis.',
    imageUrl: 'https://wubflow-shield.nocodexport.dev/65085bda4c2393ac25665f74/65085ce17c9d9e7da3cba6ae_google-deepmind-vHa_8A1_340-unsplash.jpg',
    content: `
      <h2>7 of the Best Examples of Beautiful Blog Design</h2>
      <p>This is a placeholder for the content of the fourth blog post. It would showcase examples of beautiful blog designs.</p>
      <p>More content here...</p>
    `,
  },
  {
    slug: '7-must-have-tools-for-web-designers',
    date: 'September 18, 2023',
    title: '7 Must Have Tools For Web Designers',
    description: 'Natus impedit consectetur velit. Sapiente perferendis eveniet quo ut. Consequuntur ad cum harum inventore beatae.',
    imageUrl: 'https://wubflow-shield.nocodexport.dev/65085bda4c2393ac25665f74/65085cec270106fa065ef0d9_google-deepmind-Sqg9QWERMDU-unsplash.jpg',
    content: `
      <h2>7 Must Have Tools For Web Designers</h2>
      <p>This is a placeholder for the content of the fifth blog post. It would list essential tools for web designers.</p>
      <p>More content here...</p>
    `,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit)
}
