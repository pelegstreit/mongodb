import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    first_name  : String,
    last_name   : String,
    email       : String,
    phone       : String
});
  
export default model('user',UserSchema);