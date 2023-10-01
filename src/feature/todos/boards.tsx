import { useGlobalContext } from "../../context/context-state";
export const Boards = () => {
  const { state, changeComponent } = useGlobalContext();
  // changeComponent("boards");

  return (
    <>
      <ul>
        {state.boards ? (
          <div>
            <h1>Hi</h1>
            {state.boards.map((board) => (
              <li key={board.id}>{board.title}</li>
            ))}
          </div>
        ) : (
          <h1>fer</h1>
        )}
      </ul>
    </>
  );
};
