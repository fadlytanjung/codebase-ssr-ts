
import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import type { AppState, AppThunk } from '../../store';
import { getDetailAlbum } from '../../actions/collections';
import fetch from '@/utils/fetch';

export interface Photos {
  id: string | number;
  title: string;
  desciption: string;
  url: string;
}
export interface ItemCollection {
  id: number | string;
  title: string;
  cover?: string;
  description?: string;
  url: string;
  photos: Array<Photos>;
  apiId?: string;
}

export interface CollectionState {
  data: Array<ItemCollection>;
  loading: boolean;
  album: ItemCollection;
  error?: SerializedError;
}

export interface URIQueryParams {
  page: number;
  size: number;
}

export interface APIResponse {
  data: Array<ItemCollection>,
  message?: string
}

const initialState: CollectionState = {
  data: [],
  error: {},
  album: {
    id: '',
    title: '',
    cover: 'https://alppetro.co.id/dist/assets/images/default.jpg',
    photos: [],
    url: ''
  },
  loading: false,
}

export const getCollection = createAsyncThunk(
  'get/fetchAlbum',
  async (_, thunkAPI) => {
    const response = await fetch({
      url: '/api/collections',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }) as APIResponse;
    if (response?.message) {
      return thunkAPI.rejectWithValue({ error: response?.message });
    } else {
      return { data: response.data as Array<ItemCollection>, error: '' };
    }
  }
)

export const counterSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    getCollections: (state, action: PayloadAction<string>) => {

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCollection.fulfilled, (state, action) => {
        state.data.push(...action.payload.data);
        state.loading = false;
      })
      .addCase(getCollection.rejected, (state, action: any) => {
        state.error = action.payload.error;
        state.loading = false;
      })
      .addCase(getDetailAlbum.pending, (state, action: any) => {
        state.loading = true;
      })
      .addCase(getDetailAlbum.rejected, (state, action: any) => {
        console.log({ rejected: action });
      })
      .addCase(getDetailAlbum.fulfilled, (state, action: any) => {
        console.log({ success: action });
        state.album = action.payload;
        state.loading = false;
      })
  },
})

export const { getCollections } = counterSlice.actions

export const selectCollection = (state: AppState) => state.collections.data;

export default counterSlice.reducer;
