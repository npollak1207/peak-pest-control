"use client";

import { useEffect, useRef, useState } from "react";

type Suggestion = { label: string };

export default function AddressAutocomplete() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);

  // debounced lookup against /api/address-suggest
  useEffect(() => {
    const q = value.trim();
    if (q.length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const controller = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/address-suggest?q=${encodeURIComponent(q)}`,
          { signal: controller.signal },
        );
        const data = (await res.json()) as { suggestions?: Suggestion[] };
        const items = data.suggestions ?? [];
        setSuggestions(items);
        setOpen(items.length > 0);
        setActive(-1);
      } catch {
        // network error, just let them type it in
      }
    }, 350);

    return () => {
      controller.abort();
      clearTimeout(t);
    };
  }, [value]);

  // close the dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function choose(label: string) {
    setValue(label);
    setOpen(false);
    setSuggestions([]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      choose(suggestions[active].label);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={boxRef} className="relative">
      <label
        htmlFor="address"
        className="mb-1.5 block text-sm font-semibold text-ink/80"
      >
        Service address <span className="text-mint-600">*</span>
      </label>
      <input
        id="address"
        name="address"
        required
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => suggestions.length && setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Start typing your address…"
        className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink placeholder:text-slate/60 outline-none transition focus:border-mint focus:bg-white"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-line bg-white shadow-lift">
          {suggestions.map((s, i) => (
            <li key={`${s.label}-${i}`}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(s.label);
                }}
                onMouseEnter={() => setActive(i)}
                className={`block w-full px-4 py-2.5 text-left text-sm transition ${
                  i === active ? "bg-mint-050 text-ink" : "text-slate hover:bg-cream"
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
