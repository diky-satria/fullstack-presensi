import React, { useState } from "react";
import ButtonCustom from "../../components/custom/ButtonCustom";
import { Alert, Form, Input } from "antd";
import axios from "../../interceptor/axios";
import { TError } from "../../type";

export default function UbahPassword() {
  const [passwordLama, setPasswordLama] = useState<string>("");
  const [passwordBaru, setPasswordBaru] = useState<string>("");
  const [konfirmasiPasswordBaru, setKonfirmasiPasswordBaru] =
    useState<string>("");

  const [error, setError] = useState<TError>();

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const changePassword = async () => {
    setError({ msg: "", value: "", param: "", location: "" });
    setLoading(true);
    setSuccess(false);

    try {
      let response = await axios.patch(`/api/v1/ubah_password`, {
        passwordLama: passwordLama,
        passwordBaru: passwordBaru,
        konfirmasiPasswordBaru: konfirmasiPasswordBaru,
      });

      setPasswordLama("");
      setPasswordBaru("");
      setKonfirmasiPasswordBaru("");

      if (response.status === 200) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }

      setLoading(false);
    } catch (e: any) {
      setError(e.response.data.errors);
      setLoading(false);
    }
  };

  return (
    <div className="c-content">
      <div className="c-content-header">
        <h4>Ubah Password</h4>
        <p>Ubah password sekarang</p>
      </div>
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12 mb-3">
          <div className="card">
            <div className="card-body">
              {success ? (
                <Alert
                  message="Password berhasil diubah"
                  type="success"
                  showIcon
                  closable
                />
              ) : (
                ""
              )}
              <div className="form-group mt-2">
                <label>Password Lama</label>
                <Form>
                  <Input
                    type="password"
                    onChange={(e) => setPasswordLama(e.target.value)}
                    value={passwordLama}
                  />
                </Form>
                {error && error.param === "passwordLama" ? (
                  <small className="form-text" style={{ color: "red" }}>
                    {error.msg}
                  </small>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mt-2">
                <label>Password Baru</label>
                <Form>
                  <Input
                    type="password"
                    onChange={(e) => setPasswordBaru(e.target.value)}
                    value={passwordBaru}
                  />
                </Form>
                {error && error.param === "passwordBaru" ? (
                  <small className="form-text" style={{ color: "red" }}>
                    {error.msg}
                  </small>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mt-2">
                <label>Konfirmasi Password Baru</label>
                <Form>
                  <Input
                    type="password"
                    onChange={(e) => setKonfirmasiPasswordBaru(e.target.value)}
                    value={konfirmasiPasswordBaru}
                  />
                </Form>
                {error && error.param === "konfirmasiPasswordBaru" ? (
                  <small className="form-text" style={{ color: "red" }}>
                    {error.msg}
                  </small>
                ) : (
                  ""
                )}
              </div>
              <ButtonCustom
                text="Ubah password"
                loading={loading}
                click={changePassword}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
