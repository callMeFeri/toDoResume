import { useTranslation } from "react-i18next";
export const InitPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("initPage.title")}</h1>
    </>
  );
};
