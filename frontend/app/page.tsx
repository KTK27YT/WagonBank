import Image from "next/image";
import { Hero } from "@/components/ui/Hero";
import { AllCardTypes } from "@/components/ui/all-card-types";
import TestimonialCard from "@/components/ui/testomonial";
import FeaturesSection from "@/components/ui/Features";


export default function Home() {
  return (
    <><Hero />
      <AllCardTypes />
      <TestimonialCard />
      <FeaturesSection />
    </>
  );
}
