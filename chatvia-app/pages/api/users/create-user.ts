import { User } from "@/interfaces/auth";
import { ResponseAPI } from "@/interfaces/response";
import UserModel from "@/models/user_model";
import connectDB from "@/utils/mongoose";

import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: any) {
    return new Promise<void>(async (resolve) => {
        const { username, password, email, first_name, last_name } = req.body as User;
        console.log('create-user=========', req.body);//or req.query
        /** Using the MongoDB adapter or the Mongoose one doesn't matter
         *  as you have to always initiate a connection when using the
         *  API routes. Zou have to initiate a connection via Mongoose
         *  if you wish to use your models
         */

        await connectDB();

        const isExistedUser = await UserModel.findOne({ username } as User) ? true : false
        
        if(isExistedUser) return resolve(res.send({ Status: 'failed', Code: 0, Message: 'Username is existed' } as ResponseAPI));

        const hashedPassword = encodePassword(password) as string
        if (hashedPassword === '') {
            return resolve(res.send({ Status: 'failed', Code: 0 } as ResponseAPI));
        }

        const newUSer: User = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            username,
            password: hashedPassword,
            email,
            first_name,
            last_name
        }

        UserModel.create(newUSer)
            .then((createdUser) => {
                //res.json("Created a record in the database " + createdUser);
                return resolve(res.send({ Status: 'ok', Code: 1, Message: 'success' } as ResponseAPI));
            })
            .catch((err) => {
                console.error(err);
                return resolve(res.send({ Status: 'failed', Code: 0, Message: err.toString() } as ResponseAPI));
            });
        //setTimeout(() => { return resolve(res.send({ status: 'ok', code: 1, message: 'success' })); }, 2000);
    });
}

const saltRounds = 10;
const encodePassword = (password: string) => {
    try {
        const hashedPassword = bcrypt.hashSync(password, saltRounds)
        console.log('hashedPassword========', hashedPassword)
        return hashedPassword
    }
    catch (err) {
        return '';
    }
}