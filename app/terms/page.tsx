import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Peak Pest Control website and requests for service.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      crumbLabel="Terms of Service"
      updated="July 10, 2026"
      intro="Please read these terms carefully. They govern your use of this website and any request you submit to us."
    >
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of{" "}
        {site.url} and any interaction with {site.name} (&ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;) through this website. By using the
        site, you agree to these Terms. If you do not agree, please do not use
        the site.
      </p>

      <h2>Our services</h2>
      <p>
        {site.name} provides residential and commercial pest control services in
        Reno, Sparks, and the surrounding northern Nevada area. Descriptions of
        services and pricing on this site are for general information and may
        change without notice. Service is subject to availability and to any
        separate service agreement you enter into with us.
      </p>

      <h2>Quotes and estimates</h2>
      <p>
        Prices and plans shown on this site are starting points and are not a
        binding offer. Any quote or estimate we provide is based on the
        information available at the time, may require an on-site assessment, and
        is subject to change. A service is confirmed only when we schedule it
        with you.
      </p>

      <h2>Our guarantee</h2>
      <p>
        We stand behind our work: if covered pests return between scheduled
        visits, so do we. The specific terms, coverage, and conditions of any
        guarantee are described in your service agreement or plan and apply to
        recurring service in good standing.
      </p>

      <h2>Using this website</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the site for any unlawful or fraudulent purpose;</li>
        <li>
          Attempt to gain unauthorized access to the site or its systems;
        </li>
        <li>
          Interfere with or disrupt the site, or introduce malicious code;
        </li>
        <li>
          Copy, scrape, or reuse content from the site without our permission.
        </li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The content on this site, including text, graphics, logos, photographs,
        and design, is owned by {site.name} or its licensors and is protected by
        applicable laws. You may not use it without our prior written consent.
      </p>

      <h2>Third-party links</h2>
      <p>
        This site may link to third-party websites or services we do not
        control. We are not responsible for their content, policies, or
        practices, and a link does not imply endorsement.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        This website is provided &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo; without warranties of any kind, whether express or
        implied, including fitness for a particular purpose and non-infringement.
        We do not warrant that the site will be uninterrupted, error-free, or
        secure.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {site.name} will not be liable
        for any indirect, incidental, special, or consequential damages arising
        from your use of, or inability to use, this website. Nothing in these
        Terms limits any rights you may have under your separate service
        agreement with us.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of Nevada, without
        regard to its conflict-of-law rules. Any dispute relating to this
        website will be handled in the state or federal courts located in Washoe
        County, Nevada.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. When we do, we will revise
        the &ldquo;Last updated&rdquo; date above. Your continued use of the site
        after changes take effect means you accept the updated Terms.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about these Terms? Reach us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>, call{" "}
        <a href={site.phoneHref}>{site.phone}</a>, or write to us at{" "}
        {site.address}.
      </p>
    </LegalPage>
  );
}
