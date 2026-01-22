import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import PhoneFeaturesSection from '@/components/PhoneFeaturesSection'
import ListFeaturesSection from '@/components/ListFeaturesSection'
import EasyAccessSection from '@/components/EasyAccessSection'
import BlogGrid from '@/components/BlogGrid'
import CTASection from '@/components/CTASection'
import { blogPosts } from '@/data/blogPosts'

export default function Home() {
  // Show only first 3 blog posts on home page
  const featuredPosts = blogPosts.slice(0, 3)

  return (
    <main>
      <HeroSection />
      <StatsSection />
      <PhoneFeaturesSection />
      <ListFeaturesSection />
      <EasyAccessSection />
      {/* <BlogGrid posts={featuredPosts} /> */}
      <CTASection />
    </main>
  )
}
