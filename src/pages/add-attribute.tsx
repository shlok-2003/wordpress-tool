import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import {
    AddAttributeForm,
    ConfigureAttributeTermsForm,
    EditAttributeForm,
} from "@/components/forms/attribute-form";

// import { addAttribute, editAttribute } from '@/redux/slices/attributeSlice';

export interface Attribute {
    id: number;
    name: string;
    slug: string;
    terms: string[];
}

export default function AddAttribute() {
    const attributes: Attribute[] = useSelector(
        (state: RootState) => state.attribute.attributes,
    );

    return (
        <main className="px-10 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-4 self-start">
                Attributes Management
            </h2>

            <AddAttributeForm />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Terms</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {attributes.map((attr) => (
                        <TableRow key={attr.id}>
                            <TableCell>{attr.name}</TableCell>
                            <TableCell>{attr.slug}</TableCell>
                            <TableCell>{attr.terms.join(", ")}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <EditAttributeForm attribute={attr} />

                                    <ConfigureAttributeTermsForm
                                        id={attr.id}
                                        terms={attr.terms}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    );
}
