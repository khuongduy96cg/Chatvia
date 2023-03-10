import { Schema, model, models } from "mongoose";

// create a schema
const userSchema = new Schema({
  _id: {
    type: String,
    required:true
  },
  username:{
    type: String,
    required:true
  },
  password:{
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  name: {
        first_name: {
            type: String,
            required: false
        },
        last_name: {
          type: String
        }
    }
});

// the schema is useless so far
// we need to create a model using it
const UserModel = models.User || model('User', userSchema, "User");

// make this available to our users in our Node applications
export default UserModel;