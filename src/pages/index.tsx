import Head from 'next/head'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import PartnersSection from '@/components/landing/PartnersSection'
import BenefitsSection from '@/components/landing/BenefitsSection'
import FeaturedSection from '@/components/landing/FeaturedSection'
import CoursesSection from '@/components/landing/CoursesSection'
import ForBusinessSection from '@/components/landing/ForBusinessSection'
import CTASection from '@/components/landing/CTASection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import FAQSection from '@/components/landing/FAQSection'
import Footer from '@/components/landing/Footer'
import StickyBar from '@/components/landing/StickyBar'
import SalesAssistant from '@/components/landing/SalesAssistant'
import { Course, BackendCourse, mapBackendCourses } from '@/lib/courses'

interface HomeProps {
  courses: Course[];
}

export default function Home({ courses }: HomeProps) {
  return (
    <>
      <Head>
        <title>THD Academy - Aprenda com os melhores do mercado</title>
      </Head>
      <div className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Navbar />
        <main>
          <HeroSection />
          <PartnersSection />
          <BenefitsSection />
          <FeaturedSection />
          <CoursesSection courses={courses} />
          <ForBusinessSection />
          <CTASection />
          <TestimonialsSection />
          <FAQSection />
        </main>
        <Footer />
        <StickyBar />
        <SalesAssistant />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8443';
    const response = await axios.get<BackendCourse[]>(`${apiUrl}/myclasses/public`, {
      timeout: 5000,
    });
    const courses = mapBackendCourses(response.data);
    return { props: { courses } };
  } catch {
    return { props: { courses: [] } };
  }
}
