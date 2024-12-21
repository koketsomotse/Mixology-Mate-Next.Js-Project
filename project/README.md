# 🍸 Mixology Mate

A professional cocktail management application that helps bartenders track drinks and monitor patron alcohol consumption.

## Features

- 🔍 Real-time cocktail search with auto-suggestions
- 👥 Patron management system
- 🧮 Automatic blood alcohol content calculation
- 🌙 Dark/Light mode support
- ⚠️ Alcohol saturation warnings
- 📊 Drink statistics tracking

## Live Demo

Visit [Mixology Mate](https://magnificent-duckanoo-8fbe02.netlify.app)

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons

## Prerequisites

- Node.js (v18 or higher)
- npm (v7 or higher)

## Getting Started

1. Clone the repository
2. Install dependencies
3. Start the development server

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/         # React components
├── types/             # TypeScript interfaces
├── utils/             # Utility functions
└── App.tsx            # Main application component
```

## Key Components

- `CocktailList`: Displays search results and drink management
- `PatronManager`: Handles patron tracking and BAC calculations
- `SearchBar`: Provides real-time cocktail search functionality
- `Modal`: Reusable modal component for confirmations
- `Toast`: Notification system

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License