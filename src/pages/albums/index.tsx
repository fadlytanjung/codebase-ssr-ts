import React, { useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { getCollection } from '@/features/collections/collectionSlice';
import { cssTitleWrapper } from './styles';
import { wrapper, AppDispatch } from '../../store';
import { GetServerSideProps } from 'next';
import styles from './styles.module.scss';
import { addTodos } from '@/features/todos/todosSlice';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

function Albums() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data, loading } = useAppSelector(state => state.collections);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  useEffect(() => {
    dispatch(getCollection());
  }, [dispatch]);

  return (
    <div className="w-[36rem] mx-auto p-4">
      <Typography variant="subtitle2">{loading ? 'Loading ...' : 'Albums Collections'}</Typography>
      <>{session?.accessToken && <Button className="mt-2" color="error" onClick={() => signOut()} size="small" variant="outlined">Logout</Button>}</>
      <section className="flex mt-5 w-full flex-wrap">
        {data.map((el => (
          <div className="sm:w-1/2 md:w-1/3 w-1/2 p-2 border border-gray-200" key={el.id}>
            <div className={['relative', styles.cssTitleWrapper].join(' ')}>
              <picture>
                <img alt={el.cover} className="w-full h-28 object-cover" src={el.cover || 'https://alppetro.co.id/dist/assets/images/default.jpg'} />
              </picture>
              <div className={[cssTitleWrapper, styles.cssOverflowContent].join(' ')}>
                <Typography className="text-white" variant="subtitle2">{el.title}</Typography>
              </div>
            </div>
          </div>
        )))}
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async () => {
      const { dispatch }: { dispatch: AppDispatch } = store;
      // exmaple dispatch from SSR
      await dispatch(addTodos({ id: '213', item: 'From Server Side', status: 'Todo' }));
      return {
        props: {

        }
      };
    });

export default Albums;
