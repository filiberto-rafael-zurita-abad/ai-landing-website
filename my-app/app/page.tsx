import { Navigation } from './containers/Navigation';
import { Hero } from './containers/Hero';
import { Competition } from './containers/Competition';
import { Features } from './containers/Features';
import { About } from './containers/About';
import { SubmissionForm } from './containers/SubmissionForm';
import { FAQ } from './containers/FAQ';
import { Footer } from './containers/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <div className="bg-white">
          <Features />
        </div>
        <div className="bg-gray-50">
          <About />
        </div>
        <div className="bg-white">
          <Competition />
        </div>
        <div className="bg-gray-50">
          <SubmissionForm />
        </div>
        <div className="bg-white">
          <FAQ />
        </div>
      </main>
      <Footer />
    </div>
  );
}
