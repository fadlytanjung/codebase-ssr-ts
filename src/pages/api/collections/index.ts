import type { NextApiHandler } from 'next';
import services from '@/configs/services';
import fetch from '@/utils/fetch';
import { getToken } from 'next-auth/jwt';

const collectionsHandler: NextApiHandler = async (req, res) => {
  const token = await getToken({ req });
  const options = {
    url: services.GET_ALBUM(),
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token?.accessToken}`
    },
  };
  try{
    const data = await fetch(options);
    res.json({ data: data });
  }catch(err){
    res.json(err);
  }
};

export default collectionsHandler;
