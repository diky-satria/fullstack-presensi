import React, { useEffect, useState } from "react";
import axios from "../../../interceptor/axios";
import { TJabatanCustom, TJabatanCustom2, TKaryawan } from "../../../type";
import { Button, Popconfirm, Switch } from "antd";
import ReactPaginate from "react-paginate";
import KaryawanModalAdd from "./component/KaryawanModalAdd";
import KaryawanModalEdit from "./component/KaryawanModalEdit";
import ToastSuccess from "../../../components/custom/ToastSuccess";
import logo from "../../../img/success-logo.png";

export default function Karyawan() {
  const [data, setData] = useState<TKaryawan[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [limit] = useState<number>(10);

  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [jabatan, setJabatan] = useState<TJabatanCustom2[]>([]);

  const [id, setId] = useState<number>(0);
  const [nip, setNip] = useState<string>("");
  const [nipLama, setNipLama] = useState<string>("");
  const [nama, setNama] = useState<string>("");
  const [jabatanId, setJabatanId] = useState<number>(0);
  const [telepon, setTelepon] = useState<string>("");
  const [teleponLama, setTeleponLama] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailLama, setEmailLama] = useState<string>("");

  const [tempSearch, setTempSeacrh] = useState<string>("");

  useEffect(() => {
    getJabatan();
  }, []);

  useEffect(() => {
    getKaryawan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const getJabatan = async () => {
    let response = await axios.get(`/api/v1/jabatan_all`);

    let jb = response.data.data.map((d: TJabatanCustom) => {
      return {
        value: d.id,
        label: d.nama,
      };
    });
    setJabatan(
      jb.sort((a: TJabatanCustom2, b: TJabatanCustom2) =>
        a.label.localeCompare(b.label)
      )
    );
  };

  const getKaryawan = async () => {
    let response = await axios.get(
      `/api/v1/karyawan?search=${search}&page=${page}&limit=${limit}`
    );

    setData(response.data.data);
    setPage(response.data.page);
    setTotalPage(response.data.total_page);
    setTotalRows(response.data.total_rows);
  };

  const handlePageClickPaginate = (selectedItem: {
    selected: number;
  }): void => {
    setPage(selectedItem.selected);
  };

  const openModalAdd = (): void => {
    setModalAdd(true);
  };

  const closeModalAdd = (): void => {
    setModalAdd(false);
  };

  const openModalEdit = (
    id: number,
    nip: string,
    nama: string,
    jabatan_id: number,
    telepon: string,
    alamat: string,
    email: string
  ): void => {
    setModalEdit(true);

    setId(id);
    setNip(nip);
    setNipLama(nip);
    setNama(nama);
    setJabatanId(jabatan_id);
    setTelepon(telepon);
    setTeleponLama(telepon);
    setAlamat(alamat);
    setEmail(email);
    setEmailLama(email);
  };

  const closeModalEdit = (): void => {
    setModalEdit(false);

    setId(0);
    setNip("");
    setNipLama("");
    setNama("");
    setJabatanId(0);
    setTelepon("");
    setTeleponLama("");
    setAlamat("");
    setEmail("");
    setEmailLama("");
  };

  const getKaryawanType = (type: string): void => {
    type === "edit" ? getKaryawan() : page === 0 ? getKaryawan() : setPage(0);
  };

  const deleteKaryawan = async (id: number) => {
    let response = await axios.delete(`/api/v1/karyawan/${id}`);

    ToastSuccess(response.data.message, "top-right");
    getKaryawanType("delete");
  };

  const changeSearchClick = (): void => {
    setSearch(tempSearch); // untuk pencarian data di table
  };

  const onChangeStatus = async (e: boolean, id: number) => {
    let response = await axios.patch(`/api/v1/karyawan/status/${id}`, {
      status: e,
    });

    ToastSuccess(response.data.message, "top-right");
    getKaryawanType("edit");
  };

  return (
    <div className="c-content">
      <div
        className="c-content-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h4>Karyawan</h4>
          <p>Semua karyawan</p>
        </div>
        <div>
          <Button
            className="btn btn-sm btn-primary"
            style={{
              backgroundColor: "#5356FB",
              color: "white",
              border: "#5356FB",
              marginRight: "2px",
              float: "right",
              margin: "15px 0",
            }}
            onClick={openModalAdd}
          >
            Tambah
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mb-3">
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
                            <th>NIP</th>
                            <th>Nama</th>
                            <th>Jabatan</th>
                            <th>Email</th>
                            <th>Telepon</th>
                            <th>Alamat</th>
                            <th>Status</th>
                            <th>Opsi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((d: TKaryawan, index: number) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {page > 0
                                    ? page * limit + index + 1
                                    : index + 1}
                                </td>
                                <td>{d.nip}</td>
                                <td>{d.nama_karyawan}</td>
                                <td>{d.nama_jabatan}</td>
                                <td>{d.email}</td>
                                <td>{d.telepon}</td>
                                <td>{d.alamat}</td>
                                <td>
                                  <Switch
                                    key={d.id}
                                    defaultChecked={d.status ? true : false}
                                    onChange={(e) =>
                                      onChangeStatus(e, d.user_id)
                                    }
                                  />
                                </td>
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
                                      openModalEdit(
                                        d.user_id,
                                        d.nip,
                                        d.nama_karyawan,
                                        d.jabatan_id,
                                        d.telepon,
                                        d.alamat,
                                        d.email
                                      )
                                    }
                                  >
                                    Edit
                                  </Button>
                                  <Popconfirm
                                    placement="left"
                                    title={`Apa kamu yakin?`}
                                    description={`ingin menghapus "${d.nama_karyawan}"`}
                                    onConfirm={() => deleteKaryawan(d.user_id)}
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
                          Total: {totalRows} - Halaman:{" "}
                          {totalRows ? page + 1 : 0} dari {totalPage}
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
                      <h6>Tidak ada karyawan tersedia</h6>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <KaryawanModalAdd
        modalAdd={modalAdd}
        closeModalAdd={closeModalAdd}
        jabatan={jabatan}
        getKaryawanType={(value) => getKaryawanType(value)}
      />
      <KaryawanModalEdit
        modalEdit={modalEdit}
        closeModalEdit={closeModalEdit}
        jabatan={jabatan}
        getKaryawanType={(value) => getKaryawanType(value)}
        id={id}
        nip={nip}
        nipLama={nipLama}
        nama={nama}
        jabatanId={jabatanId}
        telepon={telepon}
        teleponLama={teleponLama}
        alamat={alamat}
        email={email}
        emailLama={emailLama}
        setId={setId}
        setNip={setNip}
        setNipLama={setNipLama}
        setNama={setNama}
        setJabatanId={setJabatanId}
        setTelepon={setTelepon}
        setTeleponLama={setTeleponLama}
        setAlamat={setAlamat}
        setEmail={setEmail}
        setEmailLama={setEmailLama}
      />
    </div>
  );
}
