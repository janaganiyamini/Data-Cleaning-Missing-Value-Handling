export interface DataStats {
  totalRows: number;
  totalColumns: number;
  missingValues: { [key: string]: number };
  missingPercentage: { [key: string]: number };
  columnTypes: { [key: string]: 'numerical' | 'categorical' };
}

export interface ImputationOptions {
  numerical: 'mean' | 'median' | 'drop';
  categorical: 'mode' | 'drop';
  dropThreshold: number;
}

export function parseCSV(text: string): string[][] {
  const lines = text.trim().split('\n');
  return lines.map(line => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    return values;
  });
}

export function analyzeData(data: string[][]): DataStats {
  if (data.length === 0) {
    return {
      totalRows: 0,
      totalColumns: 0,
      missingValues: {},
      missingPercentage: {},
      columnTypes: {}
    };
  }

  const headers = data[0];
  const rows = data.slice(1);
  const stats: DataStats = {
    totalRows: rows.length,
    totalColumns: headers.length,
    missingValues: {},
    missingPercentage: {},
    columnTypes: {}
  };

  headers.forEach((header, colIndex) => {
    let missingCount = 0;
    let numericCount = 0;
    const values: string[] = [];

    rows.forEach(row => {
      const value = row[colIndex];
      if (!value || value.trim() === '' || value.toLowerCase() === 'nan' || value.toLowerCase() === 'null') {
        missingCount++;
      } else {
        values.push(value);
        if (!isNaN(Number(value))) {
          numericCount++;
        }
      }
    });

    stats.missingValues[header] = missingCount;
    stats.missingPercentage[header] = (missingCount / rows.length) * 100;
    stats.columnTypes[header] = (numericCount / values.length) > 0.8 ? 'numerical' : 'categorical';
  });

  return stats;
}

function isValueMissing(value: string): boolean {
  return !value || value.trim() === '' || value.toLowerCase() === 'nan' || value.toLowerCase() === 'null';
}

function calculateMean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function calculateMedian(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function calculateMode(values: string[]): string {
  const frequency: { [key: string]: number } = {};
  values.forEach(val => {
    frequency[val] = (frequency[val] || 0) + 1;
  });
  return Object.entries(frequency).sort((a, b) => b[1] - a[1])[0][0];
}

export function cleanData(data: string[][], options: ImputationOptions, stats: DataStats): string[][] {
  if (data.length === 0) return data;

  const headers = data[0];
  const rows = data.slice(1);

  const columnsToKeep: number[] = [];
  headers.forEach((header, index) => {
    if (stats.missingPercentage[header] < options.dropThreshold) {
      columnsToKeep.push(index);
    }
  });

  const filteredHeaders = columnsToKeep.map(i => headers[i]);

  const imputationValues: { [key: number]: string } = {};
  columnsToKeep.forEach(colIndex => {
    const header = headers[colIndex];
    const columnType = stats.columnTypes[header];
    const values: string[] = [];

    rows.forEach(row => {
      const value = row[colIndex];
      if (!isValueMissing(value)) {
        values.push(value);
      }
    });

    if (columnType === 'numerical') {
      if (options.numerical === 'mean') {
        const numValues = values.map(Number);
        imputationValues[colIndex] = calculateMean(numValues).toFixed(2);
      } else if (options.numerical === 'median') {
        const numValues = values.map(Number);
        imputationValues[colIndex] = calculateMedian(numValues).toFixed(2);
      }
    } else {
      if (options.categorical === 'mode' && values.length > 0) {
        imputationValues[colIndex] = calculateMode(values);
      }
    }
  });

  const cleanedRows = rows
    .map(row => {
      const newRow = columnsToKeep.map(colIndex => {
        const value = row[colIndex];
        if (isValueMissing(value) && imputationValues[colIndex]) {
          return imputationValues[colIndex];
        }
        return value;
      });
      return newRow;
    })
    .filter(row => {
      if (options.numerical === 'drop' || options.categorical === 'drop') {
        return row.every(val => !isValueMissing(val));
      }
      return true;
    });

  return [filteredHeaders, ...cleanedRows];
}

export function exportToCSV(data: string[][]): string {
  return data.map(row =>
    row.map(cell => {
      if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
        return `"${cell.replace(/"/g, '""')}"`;
      }
      return cell;
    }).join(',')
  ).join('\n');
}
