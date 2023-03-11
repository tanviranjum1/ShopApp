import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)
// timestamps for fields like created at and updated at.

// can create method that we can access through instantiated user.
userSchema.methods.matchPassword = async function(enteredPassword){
  // use bcrypt to compare with db encrypted password. Can access any of the fields present with 'this' keyword.
  return await bcrypt.compare(enteredPassword,  this.password)
}

//before saving to db encrypt the password.
userSchema.pre('save', async function(next){

  // only do if password field sent or modified.
   // else move on.
    if (!this.isModified('password')){
      next()
    }

 
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

})


const User = mongoose.model('User', userSchema)

export default User
