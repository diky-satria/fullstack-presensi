import React from "react";
import { Button, Modal, Space, Form, Input } from "antd";
import { DayPicker } from "react-day-picker";
import { id } from "date-fns/locale";
import { TDisabledDays } from "../../../../type";
import ButtonCustom from "../../../../components/custom/ButtonCustom";

interface Props {
  tanggal: Date | undefined;

  setTanggal: (value: Date | undefined) => void;
  nama: string;
  setNama: (value: string) => void;
  modalEdit: boolean;
  setModalEdit: (value: boolean) => void;
  disabledDays: TDisabledDays[];
}

export default function HariLiburModalEdit(props: Props) {
  const closeModalEdit = (): void => {
    props.setModalEdit(false);
  };

  const editHariLibur = () => {
    console.log(props.tanggal);
    console.log(props.nama);
  };

  return (
    <div>
      <Modal
        title="Edit Hari Libur"
        open={props.modalEdit}
        onCancel={() => closeModalEdit()}
        centered
        footer={[
          <Space key="1" direction="vertical">
            <Space wrap>
              <Button onClick={() => closeModalEdit()}>Kembali</Button>
              <ButtonCustom text="Edit" loading={false} click={editHariLibur} />
            </Space>
          </Space>,
        ]}
      >
        <DayPicker
          selected={props.tanggal}
          onSelect={props.setTanggal}
          month={props.tanggal}
          onMonthChange={() => props.setTanggal(undefined)}
          mode="single"
          disabled={props.disabledDays}
          locale={id}
          modifiersClassNames={{
            selected: "my-selected",
          }}
        />
        <div className="form-group mt-3">
          <label>Nama hari libur</label>
          <Form>
            <Input
              onChange={(e) => props.setNama(e.target.value)}
              value={props.nama}
            />
          </Form>
        </div>
      </Modal>
    </div>
  );
}
