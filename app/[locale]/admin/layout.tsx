import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type AdminLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale } = await params;

  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("la_comedia_admin")?.value === "1";

  if (!isAdmin) {
    redirect(`/${locale}/admin-login`);
  }

  return <>{children}</>;
}
