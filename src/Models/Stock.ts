/**
 * Enum representing the stock status of an item.
 * - `Instock`: The item is currently available in stock.
 * - `Incoming`: The item is expected to arrive soon.
 * - `Outofstock`: The item is not available in stock.
 */
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
