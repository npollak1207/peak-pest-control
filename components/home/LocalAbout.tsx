import Image from "next/image";
import { Arrow, Check } from "@/components/Icons";
import QuoteButton from "@/components/QuoteButton";

const points = [
  "Locally owned & operated in northern Nevada",
  "Technicians who live in the communities they serve",
  "Straight answers and no pushy upsells",
  "A team obsessed with getting the details right",
];

export default function LocalAbout() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div className="js-reveal relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-[28px] border border-line shadow-lift">
            <Image
              src="/images/team.jpg"
              alt="The Peak Pest Control team in front of the company fleet"
              width={1619}
              height={1080}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Layered team photo */}
          <div className="absolute -bottom-8 -left-4 hidden w-44 overflow-hidden rounded-2xl border-4 border-white shadow-lift sm:block lg:w-52">
            <Image
              src="/images/commercial_image.jpg"
              alt="The Peak Pest Control team at a training session"
              width={520}
              height={340}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 right-4 rounded-2xl border border-line bg-white px-6 py-4 text-center shadow-lift sm:right-8">
            <p className="font-display text-3xl font-bold text-mint-600">100%</p>
            <p className="text-xs font-medium uppercase tracking-wide text-slate">
              Satisfaction guaranteed
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-mint-600">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            Local &amp; Trusted
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Your neighbors, protecting your home
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Peak is a locally owned, family-run pest control company right here
            in northern Nevada. We treat every home like it&rsquo;s our own, with
            the discipline, punctuality, and accountability you&rsquo;d expect.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-mint-600" />
                <span className="text-sm font-medium text-ink/80">{p}</span>
              </li>
            ))}
          </ul>

          <QuoteButton className="group mt-9 inline-flex items-center gap-2 rounded-full bg-mint px-7 py-4 text-base font-bold text-ink shadow-mint transition hover:bg-mint-600 hover:text-white">
            Meet the team &amp; get a quote
            <Arrow className="h-5 w-5 transition group-hover:translate-x-1" />
          </QuoteButton>
        </div>
      </div>
    </section>
  );
}
