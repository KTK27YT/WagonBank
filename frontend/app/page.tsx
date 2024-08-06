import { Hero } from "@/components/sections/Hero";
import { AllCardTypes } from "@/components/sections/all-card-types";
import TestimonialCard from "@/components/sections/testomonial";
import FeaturesSection from "@/components/sections/Features";
import CTA from "@/components/sections/CTA";
import Footnotes from "@/components/sections/Footnotes";
import NavBar from "@/components/sections/nav-bar";

export default function Home() {
  return (
    <>
      <NavBar hasLoginBtn={true} />
      <Hero />
      <AllCardTypes />
      <TestimonialCard />
      <FeaturesSection />
      <CTA />
      <Footnotes />
    </>
  );
}
