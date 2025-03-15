import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

type RouterContext = {
  // session: Session | null; // Your auth session here
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
