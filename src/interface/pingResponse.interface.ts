export interface PingResponse {
  id: number;
  payloadSize: number;
  isUp: boolean;
  timeTaken: number;
  httpCode: number;
  errMsg: string;
}
