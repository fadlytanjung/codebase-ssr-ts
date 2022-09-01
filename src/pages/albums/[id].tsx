import React, { useEffect } from 'react';
import { Typography, ImageList, ImageListItem } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { wrapper, AppDispatch } from '../../store';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { getDetailAlbum } from 'actions/collections';
import { useRouter } from 'next/router';

function DetailAlbum() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, album } = useAppSelector(state => state.collections);
  useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  useEffect(() => {
    if (router.query?.id) dispatch(getDetailAlbum(router.query?.id as string));
  }, [dispatch, router.query?.id]);

  return (
    <div className="w-[36rem] mx-auto p-4">
      <Typography variant="subtitle1">{loading ? 'Loading ...' : 'Detail Album'}</Typography>
      <section className="flex-col mt-5 w-full">
        <div className="flex bg-teal-600 w-full mb-2">
          <picture className="w-full">
            <img alt={album.title} className="w-full object-cover" src={album.cover} />
          </picture>
        </div>
        <Typography variant="subtitle2">{album.title}</Typography>
        <Typography className="mb-5" variant="subtitle1">{album.description}</Typography>
        <ImageList cols={2} rowHeight={200} sx={{ width: '100%' }}>
          {album.photos.map((item) => (
            <ImageListItem key={item.id}>
              <picture>
                <img
                  alt={item.title}
                  loading="lazy"
                  src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                />
              </picture>
            </ImageListItem>
          ))}
        </ImageList>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { dispatch }: { dispatch: AppDispatch } = store;
      const data = await dispatch(getDetailAlbum(params?.id as string));
      return {
        props: {
          data: data
        }
      };
    });

export default DetailAlbum;
