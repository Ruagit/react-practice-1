# Wireless Logic Pair Programming Codebase

## Task

- Populate `<SearchResults>` from the API response triggered in the `<SearchForm>`
- Make the "should render search results" unit test pass for `./Search.test.tsx`

## Extension

- Uncomment code in `<ImageCard>` — you should see a favourite button over each image!
- Add a favourite capability to the application utilising existing components
- Make the "should update favourite button" unit test pass for `./Search.test.tsx`

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
