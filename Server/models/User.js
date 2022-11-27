
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
 name : {
  type : String,
  required : true,
 },
 email : {
  type : String,
  required : true,
  unique : [true, "User with this email already exists"]
 },
 password : {
  type : String,
 },

 fromGoogle:{
   type : Boolean,
   default : false
 },
 img: {
  type : String
 },
  subscribers : {
  type : Array,
  default : []
  },
  subscribedUsers : {
   type : [String]
  }
}, {
 timestamps : true
})

export default mongoose.model("User", UserSchema)