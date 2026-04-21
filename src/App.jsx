
import './App.css'
import { useTranslation } from "react-i18next";
import useAOS from './hooks/useAOS';
import AppRouter from './routes/AppRouter';
import { useEffect, useState } from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";



function App() {
  const { i18n } = useTranslation();

  useAOS();

  const isRTL = i18n.language === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;