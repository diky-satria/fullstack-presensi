import React, { useState } from "react";
import { id } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import styled from "styled-components";
import { Form, Input } from "antd";
import ButtonCustom from "../../../components/custom/ButtonCustom";

export default function HariLibur() {
  let date = new Date();
  let date_push = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const disabledDays = [{ from: new Date(2000, 1, 1), to: date_push }];

  const [selectedDay, setSelectedDay] = useState<Date>();

  const add = (): void => {
    console.log(selectedDay);
  };

  return (
    <Div className="c-content">
      <div className="c-content-header">
        <h4>Hari libur</h4>
        <p>Semua hari libur</p>
      </div>
      <div className="row">
        <div className="col-lg-8 col-xl-8 col-md-6 col-12 mb-3">
          <div className="card">
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Tanggal</th>
                    <th>Hari libur</th>
                    <th>Opsi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>dfwwd</td>
                    <td>qdwdq</td>
                    <td>asd</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-xl-4 col-md-6 col-12 mb-3">
          <div className="card">
            <div className="card-body">
              <DayPicker
                selected={selectedDay}
                onSelect={setSelectedDay}
                defaultMonth={date_push}
                mode="single"
                disabled={disabledDays}
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
                <label>Nama hari libur</label>
                <Form>
                  <Input />
                </Form>
              </div>
              <ButtonCustom text="Tambah" loading={false} click={add} />
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div``;
