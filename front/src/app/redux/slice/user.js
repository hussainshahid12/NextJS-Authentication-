import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// sign_up
export const fetchUserSignup = createAsyncThunk(
  "user/fetchSignup",
  async (user, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:8080/user/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const error = await response.json();

      return rejectWithValue(error);
    }
    const result = await response.json();
    return result;
  }
);

// verify User
export const fetchUserOTP = createAsyncThunk(
  "user/fetchUserOTP",
  async (otp_verify, { rejectWithValue }) => {
    console.log(otp_verify);
    const response = await fetch(`http://localhost:8080/user/verifyEmail`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(otp_verify),
    });
    if (!response.ok) {
      const error = await response.json();

      return rejectWithValue(error);
    }
    const result = await response.json();
    return result;
  }
);

export const fetchUserLogin = createAsyncThunk(
  "user/fetchUserLogin",
  async (user, { rejectWithValue }) => {
    console.log("jdodjoajd");
    const response = await fetch(`http://localhost:8080/user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const error = await response.json();

      return rejectWithValue(error);
    }
    const result = await response.json();
    return result;
  }
);
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:8080/user/me`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();

      return rejectWithValue(error);
    }
    const result = await response.json();
    return result;
  }
);

export const fetchUserLogout = createAsyncThunk(
  "user/fetchUserLogout",
  async (_, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:8080/user/logout`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();

      return rejectWithValue(error);
    }
    const result = await response.json();
    return result;
  }
);

export const fetchUserChangePassword = createAsyncThunk(
  "user/fetchUserChangePassword",
  async (user, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:8080/user/changePassword`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const error = await response.json();

      return rejectWithValue(error);
    }
    const result = await response.json();
    return result;
  }
);
const initialState = {
  status: "ide",
  isAuth: false,
  user: null,
  error: null,
  otp_verify: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment(state) {},
    decrement(state) {},
    incrementByAmount(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSignup.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchUserSignup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchUserSignup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
        state.user = null;
        state.isAuth = false;
      })

      // verify user OTP
      .addCase(fetchUserOTP.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchUserOTP.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.otp_verify = action.payload;
      })
      .addCase(fetchUserOTP.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
        state.otp_verify = null;
      })

      // Login
      .addCase(fetchUserLogin.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
        state.user = null;
      })

      // USER PROFILE
      .addCase(fetchUserProfile.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
        state.user = null;
      })

      // USER Logout
      .addCase(fetchUserLogout.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchUserLogout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserLogout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
        state.user = null;
      })

      // USER CHANGE PASSWORD
      .addCase(fetchUserChangePassword.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchUserChangePassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserChangePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
        state.user = null;
      });
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;
export default userSlice.reducer;
