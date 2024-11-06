export default function formatDate(dateString: string): string {
  const date = new Date(dateString);
  console.log(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
    timeZone: "America/New_York",
  }).format(date);
}
