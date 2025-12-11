import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: { error?: string };
};

export default async function AdminLoginPage({ params, searchParams }: LoginPageProps) {
  const { locale } = await params;
  const hasError = searchParams?.error === "1";

  async function login(formData: FormData) {
    "use server";

    const password = formData.get("password") as string;

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      redirect(`/${locale}/admin-login?error=1`);
    }

    const cookieStore = await cookies();

    cookieStore.set("la_comedia_admin", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 4, // 4 hours
    });

    redirect(`/${locale}/admin/events`);
  }

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-6">
      <h1 className="mb-4 text-2xl font-semibold">Admin login</h1>
      <p className="mb-6 text-sm text-white/70">
        This area is for La Comedia staff only.
      </p>

      {hasError && (
        <div className="mb-4 rounded-lg border border-red-500/70 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          Incorrect password. Try again.
        </div>
      )}

      <form action={login} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-white/80">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-md border border-white/20 bg-black/60 px-3 py-2 text-sm text-white outline-none focus:border-red-400"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
        >
          Enter admin
        </button>
      </form>
    </main>
  );
}
