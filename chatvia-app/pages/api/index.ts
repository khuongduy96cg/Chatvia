import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
//import authApi from './auth';

const apiHandler = nc<NextApiRequest, NextApiResponse>();

//apiHandler.use('/auth', authApi);

export default apiHandler;
