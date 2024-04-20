import { formatDistanceToNow, parseISO } from "date-fns";

export function dateToTimeAgo(date: string) {
  const parsedDate = parseISO(date);

  const timeAgoString = formatDistanceToNow(parsedDate, { addSuffix: true });

  return timeAgoString;
}
