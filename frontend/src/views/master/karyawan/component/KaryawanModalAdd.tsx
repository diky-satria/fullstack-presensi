import { Button, Input, Modal, Space, Form, Select } from "antd";
import React, { useState } from "react";
import { TError, TJabatanCustom2 } from "../../../../type";
import ButtonCustom from "../../../../components/custom/ButtonCustom";
import axios from "../../../../interceptor/axios";
import ToastSuccess from "../../../../components/custom/ToastSuccess";

const { TextArea } = Input;

interface Props {
  modalAdd: boolean;
  closeModalAdd(): void;
  jabatan: TJabatanCustom2[];
  getKaryawanType(value: string): void;
}

export default function KaryawanModalAdd({
  modalAdd,
  closeModalAdd,
  jabatan,
  getKaryawanType,
}: Props) {
  const [nip, setNip] = useState<string>("");
  const [nama, setNama] = useState<string>("");
  const [jabatanId, setJabatanId] = useState<number>(0);
  const [telepon, setTelepon] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>();

  const closeModalAddPush = (): void => {
    closeModalAdd();

    setNip("");
    setNama("");
    setJabatanId(0);
    setTelepon("");
    setAlamat("");
    setEmail("");
    setPassword("");
    setKonfirmasiPassword("");

    setError({
      msg: "",
      value: "",
      param: "",
      location: "",
    });
  };

  const getStateJabatan = (e: number): void => {
    setJabatanId(e);
  };

  const onChangeAlamat = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAlamat(e.target.value);
  };

  const addJabatan = async () => {
    setLoading(true);
    try {
      let response = await axios.post(`/api/v1/karyawan`, {
        nip: nip,
        nama: nama,
        jabatan_id: jabatanId === 0 ? "" : jabatanId,
        telepon: telepon,
        alamat: alamat,
        email: email,
        password: password,
        konfirmasi_password: konfirmasiPassword,
      });

      setLoading(false);
      getKaryawanType("add");
      closeModalAddPush();
      ToastSuccess(response.data.message, "top-right");
    } catch (e: any) {
      setLoading(false);
      setError(e.response.data.errors);
    }
  };

  return (
    <div>
      <Modal
        title="Tambah Karyawan"
        open={modalAdd}
        onCancel={() => closeModalAddPush()}
        centered
        footer={[
          <Space key="1" direction="vertical">
            <Space wrap>
              <Button onClick={() => closeModalAddPush()}>Kembali</Button>
              <ButtonCustom
                text="Tambah"
                loading={loading}
                click={addJabatan}
              />
            </Space>
          </Space>,
        ]}
      >
        <div className="form-group mt-4">
          <label>NIP</label>
          <Form>
            <Input onChange={(e) => setNip(e.target.value)} value={nip} />
          </Form>
          {error && error.param === "nip" ? (
            <small className="form-text" style={{ color: "red" }}>
              {error.msg}
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mt-3">
          <label>Nama</label>
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
        <div className="form-group mt-3">
          <label>Jabatan</label>
          <Select
            showSearch
            style={{ width: "100%" }}
            className="c-ant-select"
            placeholder="Cari jabatan"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input.toUpperCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            // allowClear
            value={jabatanId === 0 ? null : jabatanId}
            onChange={(e) => getStateJabatan(e)}
            options={jabatan}
          />
          {error && error.param === "jabatan_id" ? (
            <small className="form-text" style={{ color: "red" }}>
              {error.msg}
            </small>
          ) : (
            ""
          )}
        </div>

        <div className="form-group mt-3">
          <label>Telepon</label>
          <Form>
            <Input
              onChange={(e) => setTelepon(e.target.value)}
              value={telepon}
            />
          </Form>
          {error && error.param === "telepon" ? (
            <small className="form-text" style={{ color: "red" }}>
              {error.msg}
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mt-3">
          <label>Alamat</label>
          <Form>
            <TextArea
              //   showCount
              //   maxLength={100}
              style={{ height: 50 }}
              onChange={onChangeAlamat}
              placeholder="alamat"
              value={alamat}
            />
          </Form>
          {error && error.param === "alamat" ? (
            <small className="form-text" style={{ color: "red" }}>
              {error.msg}
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mt-3">
          <label>Email</label>
          <Form>
            <Input onChange={(e) => setEmail(e.target.value)} value={email} />
          </Form>
          {error && error.param === "email" ? (
            <small className="form-text" style={{ color: "red" }}>
              {error.msg}
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <Form>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
          </Form>
          {error && error.param === "password" ? (
            <small className="form-text" style={{ color: "red" }}>
              {error.msg}
            </small>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mt-3">
          <label>Konfirmasi Password</label>
          <Form>
            <Input
              onChange={(e) => setKonfirmasiPassword(e.target.value)}
              value={konfirmasiPassword}
              type="password"
            />
          </Form>
          {error && error.param === "konfirmasi_password" ? (
            <small className="form-text" style={{ color: "red" }}>
              {error.msg}
            </small>
          ) : (
            ""
          )}
        </div>
      </Modal>
    </div>
  );
}
