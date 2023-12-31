import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
}, { timestamps: true })


userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) {
      next()
   }

   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
}

//Export the model
const User = mongoose.model('User', userSchema);

export default User;