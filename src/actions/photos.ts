import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage } from '@/utils/error';
import { signIn } from 'next-auth/react';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        ...credentials,
        callbackUrl: `${window.location.origin}/albums`,
      });
      return {
        accessToken: '', me: {},
        error: res?.error || ''
      };
    } catch (error) {
      const errMsg = getErrorMessage(error);
      return thunkAPI.rejectWithValue({ error: errMsg });
    }
  }
);
