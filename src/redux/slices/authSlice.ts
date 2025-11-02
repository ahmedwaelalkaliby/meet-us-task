import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState, LoginCredentials, LoginResponse } from "@/types/auth";
import { toast } from "sonner";

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null
};

export const getUserData = createAsyncThunk(
    'auth/getUser',
    async ({ token, baseUrl }: { token: string; baseUrl: string }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${baseUrl}/api/auth/user`, {
                headers: { Cookie: `token=${token}` },
                cache: "no-store",
            });

            if (res.status === 401) {
                return rejectWithValue('Unauthorized');
            }

            if (!res.ok) {
                return rejectWithValue('Failed to fetch user data');
            }

            const userData = await res.json();
            return userData;
        } catch (error) {
            return rejectWithValue('Something went wrong while fetching user data');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/auth/logout', {
                method: 'POST'
            });

            if (!res.ok) {
                return rejectWithValue('Logout failed. Please try again.');
            }

            return { success: true };
        } catch (error) {
            console.error('Logout failed:', error);
            return rejectWithValue('Logout failed. Please try again.');
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            const data: LoginResponse = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || 'Invalid email or password');
            }

            if (!data.success) {
                return rejectWithValue(data.message || 'Login failed');
            }

            return data;
        } catch (error) {
            return rejectWithValue('Something went wrong. Please try again.');
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user || null;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload as string;
            });
    }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;