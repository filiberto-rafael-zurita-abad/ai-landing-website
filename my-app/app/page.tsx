import { Navigation } from './containers/Navigation';
import { Hero } from './containers/Hero';
import { Features } from './containers/Features';
import { About } from './containers/About';
import { Pricing } from './containers/Pricing';
import { Integrations } from './containers/Integrations';
import { FAQ } from './containers/FAQ';
import { CTA } from './containers/CTA';
import { Footer } from './containers/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <About />
        <Pricing />
        <Integrations />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
