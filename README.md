
# EcoCart - Sustainable Shopping Assistant

## Project Setup and Running in VS Code

### Prerequisites
- Node.js (version 18.x or later)
- npm (comes with Node.js)
- VS Code installed

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/MorePraveen/green-cart-guide.git
   cd green-cart-guide
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the project root with the following:
   ```
   MONGODB_URI=mongodb+srv://morepraveen07:<db_password>@hack.zhwsi6n.mongodb.net/
   ```
   Replace `<db_password>` with your actual MongoDB password.

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   - The application will typically run on `http://localhost:8080`
   - Open this URL in your web browser

### Troubleshooting
- Ensure all dependencies are installed correctly
- Check your MongoDB connection string
- Verify Node.js and npm versions

### Additional Commands
- `npm run build`: Create production build
- `npm test`: Run tests (if configured)

## Technologies Used
- React
- TypeScript
- Vite
- Tailwind CSS
- MongoDB
- React Router

## Contributing
Please read the contribution guidelines before making any changes.
```
