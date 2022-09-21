import { useState } from "react";
import Head from "next/head";
import { useFormik } from "formik";
import { object, string } from "yup";
import { trpc } from "../../utils/trpc";

import NavBar from "../../components/nav_bar";

export default function Index() {
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  const userMutation = trpc.useMutation(["user.updateData"]);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: object({
      name: string()
        .max(50, "Must be 15 characters or less")
        .required("Should not be empty"),
    }),
    onSubmit: (values) => {
      setIsLoadingForm(true);
      userMutation.mutate(values);
    },
  });

  return (
    <>
      <Head>
        <title>Snap Trade - Settings</title>
      </Head>
      <div className="container is-widescreen">
        <div className="columns">
          <div className="column is-full">
            <NavBar />
          </div>
        </div>
        <div className="columns">
          <div className="column is-full">
            <hr />
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-quarter">
            <aside className="menu">
              <p className="menu-label">General</p>
              <ul className="menu-list">
                <li>
                  <a className="is-active">Profile</a>
                </li>
              </ul>
              <p className="menu-label">Transactions</p>
              <ul className="menu-list">
                <li>
                  <a>Billing</a>
                </li>
                <li>
                  <a>Plans</a>
                </li>
              </ul>
            </aside>
          </div>
          <div className="column">
            {userMutation.error && (
              <p>Something went wrong! {userMutation.error.message}</p>
            )}
            <form onSubmit={formik.handleSubmit}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className={`input ${
                      formik.touched.name && formik.errors.name
                        ? "is-danger"
                        : ""
                    }`}
                    name="name"
                    type="text"
                    placeholder="Text input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                </div>
                {formik.touched.name && formik.errors.name ? (
                  <p className="help is-danger">{formik.errors.name}</p>
                ) : null}
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    name="email"
                    type="email"
                    placeholder="Ex: example@example.com"
                    disabled
                  />
                </div>
              </div>

              <div className="control">
                <button
                  className={`button is-dark ${
                    isLoadingForm ? "is-loading" : ""
                  }`}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
