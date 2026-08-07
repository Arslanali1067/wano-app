import { Metadata } from 'next'
import BlogGrid from '@/components/BlogGrid'
import { blogPosts } from '@/data/blogPosts'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Blog - WANO Notes',
  description: 'Explore the world of music, culture, and storytelling with Wano Notes — our latest articles and updates.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'WANO Notes — Blog & Articles',
    description: 'Explore the world of music, culture, and storytelling with Wano Notes — our latest articles and updates.',
    url: 'https://wanoafrica.com/blog',
    images: ['/images/Section2.webp'],
  },
}

export default function BlogPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className={styles.blogHeader}>
            <h1>Wano Notes</h1>
            <p>Explore the World of Music with our latest articles and updates</p>
          </div>
        </div>
      </section>
      <BlogGrid posts={blogPosts} showHeader={false} />
    </>
  )
}
