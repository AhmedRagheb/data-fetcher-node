export function isEmptyArray(data: any[] | undefined): boolean {
  return !data || !Array.isArray(data) || !data.length;
}

export function formatToISODateString(date: Date) {
  return date.toISOString().split('T')[0];
}
