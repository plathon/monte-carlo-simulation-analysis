import { useFormik } from "formik";
import { mixed, number, object } from "yup";
import { Button } from "../ui/Button";
import { Buttons } from "../ui/buttons";
import { TextField } from "../ui/field";
import { Select } from "../ui/select";
import { Sidebar } from "../ui/sidebar";

type Trade = {
  open_price: number;
  close_price: number;
  side: "BUY" | "SELL";
};

type Props = {
  isLoading?: boolean;
  createTrade: (trade: Trade) => void;
  onClose: () => void;
};

export function RegisterTrade(props: Props) {
  const { isLoading, createTrade, onClose } = props;

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
      });
      resetForm();
    },
  });

  return (
    <Sidebar title="register trade" onClose={onClose}>
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
    </Sidebar>
  );
}
