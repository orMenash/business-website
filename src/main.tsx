
import { createRoot } from 'react-dom/client';
import { lazy, Suspense } from 'react';
import './index.css';

// Use lazy loading for the App component with a smaller loading indicator
const App = lazy(() => import('./App'));

// Create a lightweight loading component
const Loading = () => (
  <div className="loading">טוען...</div>
);

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>
);
