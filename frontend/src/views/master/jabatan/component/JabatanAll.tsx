import React, { useState } from "react";
import { TJabatan } from "../../../../type";
import ReactPaginate from "react-paginate";
import logo from "../../../../img/success-logo.png";
import { Button, Popconfirm } from "antd";
import JabatanModalEdit from "./JabatanModalEdit";
import axios from "../../../../interceptor/axios";
import ToastSuccess from "../../../../components/custom/ToastSuccess";
import ToastError from "../../../../components/custom/ToastError";

interface Props {
  data: TJabatan[];
  page: number;
  setPage: (value: number) => void;
  limit: number;
  totalPage: number;
  totalRows: number;
  handlePageClick(selected: number): void;
  changeSearch(search: string): void;
  getJabatan(): void;
  setTotalRows: (value: any) => void;
}

export default function JabatanAll({
  data,
  page,
  setPage,
  limit,
  totalPage,
  totalRows,
  handlePageClick,
  changeSearch,
  getJabatan,
  setTotalRows,
}: Props) {
  const [tempSearch, setTempSeacrh] = useState<string>("");
  const [modalEdit, setModalEdit] = useState<boolean>(false);

  const [id, setId] = useState<number>(0);
  const [kode, setKode] = useState<string>("");
  const [kodeLama, setKodeLama] = useState<string>("");
  const [nama, setNama] = useState<string>("");
  const [namaLama, setNamaLama] = useState<string>("");

  const handlePageClickPaginate = (selectedItem: {
    selected: number;
  }): void => {
    handlePageClick(selectedItem.selected);
  };

  const changeSearchClick = (): void => {
    // if (page === 1) {
    //   setTotalRows((val: any) => val + 1); // untuk rerender pagination
    // }
    changeSearch(tempSearch); // untuk pencarian data di table
  };

  const openModalEdit = (id: number, kode: string, nama: string): void => {
    setModalEdit(true);

    setId(id);
    setKode(kode);
    setKodeLama(kode);
    setNama(nama);
    setNamaLama(nama);
  };

  const closeModalEdit = (): void => {
    setModalEdit(false);

    setId(0);
    setKode("");
    setKodeLama("");
    setNama("");
    setNamaLama("");
  };

  const getJabatanJabatan = (type: string): void => {
    type === "edit" ? getJabatan() : page === 0 ? getJabatan() : setPage(0);

    setId(0);
    setKode("");
    setKodeLama("");
    setNama("");
    setNamaLama("");
  };

  const deleteJabatan = async (id: number) => {
    try {
      let response = await axios.delete(`/api/v1/jabatan/${id}`);
      getJabatanJabatan("delete");
      ToastSuccess(response.data.message, "top-right");
    } catch (e: any) {
      ToastError(e.response.data.message, "top-right");
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Cari kode, nama..."
              aria-label="Cari kode, nama..."
              aria-describedby="button-addon2"
              style={{
                boxShadow: "none",
                border: "1px solid #5356FB",
              }}
              value={tempSearch}
              onChange={(e) => setTempSeacrh(e.target.value)}
            />
            <button
              className="btn"
              type="button"
              id="button-addon2"
              style={{
                backgroundColor: "#5356FB",
                color: "white",
              }}
              onClick={() => changeSearchClick()}
            >
              Cari
            </button>
          </div>
          {data.length > 0 ? (
            <>
              <div className="table-responsive">
                <table className="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode</th>
                      <th>Nama jabatan</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((d: TJabatan, index: number) => {
                      return (
                        <tr key={index}>
                          <td>
                            {page > 0 ? page * limit + index + 1 : index + 1}
                          </td>
                          <td>{d.kode}</td>
                          <td>{d.nama}</td>
                          <td>
                            <Button
                              size="small"
                              style={{
                                backgroundColor: "#12B0A2",
                                color: "white",
                                border: "#12B0A2",
                                marginRight: "2px",
                              }}
                              onClick={() =>
                                openModalEdit(d.id, d.kode, d.nama)
                              }
                            >
                              Edit
                            </Button>
                            <Popconfirm
                              placement="left"
                              title={`Apa kamu yakin?`}
                              description={`ingin menghapus "${d.nama}"`}
                              onConfirm={() => deleteJabatan(d.id)}
                              okText="Ya"
                              cancelText="Tidak"
                            >
                              <Button type="primary" size="small" danger>
                                Hapus
                              </Button>
                            </Popconfirm>
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
                      onPageChange={handlePageClickPaginate}
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
            </>
          ) : (
            <div
              style={{
                minHeight: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <img src={logo} alt="logo" width={70} />
                <h6>Tidak ada jabatan tersedia</h6>
              </div>
            </div>
          )}
        </div>
      </div>
      <JabatanModalEdit
        modalEdit={modalEdit}
        closeModalEdit={closeModalEdit}
        id={id}
        kode={kode}
        kodeLama={kodeLama}
        nama={nama}
        namaLama={namaLama}
        setId={setId}
        setKode={setKode}
        setKodeLama={setKodeLama}
        setNama={setNama}
        setNamaLama={setNamaLama}
        getJabatanJabatan={(value) => getJabatanJabatan(value)}
      />
    </div>
  );
}
