import SectionHeading from "@/components/SectionHeading";
import OwnerVideo from "@/components/OwnerVideo";
import QuoteButton from "@/components/QuoteButton";
import { Arrow } from "@/components/Icons";

const OWNER_VIDEO_SRC = "/videos/owner-aspen.mp4";

export default function OwnerStory() {
  return (
    <section className="bg-ink py-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <SectionHeading
          align="center"
          invert
          eyebrow="Our story"
          title="Hear it straight from the owner"
          intro="Peak Pest Control is locally owned and operated, built on a simple idea: show up on time, do the job right, and stand behind the work. Press play to hear our story firsthand."
        />
      </div>

      <div className="js-reveal mx-auto mt-12 max-w-4xl px-5 sm:px-8">
        <OwnerVideo
          src={OWNER_VIDEO_SRC}
          poster="/videos/owner-poster.jpg"
          posterAlt="Aspen from Peak Pest Control sharing the company's story"
          label="Meet the owner"
        />
      </div>

      <div className="mt-10 flex justify-center px-5 sm:px-8">
        <QuoteButton className="group inline-flex items-center gap-2 rounded-full bg-mint px-7 py-4 text-base font-bold text-ink shadow-mint transition hover:bg-mint-600 hover:text-white">
          Get your free estimate
          <Arrow className="h-5 w-5 transition group-hover:translate-x-1" />
        </QuoteButton>
      </div>
    </section>
  );
}
