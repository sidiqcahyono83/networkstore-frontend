export type User = {
  id: string;
  username: string;
  fullname: string;
  ontName?: string;
  redamanOlt?: string;
  address?: string;
  phoneNumber?: string;
  paket?: Paket;
  diskon: number;
  Area?: Area;
  Odp?: Odp;
  modem?: string;
};

export type Paket = {
  id: string;
  name: string;
  harga: number;
  createdAt: string;
  updatedAt: string;
  users: User[];
};

export type Area = {
  name: string;
};

export type Odp = {
  id: string;
  name: string;
  rasio: string;
  pasiveSpliter: string;
  createdAt: string;
  updatedAt: string;
  user: User[];
  area: Area;
};

export type Pembayaran = {
  id: string;
  user: User;
  admin: Administrator;
  periode: string;
  ppn: number;
  metode: string;
  totalBayar: number;
  createdAt: string;
  updatedAt: string;
};

export type Administrator = {
  id: string;
  username: string;
  fullName: string;
  password: Password;
  level: string;
  createdAt: string;
  updatedAt: string;
  Pembayaran: Pembayaran[];
  Modem: Modem[];
  Area: Area[];
};

export type Password = {
  id: string;
  hash: string;
  administrator: Administrator;
};

export type Olt = {
  id: string;
  name: string;
  username: string;
  password: string;
  olturl: string;
  createdAt: string;
  updatedAt: string;
};

export type Modem = {
  id: string;
  name: string;
  serial: string;
  username: string;
  onOder: string;
  createdAt: string;
  updatedAt: string;
};

export type Pppoe = {
  id: string;
  name: string;
  serservice: string;
  address: string;
  uptime: string;
  disabled: boolean;
};
