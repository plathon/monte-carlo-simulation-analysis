import { useEffect } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { trpc } from "../../utils/trpc";

import { Columns } from "../../components/ui/columns";
import { Column } from "../../components/ui/column";
import { SideMenu } from "../../components/ui/side-menu";
import { Control } from "../../components/ui/control";
import { TextField } from "../../components/ui/field";
import { Button } from "../../components/ui/Button";

import { MainLayout } from "../../components/layouts";

import type { NextPageWithLayout } from "../_app";

const Index: NextPageWithLayout = () => {
  const userData = trpc.useQuery(["user.data"]);
  const userMutation = trpc.useMutation(["user.update"]);

  const { data, isFetching, isFetched } = userData;

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: object({
      name: string()
        .max(50, "Must be 15 characters or less")
        .required("Should not be empty"),
    }),
    onSubmit: (values) => userMutation.mutate(values),
  });

  const { setFieldValue } = formik;

  useEffect(() => {
    data?.name && setFieldValue("name", data?.name);
  }, [isFetched, data?.name, setFieldValue]);

  return (
    <Columns>
      <Column size="one-quarter">
        <SideMenu />
      </Column>
      <Column>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            isFetching={isFetching}
            isLoading={isFetching}
            error={formik.touched.name ? formik.errors.name : ""}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="Ex: example@example.com"
            value={data?.email || ""}
            disabled
          />

          <Control>
            <Button
              text="Save"
              color="dark"
              type="submit"
              isLoading={userMutation.isLoading}
            />
          </Control>
        </form>
      </Column>
    </Columns>
  );
};

Index.getLayout = function getLayout(page) {
  return <MainLayout title="Settings">{page}</MainLayout>;
};

export default Index;
