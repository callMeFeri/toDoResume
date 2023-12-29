import logo from "../../../../assets/images/logo.svg";
import { Link, redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSubmit } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import { httpService } from "../../../../core/http-service";
import { useActionData } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const LogIn = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitForm = useSubmit();
  const navigation = useNavigation();
  const isSubmiting: boolean = navigation.state !== "idle";
  const isSuccessed: boolean | unknown = useActionData();
  const { t } = useTranslation();

  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} style={{ height: "100px" }} />
        <h1 className="h2"> {t("login.title")}</h1>
        <p className="lead">{t("login.intro")}</p>
        <p className="lead">
          {t("login.notAlreadyRegistered")}
          <Link to="/register" className="me-2">
            {t("login.signup")}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form
              onSubmit={handleSubmit((data) => {
                submitForm(data, { method: "post" });
              })}
            >
              <div className="mb-3">
                <label className="form-label">{t("register.mobile")}</label>
                <input
                  className={`form-control form-control-lg ${
                    errors.mobile && "is-invalid"
                  }`}
                  {...register("mobile", {
                    required: `${t("register.validation.mobileRequired")}`,
                    minLength: 11,
                    maxLength: 11,
                  })}
                />
                {errors.mobile && errors.mobile.type === "minLength" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("register.validation.mobileLength")}
                  </p>
                )}
                {errors.mobile && errors.mobile.type === "maxLength" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("register.validation.mobileLength")}
                  </p>
                )}
                {errors.mobile && errors.mobile.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("register.validation.mobileRequired")}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">{t("register.password")} </label>
                <input
                  {...register("password", {
                    required: `${t("register.validation.passwordRequired")}`,
                    minLength: 6,
                  })}
                  className={`form-control form-control-lg ${
                    errors.password && "is-invalid"
                  }`}
                  type="password"
                />
                {errors.password && errors.password.type === "minLength" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("register.validation.passwordLength")}
                  </p>
                )}
                {errors.password && errors.password.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("register.validation.passwordRequired")}
                  </p>
                )}
              </div>
              <div className="text-center mt-3">
                <button
                  disabled={isSubmiting}
                  type="submit"
                  className="btn btn-lg btn-primary"
                >
                  {isSubmiting ? t("login.entering") : t("login.enter")}
                </button>
              </div>

              {isSuccessed && (
                <p className="alert alert-success text-success p-2 mt-3">
                  {t("login.success")}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export async function logInAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post("Users/login", data);
  if (response.status === 200) {
    localStorage.setItem("token", response?.data.token);
    console.log(localStorage.getItem("token"));

    return redirect("/");
  }
  console.log(data);

  return response.status === 200;
}
