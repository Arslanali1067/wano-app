import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BlogGrid from '@/components/BlogGrid'
import { getBlogPost, getRelatedPosts, blogPosts } from '@/data/blogPosts'
import styles from './page.module.css'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - Wano',
    }
  }

  return {
    title: `${post.title} - Wano`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.imageUrl],
    },
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, 3)

  return (
    <>
      <section className="section">
        <div className="container">
          <div className={styles.blogDetailsHolder}>
            <div className={styles.blogDetailsContent}>
              <div className={styles.animateOnLoad}>
                <div className={styles.blogDate}>{post.date}</div>
              </div>
              
              <div className={styles.animateOnLoad}>
                <div className={styles.blogNameDetails}>
                  <h1 className={styles.blogDetailsTitle}>{post.title}</h1>
                  <div className={styles.blogDate}>{post.description}</div>
                </div>
              </div>

              <div className={styles.animateOnLoad}>
                <div className={styles.shareBlogIcons}>
                  <Link href="https://facebook.com" target="_blank" className={styles.shareIconHolder}>
                    <Image
                      src="/icons/facebook.svg"
                      alt="Share on Facebook"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <Link href="https://twitter.com" target="_blank" className={styles.shareIconHolder}>
                    <Image
                      src="/icons/twitter.svg"
                      alt="Share on Twitter"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <Link href="https://linkedin.com" target="_blank" className={styles.shareIconHolder}>
                    <Image
                      src="/icons/linkedin.svg"
                      alt="Share on LinkedIn"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <Link href="#" className={styles.shareIconHolder}>
                    <Image
                      src="/icons/link.svg"
                      alt="Copy Link"
                      width={24}
                      height={24}
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className={styles.animateOnLoad}>
              <div className={styles.blogDetailsMainImageHolder}>
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className={styles.blogDetailsMainImage}
                  priority
                />
              </div>
            </div>

            <div className={styles.blogDetailsContent}>
              <div 
                className={styles.blogRichText}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className={styles.relatedTitle}>Related Posts</h2>
          </div>
          <BlogGrid posts={relatedPosts} showHeader={false} />
        </section>
      )}
    </>
  )
}
