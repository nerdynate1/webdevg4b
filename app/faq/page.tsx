export default function FAQPage() {
  const faqs = [
    { q: "Do you accommodate dietary restrictions?", a: "Yes, we offer vegetarian, vegan, gluten-free, and other custom options." },
    { q: "How far in advance should I book?", a: "We recommend 4–8 weeks, but contact us for rush availability." },
    { q: "Do you provide staff and rentals?", a: "We can provide serving staff, bartenders, and rental coordination upon request." },
  ];
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold">FAQ</h1>
      <dl className="mt-6 space-y-4">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-lg border p-4 shadow-xl">
            <dt className="font-medium">{f.q}</dt>
            <dd className="mt-2 text-sm  text-blue-600 dark:text-orange-500">{f.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
