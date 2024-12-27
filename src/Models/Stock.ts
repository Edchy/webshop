enum EStatus {
  Instock,
  Incoming,
  Outofstock
}

export default interface IStock {
  local: number;
  remote: number;
  status: EStatus;
}
