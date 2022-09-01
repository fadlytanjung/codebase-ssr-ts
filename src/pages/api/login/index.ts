/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from '@/utils/fetch';
import services from '@/configs/services';

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  try {
    const options = {
      method: 'POST',
      url: services.LOGIN(),
      data: {
        ...body
      }
    };
    const response = await fetch(options);

    res.status(200).json(response);

  } catch (err: any) {
    res.status(err.error.status || 500).json(err);
  }
};

export default loginHandler;
