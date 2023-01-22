export interface PingResponse {
  id: number;
  url: string;
  payloadSize: number;
  isUp: boolean;
  timeTaken: number;
  httpCode: number;
  errMsg: string;
}
