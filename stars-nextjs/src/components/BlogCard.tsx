import Link from 'next/link'
import Image from 'next/image'
import styles from './BlogCard.module.css'

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  imageUrl: string
  content?: string
}

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/post/${post.slug}`} className={styles.blog}>
      <div className={styles.tagline}>{post.date}</div>
      <div className={styles.blogTitle}>{post.title}</div>
      <div className={styles.blogImageWrapper}>
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className={styles.blogImage}
          sizes="(max-width: 767px) 89vw, (max-width: 991px) 43vw, (max-width: 1439px) 27vw, 382px"
        />
      </div>
      <div className={styles.blogParagraph}>{post.description}</div>
    </Link>
  )
}
