import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/app/redux/slice/user";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
