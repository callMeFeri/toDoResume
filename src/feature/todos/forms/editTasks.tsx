import { useGlobalContext } from "../../../context/context-state";
import { useTranslation } from "react-i18next";

export const EditTasks = ({ content, id }) => {
  const { t } = useTranslation();
  const { editDone } = useGlobalContext();
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editDone({ id: id, content: e.target.task.value });
              }}
            >
              <div className="mb-3">
                <label className="form-label">{content}</label>
                <input
                  className={`form-control form-control-lg `}
                  placeholder={t("tasks.placeHolder")}
                  name="task"
                />
              </div>

              <div className="text-center mt-3">
                <button type="submit" className="btn btn-lg btn-primary">
                  {t("tasks.addTask")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
