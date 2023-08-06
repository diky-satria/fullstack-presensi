import React from "react";
import ApexChart from "react-apexcharts";

interface Props {
  pieDataIn: number[];
  pieLabelIn: string[];
  pieColorIn: string[];
}

export default function DashboardCardMasuk(props: Props) {
  const pieData: any = {
    series: props.pieDataIn,
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      title: {
        text: "Status Masuk",
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
      labels: props.pieLabelIn,
      colors: props.pieColorIn,
      fill: {
        colors: props.pieColorIn,
      },
    },
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          {props.pieDataIn.length > 0 ? (
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
