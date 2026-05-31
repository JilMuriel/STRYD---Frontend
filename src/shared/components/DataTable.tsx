import type { KeyboardEvent, ReactNode } from "react";

export type Column<T> = {
    key: string;
    header: ReactNode;
    className?: string;
    render: (row: T) => ReactNode;
};

type DataTableProps<T> = {
    data: T[];
    columns: Column<T>[];
    rowKey: (row: T) => string;
    onRowClick?: (row: T) => void;
    rowClassName?: (row: T, index: number) => string;
};

const isActivationKey = (key: string) => key === "Enter" || key === " ";

const DataTable = <T,>({
    data,
    columns,
    rowKey,
    onRowClick,
    rowClassName,
}: DataTableProps<T>) => {
    const handleRowKeyDown = (event: KeyboardEvent<HTMLTableRowElement>, row: T) => {
        if (!onRowClick || !isActivationKey(event.key)) return;

        event.preventDefault();
        onRowClick(row);
    };

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-outline-variant/30">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={`pb-[8px] font-label-caps text-label-caps text-on-surface-variant font-semibold ${column.className ?? ""}`}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, index) => (
                        <tr
                            key={rowKey(row)}
                            className={rowClassName?.(row, index)}
                            onClick={onRowClick ? () => onRowClick(row) : undefined}
                            onKeyDown={(event) => handleRowKeyDown(event, row)}
                            role={onRowClick ? "button" : undefined}
                            tabIndex={onRowClick ? 0 : undefined}
                        >
                            {columns.map((column) => (
                                <td key={column.key}>{column.render(row)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;