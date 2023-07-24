import { Form, Input } from "antd";
import React, { useState } from "react";
import ButtonCustom from "../../../../components/custom/ButtonCustom";
import axios from "../../../../interceptor/axios";
import ToastSuccess from "../../../../components/custom/ToastSuccess";
import { TError } from "../../../../type";

interface Props {
  getJabatan(): void;
  page: number;
  setPage: (value: number) => void;
}

export default function JabatanFormAdd({ getJabatan, page, setPage }: Props) {
  const [kode, setKode] = useState<string>("");
  const [nama, setNama] = useState<string>("");

  const [error, setError] = useState<TError>();
  const [loading, setLoading] = useState<boolean>(false);

  const add = async () => {
    setLoading(true);
    try {
      let response = await axios.post(`/api/v1/jabatan`, {
        kode: kode,
        nama: nama,
      });

      setLoading(false);
      getAllUserUserAll();

      ToastSuccess(response.data.message, "top-right");
    } catch (e: any) {
      setLoading(false);
      setError(e.response.data.errors);
    }
  };

  const getAllUserUserAll = () => {
    page === 0 ? getJabatan() : setPage(0);

    setKode("");
    setNama("");
    setError({
      msg: "",
      value: "",
      param: "",
      location: "",
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="mb-4">Tambah Jabatan</h5>
        <div className="form-group mt-2">
          <label>Kode</label>
          <Form>
            <Input onChange={(e) => setKode(e.target.value)} value={kode} />
          </Form>
          {error && error.param === "kode" ? (
            <small className="form-text" style={{ color: "red" }}>
              {error.msg}
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mt-2">
          <label>Nama Jabatan</label>
          <Form>
            <Input onChange={(e) => setNama(e.target.value)} value={nama} />
          </Form>
          {error && error.param === "nama" ? (
            <small className="form-text" style={{ color: "red" }}>
              {error.msg}
            </small>
          ) : (
            ""
          )}
        </div>
        <ButtonCustom text="Tambah" loading={loading} click={add} />
      </div>
    </div>
  );
}
