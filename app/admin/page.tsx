import { AdminLogin } from "@/components/admin/AdminLogin";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const loginFailed = params.error === "login";

  return <AdminLogin loginFailed={loginFailed} />;
}
