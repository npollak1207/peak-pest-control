"use client";

export const OPEN_QUOTE_EVENT = "peak:open-quote";

export type QuotePrefill = {
  // preselects the service step, must match a ServiceItem title
  service?: string;
  // seeds the "anything else?" field
  message?: string;
};

export function openQuoteModal(prefill?: QuotePrefill) {
  window.dispatchEvent(new CustomEvent(OPEN_QUOTE_EVENT, { detail: prefill }));
}

export default function QuoteButton({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button type="button" className={className} onClick={() => openQuoteModal()}>
      {children}
    </button>
  );
}
