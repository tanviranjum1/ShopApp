
import bcrypt from 'bcryptjs'

// create an array of 3 users one of them is admin. has to have the fields in the user model or else mongoose will not 
// allow to insert into the database.
const users = [
  {name: 'Admin User', email: 'admin@example.com', password: bcrypt.hashSync('123456',10), isAdmin : true},
  {name: 'John Doe', email: 'john@example.com', password: bcrypt.hashSync('123456',10), },
  {name: 'Jane Doe', email: 'jane@example.com', password: bcrypt.hashSync('123456',10), },
]


export default users;


// import bcrypt from 'bcryptjs'

// const users = [
//   {
//     name: 'Admin User',
//     email: 'admin@example.com',
//     password: bcrypt.hashSync('123456', 10),
//     isAdmin: true,
//   },
//   {
//     name: 'John Doe',
//     email: 'john@example.com',
//     password: bcrypt.hashSync('123456', 10),
//   },
//   {
//     name: 'Jane Doe',
//     email: 'Jane@example.com',
//     password: bcrypt.hashSync('123456', 10),
//   },
// ]

// export default users
