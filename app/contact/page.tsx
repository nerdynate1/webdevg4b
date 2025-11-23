import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold">Contact Us</h1>
      <p className="mt-2 text-muted-foreground">We'd love to hear about your event.</p>
      <form className="mt-6 grid gap-4">
        <label className="grid gap-1">
          <span className="text-sm">Name</span>
          <Input placeholder="Your name" required />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Email</span>
          <Input type="email" placeholder="you@example.com" required />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Message</span>
          <Textarea className="min-h-32" placeholder="Tell us about your occasion" />
        </label>
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
