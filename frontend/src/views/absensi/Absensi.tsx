import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import ButtonCustom from "../../components/custom/ButtonCustom";
import logo from "../../img/like.png";
import logo_barcode from "../../img/barcode.png";
import axios from "../../interceptor/axios";
import { Button } from "antd";
import ToastError from "../../components/custom/ToastError";
import ToastSuccess from "../../components/custom/ToastSuccess";

export default function Contact() {
  const webcamRef: any = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [activeCamera, setActiveCamera] = useState<boolean>(true);

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const [tombolType, setTombolType] = useState<string>("");
  const [tombolStatus, setTombolStatus] = useState<boolean>(false);
  const [absenStatus, setAbsenStatus] = useState<string>("");
  const [sudahAbsen, setSudahAbsen] = useState<boolean>(false);
  const [messageAbsen, setMessageAbsen] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getTombolAbsensi();
  }, []);

  const getTombolAbsensi = async () => {
    let response = await axios.get(`/api/v1/absen`);
    setTombolType(response.data.tombol_type);
    setTombolStatus(response.data.tombol_status);
    setAbsenStatus(response.data.absen_status);
    setSudahAbsen(response.data.sudah_absen);
    setMessageAbsen(response.data.message);

    // ambil lokasi latitude dan longitude
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };

  const capture = useCallback(() => {
    // cek apakah kamera aktif atau terdeteksi
    if (webcamRef.current.getScreenshot()) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    } else {
      return ToastError("Kamera anda tidak terdeteksi", "top-center");
    }
  }, [webcamRef, setImgSrc]);

  const ulangi = (): void => {
    setImgSrc(null);
  };

  // val adalah masuk, pulang, belum_dimulai
  const simpan = async (val: string) => {
    setLoading(true);
    if (latitude === 0 || longitude === 0) {
      return ToastError("Lokasi anda tidak terdeteksi", "top-center");
    }

    let response = await axios.post(`/api/v1/absen`, {
      tombol_type: val,
      latitude: latitude,
      longitude: longitude,
      foto: imgSrc,
      absen_status: absenStatus,
    });

    getTombolAbsensi();

    if (response.data.jarak > 20) {
      ToastError(response.data.message, "top-center");
    } else {
      ToastSuccess(response.data.message, "top-center");
    }
    setLoading(false);
  };

  return (
    <Div className="c-content">
      {tombolStatus ? (
        <>
          <div className="row justify-content-center camera">
            <div className="col-xl-6 col-lg-8 col-md-10 col-12">
              {imgSrc ? (
                imgSrc && <img src={imgSrc} />
              ) : (
                <div className="cover-camera">
                  {!activeCamera ? (
                    <h5 className="camera-off">Kamera tidak terdeteksi</h5>
                  ) : (
                    ""
                  )}
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    mirrored={true}
                    screenshotFormat="image/jpeg"
                    onUserMediaError={() => setActiveCamera(false)}
                  />
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                {imgSrc ? (
                  <Button
                    type="primary"
                    loading={loading}
                    onClick={() => simpan(tombolType)}
                    style={{
                      backgroundColor: "#12B0A2",
                      color: "white",
                      border: "#12B0A2",
                      marginRight: "2px",
                      float: "right",
                      margin: "15px 0",
                    }}
                  >
                    Simpan
                  </Button>
                ) : (
                  <ButtonCustom
                    text={`Absen ${tombolType}`}
                    loading={false}
                    click={capture}
                  />
                )}
                <Button
                  type="primary"
                  onClick={() => ulangi()}
                  style={{
                    backgroundColor: "#5356FB",
                    color: "white",
                    border: "#5356FB",
                    marginRight: "2px",
                    float: "right",
                    margin: "15px 0",
                  }}
                  disabled={imgSrc ? false : true}
                >
                  Ulangi
                </Button>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mb-4">
            <div className="col-xl-4 col-lg-6 col-md-8 col-12 ">
              <div className="lokasi">
                {latitude === 0 || longitude === 0 ? (
                  <h5>Lokasi tidak terdeteksi</h5>
                ) : (
                  <iframe
                    title={`lokasi-${latitude}`}
                    src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      ) : sudahAbsen ? (
        <div className="row cov1">
          <div className="col cov2">
            <div style={{ textAlign: "center" }}>
              <img src={logo_barcode} alt="logo" width="100" />
              <h5>Anda sudah absen {tombolType}</h5>
            </div>
          </div>
        </div>
      ) : (
        <div className="row cov1">
          <div className="col cov2">
            <div style={{ textAlign: "center" }}>
              <img src={logo} alt="logo" width="100" />
              <h5>{messageAbsen}</h5>
            </div>
          </div>
        </div>
      )}
    </Div>
  );
}

const Div = styled.div`
  /* kamera */
  .camera img,
  video {
    display: block;
    background-color: #faf2ff81 !important;
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
    border-radius: 20px;
    width: 100%;
  }
  video {
    transform: scaleX(-1);
  }
  .cover-camera {
    position: relative;
  }
  .camera-off {
    z-index: 100;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* lokasi */
  .lokasi {
    background-color: #faf2ff81 !important;
    backdrop-filter: blur(5px) !important;
    -webkit-backdrop-filter: blur(5px) !important;
    border-radius: 20px;
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .lokasi iframe {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
  .cov2 {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cov2 img {
    width: 50vw;
  }

  @media (min-width: 400px) {
    .cov2 img {
      width: 30vw;
    }
  }
  @media (min-width: 768px) {
    .cov2 img {
      width: 15vw;
    }
  }
`;
