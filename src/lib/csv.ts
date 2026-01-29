export function generateCSV(data: any[], headers: string[]) {
  const headerRow = headers.join(',');
  const rows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header] || '';
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(',')
  );

  return [headerRow, ...rows].join('\n');
}
