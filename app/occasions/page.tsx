export default function OccasionsPage() {
  const occasions = [
    { name: "Weddings", desc: "Full-service catering for ceremonies and receptions." },
    { name: "Corporate", desc: "Conferences, offsites, and team celebrations." },
    { name: "Private Parties", desc: "Birthdays, showers, anniversaries and more." },
  ];
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-semibold">Occasions</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {occasions.map((o) => (
          <div key={o.name} className="rounded-lg border p-4">
            <div className="text-lg font-medium">{o.name}</div>
            <p className="mt-2 text-sm text-muted-foreground">{o.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
