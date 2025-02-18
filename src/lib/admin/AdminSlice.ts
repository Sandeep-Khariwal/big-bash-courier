// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the UserModel interface
export interface AdminModel {
  _id: string;
  name: string;
  email: string;
}

// Define the initial state based on the UserModel interface
const initialState: AdminModel = {
  _id: "",
  name: "",
  email: "",
};

// Create a slice
const adminSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set user data
    setAdminData: (state, action: PayloadAction<AdminModel>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

// Export the action
export const { setAdminData } = adminSlice.actions;

// Export the reducer to be used in the store
export default adminSlice.reducer;
