import React from "react";
import "@testing-library/jest-dom";

jest.mock("wouter", () => {
  const actualModule = jest.requireActual("wouter");

  return {
    ...actualModule,
    Route: ({ component: Component }: { component: React.ComponentType }) => (
      <Component />
    ),
    Switch: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useLocation: () => ["/", jest.fn()],
  };
});
