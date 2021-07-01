// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportUserIndex from '../../../app/controller/user/index';
import ExportUserPojoIndex from '../../../app/controller/user/pojo/index';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    user: {
      index: ExportUserIndex;
      pojo: {
        index: ExportUserPojoIndex;
      }
    }
  }
}
