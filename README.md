# 🛒 EL Shop - Full Stack E-commerce Application

A complete e-commerce application built with React frontend and Node.js backend, deployed on Vercel and Render.

## 🚀 Live Demo

- **Frontend**: [Vercel Deployment](https://shop-app-five-peach.vercel.app)
- **Backend API**: [Render Deployment](https://shopapp-2-whxu.onrender.com)

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Local Development Setup](#-local-development-setup)
- [Environment Configuration](#-environment-configuration)
- [Making Updates](#-making-updates)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

## 🛠️ Tech Stack

### Frontend
- **React** 16.13.1
- **Redux** for state management
- **React Router** for navigation
- **React Bootstrap** for UI components
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Multer** for file uploads
- **CORS** for cross-origin requests

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

## 📁 Project Structure

```
el-shop-app/
├── frontend/                 # React frontend application
│   ├── public/
│   │   ├── _redirects       # Vercel SPA routing
│   │   └── images/          # Product images
│   ├── src/
│   │   ├── actions/         # Redux actions
│   │   ├── components/      # React components
│   │   ├── reducers/        # Redux reducers
│   │   ├── screens/         # Page components
│   │   ├── config.js        # API configuration
│   │   └── App.js           # Main app component
│   ├── package.json
│   └── vercel.json          # Vercel deployment config
├── backend/                  # Node.js backend API
│   ├── controllers/         # Route controllers
│   ├── data/               # Static data (products, users)
│   ├── middleware/         # Express middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── uploads/            # Uploaded files
│   ├── config.js           # Environment configuration
│   ├── server.js           # Main server file
│   └── package.json
├── render.yaml             # Render deployment config
└── README.md
```

## 🏠 Local Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/tanviranjum1/ShopApp.git
cd el-shop-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Environment Configuration

#### Backend Environment Variables
Create a `.env` file in the root directory:

```env
NODE_ENV=development
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/proshop
JWT_SECRET=your_jwt_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
BACKEND_PORT=5000
FRONTEND_PORT=3000
```

#### Frontend Environment Variables
Create a `.env.local` file in the frontend directory:

```env
REACT_APP_USE_LOCAL=true
REACT_APP_BACKEND_URL=http://localhost:5000
```

### Step 3: Start Development Servers

#### Option A: Start from Root Directory (Recommended)
```bash
# From project root
npm start
```

#### Option B: Start Backend and Frontend Separately
```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Start frontend
cd frontend
npm start
```

### Step 4: Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api/products

## 🔧 Environment Configuration

### Local Development
- **Backend**: Uses `.env` file from root directory
- **Frontend**: Uses proxy configuration in `package.json`
- **Database**: MongoDB Atlas (configured via MONGO_URI)

### Production Deployment
- **Backend**: Environment variables set in Render dashboard
- **Frontend**: Environment variables set in Vercel dashboard
- **Database**: Same MongoDB Atlas instance

### Environment Switching
Use the provided scripts to switch between local and production:

```bash
# Switch to local development
npm run env:local

# Switch to production
npm run env:production
```

## 🔄 Making Updates

### Frontend Updates

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Make your changes** in the appropriate files:
   - Components: `src/components/`
   - Pages: `src/screens/`
   - State management: `src/actions/` and `src/reducers/`
   - Configuration: `src/config.js`

3. **Test locally:**
   ```bash
   npm start
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

### Backend Updates

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Make your changes** in the appropriate files:
   - Controllers: `controllers/`
   - Routes: `routes/`
   - Models: `models/`
   - Configuration: `config.js`

3. **Test locally:**
   ```bash
   npm start
   ```

4. **Test API endpoints:**
   ```bash
   curl http://localhost:5000/api/products
   ```

### Database Updates

1. **Update static data:**
   - Products: `backend/data/products.js`
   - Users: `backend/data/users.js`

2. **Update models:**
   - Product model: `backend/models/productModel.js`
   - User model: `backend/models/userModel.js`
   - Order model: `backend/models/orderModel.js`

3. **Seed data (if needed):**
   ```bash
   cd backend
   node seeder.js
   ```

## 🚀 Deployment

### Backend Deployment (Render)

1. **Push changes to Git:**
   ```bash
   git add .
   git commit -m "Update backend functionality"
   git push origin main
   ```

2. **Render will auto-deploy** with the following configuration:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

3. **Environment Variables** (set in Render dashboard):
   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PAYPAL_CLIENT_ID=your_paypal_client_id
   BACKEND_PORT=5000
   ```

### Frontend Deployment (Vercel)

1. **Update backend URL** in frontend configuration:
   ```javascript
   // frontend/src/config.js
   API_BASE_URL: 'https://your-new-backend-url.onrender.com'
   ```

2. **Push changes to Git:**
   ```bash
   git add .
   git commit -m "Update frontend for new backend"
   git push origin main
   ```

3. **Vercel will auto-deploy** with the following configuration:
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Environment Variables** (set in Vercel dashboard):
     ```
     REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com
     REACT_APP_USE_LOCAL=false
     NODE_OPTIONS=--openssl-legacy-provider
     ```

### Deployment Checklist

- [ ] Backend tests pass locally
- [ ] Frontend builds successfully
- [ ] Environment variables configured
- [ ] Database connection working
- [ ] CORS settings updated
- [ ] Image URLs updated for production
- [ ] API endpoints responding correctly

## 🔍 Troubleshooting

### Common Issues

#### 1. OpenSSL Compatibility Error
**Error**: `error:0308010C:digital envelope routines::unsupported`

**Solution**: 
- Use `cross-env` in package.json scripts
- Set `NODE_OPTIONS=--openssl-legacy-provider`

#### 2. CORS Errors
**Error**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution**:
- Update CORS configuration in `backend/server.js`
- Add your frontend domain to allowed origins

#### 3. Environment Variables Not Loading
**Error**: `Cannot find package 'dotenv'`

**Solution**:
- Backend now loads environment variables directly from `process.env`
- No dotenv dependency needed
- Set variables in Render dashboard

#### 4. 404 Errors on Frontend Routes
**Error**: `404: NOT_FOUND` on client-side routes

**Solution**:
- Ensure `_redirects` file exists in `frontend/public/`
- Verify `vercel.json` has proper routes configuration

#### 5. Image Loading Issues
**Error**: Product images not displaying

**Solution**:
- Update image URLs in `backend/data/products.js`
- Ensure images are copied to `backend/uploads/`
- Check static file serving in `backend/server.js`

### Debug Commands

```bash
# Test backend API
curl https://your-backend-url.onrender.com/api/products

# Test frontend build
cd frontend
npm run build

# Check environment variables
echo $MONGO_URI
echo $NODE_ENV

# Test database connection
cd backend
node -e "console.log(process.env.MONGO_URI)"
```

### Logs and Monitoring

- **Render Backend**: Check logs in Render dashboard
- **Vercel Frontend**: Check logs in Vercel dashboard
- **MongoDB**: Monitor in MongoDB Atlas dashboard

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/top` - Get top-rated products
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Order Endpoints
- `POST /api/orders` - Create order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/deliver` - Update order to delivered (admin)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Push to your branch
6. Create a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the deployment logs
3. Test locally to isolate the issue
4. Create an issue with detailed error information

---

**Happy Coding! 🎉**
