# Wireless Logic Pair Programming Codebase

## Task

- Each `<ImageCard>` component has a `<FavouriteButton>` component
- Add a "favourite capability" to the application utilising existing components
- Clicking on the `<FavouriteButton>` should mean the image is loaded into the `<FavouritesPage>` component

## Features

- **React 18**: Modern React with functional components and hooks
- **TypeScript**: Type safety for your JavaScript code
- **Vite**: Fast modern build tool
- **Wouter**: Lightweight routing for React applications
- **Tailwind CSS**: Utility-first CSS framework
- **Jest & React Testing Library**: Testing framework and utilities

## Scripts

```bash
npm run dev
npm test
npm run format
npm run lint
```

## Project Structure

```
├── src/                    # Source files
│   ├── components/         # Reusable components
│   ├── pages/              # Page components
│   ├── App.tsx             # Main App component with routing
│   ├── App.css             # App-specific styles
│   ├── index.tsx           # Application entry point
│   └── index.css           # Global styles with Tailwind imports
├── index.html              # Vite entry point
```
