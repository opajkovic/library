import ReactApexChart from "react-apexcharts";
import "./Chart.css";

const Chart = ({izdate, reservations}) => {
  const chartData = {
    series: [
      {
        data: [
          {
            x: "Izdate knjige",
            y: izdate.izdate,
          },
          {
            x: "Rezervisane knjige",
            y: reservations,
          },
          {
            x: "Knjige u prekoračenju",
            y: izdate.prekoracene,
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
