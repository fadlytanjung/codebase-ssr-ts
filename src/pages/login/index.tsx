import React, { useState } from 'react';
import { Alert, Typography, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { login } from '@/features/auth/authSlice';
import { GetServerSidePropsContext } from 'next';
import { getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/router';


function Login({ csrfToken }: { csrfToken: string }) {
  const [payload, setPayload] = useState({ email: '', password: '' });
  const dispatch = useAppDispatch();
  const [isSubmit, setSubmit] = useState(false);
  const { loading, error } = useAppSelector(state => state.auth);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
    const res = await dispatch(login(payload)).unwrap();
    if (!res.error) router.push(`${window.location.origin}/albums`);
  };
  const messageInfo = (
    <>
      Use <b>muhammad.fadly02@ui.ac.id</b> as email test and <b>Aacd1234</b> as password !!
    </>
  );

  return (
    <div className="w-[28rem] mx-auto p-4">
      <Typography className="mb-6 text-center" variant="h5">Login Before Access Collections</Typography>
      <Alert className="mb-6" severity={error && isSubmit ? 'error' : 'info'}>
        {error && isSubmit ? error : messageInfo}</Alert>
      <form onSubmit={handleSubmit}>
        <section className="flex flex-col">
          <input
            defaultValue={csrfToken}
            name="csrfToken"
            type="hidden"
          />
          <TextField
            className="mb-6"
            id="email"
            label="Email"
            name="email"
            onChange={(e) => setPayload({ ...payload, email: e.target.value })}
            required
            size="small"
            type="text"
          />
          <TextField
            className="mb-6"
            id="password"
            label="Password"
            name="password"
            onChange={(e) => setPayload({ ...payload, password: e.target.value })}
            required
            size="small"
            type="password"
          />
          <LoadingButton className="mb-6" loading={loading} type="submit" variant="outlined">
            Login
          </LoadingButton>
        </section>
      </form>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Login;
