import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type AdminEventsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminEventsPage({ params }: AdminEventsPageProps) {
  // Next 16: params is a Promise
  const { locale } = await params;

  const events = await prisma.event.findMany({
    orderBy: { dateTime: "asc" },
  });

  // ---------- SERVER ACTION: LOGOUT ----------
  async function logout() {
    "use server";

    const cookieStore = await cookies();
    cookieStore.set("la_comedia_admin", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // delete cookie
    });

    redirect(`/${locale}/admin-login`);
  }

  // ---------- SERVER ACTION: CREATE ----------
  async function createEvent(formData: FormData) {
    "use server";

    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim() || null;
    const tag = (formData.get("tag") as string)?.trim() || null;
    let posterUrl = (formData.get("posterUrl") as string)?.trim() || null;
    const ticketsUrl = (formData.get("ticketsUrl") as string)?.trim() || null;
    const dateTimeRaw = formData.get("dateTime") as string;
    const isPublished = formData.get("isPublished") === "on";

    if (!title || !dateTimeRaw) return;

    // Обработка опциональной загрузки файла постера
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

    await prisma.event.create({
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

    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/admin/events`);
  }

  // ---------- SERVER ACTION: DELETE ----------
  async function deleteEvent(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) return;

    await prisma.event.delete({
      where: { id },
    });

    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/admin/events`);
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Админ – Мероприятия</h1>

        {/* Кнопка выхода → server action */}
        <form action={logout}>
          <button
            type="submit"
            className="text-xs rounded-full border border-white/30 px-3 py-1 text-white/70 hover:bg-white/10"
          >
            Выйти
          </button>
        </form>
      </div>

      {/* ФОРМА СОЗДАНИЯ МЕРОПРИЯТИЯ */}
      <section className="mb-10 rounded-2xl border border-white/10 bg-black/40 p-6">
        <h2 className="text-lg font-semibold mb-4">Создать новое мероприятие</h2>

        <form
          action={createEvent}
          className="grid gap-4 md:grid-cols-2"
          encType="multipart/form-data"
        >
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white/80 mb-1">
              Название *
            </label>
            <input
              name="title"
              type="text"
              required
              className="w-full rounded-md border border-white/20 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-red-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white/80 mb-1">
              Описание
            </label>
            <textarea
              name="description"
              rows={3}
              className="w-full rounded-md border border-white/20 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Дата и время *
            </label>
            <input
              name="dateTime"
              type="datetime-local"
              required
              className="w-full rounded-md border border-white/20 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Тэг (например, Stand-up, Karaoke)
            </label>
            <input
              name="tag"
              type="text"
              className="w-full rounded-md border border-white/20 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              URL постера (необязательно)
            </label>
            <input
              name="posterUrl"
              type="text"
              placeholder="/events/open-mic.jpg"
              className="w-full rounded-md border border-white/20 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Файл постера (необязательно)
            </label>
            <input
              name="posterFile"
              type="file"
              accept="image/*"
              className="w-full text-sm text-white"
            />
            <p className="mt-1 text-xs text-white/50">
              Если вы загружаете файл, он перезапишет URL постера.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Ссылка на билеты
            </label>
            <input
              name="ticketsUrl"
              type="url"
              className="w-full rounded-md border border-white/20 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-red-400"
            />
          </div>

          <div className="flex items-center gap-2 md:col-span-2 mt-2">
            <input
              id="isPublished"
              name="isPublished"
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border border-white/40 bg-black/60"
            />
            <label
              htmlFor="isPublished"
              className="text-sm text-white/80 select-none"
            >
              Опубликовано (видно на сайте)
            </label>
          </div>

          <div className="md:col-span-2 mt-3">
            <button
              type="submit"
              className="inline-flex items-center rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500"
            >
              Сохранить мероприятие
            </button>
          </div>
        </form>
      </section>

      {/* СПИСОК МЕРОПРИЯТИЙ */}
      <section className="rounded-2xl border border-white/10 bg-black/40 p-6">
        <h2 className="text-lg font-semibold mb-4">Все мероприятия</h2>

        {events.length === 0 ? (
          <p className="text-sm text-white/70">Пока нет мероприятий.</p>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium">
                    {event.title}{" "}
                    {!event.isPublished && (
                      <span className="ml-2 rounded-full bg-yellow-500/20 px-2 py-0.5 text-[0.7rem] text-yellow-300">
                        Не опубликовано
                      </span>
                    )}
                  </p>
                  <p className="text-white/60">
                    {event.tag && <span>{event.tag} • </span>}
                    {new Date(event.dateTime).toLocaleString("ru-RU", {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/${locale}/admin/events/${event.id}`}
                    className="rounded-full border border-white/30 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
                  >
                    Редактировать
                  </Link>

                  <form action={deleteEvent}>
                    <input type="hidden" name="id" value={event.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-red-500/60 px-3 py-1 text-xs text-red-300 hover:bg-red-500/20"
                    >
                      Удалить
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
