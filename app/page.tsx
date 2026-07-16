import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Pillars from "@/components/home/Pillars";
import Services from "@/components/home/Services";
import PestsWeTreat from "@/components/home/PestsWeTreat";
import Process from "@/components/home/Process";
import Plans from "@/components/home/Plans";
import Guarantee from "@/components/home/Guarantee";
import LocalAbout from "@/components/home/LocalAbout";
import OwnerStory from "@/components/home/OwnerStory";
import Reviews from "@/components/home/Reviews";
import Areas from "@/components/home/Areas";
import FAQ from "@/components/home/FAQ";
import QuoteCTA from "@/components/home/QuoteCTA";
import { getRating } from "@/lib/rating";

export default async function Home() {
  const rating = await getRating();
  return (
    <>
      <Hero rating={rating} />
      <TrustBar />
      <Plans />
      <Pillars />
      <Services />
      <PestsWeTreat />
      <Process />
      <Guarantee />
      <OwnerStory />
      <LocalAbout />
      <Reviews />
      <Areas />
      <FAQ />
      <QuoteCTA />
    </>
  );
}
