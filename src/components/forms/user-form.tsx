import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    // FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
    .object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
        confirm_password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
    })
    .refine((data) => data.password === data.confirm_password, {
        path: ["confirm_password"],
        message: "Passwords do not match.",
    });

export default function UserForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            confirm_password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        alert(JSON.stringify(values, null, 2));
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
