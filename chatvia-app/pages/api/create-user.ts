import UserModel from "@/models/user_model";
import connectDB from "@/utils/mongoose";

export default async function handler(req: any, res: any) {
    return new Promise<void>(async (resolve) => {
        const { username, password, email } = req.query;
        /** Using the MongoDB adapter or the Mongoose one doesn't matter
         *  as you have to always initiate a connection when using the
         *  API routes. Zou have to initiate a connection via Mongoose
         *  if you wish to use your models
         */
        await connectDB();
        UserModel.create({ username, password, email }, function (err: any, user: any) {
            if (err) {
                console.error(err);
                return resolve();
            }
            res.json("Created a record in the database " + user);
            return resolve();
        });
    });
}