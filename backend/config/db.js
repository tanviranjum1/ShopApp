import mongoose from 'mongoose'

const MONGO_URIStr =  "mongodb+srv://Tanv1r:leadingGeek1@cluster0.ttq28tg.mongodb.net/proshop?retryWrites=true&w=majority"

// error with useCreateIndex: true,
const connectDB = async() =>{
  try {
    const conn = await mongoose.connect(MONGO_URIStr, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log(`MongoDB Connected : ${conn.connection.host}.cyan.underline`);
  }
  catch(e){
    console.error(`Error: ${e.message}.red.underline.bold`)
    process.exit(1);
  }
}
export default connectDB;

// import mongoose from 'mongoose'



// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     })

//     console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
//   } catch (error) {
//     console.error(`Error: ${error.message}`.red.underline.bold)
//     process.exit(1)
//   }
// }

// export default connectDB
