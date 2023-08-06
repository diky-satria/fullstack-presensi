import dayjs from "dayjs";

export type TJabatan = {
  id: number;
  kode: string;
  nama: string;
};

export type TError = {
  msg: string;
  value: string;
  param: string;
  location: string;
};

export type TKaryawan = {
  id: number;
  user_id: number;
  jabatan_id: number;
  nip: string;
  nama_karyawan: string;
  email: string;
  telepon: string;
  alamat: string;
  kode: string;
  nama_jabatan: string;
  status: boolean;
};

export type TJabatanCustom = {
  id: number;
  nama: string;
};

export type TJabatanCustom2 = {
  value: number;
  label: string;
};

export type TDisabledDays = {
  from: Date;
  to: Date;
};

export type THariLibur = {
  tanggal: string;
  nama: string;
};

export type TRiwayat = {
  date: string;
  tgl_in: string | null;
  tgl_out: string | null;
  status_in: string | null;
  status_out: string | null;
  foto_in: string | null;
  foto_out: string | null;
  lokasi_in: string | null;
  lokasi_out: string | null;
  libur: string | null;
  user_id: number | null;
  nama: string | null;
};

export type TUserSelect = {
  label: string;
  value: number;
};

export type TLoginApi = {
  username: string;
  password: string;
  remember_me: boolean;
};
