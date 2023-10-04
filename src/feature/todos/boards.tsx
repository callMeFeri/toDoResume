import { useGlobalContext } from "../../context/context-state";
import { useTranslation } from "react-i18next";
export const Boards = () => {
  const { t } = useTranslation();
  const { state, changeComponent } = useGlobalContext();

  return (
    <>
      <ul>
        {state.boards ? (
          <div>
            <h1>{t("allBoards.hi")}</h1>
            {state.boards.map((board: { id: string; title: string }) => (
              <li key={board.id}>{board.title}</li>
            ))}
          </div>
        ) : (
          <h1>Feri</h1>
        )}
      </ul>
    </>
  );
};
