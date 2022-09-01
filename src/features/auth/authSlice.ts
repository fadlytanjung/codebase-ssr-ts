import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { useSession, signIn, getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from '../../lib/axios';

export interface loginResponse {
  jwt: string;
  user: Record<string, unknown>,
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        ...credentials,
        callbackUrl: `${window.location.origin}/albums`,
      });
      return  {
        accessToken: '', me: {},
        error: res?.error || ''
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export interface AuthSliceState {
  accessToken: string
  loading: boolean
  me?: {
    username?: string
    email?: string
  }
  error?: SerializedError
}

const internalInitialState = {
  accessToken: '',
  loading: false,
  me: {},
  error: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken
      state.me = action.payload.me
      state.loading = false;
      state.error = action.payload.error
    })
    builder.addCase(login.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(login.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error as string }

    })
  },
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;