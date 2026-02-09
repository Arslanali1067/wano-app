import PlatformHeroSection from '@/components/PlatformHeroSection'
import PhoneFeaturesSection from '@/components/PhoneFeaturesSection'
import PlatformListFeaturesSection from '@/components/PlatformListFeaturesSection'
import EasyAccessSection from '@/components/EasyAccessSection'
import CTASection from '@/components/CTASection'

export default function CreatorsPage() {
  return (
    <main>
      <PlatformHeroSection variant="creators" />
      <PhoneFeaturesSection variant="creators" />
      <PlatformListFeaturesSection variant="creators" />
      <EasyAccessSection variant="creators" />
      <CTASection />
    </main>
  )
}
