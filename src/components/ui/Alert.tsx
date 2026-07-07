import { cn } from "@/lib/cn";

export function Alert({
  tone = "error",
  children,
  className,
}: {
  tone?: "error" | "success" | "warning" | "info";
  children: React.ReactNode;
  className?: string;
}) {
  const styles = {
    error: "border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200",
    success:
      "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200",
    warning:
      "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200",
    info: "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-200",
  }[tone];

  return (
    <div className={cn("rounded-xl border px-3.5 py-2.5 text-sm", styles, className)}>
      {children}
    </div>
  );
}
