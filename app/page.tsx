import { BackgroundBoxes } from "@/components/ui-components/background-boxes"
import { ThreeDCard } from "@/components/ui-components/3d-card"
import { AppleCardsCarousel } from "@/components/ui-components/apple-cards-carousel"
import { BentoGrid } from "@/components/ui-components/bento-grid"
import { CanvasReveal } from "@/components/ui-components/canvas-reveal"
import { CardHoverEffect } from "@/components/ui-components/card-hover-effect"
import { CardSpotlight } from "@/components/ui-components/card-spotlight"
import { Carousel } from "@/components/ui-components/carousel"
import { Compare } from "@/components/ui-components/compare"
import { ContainerScroll } from "@/components/ui-components/container-scroll"
import { EvervaultCard } from "@/components/ui-components/evervault-card"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <Hero />

      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">About Us</h2>
          <BackgroundBoxes />
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Services</h2>
          <BentoGrid />
        </div>
      </section>

      <section id="work" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Work</h2>
          <AppleCardsCarousel />
        </div>
      </section>

      <section id="team" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ThreeDCard />
            <CardSpotlight />
            <EvervaultCard />
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Testimonials</h2>
          <Carousel />
        </div>
      </section>

      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Projects</h2>
          <CardHoverEffect />
        </div>
      </section>

      <section id="showcase" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Showcase</h2>
          <Compare />
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Contact Us</h2>
          <ContainerScroll />
        </div>
      </section>

      <CanvasReveal />
      <Footer />
    </main>
  )
}

