'use client'

import { useEffect, useRef, useState } from 'react'
import BlogCard, { BlogPost } from './BlogCard'
import styles from './BlogGrid.module.css'

interface BlogGridProps {
  posts: BlogPost[]
  showHeader?: boolean
}

export default function BlogGrid({ posts, showHeader = true }: BlogGridProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className={`section ${styles.blogSection}`} ref={sectionRef}>
      <div className="container">
        {showHeader && (
          <div className={styles.centerText}>
            <div className={`${styles.titleHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}>
              <h2>Spark Notes Explore the World of Music</h2>
            </div>
            <div className={`${styles.paragraphHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: '0.1s' }}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id nunc odio. Aliquam et tellus urna. Phasellus eget
              </p>
            </div>
          </div>
        )}
        <div className={styles.blogGridWrapper}>
          <div className={styles.blogGrid}>
            {posts.map((post, index) => (
              <div 
                key={post.slug} 
                className={`${styles.blogItem} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
