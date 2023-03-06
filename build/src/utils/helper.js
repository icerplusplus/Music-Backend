"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pagination = void 0;
var pagination = function pagination() {
  var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var list = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var arrFilter = [],
    i = 0,
    offset = (page - 1) * limit;
  while (arrFilter.length < limit) {
    if (i >= offset) {
      arrFilter.push(list[i]);
    }
    i++;
  }
  return {
    limit: limit,
    page: page,
    data: arrFilter
  };
};
exports.pagination = pagination;