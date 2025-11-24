import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold">About Us</h1>
      <p className="mt-2 text-muted-foreground">
        Star Catering crafts memorable experiences through delicious food and thoughtful service. From intimate
        gatherings to large celebrations, our team partners with you to design the perfect menu and atmosphere.
      </p>
      <div className="mt-6 grid gap-4">
        <section className="rounded-lg border p-4">
          <h2 className="text-lg font-medium">Our Mission</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We believe food brings people together. Our mission is to make your event effortless and unforgettable
            with fresh ingredients, delightful flavors, and seamless coordination.
          </p>
        </section>
        <section className="rounded-lg border p-4">
          <h2 className="text-lg font-medium">What We Do</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Weddings, corporate events, birthdays, and more — we tailor our menus and services to your occasion and
            preferences, offering tastings, staffing, rentals guidance, and venue coordination.
          </p>
        </section>
        <section className="rounded-lg border p-4">
            <Image
                 src="/Aboutus.jpg"
                 alt="About Us"
                 width="300"
                 height="300"
                 className="shrink-0 rounded"
                 style={{backgroundColor: "transparent"}}/>
             <div className="w-full">
                <h3>Our Tea</h3>
             </div>
        </section>
      </div>
    </div>
  );
}
