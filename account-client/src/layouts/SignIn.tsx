import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import api from "../scripts/api.js";
import useAuthStore from "../scripts/authLoginStore";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function SignIn(): JSX.Element {
  const login = useAuthStore((state) => state.login);

  const formik = useFormik<LoginFormValues>({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      try {
        const response = await api.post("/account/login", values);
        const { user, token } = response.data;
        login(user, token);
        console.log(values);
        console.log(response);
        console.log("Login successful!", user);
      } catch (error) {
        console.error("Login failed", error);
      }
    },
  });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-primary rounded-lg font-poppins max-w-[40rem]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-[12rem] w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-100 uppercase">
            zaloguj się do swojego konta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-small leading-6 text-slate-100 uppercase"
              >
                Adres e-mail
              </label>
              <div className="mt-2 p-0.5 bg-secondary rounded-md">
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="font-sm pl-2 text-poppins block w-full rounded-md border-0  py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-primary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-small leading-6 text-slate-100 uppercase"
                >
                  hasło
                </label>
                <div className="text-sm">
                  <Link
                    to="#"
                    className="font-medium bold text-white hover:gray"
                  >
                    Zapomniałeś hasła?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <div className="mt-2 p-0.5 bg-secondary rounded-md">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    required
                    className="pl-2 block w-full rounded-md border-0  py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-primary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                disabled={formik.isSubmitting}
                type="submit"
                className="transition ease-in-out border-slate-100 sduration-500 flex w-full justify-center rounded-md bg-secondary border-2 px-3 py-1.5 text-sm font-semibold leading-6 text-primary shadow-sm hover:bg-primary hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Zaloguj
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-slate-100">
            Nie masz konta?{" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-secondary hover:text-white transition ease-in-out duration-300 hover:font-bold"
            >
              Zarejestruj się
            </Link>
          </p>
          {formik.touched.email && formik.errors.email && (
            <div>{formik.errors.email}</div>
          )}
          {formik.touched.password && formik.errors.password && (
            <div>{formik.errors.password}</div>
          )}
        </div>
      </div>
    </>
  );
}
