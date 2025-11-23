export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold">Contact Us</h1>
      <p className="mt-2 text-muted-foreground">We'd love to hear about your event.</p>
      <form className="mt-6 grid gap-4">
        <label className="grid gap-1">
          <span className="text-sm">Name</span>
          <input className="rounded-md border bg-background px-3 py-2" placeholder="Your name" required />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Email</span>
          <input type="email" className="rounded-md border bg-background px-3 py-2" placeholder="you@example.com" required />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Message</span>
          <textarea className="min-h-32 rounded-md border bg-background px-3 py-2" placeholder="Tell us about your occasion" />
        </label>
        <button type="submit" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground">Send</button>
      </form>
    </div>
  );
}
