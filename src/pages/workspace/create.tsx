import { useFormik } from "formik";
import { object, string } from "yup";
import { NavigationLayout } from "../../components/layouts";

import { NextPageWithLayout } from "../_app";

import { trpc } from "../../utils/trpc";

const CreateWorkspace: NextPageWithLayout = () => {
  const workspaceMutation = trpc.useMutation(["workspace.create"]);
  const { isLoading: isLoadingMutation } = workspaceMutation;

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: object({
      name: string()
        .required()
        .min(3, "must be at least 3 characters long")
        .max(14, "must be less than 14 characters")
        .lowercase()
        .trim(),
      description: string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      workspaceMutation.mutate({ name: values.name });
      resetForm();
    },
  });
  return (
    <div className="columns">
      <div className="column">
        <form onSubmit={formik.handleSubmit}>
          <div className="field">
            <label className="label">Workspace Name*</label>
            <div className="control">
              <input
                className={`input ${
                  formik.touched.name && formik.errors.name ? "is-danger" : ""
                }`}
                type="text"
                name="name"
                placeholder="Type an unique name for this workspace."
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
            <label className="label">Description (Optional)</label>
            <div className="control">
              <textarea
                className={`textarea ${
                  formik.touched.description && formik.errors.description
                    ? "is-danger"
                    : ""
                }`}
                placeholder="type a short description to identity this workspace (Optional)."
                rows={3}
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              ></textarea>
            </div>
            {formik.touched.description && formik.errors.description ? (
              <p className="help is-danger">{formik.errors.description}</p>
            ) : null}
          </div>

          <div className="field">
            <label className="label">Visibility</label>
            <div className="control">
              <label className="radio">
                <input type="radio" name="question" disabled checked />
                &nbsp; Private
              </label>
              <label className="radio">
                <input type="radio" name="question" disabled />
                &nbsp; Public
              </label>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button className={`button ${isLoadingMutation && "is-loading"}`}>
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateWorkspace.getLayout = function getLayout(page) {
  return <NavigationLayout title="Create Workspace">{page}</NavigationLayout>;
};

export default CreateWorkspace;
