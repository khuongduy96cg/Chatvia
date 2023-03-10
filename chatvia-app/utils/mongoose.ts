import mongoose from 'mongoose';

const MONGODB_DB = process.env.MONGODB_CONNECTION_STRING as string;
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as any);

    console.log('===========MongoDB Connected');

  } catch (err: any) {
    console.error('connect Mongo error=============', err.message);
    process.exit(1);
  }
};

export default connectDB;
