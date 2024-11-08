export type User = {
  id: string;
  username: string;
  fullname?: string;
  ontName?: string;
  redamanOlt?: string;
  address?: string;
  phoneNumber?: string;
  paket: Paket;
  paketId: string;
  diskon: number;
  ppn?: number;
  Area?: Area;
  areaId?: string;
  odp?: Odp;
  odpId?: string;
  modemId?: string;
  modem?: Modem;
  admin?: Administrator[];
  pembayaran?: Pembayaran[];
  createdAt: string;
  updatedAt: string;
};

export type Paket = {
  id: string;
  name: string;
  harga: number;
  createdAt: string;
  updatedAt: string;
  users?: User[];
};

export type Area = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  user?: User[];
  odp?: Odp[];
  administrator?: Administrator[];
};

export type Odp = {
  id: string;
  name: string;
  rasio?: string;
  pasiveSpliter?: string;
  createdAt: string;
  updatedAt: string;
  user?: User[];
  area?: Area;
  areaId?: string;
};

export type Pembayaran = {
  id: string;
  userId: string;
  user: User;
  adminId: string;
  admin: Administrator;
  periode: string;
  metode?: string;
  totalBayar: number;
  createdAt: string;
  updatedAt: string;
};

export type Administrator = {
  id: string;
  username: string;
  fullName?: string;
  password?: Password;
  level: string;
  createdAt: string;
  updatedAt: string;
  Pembayaran?: Pembayaran[];
  Modem?: Modem[];
  Area?: Area[];
  users?: User[];
};

export type Password = {
  id: string;
  hash: string;
  administrator?: Administrator;
  administratorId: string;
};

export type Olt = {
  id: string;
  name?: string;
  username: string;
  password: string;
  olturl?: string;
  createdAt: string;
  updatedAt: string;
};

export type Modem = {
  id: string;
  name: string;
  serial: string;
  createdAt: string;
  updatedAt: string;
  orderBy?: Administrator[];
  user?: User[];
};

export type PPPoE = {
  ".id": string;
  name: string;
  service: string;
  "caller-id": string;
  address: string;
  uptime: string;
  encoding: string;
  "session-id": string;
  "limit-bytes-in": string;
  "limit-bytes-out": string;
  radius: string;
  disabled: string;
  profile: string;
  password: string;
  "last-logged-out": string;
  "last-disconnect-reason": string;
};
