import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../../context/context-state";

export const ShowTasks = () => {
  const { state } = useGlobalContext();
  const { t } = useTranslation();
  return (
    <>
      {state.task.map((tsk) => {
        <p>{tsk.content}</p>;
      })}
    </>
  );
};
