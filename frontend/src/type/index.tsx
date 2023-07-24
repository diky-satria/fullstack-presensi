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
