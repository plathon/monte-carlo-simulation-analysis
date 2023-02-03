export interface Trade {
  id: string;
  symbol: string;
  open_price: number;
  close_price: number;
  side: "BUY" | "SELL";
  begin_at?: Date;
  end_at?: Date;
  workspace: string;
}
