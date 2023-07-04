import React from "react";
import { Outlet } from "react-router-dom";

// lib
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// components
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Header />

      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>

      <Footer />
    </QueryClientProvider>
  );
}

export default App;
