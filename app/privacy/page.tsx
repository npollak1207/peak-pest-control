import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Peak Pest Control collects, uses, and protects the information you share with us, and the analytics and advertising tools we use on this website.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      crumbLabel="Privacy Policy"
      updated="July 10, 2026"
      intro="This policy explains what information we collect through this website, how we use it, and the choices you have."
    >
      <p>
        This Privacy Policy describes how {site.name} (&ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and shares
        information when you visit {site.url}, request a quote, or otherwise
        contact us. By using this website, you agree to the practices described
        here.
      </p>

      <h2>Information we collect</h2>
      <p>
        <strong>Information you give us.</strong> When you request an estimate or
        contact us, we collect the details you submit, typically your name,
        phone number, email address, service address, and any information you
        include in your message.
      </p>
      <p>
        <strong>Information collected automatically.</strong> Like most
        websites, we automatically collect certain technical information when you
        visit, such as your IP address, device and browser type, the pages you
        view, how you arrived at our site, and how you interact with it. We
        collect this through cookies and similar technologies (see below).
      </p>

      <h2>Analytics and advertising tools</h2>
      <p>
        We use trusted third-party services to understand how visitors use our
        site and to measure our advertising. These providers may set cookies and
        collect usage data governed by their own privacy policies:
      </p>
      <ul>
        <li>
          <strong>Microsoft Clarity</strong>: heatmaps and session analytics
          that show how visitors navigate the site so we can improve it. See{" "}
          <a
            href="https://privacy.microsoft.com/privacystatement"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft&rsquo;s Privacy Statement
          </a>
          .
        </li>
        <li>
          <strong>Google Analytics</strong>: aggregate traffic and audience
          reporting. See{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&rsquo;s Privacy Policy
          </a>
          . You can opt out with the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </li>
        <li>
          <strong>Meta Pixel</strong>: measures the results of our Facebook and
          Instagram advertising and may be used to show you our ads on Meta
          platforms. See{" "}
          <a
            href="https://www.facebook.com/privacy/policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meta&rsquo;s Privacy Policy
          </a>{" "}
          and manage your preferences in your Meta{" "}
          <a
            href="https://www.facebook.com/adpreferences/ad_settings"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ad Settings
          </a>
          .
        </li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your requests and provide quotes and services;</li>
        <li>To schedule, perform, and follow up on pest control services;</li>
        <li>To contact you by phone, text, or email about your inquiry;</li>
        <li>To operate, maintain, and improve our website;</li>
        <li>To measure and improve our advertising and marketing;</li>
        <li>To comply with the law and protect our rights.</li>
      </ul>

      <h2>How we share information</h2>
      <p>We do not sell your personal information. We may share it with:</p>
      <ul>
        <li>
          <strong>Service providers</strong> who help us run our business and
          website (for example, website hosting, form processing and lead
          management, email and scheduling, analytics, and the advertising
          partners listed above), under obligations to protect it;
        </li>
        <li>
          <strong>Advertising platforms</strong> such as Google and Meta, to
          measure and deliver ads;
        </li>
        <li>
          <strong>Authorities or others</strong> when required by law, or to
          protect the safety, rights, or property of {site.name}, our customers,
          or the public.
        </li>
      </ul>

      <h2>Cookies and your choices</h2>
      <p>
        Cookies are small files stored on your device. You can control or delete
        cookies through your browser settings, and most browsers let you refuse
        or remove them. Disabling cookies may affect how parts of the site work.
        You can also use the provider opt-outs linked above.
      </p>

      <h2>Text messages and calls</h2>
      <p>
        If you provide your phone number, you consent to be contacted by phone
        or text about your request and service. Message and data rates may
        apply. You can opt out of text messages at any time by replying STOP.
      </p>

      <h2>Data retention and security</h2>
      <p>
        We keep the information you provide for as long as needed to serve you
        and for legitimate business or legal purposes. We use reasonable
        safeguards to protect it, though no method of transmission over the
        internet is completely secure.
      </p>

      <h2>Children&rsquo;s privacy</h2>
      <p>
        Our website and services are intended for adults. We do not knowingly
        collect personal information from children under 13.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. When we do, we will revise
        the &ldquo;Last updated&rdquo; date above. Your continued use of the
        site means you accept the updated policy.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy or your information? Reach us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>, call{" "}
        <a href={site.phoneHref}>{site.phone}</a>, or write to us at{" "}
        {site.address}.
      </p>
    </LegalPage>
  );
}
