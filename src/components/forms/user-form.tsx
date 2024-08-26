import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog";
import { editUserSchema, userSchema } from "@/types";
import { FaEdit } from "react-icons/fa";

import { addUser, editUser } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";

export function UserForm() {
    const dispatch = useDispatch<AppDispatch>();

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: "",
            password: "",
            confirm_password: "",
        },
    });

    function onSubmit(values: z.infer<typeof userSchema>) {
        const newUser = {
            id: Math.random() * 100,
            username: values.username,
        };

        dispatch(addUser(newUser));
        form.reset();
    }

    return (
        <div className="shadow-[0_3px_8px_0_rgba(0,0,0,0.16)] p-5 flex flex-col gap-4">
            <h1 className="text-3xl font-medium">Add User</h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 min-w-[400px]"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Username"
                                        className="h-12 text-base"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormControl>
                                    <div>
                                        <Input
                                            type="password"
                                            className="h-12 text-base peer"
                                            placeholder="Password"
                                            {...field}
                                        />
                                        {/* <FormLabel className="absolute left-2 top-1/2 -translate-y-1/2 transition-all peer-focus:top-0 peer-focus:scale-75 peer-focus:bg-white peer-focus:px-2">
                                            Password
                                        </FormLabel> */}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="h-12 text-base"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        variant="default"
                        className="bg-blue-600"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export function EditUserForm({ username: old_username }: { username: string }) {
    const dispatch = useDispatch<AppDispatch>();
    
    const form = useForm<z.infer<typeof editUserSchema>>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            username: old_username,
            password: "",
            new_password: "",
        },
    });

    function onSubmit(values: z.infer<typeof editUserSchema>) {
        console.log(values);

        dispatch(editUser(values.username));
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <FaEdit className="text-blue-500 hover:text-blue-700 font-bold text-2xl" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input readOnly {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter current password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="new_password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter new password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-row gap-5">
                                <Button type="submit">Submit</Button>

                                <Button type="button" variant="outline">
                                    <DialogClose>Cancel</DialogClose>
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
