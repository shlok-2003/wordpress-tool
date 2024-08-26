import { useState } from "react";
import {
    CaretSortIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
    ColumnDef,
    ColumnMeta,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const data: Product[] = [
    {
        sku: "SKU001",
        name: "Product 1",
        description:
            "Description 1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        regularPrice: 100,
        salePrice: 80,
        category: "Category 1",
    },
    {
        sku: "SKU002",
        name: "Product 2",
        description: "Description 2",
        regularPrice: 120,
        salePrice: 100,
        category: "Category 2",
    },
];

interface Product {
    sku: string;
    name: string;
    description: string;
    regularPrice: number;
    salePrice: number;
    category: string;
}

interface IColumnMeta extends ColumnMeta<Product, unknown> {
    className?: string;
}

type IColumnDef = ColumnDef<Product, unknown> & {
    meta?: IColumnMeta;
};

export default function DashboardTable() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );
    const [rowSelection, setRowSelection] = useState({});
    const [descriptionColCn, setDescriptionColCn] =
        useState<string>("w-[200px]");

    const columns: IColumnDef[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "sku",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        SKU
                        <CaretSortIcon className="ml-2 size-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="text-center">{row.getValue("sku")}</div>
            ),
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Product Name
                        <CaretSortIcon className="ml-2 size-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="text-center">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "description",
            header: ({ column }) => {
                return (
                    <div
                        className="flex flew-row flex-nowrap"
                        style={{ width: descriptionColCn }}
                    >
                        <Button
                            variant="ghost"
                            className="w-full"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc",
                                )
                            }
                        >
                            Product Description
                            <CaretSortIcon className="ml-2 size-4" />
                        </Button>

                        <Button
                            className="w-min"
                            variant="ghost"
                            onClick={() =>
                                setDescriptionColCn((prev: string) =>
                                    prev === "w-[200px]"
                                        ? "w-max"
                                        : "w-[200px]",
                                )
                            }
                        >
                            <ChevronRightIcon />
                        </Button>
                    </div>
                );
            },
            cell: ({ row }) => (
                <div className="text-center overflow-auto text-nowrap">
                    {row.getValue("description")}
                </div>
            ),
            meta: {
                className: descriptionColCn,
            },
        },
        {
            accessorKey: "category",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Product Category
                        <CaretSortIcon className="ml-2 size-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="text-center">{row.getValue("category")}</div>
            ),
        },
        {
            accessorKey: "regularPrice",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Regular Price
                        <CaretSortIcon className="ml-2 size-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="lowercase text-center">
                    {row.getValue("regularPrice")}
                </div>
            ),
        },
        {
            accessorKey: "salePrice",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Sales Price
                        <CaretSortIcon className="ml-2 size-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("salePrice"));

                // Format the amount as a indian rupee
                const formatted = new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                }).format(amount);

                return <div className="lowercase text-center">{formatted}</div>;
            },
        },
        {
            id: "actions",
            header: () => <div className="w-full">Edit</div>,
            cell: ({ row }) => {
                const payment = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="size-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(payment.name)
                                }
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>
                                View payment details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    function handleDeleteRow() {
        console.log(rowSelection);
    }

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <div className="flex items-center justify-start gap-5 flex-grow">
                    <Input
                        placeholder="Filter by Product name"
                        value={
                            (table
                                .getColumn("name")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("name")
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />

                    <Button variant="destructive" onClick={handleDeleteRow}>
                        Delete
                    </Button>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={cn(
                                                (
                                                    header.column.columnDef
                                                        .meta as {
                                                        className?: string;
                                                    }
                                                )?.className,
                                            )}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cn(
                                                (
                                                    cell.column.columnDef
                                                        .meta as {
                                                        className?: string;
                                                    }
                                                )?.className,
                                            )}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
