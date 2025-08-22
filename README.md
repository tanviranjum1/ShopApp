# 🛒 ProShop - MERN Stack E-Commerce Application

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, product management, shopping cart functionality, and payment integration.

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Database Design](#-database-design)
- [Implementation Status](#-implementation-status)
- [User Interaction Flow](#-user-interaction-flow)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Documentation](#-api-documentation)
- [Development Guide](#-development-guide)
- [Security](#-security)
- [Contributing](#-contributing)

## ✨ Features

### ✅ Fully Implemented
- **User Authentication & Authorization**
  - User registration and login
  - JWT token-based authentication
  - Role-based access control (Admin/User)
  - Password encryption with bcrypt

- **Product Management**
  - Product catalog with categories
  - Product search and filtering
  - Product details with images
  - Stock management

- **Shopping Cart System**
  - Add/remove items from cart
  - Update quantities
  - Persistent cart storage
  - Cart total calculation

- **Order Management**
  - Order creation and processing
  - Order history for users
  - Order status tracking
  - Admin order management

- **File Upload System**
  - Product image uploads
  - File validation and storage
  - Secure file serving

### 🔄 Partially Implemented
- **Payment Integration**
  - PayPal integration structure
  - Payment processing setup
  - ⚠️ Requires PayPal credentials configuration

- **Admin Dashboard**
  - Basic admin functionality
  - Product management
  - ⚠️ Enhanced admin features needed

### 🚧 Future Enhancements
- **Advanced Features**
  - Email notifications
  - Product reviews and ratings
  - Wishlist functionality
  - Advanced search filters
  - Inventory management
  - Sales analytics
  - Multi-language support
  - Mobile app version

## 🛠 Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **multer** - File uploads
- **dotenv** - Environment variables

### Frontend
- **React.js** - UI framework
- **Redux** - State management
- **React Router** - Navigation
- **Axios** - HTTP client
- **Bootstrap** - CSS framework

### Development Tools
- **Nodemon** - Development server
- **Concurrently** - Run multiple commands
- **ES6 Modules** - Modern JavaScript

## 🗄 Database Design

### Collections Structure

#### 1. Users Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  isAdmin: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

#### 2. Products Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  image: String (required),
  brand: String (required),
  category: String (required),
  description: String (required),
  price: Number (required),
  countInStock: Number (required),
  rating: Number (default: 0),
  numReviews: Number (default: 0),
  user: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

#### 3. Orders Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User'),
  orderItems: [{
    name: String,
    qty: Number,
    image: String,
    price: Number,
    product: ObjectId (ref: 'Product')
  }],
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String,
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  isPaid: Boolean (default: false),
  paidAt: Date,
  isDelivered: Boolean (default: false),
  deliveredAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Database Relationships
- **One-to-Many**: User → Products (Admin users can create products)
- **One-to-Many**: User → Orders (Users can have multiple orders)
- **Many-to-Many**: Orders ↔ Products (Orders contain multiple products)

## 📊 Implementation Status

### Backend API (100% Complete)
- ✅ User authentication endpoints
- ✅ Product CRUD operations
- ✅ Order management
- ✅ File upload functionality
- ✅ Error handling middleware
- ✅ Input validation
- ✅ Security middleware

### Frontend Components (95% Complete)
- ✅ User authentication forms
- ✅ Product listing and details
- ✅ Shopping cart functionality
- ✅ Order management
- ✅ Admin product management
- ⚠️ Payment integration UI (needs PayPal setup)

### Database & Seeding (100% Complete)
- ✅ Database models and schemas
- ✅ Sample data seeding
- ✅ Database connection and configuration

## 👥 User Interaction Flow

### Customer Journey
1. **Browse Products**
   - View product catalog
   - Search and filter products
   - View product details

2. **Shopping Cart**
   - Add items to cart
   - Update quantities
   - Review cart contents

3. **Checkout Process**
   - User authentication/login
   - Shipping address input
   - Payment method selection
   - Order confirmation

4. **Order Management**
   - View order history
   - Track order status
   - Receive order updates

### Admin Journey
1. **Product Management**
   - Add new products
   - Edit existing products
   - Upload product images
   - Manage inventory

2. **Order Management**
   - View all orders
   - Update order status
   - Process payments
   - Manage deliveries

3. **User Management**
   - View user accounts
   - Manage user roles
   - Monitor user activity

## 📁 Project Structure

```
proshop/
├── backend/                    # Backend server
│   ├── controllers/           # Request handlers
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── data/                  # Sample data
│   │   ├── products.js
│   │   └── users.js
│   ├── middleware/            # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/               # Database models
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes/               # API routes
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── userRoutes.js
│   ├── utils/                # Utility functions
│   │   └── generateToken.js
│   ├── server.js             # Main server file
│   └── seeder.js             # Database seeder
├── frontend/                 # React application
│   ├── public/              # Static files
│   └── src/                 # Source code
│       ├── actions/         # Redux actions
│       ├── components/      # Reusable components
│       ├── constants/       # Redux constants
│       ├── reducers/        # Redux reducers
│       ├── screens/         # Page components
│       ├── App.js           # Main app component
│       └── store.js         # Redux store
├── uploads/                 # File uploads directory
├── scripts/                 # Utility scripts
├── config.js               # Application configuration
├── package.json            # Dependencies
└── README.md              # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd proshop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Seed the database**
   ```bash
   npm run data:import
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

### Environment Variables
```env
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
BACKEND_PORT=5000
FRONTEND_PORT=3000
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Order Endpoints
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/myorders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PUT /api/orders/:id/pay` - Update order to paid (protected)
- `PUT /api/orders/:id/deliver` - Update order to delivered (admin only)

### Upload Endpoints
- `POST /api/upload` - Upload file (admin only)

## 👨‍💻 Development Guide

### Adding New Features

#### 1. Backend Development
```javascript
// 1. Create model (backend/models/)
const newModel = new mongoose.Schema({
  // Define schema
});

// 2. Create controller (backend/controllers/)
export const createItem = asyncHandler(async (req, res) => {
  // Implementation
});

// 3. Create routes (backend/routes/)
router.post('/', createItem);

// 4. Add to server.js
app.use('/api/items', itemRoutes);
```

#### 2. Frontend Development
```javascript
// 1. Create Redux actions (frontend/src/actions/)
export const fetchItems = () => async (dispatch) => {
  // Implementation
};

// 2. Create Redux reducer (frontend/src/reducers/)
const itemReducer = (state = {}, action) => {
  // Implementation
};

// 3. Create component (frontend/src/components/)
const ItemComponent = () => {
  // Implementation
};
```

### Code Style Guidelines
- Use ES6+ features
- Follow RESTful API conventions
- Implement proper error handling
- Add input validation
- Write meaningful comments
- Use consistent naming conventions

### Testing
```bash
# Run backend tests
npm test

# Run frontend tests
cd frontend && npm test
```

## 🔒 Security

### Implemented Security Measures
- ✅ JWT token authentication
- ✅ Password encryption with bcrypt
- ✅ Environment variable protection
- ✅ Input validation and sanitization
- ✅ File upload security
- ✅ CORS configuration
- ✅ Error handling without sensitive data exposure

### Security Best Practices
- Never commit `.env` files
- Use strong, unique passwords
- Regularly update dependencies
- Implement rate limiting
- Use HTTPS in production
- Validate all user inputs

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Review Process
- All changes require review
- Ensure code follows style guidelines
- Test functionality thoroughly
- Update documentation if needed

### Reporting Issues
- Use GitHub issues
- Provide detailed bug reports
- Include steps to reproduce
- Specify environment details

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- PayPal for payment integration
- Bootstrap for UI components
- React and Node.js communities

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the security checklist

---

**Happy Coding! 🚀**
