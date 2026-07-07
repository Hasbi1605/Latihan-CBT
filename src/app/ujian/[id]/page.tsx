import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import ExamRunner from "./ExamRunner";

export default async function UjianPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const { id } = await params;
  return <ExamRunner attemptId={id} />;
}
