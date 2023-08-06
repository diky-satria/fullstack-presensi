import React from "react";
import ApexChart from "react-apexcharts";

interface Props {
  pieDataOut: number[];
  pieLabelOut: string[];
  pieColorOut: string[];
}

export default function DashboardCardPulang(props: Props) {
  const pieData: any = {
    series: props.pieDataOut,
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      title: {
        text: "Status Pulang",
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          color: "rgb(83,88,117)",
        },
      },
      legend: {
        show: true,
        position: "bottom",
      },
      labels: props.pieLabelOut,
      colors: props.pieColorOut,
      fill: {
        colors: props.pieColorOut,
      },
    },
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          {props.pieDataOut.length > 0 ? (
            <ApexChart
              options={pieData.options}
              series={pieData.series}
              type="pie"
              height={300}
            />
          ) : (
            <div
              style={{
                height: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h6>Karyawan ini belum pernah absen</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
