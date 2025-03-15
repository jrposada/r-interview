import { RouterProvider } from '@tanstack/react-router';
import { FunctionComponent, Suspense, lazy } from 'react';
import { router } from './router';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

const App: FunctionComponent = () => {
  return (
    <>
      <RouterProvider
        router={router}
        context={{}}
        basepath={import.meta.env.BASE_URL}
      />
      <Suspense>
        <TanStackRouterDevtools router={router} />
      </Suspense>
    </>
  );
};

export default App;
