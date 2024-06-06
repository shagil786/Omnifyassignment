export function convertToCSV<T extends object>(jsonData: T[], headers: (keyof T)[] = []): string {
    // Convert JSON to CSV
    const csvRows: string[] = [];
  
    // If headers are not provided, get the keys from the first object in the JSON data
    if (headers.length === 0) {
      headers = Object.keys(jsonData[0]) as (keyof T)[];
    }
  
    // Push the headers as the first row
    csvRows.push(headers.join(','));
  
    // Push the data rows
    for (const item of jsonData) {
      const values = headers.map(header => String(item[header]));
      csvRows.push(values.join(','));
    }
  
    // Join all the rows into a single CSV string
    return csvRows.join('\n');
  }
  
  export function downloadCSV<T extends object>(jsonData: T[], filename = 'data.csv', headers: (keyof T)[] = []): void {
    // Convert JSON to CSV
    const csvData = convertToCSV(jsonData, headers);
  
    // Create a temporary link element
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvData));
    downloadLink.setAttribute('download', filename);
  
    // Append the link to the DOM, click it, and then remove it
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }