# 🚀 Setup Guide for Mixology Mate

This guide will help you set up Mixology Mate for development.

## Detailed Setup Steps

### 1. Environment Setup

Ensure you have the following installed:
- Node.js (v18+)
- npm (v7+)

### 2. Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd mixology-mate

# Install dependencies
npm install
```

### 3. Development Server

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Configuration

No additional configuration is required as the application uses the free CocktailDB API.

### 5. Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### 6. Project Structure Guide

```
src/
├── components/
│   ├── CocktailList.tsx    # Cocktail display and management
│   ├── PatronManager.tsx   # Patron tracking system
│   ├── SearchBar.tsx       # Search functionality
│   ├── Modal.tsx          # Reusable modal
│   └── Toast.tsx          # Notification system
├── types/
│   └── index.ts           # TypeScript interfaces
├── utils/
│   └── index.ts           # Utility functions
└── App.tsx                # Main application
```

### 7. Development Guidelines

- Follow the existing code style and formatting
- Use TypeScript for all new files
- Add appropriate comments for complex logic
- Update tests when modifying functionality
- Use Tailwind CSS for styling
- Utilize Lucide icons for consistency

### 8. Common Issues and Solutions

1. **Build Errors**
   - Run `npm clean-install` to refresh dependencies
   - Clear browser cache and local storage

2. **Type Errors**
   - Ensure TypeScript definitions are up to date
   - Check for null/undefined handling

3. **API Issues**
   - Verify internet connection
   - Check CocktailDB API status

### 9. Deployment

The application is configured for deployment on Netlify:

1. Connect your repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy

### 10. Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [CocktailDB API Documentation](https://www.thecocktaildb.com/api.php)