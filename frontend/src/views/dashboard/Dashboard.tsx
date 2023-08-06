import React, { useEffect, useState } from "react";
import DashboardAll from "./component/DashboardAll";
import DashboardCardMasuk from "./component/DashboardCardMasuk";
import DashboardCardPulang from "./component/DashboardCardPulang";
import { TRiwayat, TUserSelect } from "../../type";
import axios from "../../interceptor/axios";

export default function Dashboard() {
  const [user, setUser] = useState<TUserSelect[]>([]);
  const [pernahAbsen, setPernahAbsen] = useState<string>("");

  const [data, setData] = useState<TRiwayat[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [limit] = useState<number>(10);

  const [pieDataIn, setPieDataIn] = useState<number[]>([]);
  const [pieLabelIn, setPieLabelIn] = useState<string[]>([]);
  const [pieColorIn, setPieColorIn] = useState<string[]>([]);
  const [pieDataOut, setPieDataOut] = useState<number[]>([]);
  const [pieLabelOut, setPieLabelOut] = useState<string[]>([]);
  const [pieColorOut, setPieColorOut] = useState<string[]>([]);

  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [userSelected, setUserSelected] = useState<number>(0);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getRiwayat();
  }, [page]);

  const getRiwayat = async () => {
    let response = await axios.get(
      `/api/v1/dashboard?user_id=${userSelected}&page=${page}&limit=${limit}&from_date=${fromDate}&to_date=${toDate}`
    );

    setData(response.data.data);
    setPage(response.data.page);
    setTotalPage(response.data.total_page);
    setTotalRows(response.data.total_rows);

    setPieDataIn(response.data.pie_data_in);
    setPieLabelIn(response.data.pie_label_in);
    setPieColorIn(response.data.pie_color_in);
    setPieDataOut(response.data.pie_data_out);
    setPieLabelOut(response.data.pie_label_out);
    setPieColorOut(response.data.pie_color_out);

    setFromDate(response.data.from_date);
    setToDate(response.data.to_date);

    setPernahAbsen(response.data.pernah_absen);
  };

  const getUser = async () => {
    let response = await axios.get(`/api/v1/dashboard/select/user`);
    setUser(response.data.data);
  };

  const absenKondisi = (val: string | null, val2: string | null) => {
    if (val === "tepat_waktu_masuk") {
      return <span className="badge rounded-pill bg-primary">Tepat waktu</span>;
    } else if (val === "telat") {
      return (
        <span
          className="badge rounded-pill bg-warning"
          style={{ color: "black" }}
        >
          Telat
        </span>
      );
    } else if (val === "tepat_waktu_pulang") {
      return <span className="badge rounded-pill bg-primary">Tepat waktu</span>;
    } else {
      if (new Date(`${val2}`).getTime() > new Date().getTime()) {
        return <div>-</div>;
      } else {
        return (
          <span className="badge rounded-pill bg-danger">Tidak absen</span>
        );
      }
    }
  };

  return (
    <div className="c-content">
      <div className="c-content-header">
        <h4>Dashboard</h4>
        <p>Overview</p>
      </div>
      <div className="row">
        <div className="col-lg-8 col-xl-9 col-md-9 col-12 mb-3">
          <DashboardAll
            user={user}
            data={data}
            page={page}
            totalPage={totalPage}
            totalRows={totalRows}
            absenKondisi={(val, val2) => absenKondisi(val, val2)}
            setPage={setPage}
            getRiwayat={getRiwayat}
            setUserSelected={setUserSelected}
            setFromDate={setFromDate}
            setToDate={setToDate}
            userSelected={userSelected}
            pernahAbsen={pernahAbsen}
          />
        </div>
        <div className="col-lg-4 col-xl-3 col-md-3 col-12 mb-3">
          <div className="row">
            <div className="col mb-3">
              <DashboardCardMasuk
                pieDataIn={pieDataIn}
                pieLabelIn={pieLabelIn}
                pieColorIn={pieColorIn}
              />
            </div>
          </div>
          <div className="row">
            <div className="col mb-3">
              <DashboardCardPulang
                pieDataOut={pieDataOut}
                pieLabelOut={pieLabelOut}
                pieColorOut={pieColorOut}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
