import PlatformHeroSection from '@/components/PlatformHeroSection'
import StatsSection from '@/components/StatsSection'
import PhoneFeaturesSection from '@/components/PhoneFeaturesSection'
import PlatformListFeaturesSection from '@/components/PlatformListFeaturesSection'
import EasyAccessSection from '@/components/EasyAccessSection'
import CTASection from '@/components/CTASection'

export default function PartnershipsPage() {
  return (
    <main>
      <PlatformHeroSection />
      <PhoneFeaturesSection />
      <PlatformListFeaturesSection />
      <EasyAccessSection variant="platform" />
      <CTASection />
    </main>
  )
}
