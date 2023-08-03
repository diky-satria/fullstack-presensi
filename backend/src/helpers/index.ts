import dotenv from "dotenv";
dotenv.config();

export const from_date = (): string => {
  let date = new Date();
  let fd: Date = new Date(date.getFullYear(), date.getMonth(), 1);

  return `${fd.getFullYear()}-${fd.getMonth() + 1}-${fd.getDate()}`;
};

export const to_date = (): string => {
  let date = new Date();
  let td: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return `${td.getFullYear()}-${td.getMonth() + 1}-${td.getDate()}`;
};

export const validate_date = (value: string): string => {
  let date = new Date(value);

  return `'${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}'`;
};

export const convert_date = (value: Date): string => {
  return `${value.getFullYear()}-${
    value.getMonth() + 1
  }-${value.getDate()} ${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`;
};

export const at = () => {
  let masuk: Date = new Date();
  masuk.setHours(7, 0, 0);

  let batas_masuk: Date = new Date();
  batas_masuk.setHours(8, 0, 0);

  let pulang: Date = new Date();
  pulang.setHours(17, 0, 0);

  let batas_pulang: Date = new Date();
  batas_pulang.setHours(23, 59, 59);

  let masuk_ts: number = Math.floor(
    new Date(convert_date(masuk)).getTime() / 1000
  );
  let batas_masuk_ts: number = Math.floor(
    new Date(convert_date(batas_masuk)).getTime() / 1000
  );
  let pulang_ts: number = Math.floor(
    new Date(convert_date(pulang)).getTime() / 1000
  );
  let batas_pulang_ts: number = Math.floor(
    new Date(convert_date(batas_pulang)).getTime() / 1000
  );

  let now: number = Math.floor(new Date().getTime() / 1000);
  let toleransi: number = 50;

  // tgl sekarang string untuk cek ke db
  let tgl_sekarang_date: Date = new Date();
  let tgl_sekarang = tgl_sekarang_date.toISOString().split("T")[0];

  return {
    masuk,
    batas_masuk,
    pulang,
    batas_pulang,
    masuk_ts,
    batas_masuk_ts,
    pulang_ts,
    batas_pulang_ts,
    now,
    toleransi,
    tgl_sekarang,
  };
};

export const calculateDistance = (lat2: number, lon2: number): number => {
  let lat1: number = Number(process.env.BASE_LATITUDE);
  let lon1: number = Number(process.env.BASE_LONGITUDE);
  const earthRadius = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceInKm = earthRadius * c;
  const distanceInMeter = Math.round(distanceInKm * 1000);

  return distanceInMeter;
};

export const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};
