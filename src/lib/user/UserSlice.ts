// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the UserModel interface
export interface UserModel {
  _id: string;
  name: string;
  email: string;
  discount: number;
}

// Define the initial state based on the UserModel interface
const initialState: UserModel = {
  _id: '',
  name: '',
  email: '',
  discount: 0,
};

// Create a slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set user data
    setUserData: (state, action: PayloadAction<UserModel>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.discount = action.payload.discount;
    },
  },
});

// Export the action
export const { setUserData } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
