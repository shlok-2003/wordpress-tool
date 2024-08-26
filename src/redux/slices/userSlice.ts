import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/pages/add-user";

interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        editUser: (state, action: PayloadAction<string>) => {
            const index = state.users.findIndex(
                (user) => user.username === action.payload,
            );
            if (index !== -1) {
                state.users[index].username = action.payload;
            }
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(
                (user) => user.username !== action.payload,
            );
        },
    },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
