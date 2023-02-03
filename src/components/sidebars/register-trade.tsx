import dynamic from "next/dynamic";
import moment from "moment";
import { useFormik } from "formik";
import { string, number, object, date } from "yup";

import { Button } from "../ui/Button";
import { Buttons } from "../ui/buttons";
import { TextField } from "../ui/field";
import { Select } from "../ui/select";
import { DatePicker } from "../ui/datepicker";

import { Symbol } from "../../types/symbol";
import { Trade } from "../../types/trade";

const Drawer = dynamic(
  () =>
    import("../../components/ui/drawer").then((component) => component.Drawer),
  { ssr: false }
);

type Props = {
  isLoading?: boolean;
  isOpened: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  symbols: Symbol[];
  isFetchingSymbols: boolean;
  createTrade: (trade: Omit<Trade, "id">) => void;
  onClose: () => void;
  workspaceId: string;
};

export function RegisterTrade(props: Props) {
  const {
    isLoading,
    createTrade,
    onClose,
    isOpened,
    workspaceId,
    isFetchingSymbols,
    symbols,
  } = props;

  const LongShortSelect = [
    { label: "Long", value: "BUY", index: "0" },
    { label: "Short", value: "SELL", index: "1" },
  ];

  const SymbolsSelect = symbols.map((symbol) => ({
    label: symbol.name,
    value: symbol.id,
    index: symbol.id,
  }));

  const formik = useFormik({
    initialValues: {
      symbol: SymbolsSelect[0]?.index ? SymbolsSelect[0]?.index : "",
      open_price: "",
      close_price: "",
      begin_at: "",
      end_at: "",
      side: LongShortSelect[0]?.value ? LongShortSelect[0]?.value : "",
      test: "",
    },
    validationSchema: object({
      symbol: string().required(),
      open_price: number().required(),
      close_price: number().required(),
      begin_at: date(),
      end_at: date(),
      side: string().oneOf(["BUY", "SELL"]).required(),
    }),
    onSubmit: (data, { resetForm }) => {
      const { open_price, close_price, begin_at, end_at, side, ...rest } = data;
      createTrade({
        open_price: Number(open_price),
        close_price: Number(close_price),
        workspace: workspaceId,
        side: side === "SELL" ? "SELL" : "BUY",
        begin_at: new Date(begin_at),
        end_at: new Date(end_at),
        ...rest,
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
        <Select
          label="Symbol"
          name="Symbol"
          isLoading={isFetchingSymbols}
          fullWidth={true}
          onChange={(event) =>
            formik.setFieldValue("symbol", event.target.value)
          }
          onBlur={formik.handleBlur}
          value={formik.values.symbol}
          data={SymbolsSelect}
          touched={formik.touched.symbol}
          error={formik.errors.symbol}
        />

        <TextField
          label="Open position price"
          name="open_price"
          placeholder="Ex: 1000.00"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.open_price}
          error={formik.touched.open_price ? formik.errors.open_price : ""}
          autoComplete="off"
        />

        <TextField
          label="Close position price"
          name="close_price"
          placeholder="Ex: 1000.50"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.close_price}
          error={formik.touched.close_price ? formik.errors.close_price : ""}
          autoComplete="off"
        />

        <DatePicker
          label="Open position datetime"
          name="begin_at"
          size="large"
          style={{ width: "100%", borderRadius: 5 }}
          onChange={(value) =>
            formik.setFieldValue("begin_at", value?.toString())
          }
          onBlur={formik.handleBlur}
          value={
            formik.values.begin_at
              ? moment(new Date(formik.values.begin_at).toISOString())
              : undefined
          }
          error={formik.touched.begin_at ? formik.errors.begin_at : ""}
        />

        <DatePicker
          label="Close position datetime"
          name="end_at"
          size="large"
          style={{ width: "100%", borderRadius: 5 }}
          onChange={(value) =>
            formik.setFieldValue("end_at", value?.toString())
          }
          onBlur={formik.handleBlur}
          value={
            formik.values.end_at
              ? moment(new Date(formik.values.end_at).toISOString())
              : undefined
          }
          error={formik.touched.end_at ? formik.errors.end_at : ""}
        />

        <Select
          label="Side"
          name="side"
          fullWidth={true}
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
