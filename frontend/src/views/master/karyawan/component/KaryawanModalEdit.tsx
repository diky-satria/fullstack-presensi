import { Button, Form, Input, Modal, Select, Space } from "antd";
import React, { useState } from "react";
import { TError, TJabatanCustom2 } from "../../../../type";
import ButtonCustom from "../../../../components/custom/ButtonCustom";
import axios from "../../../../interceptor/axios";
import ToastSuccess from "../../../../components/custom/ToastSuccess";

const { TextArea } = Input;

interface Props {
  modalEdit: boolean;
  closeModalEdit(): void;
  jabatan: TJabatanCustom2[];
  getKaryawanType(value: string): void;
  id: number;
  nip: string;
  nipLama: string;
  nama: string;
  jabatanId: number;
  telepon: string;
  teleponLama: string;
  alamat: string;
  email: string;
  emailLama: string;
  setId: (value: number) => void;
  setNip: (value: string) => void;
  setNipLama: (value: string) => void;
  setNama: (value: string) => void;
  setJabatanId: (value: number) => void;
  setTelepon: (value: string) => void;
  setTeleponLama: (value: string) => void;
  setAlamat: (value: string) => void;
  setEmail: (value: string) => void;
  setEmailLama: (value: string) => void;
}

export default function KaryawanModalEdit({
  modalEdit,
  closeModalEdit,
  jabatan,
  getKaryawanType,
  id,
  nip,
  nipLama,
  nama,
  jabatanId,
  telepon,
  teleponLama,
  alamat,
  email,
  emailLama,
  setId,
  setNip,
  setNipLama,
  setNama,
  setJabatanId,
  setTelepon,
  setTeleponLama,
  setAlamat,
  setEmail,
  setEmailLama,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>();

  const closeModalEditPush = (): void => {
    closeModalEdit();

    setError({
      msg: "",
      value: "",
      param: "",
      location: "",
    });
  };

  const editJabatan = async () => {
    setLoading(true);
    try {
      let response = await axios.patch(`/api/v1/karyawan/${id}`, {
        nama: nama,
        jabatan_id: jabatanId,
        nip: nip,
        nip_lama: nipLama,
        telepon: telepon,
        telepon_lama: teleponLama,
        alamat: alamat,
        email: email,
        email_lama: emailLama,
      });

      setLoading(false);
      getKaryawanType("edit");
      closeModalEditPush();
      ToastSuccess(response.data.message, "top-right");
    } catch (e: any) {
      setLoading(false);
      setError(e.response.data.errors);
    }
  };

  const getStateJabatan = (e: number): void => {
    setJabatanId(e);
  };

  const onChangeAlamat = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAlamat(e.target.value);
  };

  return (
    <div>
      <Modal
        title="Edit Karyawan"
        open={modalEdit}
        onCancel={() => closeModalEditPush()}
        centered
        footer={[
          <Space key="1" direction="vertical">
            <Space wrap>
              <Button onClick={() => closeModalEditPush()}>Kembali</Button>
              <ButtonCustom text="Edit" loading={loading} click={editJabatan} />
            </Space>
          </Space>,
        ]}
      >
        <Input
          type="hidden"
          onChange={(e) => setNipLama(e.target.value)}
          value={nipLama}
        />
        <Input
          type="hidden"
          onChange={(e) => setTeleponLama(e.target.value)}
          value={teleponLama}
        />
        <Input
          type="hidden"
          onChange={(e) => setEmailLama(e.target.value)}
          value={emailLama}
        />

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
      </Modal>
    </div>
  );
}
