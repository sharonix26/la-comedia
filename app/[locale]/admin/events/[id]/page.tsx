import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";

type EditEventPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function EditEventPage({ params }: EditEventPageProps) {
  // Next 16: params is a Promise
  const { locale, id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    notFound();
  }

  // ---------- SERVER ACTION: UPDATE ----------
  async function updateEvent(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;
    const localeFromForm = (formData.get("locale") as string) || locale;

    if (!id) return;

    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim() || null;
    const tag = (formData.get("tag") as string)?.trim() || null;
    let posterUrl = (formData.get("posterUrl") as string)?.trim() || null;
    const ticketsUrl = (formData.get("ticketsUrl") as string)?.trim() || null;
    const dateTimeRaw = formData.get("dateTime") as string;
    const isPublished = formData.get("isPublished") === "on";

    if (!title || !dateTimeRaw) return;

    // Optional new poster file
    const posterFile = formData.get("posterFile") as File | null;

    if (posterFile && posterFile.size > 0) {
      const bytes = await posterFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = posterFile.name.split(".").pop() || "jpg";
      const fileName = `event-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;

      const uploadPath = path.join(process.cwd(), "public", "uploads", fileName);
      await fs.mkdir(path.dirname(uploadPath), { recursive: true });
      await fs.writeFile(uploadPath, buffer);

      posterUrl = `/uploads/${fileName}`;
    }

    const dateTime = new Date(dateTimeRaw);

    await prisma.event.update({
      where: { id },
      data: {
        title,
        description,
        tag,
        posterUrl,
        ticketsUrl,
        dateTime,
        isPublished,
      },
    });

    // Revalidate admin + public page
    revalidatePath(`/${localeFromForm}`);
    revalidatePath(`/${localeFromForm}/admin/events`);

    redirect(`/${localeFromForm}/admin/events`);
  }

  // format default value for <input type="datetime-local" />
  const defaultDateTime = new Date(event.dateTime).toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit event</h1>
        <Link
          href={`/${locale}/admin/events`}
          className="text-sm text-white/70 underline underline-offset-4 hover:text-white"
        >
          ← Back to list
        </Link>
      </div>

      <section className="rounded-2xl border border-white/10 bg-black/40 p-6">
        <form
          action={updateEvent}
          className="grid gap-4 md:grid-cols-2"
          encType="multipart/form-data"
        >
          <input type="hidden" name="id" value={event.id} />
          <input type="hidden" name="locale" value={locale} />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white/80 mb-1">
              Title *
            </label>
            <input
              name="title"
              type="text"
              defaultValue={event.title}
              required
              className="w-full rounded-md border border-white/20 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-red-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white/80 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={event.description ?? ""}
              className="w-full rounded-md border border-white/20 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Date & time *
            </label>
            <input
              name="dateTime"
              type="datetime-local"
              defaultValue={defaultDateTime}
              required
              className="w-full rounded-md border border-white/20 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Tag
            </label>
            <input
              name="tag"
              type="text"
              defaultValue={event.tag ?? ""}
              className="w-full rounded-md border border-white/20 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Poster URL
            </label>
            <input
              name="posterUrl"
              type="text"
              defaultValue={event.posterUrl ?? ""}
              className="w-full rounded-md border border-white/20 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-red-400"
            />
            {event.posterUrl && (
              <p className="mt-1 text-xs text-white/60">
                Current: <span className="underline">{event.posterUrl}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              New poster file (optional)
            </label>
            <input
              name="posterFile"
              type="file"
              accept="image/*"
              className="w-full text-sm text-white"
            />
            <p className="mt-1 text-xs text-white/50">
              If you upload a new file, it replaces the current poster.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Tickets URL
            </label>
            <input
              name="ticketsUrl"
              type="url"
              defaultValue={event.ticketsUrl ?? ""}
              className="w-full rounded-md border border-white/20 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-red-400"
            />
          </div>

          <div className="flex items-center gap-2 md:col-span-2 mt-2">
            <input
              id="isPublished"
              name="isPublished"
              type="checkbox"
              defaultChecked={event.isPublished}
              className="h-4 w-4 rounded border border-white/40 bg-black/60"
            />
            <label
              htmlFor="isPublished"
              className="text-sm text-white/80 select-none"
            >
              Published
            </label>
          </div>

          <div className="md:col-span-2 mt-3 flex gap-3">
            <button
              type="submit"
              className="inline-flex items-center rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500"
            >
              Save changes
            </button>

            <Link
              href={`/${locale}/admin/events`}
              className="inline-flex items-center rounded-full border border-white/30 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
