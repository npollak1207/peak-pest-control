import { Fragment, type ReactNode } from "react";

// tiny markdown renderer for the post bodies. no library, because all the
// blogContent files ever use is ## / ### headings, - / * and numbered lists,
// paragraphs, and **bold**. anything fancier just falls through as plain text.

type Block =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "ul" | "ol"; items: string[] };

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  const isUl = (l: string) => /^\s*[-*]\s+/.test(l);
  const isOl = (l: string) => /^\s*\d+\.\s+/.test(l);

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (/^###\s+/.test(line)) {
      blocks.push({ type: "h3", text: line.replace(/^###\s+/, "").trim() });
      i++;
      continue;
    }
    if (/^##\s+/.test(line)) {
      blocks.push({ type: "h2", text: line.replace(/^##\s+/, "").trim() });
      i++;
      continue;
    }
    if (/^#\s+/.test(line)) {
      // stray top-level heading — promote to a section heading
      blocks.push({ type: "h2", text: line.replace(/^#\s+/, "").trim() });
      i++;
      continue;
    }

    if (isUl(line) || isOl(line)) {
      const ordered = isOl(line);
      const items: string[] = [];
      while (i < lines.length && (ordered ? isOl(lines[i]) : isUl(lines[i]))) {
        items.push(lines[i].replace(/^\s*(?:[-*]|\d+\.)\s+/, "").trim());
        i++;
      }
      blocks.push({ type: ordered ? "ol" : "ul", items });
      continue;
    }

    // paragraph: gather consecutive plain lines
    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^#{1,3}\s+/.test(lines[i]) &&
      !isUl(lines[i]) &&
      !isOl(lines[i])
    ) {
      buf.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: "p", text: buf.join(" ") });
  }

  return blocks;
}

// **bold** to <strong>, the rest stays as-is
function inline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, idx) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/);
    if (m) {
      return (
        <strong key={idx} className="font-semibold text-ink">
          {m[1]}
        </strong>
      );
    }
    return <Fragment key={idx}>{part}</Fragment>;
  });
}

export default function ArticleBody({ markdown }: { markdown: string }) {
  const blocks = parseBlocks(markdown);

  return (
    <div className="text-slate">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={idx}
                className="mt-12 mb-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl"
              >
                {inline(block.text)}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={idx}
                className="mt-8 mb-3 font-display text-xl font-bold text-ink"
              >
                {inline(block.text)}
              </h3>
            );
          case "ul":
            return (
              <ul key={idx} className="mt-5 grid gap-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint"
                      aria-hidden
                    />
                    <span className="text-lg leading-relaxed">
                      {inline(item)}
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={idx} className="mt-5 grid gap-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint-050 text-xs font-bold text-mint-600">
                      {j + 1}
                    </span>
                    <span className="text-lg leading-relaxed">
                      {inline(item)}
                    </span>
                  </li>
                ))}
              </ol>
            );
          default:
            return (
              <p key={idx} className="mt-5 text-lg leading-relaxed">
                {inline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
