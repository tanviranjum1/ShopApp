import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
// seperate script that we can run to import data.

import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()
// not creating any order but want the ability to destroy all users products and orders. so we need the order model to remove the data.

connectDB()


// connection between products and users, want admin user to be teh object id for all products.
// to delete all. because don't want to import stuff already in db.
const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

        // get id of admin user

    const adminUser = createdUsers[0]._id

        // add admin user to each product

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1) // exit with failure so 1.
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}



// to run node backend/seeder -d // to destroy data.
// else without -d

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
