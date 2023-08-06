import React, { useState } from "react";
import { Button, Space, DatePicker, Select, Alert } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { TRiwayat, TUserSelect } from "../../../type";
import ReactPaginate from "react-paginate";
import logo_search from "../../../img/search.png";
import styled from "styled-components";
import ToastError from "../../../components/custom/ToastError";
import DashboardModalDetail from "./DashboardModalDetail";

const { RangePicker } = DatePicker;

interface Props {
  user: TUserSelect[];
  data: TRiwayat[];
  page: number;
  totalPage: number;
  totalRows: number;
  absenKondisi(val: string | null, val2: string | null): React.ReactElement;
  setPage: (val: number) => void;
  getRiwayat(): void;
  setUserSelected: (val: number) => void;
  setFromDate: (val: string) => void;
  setToDate: (val: string) => void;
  userSelected: number;
  pernahAbsen: string;
}

export default function DashboardAll(props: Props) {
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

  // date range
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
    props.setFromDate(dateStrings[0]);
    props.setToDate(dateStrings[1]);
  };

  // paginate
  const handlePaginate = (selectedItem: { selected: number }): void => {
    props.setPage(selectedItem.selected);
  };

  //   select
  const onChangeSelect = (value: string) => {
    props.setUserSelected(Number(value));
  };

  // cari
  const cari = () => {
    if (props.userSelected === 0) {
      return ToastError("Karyawan harus dipilih", "top-right");
    }
    if (props.page !== 0) {
      props.setPage(0);
    } else {
      props.getRiwayat();
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
    <Div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm mb-3">
              <Select
                showSearch
                placeholder="Pilih karyawan"
                optionFilterProp="children"
                onChange={onChangeSelect}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={props.user}
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm mb-3">
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <RangePicker
                  style={{ height: "32px", width: "100%" }}
                  presets={rangePresets}
                  onChange={onRangeChange}
                  defaultValue={[
                    dayjs().startOf("month"),
                    dayjs().endOf("month"),
                  ]}
                  allowClear={false}
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
                onClick={() => cari()}
              >
                Cari
              </Button>
            </div>
          </div>
          {props.data.length > 0 ? (
            <>
              <Alert message={props.pernahAbsen} type="error" />
              <table className="table table-striped mt-3">
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
                  {props.data.map((d: TRiwayat, index: number) => {
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
                          {!d.libur
                            ? props.absenKondisi(d.status_in, d.date)
                            : "-"}
                        </td>
                        <td>
                          {!d.libur
                            ? props.absenKondisi(d.status_out, d.date)
                            : "-"}
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
                    Total: {props.totalRows} - Halaman:{" "}
                    {props.totalRows ? props.page + 1 : 0} dari{" "}
                    {props.totalPage}
                  </p>
                </div>
                <div className="col">
                  <nav
                    aria-label="Page navigation example"
                    style={{ float: "right" }}
                    key={props.totalRows}
                  >
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="»"
                      onPageChange={(selected) => handlePaginate(selected)}
                      pageCount={props.totalPage}
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
            </>
          ) : (
            <div className="row cov1">
              <div className="col cov2">
                <div style={{ textAlign: "center" }}>
                  <img src={logo_search} alt="logo" width="100" />
                  <h5>Silahkan cari karyawan</h5>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <DashboardModalDetail
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
    </Div>
  );
}

const Div = styled.div`
  .cov2 {
    height: 65vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
