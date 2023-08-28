import "./Chart.css";
import ReactApexChart from "react-apexcharts";

const Chart = () => {
  const chartData = {
    series: [
      {
        data: [
          {
            x: "Izdate knjige",
            y: 73,
          },
          {
            x: "Rezervisane knjige",
            y: 44,
          },
          {
            x: "Knjige u prekoračenju",
            y: 25,
          },
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 0,
          horizontal: true,
        },
      },
      colors: ["#33b2df", "#13d8aa", "#d4526e"],
      dataLabels: {
        enabled: false,
      },
    },
  };

  return (
    <div className="chart-wrapper">
      <h1>Statistika</h1>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={200}
      />
    </div>
  );
};

export default Chart;
