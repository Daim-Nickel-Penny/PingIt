import { Inject, NotFoundException } from '@nestjs/common';
import { rejects, throws } from 'assert';
import { get } from 'https';
import { EndPoint } from 'src/interface/endPoint.interface';
import { PingResponse } from 'src/interface/pingResponse.interface';
import { Site } from 'src/interface/site.interface';
import { SiteList } from 'src/interface/siteList.interface';

export class CheckPingService {
  async getStatus(
    endPointList: EndPoint[],
    siteId: number,
  ): Promise<PingResponse[]> {
    let pingResponseList: PingResponse[] = [];

    const promises: Promise<PingResponse>[] = [];

    //Loop
    endPointList.forEach((endPoint) => {
      let pingResponse: PingResponse = {
        id: 0,
        url: '',
        payloadSize: 0,
        isUp: false,
        timeTaken: 0,
        httpCode: 0,
        errMsg: '',
      };

      let payloadSize: number;
      const startTime = process.hrtime();
      pingResponse.id = siteId;

      promises.push(
        new Promise((resolve, reject) => {
          get(endPoint.url, (res) => {
            if (!(typeof res.statusCode === 'undefined')) {
              if (res.statusCode >= 200 && res.statusCode < 300) {
                res.on('data', (chunk) => {
                  payloadSize += chunk.length;
                });
                res.on('end', () => {
                  const endTime = process.hrtime(startTime);
                  pingResponse.isUp = true;
                  pingResponse.url = endPoint.url;
                  pingResponse.timeTaken = endTime[0];
                  pingResponse.payloadSize = payloadSize;
                  if (!(typeof res.statusCode === 'undefined'))
                    pingResponse.httpCode = res.statusCode;
                  resolve(pingResponse);
                });
              } else {
                pingResponse.isUp = false;
                pingResponse.url = endPoint.url;
                pingResponse.errMsg = 'Site is Unreachable';

                if (!(typeof res.statusCode === 'undefined'))
                  pingResponse.httpCode = res.statusCode;

                resolve(pingResponse);
              }
            }
          }).on('error', (err) => {
            pingResponse.isUp = false;
            pingResponse.url = endPoint.url;

            pingResponse.errMsg = err.message;
            reject(pingResponse);
          });
        }),
      );

      pingResponseList.push(pingResponse);
    });

    return Promise.all(promises)
      .then((res) => res)
      .catch((err) => err);
  }
}
