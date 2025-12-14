import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "@/components/Layout";

import Reminders from "./pages/Reminders";
import Routines from "./pages/Routines";
import Patients from "./pages/Patients";
import PatientProfile from "./pages/PatientProfile";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Home";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* Rotas sem Layout */}
          <Route path="/" element={<Login />} />

          {/* Rotas com Layout */}
          <Route element={<Layout />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/idosos" element={<Patients />} />
            <Route path="/idosos/:id" element={<PatientProfile />} />
            <Route path="/lembretes" element={<Reminders />} />
            <Route path="/rotinas" element={<Routines />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
