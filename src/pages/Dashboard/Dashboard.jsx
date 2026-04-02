
import { useTranslation } from "react-i18next";

const Dashboard = () => {

  const { t } = useTranslation();


  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">
        {t("dashboard_welcome")}
      </h1>

  
    </div>
  );
};

export default Dashboard;