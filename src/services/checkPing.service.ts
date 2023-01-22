import { NotFoundException } from '@nestjs/common';
import { rejects, throws } from 'assert';
import { get } from 'https';
import { EndPoint } from 'src/interface/endPoint.interface';
import { PingResponse } from 'src/interface/pingResponse.interface';
import { Site } from 'src/interface/site.interface';
import { SiteList } from 'src/interface/siteList.interface';

export class CheckPingService {
  async getStatus(endPointList: EndPoint[]): Promise<PingResponse> {
    let pingResponse: PingResponse = {
      id: 20,
      payloadSize: 0,
      isUp: false,
      timeTaken: 0,
      httpCode: 0,
      errMsg: '',
    };

    let pingResponseList: PingResponse[] = [];

    //Loop
    endPointList.forEach((endPoint) => {
      let payloadSize: number;
      const startTime = process.hrtime();
      get(endPoint.url, async (res) => {
        if (!(typeof res.statusCode === 'undefined')) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            res.on('data', (chunk) => {
              payloadSize += chunk.length;
            });
            res.on('end', () => {
              const endTime = process.hrtime(startTime);
              pingResponse.isUp = true;
              pingResponse.timeTaken = endTime[0];
              pingResponse.payloadSize = payloadSize;
              if (!(typeof res.statusCode === 'undefined'))
                pingResponse.httpCode = res.statusCode;
            });
          } else {
            pingResponse.isUp = false;
            if (!(typeof res.statusCode === 'undefined'))
              pingResponse.httpCode = res.statusCode;
          }
        }
      }).on('error', (err) => {
        pingResponse.isUp = false;
        pingResponse.errMsg = err.message;
      });
      endPointList.push(endPoint);
    });

    let payloadSize: number;
    const startTime = process.hrtime();
    const checkUp = (): Promise<PingResponse> => {
      return new Promise((resolve, reject) => {
        get(endPointList[0].url, async (res) => {
          if (!(typeof res.statusCode === 'undefined')) {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              res.on('data', (chunk) => {
                payloadSize += chunk.length;
              });
              res.on('end', () => {
                const endTime = process.hrtime(startTime);
                pingResponse.isUp = true;
                pingResponse.timeTaken = endTime[0];
                pingResponse.payloadSize = payloadSize;
                if (!(typeof res.statusCode === 'undefined'))
                  pingResponse.httpCode = res.statusCode;
                resolve(pingResponse);
              });
            } else {
              pingResponse.isUp = false;
              if (!(typeof res.statusCode === 'undefined'))
                pingResponse.httpCode = res.statusCode;

              resolve(pingResponse);
            }
          }
        }).on('error', (err) => {
          pingResponse.isUp = false;
          pingResponse.errMsg = err.message;
          reject(pingResponse);
        });
      });
    };

    return checkUp()
      .then((response) => response)
      .catch((err) => err);
  }
}
