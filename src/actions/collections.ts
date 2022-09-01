import { createAsyncThunk } from '@reduxjs/toolkit';
import fetch from '@/utils/fetch';
import services from '@/configs/services';

export const getDetailAlbum = createAsyncThunk('albums/detail',
  async(id: string) => {
    const res = await fetch({
      url: services.GET_ALBUM(id),
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return res;
  }
);
