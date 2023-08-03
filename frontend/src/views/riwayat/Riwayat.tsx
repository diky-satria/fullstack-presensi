import React, { useEffect, useState } from "react";
import { Button, Space, DatePicker } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import axios from "../../interceptor/axios";
import { TRiwayat } from "../../type";
import ReactPaginate from "react-paginate";
import RiwayatModalDetail from "./component/RiwayatModalDetail";

const { RangePicker } = DatePicker;

export default function Riwayat() {
  const [data, setData] = useState<TRiwayat[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [limit] = useState<number>(10);

  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const [modalDetail, setModalDetail] = useState<boolean>(false);
  const [date, setDate] = useState<string | null>(null);
  const [tglIn, setTglIn] = useState<string | null>(null);
  const [tglOut, setTglOut] = useState<string | null>(null);
  const [statusIn, setStatusIn] = useState<string | null>(null);
  const [statusOut, setStatusOut] = useState<string | null>(null);
  const [fotoIn, setFotoIn] = useState<string | null>(null);
  const [fotoOut, setFotoOut] = useState<string | null>(null);
  const [lokasiIn, setLokasiIn] = useState<string | null>(null);
  const [lokasiOut, setLokasiOut] = useState<string | null>(null);
  const [libur, setLibur] = useState<string | null>(null);

  useEffect(() => {
    getRiwayat();
  }, [page]);

  const getRiwayat = async () => {
    let response = await axios.get(
      `/api/v1/riwayat?page=${page}&limit=${limit}&from_date=${fromDate}&to_date=${toDate}`
    );
    // console.log(response.data);

    setData(response.data.data);
    setPage(response.data.page);
    setTotalPage(response.data.total_page);
    setTotalRows(response.data.total_rows);

    setFromDate(response.data.from_date);
    setToDate(response.data.to_date);
  };

  const handlePaginate = (selectedItem: { selected: number }): void => {
    setPage(selectedItem.selected);
  };

  const absenKondisi = (val: string | null, val2: string | null) => {
    if (val === "tidak_telat") {
      return <span className="badge rounded-pill bg-primary">Absen</span>;
    } else if (val === "telat") {
      return (
        <span
          className="badge rounded-pill bg-warning"
          style={{ color: "black" }}
        >
          Telat
        </span>
      );
    } else if (val === "absen_pulang") {
      return <span className="badge rounded-pill bg-primary">Absen</span>;
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

  const rangePresets: {
    label: string;
    value: [Dayjs, Dayjs];
  }[] = [
    {
      label: "Hari ini",
      value: [dayjs().add(-0, "d"), dayjs()],
    },
    {
      label: "Kemarin",
      value: [dayjs().add(-1, "d"), dayjs().add(-1, "d")],
    },
    {
      label: "7 hari yang lalu",
      value: [dayjs().add(-6, "d"), dayjs()],
    },
    {
      label: "Bulan ini",
      value: [dayjs().startOf("month"), dayjs().endOf("month")],
    },
    {
      label: "30 hari terakhir",
      value: [dayjs().add(-29, "d"), dayjs()],
    },
    {
      label: "Bulan kemarin",
      value: [
        dayjs().subtract(1, "month").startOf("month"),
        dayjs().subtract(1, "month").endOf("month"),
      ],
    },
  ];

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    setFromDate(dateStrings[0]);
    setToDate(dateStrings[1]);
  };

  const search = () => {
    if (page !== 0) {
      setPage(0);
    } else {
      getRiwayat();
    }
  };

  const openModal = (
    date: string | null,
    tgl_in: string | null,
    tgl_out: string | null,
    status_in: string | null,
    status_out: string | null,
    foto_in: string | null,
    foto_out: string | null,
    lokasi_in: string | null,
    lokasi_out: string | null,
    libur: string | null
  ): void => {
    setModalDetail(true);

    setDate(date);
    setTglIn(tgl_in);
    setTglOut(tgl_out);
    setStatusIn(status_in);
    setStatusOut(status_out);
    setFotoIn(foto_in);
    setFotoOut(foto_out);
    setLokasiIn(lokasi_in);
    setLokasiOut(lokasi_out);
    setLibur(libur);
  };

  const closeModalDetail = (): void => {
    setModalDetail(false);

    setDate(null);
    setTglIn(null);
    setTglOut(null);
    setStatusIn(null);
    setStatusOut(null);
    setFotoIn(null);
    setFotoOut(null);
    setLokasiIn(null);
    setLokasiOut(null);
    setLibur(null);
  };

  return (
    <div className="c-content">
      <div className="c-content-header">
        <h4>Riwayat absensi</h4>
        <p>Semua riwayat absensi</p>
      </div>
      <div className="row">
        <div className="col-lg-12 col-xl-12 col-md-12 col-12 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm mb-3">
                  <Space
                    direction="vertical"
                    size={12}
                    style={{ width: "100%" }}
                  >
                    <RangePicker
                      style={{ height: "32px", width: "100%" }}
                      presets={rangePresets}
                      onChange={onRangeChange}
                      defaultValue={[
                        dayjs().startOf("month"),
                        dayjs().endOf("month"),
                      ]}
                    />
                  </Space>
                </div>
                <div className="col-xl-1 col-lg-1 col-md-1 col-sm mb-3">
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#5356FB",
                      color: "white",
                      border: "#5356FB",
                    }}
                    onClick={() => search()}
                  >
                    Cari
                  </Button>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Absen masuk</th>
                    <th>Absen pulang</th>
                    <th>Status masuk</th>
                    <th>Status pulang</th>
                    <th>Keterangan libur</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d: TRiwayat, index: number) => {
                    return (
                      <tr
                        key={index}
                        className={
                          d.libur ? "tr-custom table-active" : "tr-custom"
                        }
                        onClick={() =>
                          openModal(
                            d.date,
                            d.tgl_in,
                            d.tgl_out,
                            d.status_in,
                            d.status_out,
                            d.foto_in,
                            d.foto_out,
                            d.lokasi_in,
                            d.lokasi_out,
                            d.libur
                          )
                        }
                      >
                        <td>{d.date}</td>
                        <td>{d.tgl_in ? d.tgl_in : "-"}</td>
                        <td>{d.tgl_out ? d.tgl_out : "-"}</td>
                        <td>
                          {!d.libur ? absenKondisi(d.status_in, d.date) : "-"}
                        </td>
                        <td>
                          {!d.libur ? absenKondisi(d.status_out, d.date) : "-"}
                        </td>
                        <td>
                          {new Date(`${d.date}`).getTime() >
                          new Date().getTime() ? (
                            d.libur ? (
                              <span className="badge rounded-pill bg-danger">
                                {d.libur}
                              </span>
                            ) : (
                              <span className="badge rounded-pill bg-dark">
                                Masuk
                                {/* belum dimulai */}
                              </span>
                            )
                          ) : d.libur ? (
                            <span className="badge rounded-pill bg-danger">
                              {d.libur}
                            </span>
                          ) : (
                            <span className="badge rounded-pill bg-dark">
                              Masuk
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div
                className="row"
                style={{
                  justifyContent: "space-between",
                }}
              >
                <div className="col">
                  <p>
                    Total: {totalRows} - Halaman: {totalRows ? page + 1 : 0}{" "}
                    dari {totalPage}
                  </p>
                </div>
                <div className="col">
                  <nav
                    aria-label="Page navigation example"
                    style={{ float: "right" }}
                    key={totalRows}
                  >
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="»"
                      onPageChange={(selected) => handlePaginate(selected)}
                      pageCount={totalPage}
                      previousLabel="«"
                      containerClassName="pagination"
                      pageLinkClassName="page-link"
                      previousLinkClassName="page-link"
                      nextLinkClassName="page-link"
                      activeClassName="page-item active"
                      // disabledLinkClassName=""
                    />
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RiwayatModalDetail
        modalDetail={modalDetail}
        closeModalDetail={closeModalDetail}
        date={date}
        tglIn={tglIn}
        tglOut={tglOut}
        statusIn={statusIn}
        statusOut={statusOut}
        fotoIn={fotoIn}
        fotoOut={fotoOut}
        lokasiIn={lokasiIn}
        lokasiOut={lokasiOut}
        libur={libur}
        absenKondisi={(val, val2) => absenKondisi(val, val2)}
      />
    </div>
  );
}
