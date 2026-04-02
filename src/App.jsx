
import { useTranslation } from 'react-i18next';
import './App.css'
import useAOS from './hooks/useAOS';
import AppRouter from './routes/AppRouter';
import { useEffect, useState } from 'react';

function App() {
  const { i18n } = useTranslation();

  // AOS
  useAOS();

  // force re-render on language change
  const [lang, setLang] = useState(i18n.language);
  useEffect(() => {
    const handleChange = (lng) => setLang(lng);
    i18n.on("languageChanged", handleChange);
    return () => {
      i18n.off("languageChanged", handleChange);
    };
  }, [i18n]);

  const isRTL = i18n.language === "ar";


  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <AppRouter />
    </div>
  )
}

export default App
