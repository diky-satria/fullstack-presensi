import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HariLiburAll from "./component/HariLiburAll";
import HariLiburAdd from "./component/HariLiburAdd";
import { TDisabledDays, THariLibur } from "../../../type";
import axios from "../../../interceptor/axios";

export default function HariLibur() {
  const [data, setData] = useState<THariLibur[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [limit] = useState<number>(10);

  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  let date: Date = new Date();
  let dateMonthDefault: Date = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const disabledDays: TDisabledDays[] = [
    { from: new Date(2000, 1, 1), to: dateMonthDefault },
  ];

  useEffect(() => {
    getHariLibur();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getHariLibur = async () => {
    let response = await axios.get(
      `/api/v1/hari_libur?page=${page}&limit=${limit}&from_date=${fromDate}&to_date=${toDate}`
    );

    setData(response.data.data);
    setPage(response.data.page);
    setTotalPage(response.data.total_page);
    setTotalRows(response.data.total_rows);

    setFromDate(response.data.from_date);
    setToDate(response.data.to_date);
  };

  return (
    <Div className="c-content">
      <div className="c-content-header">
        <h4>Hari libur</h4>
        <p>Semua hari libur</p>
      </div>
      <div className="row">
        <div className="col-lg-8 col-xl-8 col-md-6 col-12 mb-3">
          <HariLiburAll
            data={data}
            page={page}
            setPage={setPage}
            limit={limit}
            totalPage={totalPage}
            totalRows={totalRows}
            handlePageClick={(selected) => setPage(selected)}
            getHariLibur={getHariLibur}
            disabledDays={disabledDays}
            setFromDate={setFromDate}
            setToDate={setToDate}
          />
        </div>
        <div className="col-lg-4 col-xl-4 col-md-6 col-12 mb-3">
          <HariLiburAdd
            dateMonthDefault={dateMonthDefault}
            disabledDays={disabledDays}
            getHariLibur={getHariLibur}
          />
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div``;
