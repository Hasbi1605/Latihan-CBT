/** Gabungkan className — util ringan ala shadcn/TailAdmin */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
