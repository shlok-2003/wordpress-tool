import { useSelector, useDispatch } from "react-redux";
import { EditUserForm, UserForm } from "@/components/forms/user-form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MdDelete } from "@/icons";
import { deleteUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";

export interface User {
    id: unknown;
    username: string;
}

export default function AddUser() {
    const dispatch = useDispatch<AppDispatch>();
    const users: User[] = useSelector((state: RootState) => state.user.users);

    function handleDelete(username: string) {
        dispatch(deleteUser(username));
        console.log(`Deleting user: ${username}`);
    }

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
                                            <EditUserForm
                                                username={user.username}
                                            />
                                            <MdDelete
                                                className="text-red-500 hover:text-red-700 font-bold text-2xl"
                                                onClick={() =>
                                                    handleDelete(user.username)
                                                }
                                            />
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
