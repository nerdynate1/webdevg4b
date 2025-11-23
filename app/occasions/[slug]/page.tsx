"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventDate: string; // ISO date string (yyyy-mm-dd)
  guests: string; // keep as string for input control
  venue: string;
  message: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  eventDate: "",
  guests: "",
  venue: "",
  message: "",
};

function getOccasionCopy(slug: string | undefined) {
  const lower = (slug ?? "").toLowerCase();
  const entries: Record<string, { title: string; intro: string }> = {
    weddings: {
      title: "Weddings",
      intro:
        "From ceremony to last dance, we coordinate timelines, staff, rentals, and menu execution so you can be fully present.",
    },
    corporate: {
      title: "Corporate",
      intro:
        "Seamless service for conferences, offsites, launches, and team celebrations — punctual delivery, dietary coverage, and polished presentation.",
    },
    "private-parties": {
      title: "Private Parties",
      intro:
        "Birthdays, showers, and milestones — flexible menus and staffing sized to your space, with effortless setup and cleanup.",
    },
  };
  return (
    entries[lower] ?? {
      title: "Custom Occasion",
      intro:
        "Tell us about your event and we’ll tailor a menu, service plan, and schedule to fit your vision, venue, and budget.",
    }
  );
}

export default function OccasionDetailPage() {
  const params = useParams<{ slug?: string }>();
  const copy = useMemo(() => getOccasionCopy(params?.slug), [params?.slug]);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState<null | { ok: boolean; details?: any; error?: string }>(null);

  function onChange<K extends keyof FormState>(key: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function validate(): string | null {
    if (!form.firstName.trim()) return "First name is required.";
    if (!form.lastName.trim()) return "Last name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Please enter a valid email address.";
    if (!form.phone.trim()) return "Phone is required.";
    if (!form.eventDate) return "Event date is required.";
    const when = new Date(form.eventDate + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (when < today) return "Event date cannot be in the past.";
    const guests = Number(form.guests);
    if (!Number.isFinite(guests) || guests <= 0) return "Guest count must be a positive number.";
    if (!form.venue.trim()) return "Venue is required. If TBD, write TBD.";
    return null;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setSubmitted({ ok: false, error: err });
      toast.error("Please check the form", { description: err });
      return;
    }

    const details = {
      occasion: copy.title,
      ...form,
      guests: Number(form.guests),
    };
    setSubmitted({ ok: true, details });
    toast.success("Request received", { description: "We’ll contact you shortly to finalize details." });
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold">{copy.title}</h1>
      <p className="mt-2 text-muted-foreground">
        {copy.intro} Our coordinators will design a timeline, staff plan, and menu that fits your guest count, venue
        constraints, and budget. Share the details below and we’ll respond with a tailored proposal.
      </p>

      <form className="mt-6 grid gap-4" onSubmit={onSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-sm">First name</span>
            <Input value={form.firstName} onChange={onChange("firstName") } required />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Last name</span>
            <Input value={form.lastName} onChange={onChange("lastName") } required />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-sm">Email</span>
            <Input type="email" value={form.email} onChange={onChange("email")} placeholder="you@example.com" required />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Phone</span>
            <Input type="tel" value={form.phone} onChange={onChange("phone")} placeholder="(555) 123-4567" required />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-sm">Event date</span>
            <Input type="date" value={form.eventDate} onChange={onChange("eventDate")} required />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Guest count</span>
            <Input type="number" min={1} inputMode="numeric" value={form.guests} onChange={onChange("guests")} required />
          </label>
        </div>

        <label className="grid gap-1">
          <span className="text-sm">Venue</span>
          <Input value={form.venue} onChange={onChange("venue")} placeholder="Venue name or address (TBD if undecided)" required />
        </label>

        <label className="grid gap-1">
          <span className="text-sm">Short message</span>
          <Textarea className="min-h-28" value={form.message} onChange={onChange("message")} placeholder="Dietary needs, service style, timing, or any special requests" />
        </label>

        <Button type="submit" className="mt-2">Request proposal</Button>

        {submitted && (
          <div className={`rounded-md border p-4 ${submitted.ok ? "border-green-300" : "border-red-300"}`}>
            {submitted.ok ? (
              <div className="space-y-2 text-sm">
                <div className="font-medium text-green-600">Thanks! Your {copy.title.toLowerCase()} details were received.</div>
                <p className="text-muted-foreground">
                  Our team will review your information and reach out via email to confirm menu options and logistics.
                </p>
              </div>
            ) : (
              <div className="text-sm text-red-600">{submitted.error}</div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
