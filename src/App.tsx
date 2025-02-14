import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "@/components/layout";
import { RefundOrders } from "@/pages/RefundOrders/list";
import { RefundOrderDetails } from "@/pages/RefundOrders/show";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<RefundOrders />} />
            <Route path="/refund-orders/:id" element={<RefundOrderDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
