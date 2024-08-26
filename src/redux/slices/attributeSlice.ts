import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attribute } from "@/pages/add-attribute";

interface AttributeState {
    attributes: Attribute[];
}

const initialState: AttributeState = {
    attributes: [],
};

const attributeSlice = createSlice({
    name: "attribute",
    initialState,
    reducers: {
        addAttribute: (state, action: PayloadAction<Attribute>) => {
            state.attributes.push(action.payload);
        },
        editAttribute: (state, action: PayloadAction<Attribute>) => {
            const index = state.attributes.findIndex(
                (attr) => attr.id === action.payload.id,
            );
            if (index !== -1) {
                state.attributes[index] = action.payload;
            }
        },
        addTerm: (
            state,
            action: PayloadAction<{ id: number; term: string }>,
        ) => {
            const index = state.attributes.findIndex(
                (attr) => attr.id === action.payload.id,
            );
            if (index !== -1) {
                state.attributes[index].terms.push(action.payload.term);
            }
        },
        deleteTerm: (
            state,
            action: PayloadAction<{ id: number; term: string }>,
        ) => {
            const index = state.attributes.findIndex(
                (attr) => attr.id === action.payload.id,
            );
            if (index !== -1) {
                state.attributes[index].terms = state.attributes[
                    index
                ].terms.filter((term) => term !== action.payload.term);
            }
        },
        deleteAttribute: (state, action: PayloadAction<number>) => {
            state.attributes = state.attributes.filter(
                (attr) => attr.id !== action.payload,
            );
        },
    },
    // extraReducers(builder) {

    // },
});

export const {
    addAttribute,
    addTerm,
    editAttribute,
    deleteAttribute,
    deleteTerm,
} = attributeSlice.actions;
export default attributeSlice.reducer;
