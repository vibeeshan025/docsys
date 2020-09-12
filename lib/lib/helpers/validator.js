"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkSchemaValidation = void 0;

var _expressValidator = require("express-validator");

var _error = require("./error");

var checkSchemaValidation = function checkSchemaValidation(req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req).formatWith(function (_ref) {
    var msg = _ref.msg,
        param = _ref.param;
    return "".concat(msg);
  });

  if (!errors.isEmpty()) {
    return next(new _error.ErrorHandler(400, errors.array()[0]));
  }

  next();
};

exports.checkSchemaValidation = checkSchemaValidation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvaGVscGVycy92YWxpZGF0b3IudHMiXSwibmFtZXMiOlsiY2hlY2tTY2hlbWFWYWxpZGF0aW9uIiwicmVxIiwicmVzIiwibmV4dCIsImVycm9ycyIsImZvcm1hdFdpdGgiLCJtc2ciLCJwYXJhbSIsImlzRW1wdHkiLCJFcnJvckhhbmRsZXIiLCJhcnJheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOztBQUVPLElBQU1BLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FBQ0MsR0FBRCxFQUFlQyxHQUFmLEVBQThCQyxJQUE5QixFQUFxRDtBQUN0RixNQUFNQyxNQUFNLEdBQUcsd0NBQWlCSCxHQUFqQixFQUFzQkksVUFBdEIsQ0FBaUMsZ0JBQW9CO0FBQUEsUUFBakJDLEdBQWlCLFFBQWpCQSxHQUFpQjtBQUFBLFFBQVpDLEtBQVksUUFBWkEsS0FBWTtBQUFFLHFCQUFVRCxHQUFWO0FBQWlCLEdBQXhFLENBQWY7O0FBQ0EsTUFBSSxDQUFDRixNQUFNLENBQUNJLE9BQVAsRUFBTCxFQUF1QjtBQUNuQixXQUFPTCxJQUFJLENBQUMsSUFBSU0sbUJBQUosQ0FBaUIsR0FBakIsRUFBc0JMLE1BQU0sQ0FBQ00sS0FBUCxHQUFlLENBQWYsQ0FBdEIsQ0FBRCxDQUFYO0FBQ0g7O0FBRURQLEVBQUFBLElBQUk7QUFDUCxDQVBNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiB9IGZyb20gJ2V4cHJlc3MnXG5pbXBvcnQgeyB2YWxpZGF0aW9uUmVzdWx0IH0gZnJvbSAnZXhwcmVzcy12YWxpZGF0b3InXG5pbXBvcnQgeyBFcnJvckhhbmRsZXIgfSBmcm9tICcuL2Vycm9yJ1xuXG5leHBvcnQgY29uc3QgY2hlY2tTY2hlbWFWYWxpZGF0aW9uID0gKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgY29uc3QgZXJyb3JzID0gdmFsaWRhdGlvblJlc3VsdChyZXEpLmZvcm1hdFdpdGgoKHsgbXNnLCBwYXJhbSB9KSA9PiB7IHJldHVybiBgJHttc2d9YCB9KVxuICAgIGlmICghZXJyb3JzLmlzRW1wdHkoKSkge1xuICAgICAgICByZXR1cm4gbmV4dChuZXcgRXJyb3JIYW5kbGVyKDQwMCwgZXJyb3JzLmFycmF5KClbMF0pKVxuICAgIH1cblxuICAgIG5leHQoKVxufSJdfQ==