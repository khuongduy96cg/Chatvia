// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET_KEY as string;

export default async (req: any, res: any) => {
  const token = await getToken({ req, secret });
  res.send(JSON.stringify(token, null, 2));
};