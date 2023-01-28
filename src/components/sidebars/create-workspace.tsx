import dynamic from "next/dynamic";
import { useFormik } from "formik";
import { string, object } from "yup";

import { TextField, TextArea } from "../ui/field";
import { Radio, Radios } from "../ui/radio";
import { Buttons } from "../ui/buttons";
import { Button } from "../ui/Button";

import { Workspace } from "../../types/workspace";
import { workspaceNameRegex } from "../../regex";

const Drawer = dynamic(
  () =>
    import("../../components/ui/drawer").then((component) => component.Drawer),
  { ssr: false }
);

type Props = {
  isLoading: boolean;
  isOpened: boolean;
  onClose: () => void;
  createWorkspace: (workspace: Omit<Workspace, "id" | "ownerId">) => void;
};

export function CreateWorkspace(props: Props) {
  const { isLoading, isOpened, onClose, createWorkspace } = props;
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
        .matches(
          workspaceNameRegex,
          "Special characters and spaces not allowed, only alphanumeric and hyphen ( - )"
        )
        .lowercase()
        .trim(),
      description: string(),
    }),
    onSubmit: (data, { resetForm }) => {
      resetForm();
      createWorkspace(data);
    },
  });

  return (
    <Drawer
      title="Create Workspace"
      placement="right"
      onClose={onClose}
      open={isOpened}
    >
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
    </Drawer>
  );
}
