import dynamic from "next/dynamic";
import { useFormik } from "formik";
import { mixed, number, object } from "yup";
import { Button } from "../ui/Button";
import { Buttons } from "../ui/buttons";
import { TextField } from "../ui/field";
import { Select } from "../ui/select";

const Drawer = dynamic(
  () =>
    import("../../components/ui/drawer").then((component) => component.Drawer),
  { ssr: false }
);

interface Trade {
  open_price: number;
  close_price: number;
  side: "BUY" | "SELL";
  workspace: string;
}

type Props = {
  isLoading?: boolean;
  isOpened: boolean;
  createTrade: (trade: Trade) => void;
  onClose: () => void;
  workspaceId: string;
};

export function RegisterTrade(props: Props) {
  const { isLoading, createTrade, onClose, isOpened, workspaceId } = props;

  const LongShortSelect = [
    { label: "Long", value: "BUY", index: "0" },
    { label: "Short", value: "SELL", index: "1" },
  ];

  const formik = useFormik({
    initialValues: {
      symbol: "",
      open_price: "",
      close_price: "",
      begin_at: "",
      end_at: "",
      side: "BUY",
    },
    validationSchema: object({
      open_price: number().required(),
      close_price: number().required(),
      side: mixed().oneOf(["BUY", "SELL"]),
    }),
    onSubmit: (data, { resetForm }) => {
      const { open_price, close_price, side } = data;
      createTrade({
        open_price: Number(open_price),
        close_price: Number(close_price),
        side: side === "SELL" ? "SELL" : "BUY",
        workspace: workspaceId,
      });
      resetForm();
    },
  });

  return (
    <Drawer
      title="Register Trade"
      placement="right"
      onClose={onClose}
      open={isOpened}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Symbol"
          name="symbol"
          placeholder="Ex: EURUSD"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.symbol}
          error={formik.touched.symbol ? formik.errors.symbol : ""}
        />

        <TextField
          label="Open Price"
          name="open_price"
          placeholder="Ex: 1000.00"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.open_price}
          error={formik.touched.open_price ? formik.errors.open_price : ""}
        />

        <TextField
          label="Close Price"
          name="close_price"
          placeholder="Ex: 1000.50"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.close_price}
          error={formik.touched.close_price ? formik.errors.close_price : ""}
        />

        <TextField
          label="Open Datetime"
          name="begin_at"
          placeholder="Ex: 1000.50"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.begin_at}
          error={formik.touched.begin_at ? formik.errors.begin_at : ""}
        />

        <TextField
          label="Close Datetime"
          name="end_at"
          placeholder="Ex: 1000.50"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.end_at}
          error={formik.touched.end_at ? formik.errors.end_at : ""}
        />

        <Select
          label="Side"
          name="side"
          onChange={(event) => formik.setFieldValue("side", event.target.value)}
          onBlur={formik.handleBlur}
          value={formik.values.side}
          data={LongShortSelect}
          touched={formik.touched.side}
          error={formik.errors.side}
        />

        <Buttons position="right">
          <Button text="Create" isLoading={isLoading} />
        </Buttons>
      </form>
    </Drawer>
  );
}
