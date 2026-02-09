import type { DataTableValue } from "@/lib/types";

interface DataTableProps {
  value: DataTableValue;
}

export function DataTable({ value }: DataTableProps) {
  return (
    <div className="my-4">
      {value.caption && (
        <p className="mb-2 text-sm font-medium text-gray-600">
          {value.caption}
        </p>
      )}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              {value.headers.map((header, i) => (
                <th
                  key={i}
                  className="px-3 py-2 text-left font-semibold text-gray-900"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value.rows.map((row, rowIdx) => (
              <tr
                key={row._key}
                className={rowIdx % 2 === 1 ? "bg-gray-50" : ""}
              >
                {row.cells.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="border-t border-gray-200 px-3 py-2 text-gray-700"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
