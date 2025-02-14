export enum RefundOrderDecisions {
  REJECT = "reject",
  ACCEPT = "accept",
  ESCALATE = "escalate",
}

export interface RefundOrderType {
  id: string;
  reason: string;
  store_name: string;
  store_logo: string;
  store_url: string;
  amount: number;
  active: boolean;
  decision: "reject" | "accept" | "escalate" | null;
  items: {
    name: string;
    id: string;
    price: number;
    quantity: number;
  }[];
}

export interface PaginatedRecordType<T> {
  first: number;
  prev: number;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: T;
}
