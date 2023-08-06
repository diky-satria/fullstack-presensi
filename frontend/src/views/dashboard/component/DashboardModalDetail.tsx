import { Button, Modal, Space } from "antd";
import React from "react";
import styled from "styled-components";
import logo_like from "../../../img/like.png";

interface Props {
  modalDetail: boolean;
  closeModalDetail(): void;
  date: string | null;
  tglIn: string | null;
  tglOut: string | null;
  statusIn: string | null;
  statusOut: string | null;
  fotoIn: string | null;
  fotoOut: string | null;
  lokasiIn: string | null;
  lokasiOut: string | null;
  libur: string | null;
  absenKondisi(val: string | null, val2: string | null): React.ReactElement;
}

export default function DashboardModalDetail(props: Props) {
  const isLibur = () => {
    if (new Date(`${props.date}`).getTime() > new Date().getTime()) {
      if (props.libur) {
        return (
          <>
            Detail absens {props.date} |{" "}
            <span className="badge rounded-pill bg-danger">{props.libur}</span>
          </>
        );
      } else {
        return (
          <>
            {/* belum dimulai */}
            Detail absens {props.date} |{" "}
            <span className="badge rounded-pill bg-dark">Masuk</span>
          </>
        );
      }
    } else {
      if (props.libur) {
        return (
          <>
            Detail absens {props.date} |{" "}
            <span className="badge rounded-pill bg-danger">{props.libur}</span>
          </>
        );
      } else {
        return (
          <>
            Detail absens {props.date} |{" "}
            <span className="badge rounded-pill bg-dark">Masuk</span>
          </>
        );
      }
    }
  };
  return (
    <Div>
      <div>
        <Modal
          title={isLibur()}
          open={props.modalDetail}
          onCancel={() => props.closeModalDetail()}
          centered
          width={800}
          footer={[
            <Space key="1" direction="vertical">
              <Space wrap>
                <Button onClick={() => props.closeModalDetail()}>
                  Kembali
                </Button>
              </Space>
            </Space>,
          ]}
        >
          {props.libur ? (
            <div
              style={{
                textAlign: "center",
              }}
            >
              <img src={logo_like} alt="libur" />
              <h5>
                Tanggal {props.date} libur {props.libur}
              </h5>
            </div>
          ) : (
            <>
              <div className="row">
                <table className="table table-striped my-3">
                  <thead>
                    <tr>
                      <th>Absen masuk</th>
                      <th>Absen pulang</th>
                      <th>Status masuk</th>
                      <th>Status pulang</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{props.tglIn ? props.tglIn : "-"}</td>
                      <td>{props.tglOut ? props.tglOut : "-"}</td>
                      <td>
                        {!props.libur
                          ? props.absenKondisi(props.statusIn, props.date)
                          : "-"}
                      </td>
                      <td>
                        {!props.libur
                          ? props.absenKondisi(props.statusOut, props.date)
                          : "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                  <h6 style={{ fontWeight: "bold" }}>Foto masuk</h6>
                  {props.fotoIn ? (
                    <img
                      src={`${process.env.REACT_APP_URL_API}/in/${props.fotoIn}`}
                      alt="fotoIn"
                      style={{ borderRadius: "20px", width: "100%" }}
                    />
                  ) : (
                    "-"
                  )}
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                  <h6 style={{ fontWeight: "bold" }}>Foto pulang</h6>
                  {props.fotoOut ? (
                    <img
                      src={`${process.env.REACT_APP_URL_API}/out/${props.fotoOut}`}
                      alt="fotoOut"
                      style={{ borderRadius: "20px", width: "100%" }}
                    />
                  ) : (
                    "-"
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                  <h6 style={{ fontWeight: "bold" }}>Lokasi masuk</h6>
                  {props.lokasiIn ? (
                    <iframe
                      title={`lokasi-${props.lokasiIn.split("|")[0]}`}
                      src={`https://maps.google.com/maps?q=${
                        props.lokasiIn.split("|")[0]
                      },${
                        props.lokasiIn.split("|")[1]
                      }&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      style={{
                        borderRadius: "20px",
                        width: "100%",
                        height: "50vh",
                      }}
                    />
                  ) : (
                    "-"
                  )}
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                  <h6 style={{ fontWeight: "bold" }}>Lokasi pulang</h6>
                  {props.lokasiOut ? (
                    <iframe
                      title={`lokasi-${props.lokasiOut.split("|")[0]}`}
                      src={`https://maps.google.com/maps?q=${
                        props.lokasiOut.split("|")[0]
                      },${
                        props.lokasiOut.split("|")[1]
                      }&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      style={{
                        borderRadius: "20px",
                        width: "100%",
                        height: "50vh",
                      }}
                    />
                  ) : (
                    "-"
                  )}
                </div>
              </div>
            </>
          )}
        </Modal>
      </div>
    </Div>
  );
}

const Div = styled.div``;
