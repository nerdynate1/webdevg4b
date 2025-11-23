export default function VenuesPage() {
  const venues = [
    { name: "Harborview Hall", location: "Waterfront", capacity: 200 },
    { name: "Garden Pavilion", location: "Uptown", capacity: 120 },
    { name: "Skyline Loft", location: "Downtown", capacity: 300 },
  ];
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-semibold">Venues</h1>
      <p className="mt-2 text-muted-foreground">A selection of spaces perfect for any occasion.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {venues.map((v) => (
          <div key={v.name} className="rounded-lg border p-4">
            <div className="text-lg font-medium">{v.name}</div>
            <div className="text-sm text-muted-foreground">{v.location}</div>
            <div className="mt-2 text-sm">Capacity: {v.capacity}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
