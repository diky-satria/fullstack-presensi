export const from_date = (): string => {
  let date = new Date();
  let fd: Date = new Date(date.getFullYear(), date.getMonth(), 1);

  return `'${fd.getFullYear()}-${fd.getMonth() + 1}-${fd.getDate()}'`;
};

export const to_date = (): string => {
  let date = new Date();
  let td: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return `'${td.getFullYear()}-${td.getMonth() + 1}-${td.getDate()}'`;
};

export const validate_date = (value: string): string => {
  let date = new Date(value);

  return `'${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}'`;
};
