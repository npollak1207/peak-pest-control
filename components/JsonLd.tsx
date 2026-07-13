// renders a JSON-LD block (server component, no client JS). Fine to have
// several per page, they get merged by @id.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
