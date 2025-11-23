import Link from "next/link";

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function OccasionsPage() {
  const occasions = [
    { name: "Weddings", desc: "Full-service catering for ceremonies and receptions." },
    { name: "Corporate", desc: "Conferences, offsites, and team celebrations." },
    { name: "Private Parties", desc: "Birthdays, showers, anniversaries and more." },
  ];
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-semibold">Occasions</h1>
      <p className="mt-2 text-muted-foreground">Choose an occasion to tell us about your event and get a tailored plan.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {occasions.map((o) => (
          <Link key={o.name} href={`/occasions/${slugify(o.name)}`} className="rounded-lg border p-4 hover:bg-accent transition-colors">
            <div className="text-lg font-medium">{o.name}</div>
            <p className="mt-2 text-sm text-muted-foreground">{o.desc}</p>
            <span className="mt-3 inline-block text-sm text-primary">Plan this occasion →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
