import { format } from "date-fns";

export function formatDate(dateString: string | null): string | null {
  if (!dateString) return null;
  return format(new Date(dateString), "dd.MM.yyyy");
}
