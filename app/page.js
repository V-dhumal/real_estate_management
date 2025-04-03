import Link from 'next/link'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import NavbarSection from './components/Navbar'
import FooterSection from './components/Footer'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (session) {
    if (session.user.role === 'seller') {
      redirect('/seller/dashboard')
    } else if (session.user.role === 'buyer') {
      redirect('/buyer/dashboard')
    }
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  const sliderImages = [
    '/images/house1.jpg',
    '/images/house2.jpg',
    '/images/house3.jpg',
    '/images/house4.jpg',
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavbarSection />

      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        <section className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl p-10 mb-16 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-5xl md:text-7xl font-extrabold text-center mb-8 text-white leading-tight tracking-tight">
            Discover Your Dream Home
          </h2>
          <p className="text-xl md:text-2xl text-center text-white opacity-90">
            Revolutionizing the way you buy, sell, and manage real estate
          </p>
        </section>

        <section className="relative w-full h-64 sm:h-80 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-2xl">
          <Slider {...sliderSettings}>
            {sliderImages.map((src, index) => (
              <div key={index} className="w-full h-64 sm:h-80 md:h-96">
                <Image src={src} alt={`Slide ${index + 1}`} layout="fill" className="object-cover rounded-2xl" />
              </div>
            ))}
          </Slider>
        </section>
      
        {/* Remaining sections remain unchanged */}
        
      </main>

      <FooterSection />
    </div>
  )
}
