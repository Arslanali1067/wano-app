import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BlogGrid from '@/components/BlogGrid'
import { getBlogPost, getRelatedPosts, publishedPosts, postTime } from '@/data/blogPosts'
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
    title: post.title,
    description: post.description,
    alternates: { canonical: `/post/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://wanoafrica.com/post/${post.slug}`,
      type: 'article',
      publishedTime: new Date(postTime(post)).toISOString(),
      images: [post.imageUrl],
    },
    twitter: { card: 'summary_large_image', images: [post.imageUrl] },
  }
}

// Re-check hourly: a scheduled post goes live on its date (pages for posts
// not yet built are made on first visit).
export const revalidate = 3600

export async function generateStaticParams() {
  return publishedPosts().map((post) => ({
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
  const postUrl = `https://wanoafrica.com/post/${post.slug}`
  // Article details for search engines.
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: [`https://wanoafrica.com${post.imageUrl}`],
    datePublished: new Date(postTime(post)).toISOString(),
    author: { '@type': 'Organization', name: 'Wano', url: 'https://wanoafrica.com' },
    publisher: { '@type': 'Organization', name: 'Wano', logo: { '@type': 'ImageObject', url: 'https://wanoafrica.com/images/wano-logo.png' } },
    mainEntityOfPage: postUrl,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
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
                  <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`} target="_blank" rel="noopener noreferrer" className={styles.shareIconHolder}>
                    <Image
                      src="/icons/facebook.svg"
                      alt="Share on Facebook"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <Link href={`https://x.com/intent/post?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className={styles.shareIconHolder}>
                    <Image
                      src="/icons/twitter.svg"
                      alt="Share on Twitter"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`} target="_blank" rel="noopener noreferrer" className={styles.shareIconHolder}>
                    <Image
                      src="/icons/linkedin.svg"
                      alt="Share on LinkedIn"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <Link href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${postUrl}`)}`} target="_blank" rel="noopener noreferrer" className={styles.shareIconHolder}>
                    <Image
                      src="/icons/link.svg"
                      alt="Share on WhatsApp"
                      width={24}
                      height={24}
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className={`${styles.animateOnLoad} ${styles.mainImageWrap}`}>
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
