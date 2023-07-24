import { Button, Input, Modal, Space, Form } from "antd";
import React, { useState } from "react";
import ButtonCustom from "../../../../components/custom/ButtonCustom";
import { TError } from "../../../../type";
import axios from "../../../../interceptor/axios";
import ToastSuccess from "../../../../components/custom/ToastSuccess";

interface Props {
  modalEdit: boolean;
  closeModalEdit(): void;
  id: number;
  kode: string;
  kodeLama: string;
  nama: string;
  namaLama: string;
  setId: (value: number) => void;
  setKode: (value: string) => void;
  setKodeLama: (value: string) => void;
  setNama: (value: string) => void;
  setNamaLama: (value: string) => void;
  getJabatanJabatan(value: string): void;
}

export default function JabatanModalEdit({
  modalEdit,
  closeModalEdit,
  id,
  kode,
  kodeLama,
  nama,
  namaLama,
  setId,
  setKode,
  setKodeLama,
  setNama,
  setNamaLama,
  getJabatanJabatan,
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
      let response = await axios.patch(`/api/v1/jabatan/${id}`, {
        kode: kode,
        kode_lama: kodeLama,
        nama: nama,
        nama_lama: namaLama,
      });

      setLoading(false);
      getJabatanJabatan("edit");

      closeModalEditPush();
      ToastSuccess(response.data.message, "top-right");
    } catch (e: any) {
      setLoading(false);
      setError(e.response.data.errors);
    }
  };
  return (
    <div>
      <Modal
        title="Edit Jabatan"
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
          onChange={(e) => setId(Number(e.target.value))}
          value={id}
        />
        <Input
          type="hidden"
          onChange={(e) => setKodeLama(e.target.value)}
          value={kodeLama}
        />
        <div className="form-group mb-2 mt-4">
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
        <div className="form-group mb-2">
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
      </Modal>
    </div>
  );
}
