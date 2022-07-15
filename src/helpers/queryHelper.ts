import { Injectable } from '@nestjs/common';

@Injectable()
export default class Helper {
  static generateMongodbSetQuery(
    dto: any,
    objectPathPrefix: string,
    overrideWithNulls?: boolean,
  ) {
    const queryObj = {};
    for (const [key, value] of Object.entries(dto)) {
      if (overrideWithNulls || value != null) {
        if (objectPathPrefix != null) {
          queryObj[`${objectPathPrefix}.${key}`] = value;
        } else {
          queryObj[`${key}`] = value;
        }
      }
    }
    return queryObj;
  }
}
