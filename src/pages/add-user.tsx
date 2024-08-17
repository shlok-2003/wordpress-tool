import UserForm from "@/components/forms/user-form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FaEdit, MdDelete } from "@/icons";

export interface User {
    id: unknown;
    username: string;
}

export default function AddUser() {
    const users: User[] = [
        {
            id: 1,
            username: "john_doe",
        },
        {
            id: 2,
            username: "jane_doe",
        },
        {
            id: 3,
            username: "john_smith",
        },
        {
            id: 4,
            username: "john_doe",
        },
        {
            id: 5,
            username: "jane_doe",
        },
        {
            id: 6,
            username: "john_smith",
        },
        {
            id: 7,
            username: "john_doe",
        },
        {
            id: 8,
            username: "jane_doe",
        },
        {
            id: 9,
            username: "john_smith",
        },
    ];

    return (
        <main className="px-10 flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-start gap-16 pt-10">
                <UserForm />

                <div className="shadow-[0_3px_8px_0_rgba(0,0,0,0.16)] p-5 flex flex-col gap-4">
                    <h1 className="text-3xl font-medium">Add User</h1>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px] text-center">
                                    ID
                                </TableHead>
                                <TableHead className="text-center w-[200px]">
                                    UserName
                                </TableHead>
                                <TableHead className="text-center w-[200px]">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from(users)
                                .slice(0, 10)
                                .map((user) => (
                                    <TableRow key={user.id as number}>
                                        <TableCell className="font-medium text-center">
                                            {user.id as number}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {user.username}
                                        </TableCell>
                                        <TableCell className="text-center flex flex-row justify-center items-center gap-4">
                                            <FaEdit className="text-blue-500 hover:text-blue-700 font-bold text-2xl" />
                                            <MdDelete className="text-red-500 hover:text-red-700 font-bold text-2xl" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </main>
    );
}
