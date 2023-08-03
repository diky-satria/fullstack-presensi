import React, { useState } from "react";
import { id } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import { Form, Input } from "antd";
import ButtonCustom from "../../../../components/custom/ButtonCustom";
import { TDisabledDays, TError } from "../../../../type";
import axios from "../../../../interceptor/axios";
import ToastError from "../../../../components/custom/ToastError";
import ToastSuccess from "../../../../components/custom/ToastSuccess";

interface Props {
  dateMonthDefault: Date;
  disabledDays: TDisabledDays[];
  getHariLibur(): void;
}

export default function HariLiburAdd(props: Props) {
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [nama, setNama] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>();

  const add = async () => {
    setLoading(true);
    try {
      let response = await axios.post(`/api/v1/hari_libur`, {
        tanggal: selectedDay,
        nama: nama,
      });

      props.getHariLibur();

      setLoading(false);
      setError({
        msg: "",
        value: "",
        param: "",
        location: "",
      });
      setSelectedDay(undefined);
      setNama("");

      ToastSuccess(response.data.message, "top-right");
    } catch (e: any) {
      if (e.response.data.errors.param === "tanggal") {
        ToastError(e.response.data.errors.msg, "top-right");
      }
      setError(e.response.data.errors);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <DayPicker
            selected={selectedDay}
            onSelect={setSelectedDay}
            defaultMonth={props.dateMonthDefault}
            mode="single"
            disabled={props.disabledDays}
            locale={id}
            modifiersClassNames={{
              selected: "my-selected",
            }}
          />
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <div className="form-group">
            <label>Keterangan libur</label>
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
    </div>
  );
}
