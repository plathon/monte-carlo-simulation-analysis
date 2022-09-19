import ReactECharts from "echarts-for-react";

const option = {
  tooltip: {
    trigger: "axis",
    position: function (pt: any) {
      return [pt[0], "10%"];
    },
  },
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
      name: "Data 2",
      data: [100, 290, 254, 228, 135, 187, 290],
      type: "line",
      areaStyle: {},
    },
    {
      name: "Data",
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
      // areaStyle: {},
    },
  ],
};

export default function ExampleChart() {
  return <ReactECharts option={option} />;
}
