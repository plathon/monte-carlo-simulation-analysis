import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

const option: EChartsOption = {
  title: {
    left: "center",
    text: "Large Ara Chart",
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, -70, 110, 130],
      type: "bar",
    },
  ],
};

export default function ExampleBarChart() {
  return <ReactECharts option={option} />;
}
