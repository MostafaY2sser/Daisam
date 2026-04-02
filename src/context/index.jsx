
import { LanguageProvider } from "./LanguageContext";

export default function AppProviders({ children }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
