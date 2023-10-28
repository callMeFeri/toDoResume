import logo from "../../../../assets/images/logo.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { ReactNode, useEffect } from "react";
import { httpService } from "../../../../core/http-service";
import { useTranslation } from "react-i18next";
import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";

type data = {
  mobile: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitForm = useSubmit();

  const onSubmit: SubmitHandler<data> = (data) => {
    const { confirmPassword, ...userData } = data;
    submitForm(userData, { method: "post" });
  };
  const isSuccessed: boolean | ReactNode | unknown = useActionData();
  const navigation = useNavigation();
  const isSubmiting: boolean = navigation.state !== "idle";

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccessed) {
      setTimeout(() => navigate("../login"), 1000);
    }
  }, [isSuccessed]);

  const { t } = useTranslation();
  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} style={{ height: "100px" }} />
        <h1 className="h1">{t(`register.title`)}</h1>
        <p className="lead">{t("register.intro")}</p>
        <p className="lead">
          {t("register.alreadyRegistered")}
          <Link to="/login" className="me-2">
            {t("register.signin")}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">{t("register.mobile")}</label>
                <input
                  {...register("mobile", {
                    required: `${t("register.validation.mobileRequired")}`,
                    minLength: 11,
                    maxLength: 11,
                  })}
                  className={`form-control form-control-lg ${
                    errors.mobile && "is-invalid"
                  }`}
                />
                {errors.mobile && errors.mobile.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("register.validation.mobileRequired")}
                  </p>
                )}
                {errors.mobile &&
                  (errors.mobile.type === "minLength" ||
                    errors.mobile.type === "maxLength") && (
                    <p className="text-danger small fw-bolder mt-1">
                      {t("register.validation.mobileLength")}
                    </p>
                  )}
              </div>
              <div className="mb-3">
                <label className="form-label">{t("register.password")}</label>
                <input
                  {...register("password", {
                    required: `${t("register.validation.passwordRequired")}`,
                  })}
                  className={`form-control form-control-lg ${
                    errors.password && "is-invalid"
                  }`}
                  type="password"
                />
                {errors.password && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("register.validation.passwordRequired")}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  {t("register.repeatpassword")}
                </label>
                <input
                  {...register("confirmPassword", {
                    required: t("register.validation.repeatPasswordRequired"),
                    validate: (value) => {
                      if (watch("password") !== value) {
                        return `${t("register.validation.notMatch")}`;
                      }
                    },
                  })}
                  className={`form-control form-control-lg ${
                    errors.confirmPassword && "is-invalid"
                  }`}
                  type="password"
                />
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "required" && (
                    <p className="text-danger small fw-bolder mt-1">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "validate" && (
                    <p className="text-danger small fw-bolder mt-1">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
              </div>
              <div className="text-center mt-3">
                <button
                  disabled={isSubmiting}
                  type="submit"
                  className="btn btn-lg btn-primary"
                >
                  {isSubmiting ? t("register.saving") : t("register.register")}
                </button>
              </div>
              {isSuccessed && (
                <div className="alert alert-success text-success p-2 mt-3">
                  {t("register.success")}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;

export async function registerAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  type responseApi = {
    mobile: string;
    password: string;
  };
  const memberShip: responseApi = {
    mobile: data.mobile,
    password: data.password,
  };
  const finalData = JSON.stringify(memberShip);

  const response = await httpService.post("Users", memberShip);
  return response.status === 200;
}
