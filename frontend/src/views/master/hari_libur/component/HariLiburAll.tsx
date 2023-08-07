import React from "react";
import { TDisabledDays, THariLibur } from "../../../../type";
import ReactPaginate from "react-paginate";
import { Button, Popconfirm, DatePicker, Space } from "antd";
import ToastSuccess from "../../../../components/custom/ToastSuccess";
import ToastError from "../../../../components/custom/ToastError";
import axios from "../../../../interceptor/axios";
// import HariLiburModalEdit from "./HariLiburModalEdit";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

interface Props {
  data: THariLibur[];
  page: number;
  setPage: (value: number) => void;
  limit: number;
  totalPage: number;
  totalRows: number;
  handlePageClick(selected: number): void;
  getHariLibur(): void;
  disabledDays: TDisabledDays[];
  setFromDate: (value: string) => void;
  setToDate: (value: string) => void;
}

export default function HariLiburAll(props: Props) {
  // const [tanggal, setTanggal] = useState<Date>();
  // const [nama, setNama] = useState<string>("");
  // const [modalEdit, setModalEdit] = useState<boolean>(false);

  const handlePageClickPaginate = (selectedItem: {
    selected: number;
  }): void => {
    props.handlePageClick(selectedItem.selected);
  };

  const masuk = async (val: string) => {
    try {
      let response = await axios.delete(`/api/v1/hari_libur/${val}`);
      props.getHariLibur();
      ToastSuccess(response.data.message, "top-right");
    } catch (e: any) {
      ToastError(e.response.data.message, "top-right");
    }
  };

  // const openModalEdit = (tanggal: string, nama: string): void => {
  //   setTanggal(new Date(tanggal));
  //   setNama(nama);
  //   setModalEdit(true);
  // };

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

  const search = (): void => {
    if (props.page !== 0) {
      props.setPage(0);
    } else {
      props.getHariLibur();
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm mb-3">
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
                onClick={() => search()}
              >
                Cari
              </Button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Keterangan libur</th>
                  <th>Opsi</th>
                </tr>
              </thead>
              <tbody>
                {props.data.map((d: THariLibur, index: number) => {
                  return (
                    <tr key={index} className={d.nama ? "table-active" : ""}>
                      <td>
                        {props.page > 0
                          ? props.page * props.limit + index + 1
                          : index + 1}
                      </td>
                      <td>{d.tanggal}</td>
                      <td>
                        {d.nama ? (
                          <span className="badge rounded-pill bg-danger">
                            {d.nama}
                          </span>
                        ) : (
                          <span className="badge rounded-pill bg-dark">
                            Masuk
                          </span>
                        )}
                      </td>
                      <td>
                        {new Date(`${d.tanggal} 00:00:00`).getTime() >
                          new Date().getTime() && d.nama ? (
                          <>
                            {/* <Button
                            size="small"
                            style={{
                              backgroundColor: "#12B0A2",
                              color: "white",
                              border: "#12B0A2",
                              marginRight: "2px",
                            }}
                            onClick={() => openModalEdit(d.tanggal, d.nama)}
                          >
                            Edit
                          </Button> */}
                            <Popconfirm
                              placement="left"
                              title={`Apa kamu yakin?`}
                              description={`ingin menjadikan hari libur "${d.nama}" menjadi`}
                              onConfirm={() => masuk(d.tanggal)}
                              okText="Ya"
                              cancelText="Tidak"
                            >
                              <Button
                                type="primary"
                                size="small"
                                style={{ backgroundColor: "#212529" }}
                              >
                                Masuk
                              </Button>
                            </Popconfirm>
                          </>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div
            className="row"
            style={{
              justifyContent: "space-between",
            }}
          >
            <div className="col">
              <p>
                Total: {props.totalRows} - Halaman:{" "}
                {props.totalRows ? props.page + 1 : 0} dari {props.totalPage}
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
                  onPageChange={handlePageClickPaginate}
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
        </div>
      </div>
      {/* <HariLiburModalEdit
        tanggal={tanggal}
        setTanggal={setTanggal}
        nama={nama}
        setNama={setNama}
        modalEdit={modalEdit}
        setModalEdit={setModalEdit}
        disabledDays={props.disabledDays}
      /> */}
    </div>
  );
}
