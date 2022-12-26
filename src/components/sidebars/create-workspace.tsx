import { useFormik } from "formik";
import { string, object } from "yup";

import { Sidebar } from "../ui/sidebar";
import { TextField, TextArea } from "../ui/field";
import { Radio, Radios } from "../ui/radio";
import { Buttons } from "../ui/buttons";
import { Button } from "../ui/Button";

type Props = {
  isLoading: boolean;
};

export function CreateWorkspace(props: Props) {
  const { isLoading } = props;
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
    onSubmit: (data, { resetForm }) => {
      resetForm();
      console.log(data);
    },
  });

  return (
    <Sidebar title="Create Workspace" onClose={() => console.log()}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Workspace Name*"
          name="name"
          placeholder="Type a unique name."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={formik.touched.name ? formik.errors.name : ""}
          isLoading={isLoading}
        />

        <TextArea
          label="Description (Optional)"
          name="description"
          placeholder="type a short description (Optional)."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          error={formik.touched.description ? formik.errors.description : ""}
          isLoading={isLoading}
          rows={3}
        />

        <Radios label="Visibility">
          <Radio label="&nbsp; Private" name="question" disabled checked />
          <Radio label="&nbsp; Public" name="question" disabled />
        </Radios>

        <Buttons position="right">
          <Button text="Create" isLoading={isLoading} />
        </Buttons>
      </form>
    </Sidebar>
  );
}
