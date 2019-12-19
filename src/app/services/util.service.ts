import { Injectable } from '@angular/core';


export class UtilService {

  public static is(type: string, obj: any) {
    const clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
  }

  static isObject(obj: any) {
    return UtilService.is('Object', obj);
  }

  static isNumber(num: any) {
    return UtilService.is('Number', num);
  }

  static isString(str: any) {
    return UtilService.is('String', str);
  }

  static isBoolean(bol: any) {
    return UtilService.is('Boolean', bol);
  }

  static isDate(date: any) {
    return UtilService.is('Date', date);
  }

  static isArray(arr: any) {
    return UtilService.is('Array', arr);
  }

  public static getType(obj: any) {
    if (obj === undefined) {
      return undefined;
    }
    if (obj === null) {
      return null;
    }
    return Object.prototype.toString.call(obj).slice(8, -1);
  }

  static randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
