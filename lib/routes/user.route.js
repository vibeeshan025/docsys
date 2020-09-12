"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _expressValidator = require("express-validator");

var _authenticate = _interopRequireWildcard(require("../lib/helpers/authenticate"));

var _user = require("../controller/user.controller");

var _userCreateNew = _interopRequireDefault(require("../lib/requestSchemas/user.createNew.json"));

var _userLogin = _interopRequireDefault(require("../lib/requestSchemas/user.login.json"));

var _userUsername = _interopRequireDefault(require("../lib/requestSchemas/user.username.json"));

var _validator = require("../lib/helpers/validator");

var express = require('express');

var multer = require('multer');

var router = express.Router();
var uploadFileHandler = multer({
  storage: multer.memoryStorage()
});
router.route('/')
/**
 * @api {get} /user/ Get All Users
 * @apiName UserNameAutoComplete
 * @apiGroup User
 * @apiDescription Gives back the full user list
 * @apiSuccess {Array} user List of user profiles
 * @apiError (500) {String} InternalError Something went wrong.
 */
.get([_authenticate["default"], _user.getAllUser], function (req, res) {
  res.status(200).json({
    user: res.locals.user
  });
});
router.route('/login')
/**
 * @api {post} /user/login User login
 * @apiName userLogin
 * @apiGroup User
 * @apiDescription Logs user in and returns the user and API token
 * @apiParam {String} username
 * @apiParam {String} password
 * @apiSuccess {Object} user User profile
 * @apiSuccess {String} token API token
 * @apiError (401) {String} LoginFailed
 */
.post([(0, _expressValidator.checkSchema)(_userLogin["default"]), _validator.checkSchemaValidation, _user.authenticateUser], function (req, res) {
  res.status(200).json({
    user: res.locals.user,
    token: res.locals.token
  });
});
router.route('/signup')
/**
 * @api {post} /user/signup User signup
 * @apiName userSignup
 * @apiGroup User
 * @apiDescription Signs user up and logs in automatically
 * @apiParam {String} username Username
 * @apiParam {String} password Password according to policy
 * @apiParam {String} mail Valid email
 * @apiParam {String} displayName Full name
 * @apiSuccess {Object} user User profile
 * @apiSuccess {String} token API token
 * @apiError (500) {String} InternalError Something went wrong during signup. Most likely to be during validation.
 * @apiDeprecated Users should not be allowed to sign up by themselfes but rather be invited to use docSys
 */
.post([(0, _expressValidator.checkSchema)(_userCreateNew["default"]), _validator.checkSchemaValidation, _user.addUser, _user.authenticateUser], function (req, res) {
  res.status(200).json({
    user: res.locals.user,
    token: res.locals.token
  });
});
router.route('/unlock/:username')
/**
     * @api {post} /user/unlock/:username Unlock locked user
     * @apiName userUnlock
     * @apiGroup User
     * @apiDescription Unlocks user and sets login attempts to 0
     * @apiParam {String} username Username
     * @apiSuccess {Object} user User profile
     * @apiError (401) {String} AuthentificationError Not allowed to access ressource
     */
.post([_authenticate["default"], _authenticate.requireAdmin, (0, _expressValidator.checkSchema)(_userUsername["default"]), _validator.checkSchemaValidation, _user.unlockUser], function (req, res) {
  res.status(200).json({
    user: res.locals.user
  });
});
router.route('/:username')
/**
 * @api {get} /user/:username Get single user
 * @apiName userGetSingle
 * @apiGroup User
 * @apiDescription Returns a single user object without password
 * @apiParam {String} username
 * @apiSuccess {Object} user User profile
 * @apiError (401) {String} AuthentificationError Not allowed to access ressource
 */
.get([_authenticate["default"], (0, _expressValidator.checkSchema)(_userUsername["default"]), _validator.checkSchemaValidation, _user.findUser], function (req, res) {
  res.status(200).json({
    user: res.locals.user
  });
})
/**
 * @api {delete} /user/:username Delete user
 * @apiName userDeleteSingle
 * @apiGroup User
 * @apiDescription Deletes a single user
 * @apiParam {String} username
 * @apiSuccess {Object} user Username
 * @apiError (401) {String} AuthentificationError Not allowed to access ressource
 */
["delete"]([_authenticate["default"], _authenticate.requireAdmin, (0, _expressValidator.checkSchema)(_userUsername["default"]), _validator.checkSchemaValidation, _user.deleteUser], function (req, res) {
  res.status(200).json({
    user: res.locals.user
  });
})
/**
 * @api {post} /user/:username Update user
 * @apiName userUpdateSingle
 * @apiGroup User
 * @apiDescription Updates a single user. Changes every property that is set in the request body.
 * @apiParam {String} username
 * @apiSuccess {Object} user Updated user object
 * @apiError (401) {String} AuthentificationError Not allowed to access ressource
 */
.post([_authenticate["default"], uploadFileHandler.single('avatar'), (0, _expressValidator.checkSchema)(_userUsername["default"]), _validator.checkSchemaValidation, _user.updateUser], function (req, res) {
  res.status(200).json({
    user: res.locals.user
  });
});
module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvdXNlci5yb3V0ZS50cyJdLCJuYW1lcyI6WyJleHByZXNzIiwicmVxdWlyZSIsIm11bHRlciIsInJvdXRlciIsIlJvdXRlciIsInVwbG9hZEZpbGVIYW5kbGVyIiwic3RvcmFnZSIsIm1lbW9yeVN0b3JhZ2UiLCJyb3V0ZSIsImdldCIsImF1dGhlbnRpY2F0ZSIsImdldEFsbFVzZXIiLCJyZXEiLCJyZXMiLCJzdGF0dXMiLCJqc29uIiwidXNlciIsImxvY2FscyIsInBvc3QiLCJsb2dpbiIsImNoZWNrU2NoZW1hVmFsaWRhdGlvbiIsImF1dGhlbnRpY2F0ZVVzZXIiLCJ0b2tlbiIsInNpZ251cCIsImFkZFVzZXIiLCJyZXF1aXJlQWRtaW4iLCJ1c2VybmFtZSIsInVubG9ja1VzZXIiLCJmaW5kVXNlciIsImRlbGV0ZVVzZXIiLCJzaW5nbGUiLCJ1cGRhdGVVc2VyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7O0FBR0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBVkEsSUFBSUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFFQSxJQUFNQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxRQUFELENBQXRCOztBQVVBLElBQUlFLE1BQU0sR0FBR0gsT0FBTyxDQUFDSSxNQUFSLEVBQWI7QUFDQSxJQUFJQyxpQkFBaUIsR0FBR0gsTUFBTSxDQUFDO0FBQzNCSSxFQUFBQSxPQUFPLEVBQUVKLE1BQU0sQ0FBQ0ssYUFBUDtBQURrQixDQUFELENBQTlCO0FBSUFKLE1BQU0sQ0FBQ0ssS0FBUCxDQUFhLEdBQWI7QUFDSTs7Ozs7Ozs7QUFESixDQVNLQyxHQVRMLENBU1MsQ0FBQ0Msd0JBQUQsRUFBZUMsZ0JBQWYsQ0FUVCxFQVNxQyxVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUMzQ0EsRUFBQUEsR0FBRyxDQUFDQyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRUMsSUFBQUEsSUFBSSxFQUFFSCxHQUFHLENBQUNJLE1BQUosQ0FBV0Q7QUFBbkIsR0FBckI7QUFDSCxDQVhMO0FBYUFiLE1BQU0sQ0FBQ0ssS0FBUCxDQUFhLFFBQWI7QUFDSTs7Ozs7Ozs7Ozs7QUFESixDQVlLVSxJQVpMLENBWVUsQ0FBQyxtQ0FBWUMscUJBQVosQ0FBRCxFQUE0QkMsZ0NBQTVCLEVBQW1EQyxzQkFBbkQsQ0FaVixFQVlnRixVQUFDVCxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUN0RkEsRUFBQUEsR0FBRyxDQUFDQyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRUMsSUFBQUEsSUFBSSxFQUFFSCxHQUFHLENBQUNJLE1BQUosQ0FBV0QsSUFBbkI7QUFBeUJNLElBQUFBLEtBQUssRUFBRVQsR0FBRyxDQUFDSSxNQUFKLENBQVdLO0FBQTNDLEdBQXJCO0FBQ0gsQ0FkTDtBQWdCQW5CLE1BQU0sQ0FBQ0ssS0FBUCxDQUFhLFNBQWI7QUFDSTs7Ozs7Ozs7Ozs7Ozs7QUFESixDQWVLVSxJQWZMLENBZVUsQ0FBQyxtQ0FBWUsseUJBQVosQ0FBRCxFQUE2QkgsZ0NBQTdCLEVBQW9ESSxhQUFwRCxFQUE2REgsc0JBQTdELENBZlYsRUFlMEYsVUFBQ1QsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDaEdBLEVBQUFBLEdBQUcsQ0FBQ0MsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLElBQUFBLElBQUksRUFBRUgsR0FBRyxDQUFDSSxNQUFKLENBQVdELElBQW5CO0FBQXlCTSxJQUFBQSxLQUFLLEVBQUVULEdBQUcsQ0FBQ0ksTUFBSixDQUFXSztBQUEzQyxHQUFyQjtBQUNILENBakJMO0FBbUJBbkIsTUFBTSxDQUFDSyxLQUFQLENBQWEsbUJBQWI7QUFDSTs7Ozs7Ozs7O0FBREosQ0FVS1UsSUFWTCxDQVVVLENBQUNSLHdCQUFELEVBQWVlLDBCQUFmLEVBQTZCLG1DQUFZQyx3QkFBWixDQUE3QixFQUEyRE4sZ0NBQTNELEVBQWtGTyxnQkFBbEYsQ0FWVixFQVV5RyxVQUFDZixHQUFELEVBQU1DLEdBQU4sRUFBYztBQUMvR0EsRUFBQUEsR0FBRyxDQUFDQyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRUMsSUFBQUEsSUFBSSxFQUFFSCxHQUFHLENBQUNJLE1BQUosQ0FBV0Q7QUFBbkIsR0FBckI7QUFDSCxDQVpMO0FBZUFiLE1BQU0sQ0FBQ0ssS0FBUCxDQUFhLFlBQWI7QUFDSTs7Ozs7Ozs7O0FBREosQ0FVS0MsR0FWTCxDQVVTLENBQUNDLHdCQUFELEVBQWUsbUNBQVlnQix3QkFBWixDQUFmLEVBQTZDTixnQ0FBN0MsRUFBb0VRLGNBQXBFLENBVlQsRUFVd0YsVUFBQ2hCLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQzlGQSxFQUFBQSxHQUFHLENBQUNDLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFQyxJQUFBQSxJQUFJLEVBQUVILEdBQUcsQ0FBQ0ksTUFBSixDQUFXRDtBQUFuQixHQUFyQjtBQUNILENBWkw7QUFhSTs7Ozs7Ozs7O0FBYkosV0FzQlksQ0FBQ04sd0JBQUQsRUFBZWUsMEJBQWYsRUFBNkIsbUNBQVlDLHdCQUFaLENBQTdCLEVBQTJETixnQ0FBM0QsRUFBa0ZTLGdCQUFsRixDQXRCWixFQXNCMkcsVUFBQ2pCLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ2pIQSxFQUFBQSxHQUFHLENBQUNDLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFQyxJQUFBQSxJQUFJLEVBQUVILEdBQUcsQ0FBQ0ksTUFBSixDQUFXRDtBQUFuQixHQUFyQjtBQUNILENBeEJMO0FBeUJJOzs7Ozs7Ozs7QUF6QkosQ0FrQ0tFLElBbENMLENBa0NVLENBQUNSLHdCQUFELEVBQWVMLGlCQUFpQixDQUFDeUIsTUFBbEIsQ0FBeUIsUUFBekIsQ0FBZixFQUFtRCxtQ0FBWUosd0JBQVosQ0FBbkQsRUFBaUZOLGdDQUFqRixFQUF3R1csZ0JBQXhHLENBbENWLEVBa0MrSCxVQUFDbkIsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDcklBLEVBQUFBLEdBQUcsQ0FBQ0MsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLElBQUFBLElBQUksRUFBRUgsR0FBRyxDQUFDSSxNQUFKLENBQVdEO0FBQW5CLEdBQXJCO0FBQ0gsQ0FwQ0w7QUFzQ0FnQixNQUFNLENBQUNDLE9BQVAsR0FBaUI5QixNQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImxldCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpXG5pbXBvcnQgeyBjaGVja1NjaGVtYSB9IGZyb20gJ2V4cHJlc3MtdmFsaWRhdG9yJ1xuY29uc3QgbXVsdGVyID0gcmVxdWlyZSgnbXVsdGVyJylcblxuaW1wb3J0IGF1dGhlbnRpY2F0ZSwgeyByZXF1aXJlQWRtaW4gfSBmcm9tICcuLi9saWIvaGVscGVycy9hdXRoZW50aWNhdGUnXG5pbXBvcnQgeyBhdXRoZW50aWNhdGVVc2VyLCBhZGRVc2VyLCBmaW5kVXNlciwgZ2V0QWxsVXNlciwgZGVsZXRlVXNlciwgdW5sb2NrVXNlciwgdXBkYXRlVXNlciB9IGZyb20gJy4uL2NvbnRyb2xsZXIvdXNlci5jb250cm9sbGVyJztcblxuaW1wb3J0IHNpZ251cCBmcm9tICcuLi9saWIvcmVxdWVzdFNjaGVtYXMvdXNlci5jcmVhdGVOZXcuanNvbidcbmltcG9ydCBsb2dpbiBmcm9tICcuLi9saWIvcmVxdWVzdFNjaGVtYXMvdXNlci5sb2dpbi5qc29uJ1xuaW1wb3J0IHVzZXJuYW1lIGZyb20gJy4uL2xpYi9yZXF1ZXN0U2NoZW1hcy91c2VyLnVzZXJuYW1lLmpzb24nXG5pbXBvcnQgeyBjaGVja1NjaGVtYVZhbGlkYXRpb24gfSBmcm9tICcuLi9saWIvaGVscGVycy92YWxpZGF0b3InO1xuXG5sZXQgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKVxubGV0IHVwbG9hZEZpbGVIYW5kbGVyID0gbXVsdGVyKHtcbiAgICBzdG9yYWdlOiBtdWx0ZXIubWVtb3J5U3RvcmFnZSgpXG59KVxuXG5yb3V0ZXIucm91dGUoJy8nKVxuICAgIC8qKlxuICAgICAqIEBhcGkge2dldH0gL3VzZXIvIEdldCBBbGwgVXNlcnNcbiAgICAgKiBAYXBpTmFtZSBVc2VyTmFtZUF1dG9Db21wbGV0ZVxuICAgICAqIEBhcGlHcm91cCBVc2VyXG4gICAgICogQGFwaURlc2NyaXB0aW9uIEdpdmVzIGJhY2sgdGhlIGZ1bGwgdXNlciBsaXN0XG4gICAgICogQGFwaVN1Y2Nlc3Mge0FycmF5fSB1c2VyIExpc3Qgb2YgdXNlciBwcm9maWxlc1xuICAgICAqIEBhcGlFcnJvciAoNTAwKSB7U3RyaW5nfSBJbnRlcm5hbEVycm9yIFNvbWV0aGluZyB3ZW50IHdyb25nLlxuICAgICAqL1xuICAgIC5nZXQoW2F1dGhlbnRpY2F0ZSwgZ2V0QWxsVXNlcl0sIChyZXEsIHJlcykgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHVzZXI6IHJlcy5sb2NhbHMudXNlciB9KVxuICAgIH0pXG5cbnJvdXRlci5yb3V0ZSgnL2xvZ2luJylcbiAgICAvKipcbiAgICAgKiBAYXBpIHtwb3N0fSAvdXNlci9sb2dpbiBVc2VyIGxvZ2luXG4gICAgICogQGFwaU5hbWUgdXNlckxvZ2luXG4gICAgICogQGFwaUdyb3VwIFVzZXJcbiAgICAgKiBAYXBpRGVzY3JpcHRpb24gTG9ncyB1c2VyIGluIGFuZCByZXR1cm5zIHRoZSB1c2VyIGFuZCBBUEkgdG9rZW5cbiAgICAgKiBAYXBpUGFyYW0ge1N0cmluZ30gdXNlcm5hbWVcbiAgICAgKiBAYXBpUGFyYW0ge1N0cmluZ30gcGFzc3dvcmRcbiAgICAgKiBAYXBpU3VjY2VzcyB7T2JqZWN0fSB1c2VyIFVzZXIgcHJvZmlsZVxuICAgICAqIEBhcGlTdWNjZXNzIHtTdHJpbmd9IHRva2VuIEFQSSB0b2tlblxuICAgICAqIEBhcGlFcnJvciAoNDAxKSB7U3RyaW5nfSBMb2dpbkZhaWxlZFxuICAgICAqL1xuICAgIC5wb3N0KFtjaGVja1NjaGVtYShsb2dpbiBhcyBhbnkpLCBjaGVja1NjaGVtYVZhbGlkYXRpb24sIGF1dGhlbnRpY2F0ZVVzZXJdLCAocmVxLCByZXMpID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyB1c2VyOiByZXMubG9jYWxzLnVzZXIsIHRva2VuOiByZXMubG9jYWxzLnRva2VuIH0pXG4gICAgfSlcblxucm91dGVyLnJvdXRlKCcvc2lnbnVwJylcbiAgICAvKipcbiAgICAgKiBAYXBpIHtwb3N0fSAvdXNlci9zaWdudXAgVXNlciBzaWdudXBcbiAgICAgKiBAYXBpTmFtZSB1c2VyU2lnbnVwXG4gICAgICogQGFwaUdyb3VwIFVzZXJcbiAgICAgKiBAYXBpRGVzY3JpcHRpb24gU2lnbnMgdXNlciB1cCBhbmQgbG9ncyBpbiBhdXRvbWF0aWNhbGx5XG4gICAgICogQGFwaVBhcmFtIHtTdHJpbmd9IHVzZXJuYW1lIFVzZXJuYW1lXG4gICAgICogQGFwaVBhcmFtIHtTdHJpbmd9IHBhc3N3b3JkIFBhc3N3b3JkIGFjY29yZGluZyB0byBwb2xpY3lcbiAgICAgKiBAYXBpUGFyYW0ge1N0cmluZ30gbWFpbCBWYWxpZCBlbWFpbFxuICAgICAqIEBhcGlQYXJhbSB7U3RyaW5nfSBkaXNwbGF5TmFtZSBGdWxsIG5hbWVcbiAgICAgKiBAYXBpU3VjY2VzcyB7T2JqZWN0fSB1c2VyIFVzZXIgcHJvZmlsZVxuICAgICAqIEBhcGlTdWNjZXNzIHtTdHJpbmd9IHRva2VuIEFQSSB0b2tlblxuICAgICAqIEBhcGlFcnJvciAoNTAwKSB7U3RyaW5nfSBJbnRlcm5hbEVycm9yIFNvbWV0aGluZyB3ZW50IHdyb25nIGR1cmluZyBzaWdudXAuIE1vc3QgbGlrZWx5IHRvIGJlIGR1cmluZyB2YWxpZGF0aW9uLlxuICAgICAqIEBhcGlEZXByZWNhdGVkIFVzZXJzIHNob3VsZCBub3QgYmUgYWxsb3dlZCB0byBzaWduIHVwIGJ5IHRoZW1zZWxmZXMgYnV0IHJhdGhlciBiZSBpbnZpdGVkIHRvIHVzZSBkb2NTeXNcbiAgICAgKi9cbiAgICAucG9zdChbY2hlY2tTY2hlbWEoc2lnbnVwIGFzIGFueSksIGNoZWNrU2NoZW1hVmFsaWRhdGlvbiwgYWRkVXNlciwgYXV0aGVudGljYXRlVXNlcl0sIChyZXEsIHJlcykgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHVzZXI6IHJlcy5sb2NhbHMudXNlciwgdG9rZW46IHJlcy5sb2NhbHMudG9rZW4gfSlcbiAgICB9KVxuXG5yb3V0ZXIucm91dGUoJy91bmxvY2svOnVzZXJuYW1lJylcbiAgICAvKipcbiAgICAgICAgICogQGFwaSB7cG9zdH0gL3VzZXIvdW5sb2NrLzp1c2VybmFtZSBVbmxvY2sgbG9ja2VkIHVzZXJcbiAgICAgICAgICogQGFwaU5hbWUgdXNlclVubG9ja1xuICAgICAgICAgKiBAYXBpR3JvdXAgVXNlclxuICAgICAgICAgKiBAYXBpRGVzY3JpcHRpb24gVW5sb2NrcyB1c2VyIGFuZCBzZXRzIGxvZ2luIGF0dGVtcHRzIHRvIDBcbiAgICAgICAgICogQGFwaVBhcmFtIHtTdHJpbmd9IHVzZXJuYW1lIFVzZXJuYW1lXG4gICAgICAgICAqIEBhcGlTdWNjZXNzIHtPYmplY3R9IHVzZXIgVXNlciBwcm9maWxlXG4gICAgICAgICAqIEBhcGlFcnJvciAoNDAxKSB7U3RyaW5nfSBBdXRoZW50aWZpY2F0aW9uRXJyb3IgTm90IGFsbG93ZWQgdG8gYWNjZXNzIHJlc3NvdXJjZVxuICAgICAgICAgKi9cbiAgICAucG9zdChbYXV0aGVudGljYXRlLCByZXF1aXJlQWRtaW4sIGNoZWNrU2NoZW1hKHVzZXJuYW1lIGFzIGFueSksIGNoZWNrU2NoZW1hVmFsaWRhdGlvbiwgdW5sb2NrVXNlcl0sIChyZXEsIHJlcykgPT4ge1xuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHVzZXI6IHJlcy5sb2NhbHMudXNlciB9KVxuICAgIH0pXG5cblxucm91dGVyLnJvdXRlKCcvOnVzZXJuYW1lJylcbiAgICAvKipcbiAgICAgKiBAYXBpIHtnZXR9IC91c2VyLzp1c2VybmFtZSBHZXQgc2luZ2xlIHVzZXJcbiAgICAgKiBAYXBpTmFtZSB1c2VyR2V0U2luZ2xlXG4gICAgICogQGFwaUdyb3VwIFVzZXJcbiAgICAgKiBAYXBpRGVzY3JpcHRpb24gUmV0dXJucyBhIHNpbmdsZSB1c2VyIG9iamVjdCB3aXRob3V0IHBhc3N3b3JkXG4gICAgICogQGFwaVBhcmFtIHtTdHJpbmd9IHVzZXJuYW1lXG4gICAgICogQGFwaVN1Y2Nlc3Mge09iamVjdH0gdXNlciBVc2VyIHByb2ZpbGVcbiAgICAgKiBAYXBpRXJyb3IgKDQwMSkge1N0cmluZ30gQXV0aGVudGlmaWNhdGlvbkVycm9yIE5vdCBhbGxvd2VkIHRvIGFjY2VzcyByZXNzb3VyY2VcbiAgICAgKi9cbiAgICAuZ2V0KFthdXRoZW50aWNhdGUsIGNoZWNrU2NoZW1hKHVzZXJuYW1lIGFzIGFueSksIGNoZWNrU2NoZW1hVmFsaWRhdGlvbiwgZmluZFVzZXJdLCAocmVxLCByZXMpID0+IHtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyB1c2VyOiByZXMubG9jYWxzLnVzZXIgfSlcbiAgICB9KVxuICAgIC8qKlxuICAgICAqIEBhcGkge2RlbGV0ZX0gL3VzZXIvOnVzZXJuYW1lIERlbGV0ZSB1c2VyXG4gICAgICogQGFwaU5hbWUgdXNlckRlbGV0ZVNpbmdsZVxuICAgICAqIEBhcGlHcm91cCBVc2VyXG4gICAgICogQGFwaURlc2NyaXB0aW9uIERlbGV0ZXMgYSBzaW5nbGUgdXNlclxuICAgICAqIEBhcGlQYXJhbSB7U3RyaW5nfSB1c2VybmFtZVxuICAgICAqIEBhcGlTdWNjZXNzIHtPYmplY3R9IHVzZXIgVXNlcm5hbWVcbiAgICAgKiBAYXBpRXJyb3IgKDQwMSkge1N0cmluZ30gQXV0aGVudGlmaWNhdGlvbkVycm9yIE5vdCBhbGxvd2VkIHRvIGFjY2VzcyByZXNzb3VyY2VcbiAgICAgKi9cbiAgICAuZGVsZXRlKFthdXRoZW50aWNhdGUsIHJlcXVpcmVBZG1pbiwgY2hlY2tTY2hlbWEodXNlcm5hbWUgYXMgYW55KSwgY2hlY2tTY2hlbWFWYWxpZGF0aW9uLCBkZWxldGVVc2VyXSwgKHJlcSwgcmVzKSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgdXNlcjogcmVzLmxvY2Fscy51c2VyIH0pXG4gICAgfSlcbiAgICAvKipcbiAgICAgKiBAYXBpIHtwb3N0fSAvdXNlci86dXNlcm5hbWUgVXBkYXRlIHVzZXJcbiAgICAgKiBAYXBpTmFtZSB1c2VyVXBkYXRlU2luZ2xlXG4gICAgICogQGFwaUdyb3VwIFVzZXJcbiAgICAgKiBAYXBpRGVzY3JpcHRpb24gVXBkYXRlcyBhIHNpbmdsZSB1c2VyLiBDaGFuZ2VzIGV2ZXJ5IHByb3BlcnR5IHRoYXQgaXMgc2V0IGluIHRoZSByZXF1ZXN0IGJvZHkuXG4gICAgICogQGFwaVBhcmFtIHtTdHJpbmd9IHVzZXJuYW1lXG4gICAgICogQGFwaVN1Y2Nlc3Mge09iamVjdH0gdXNlciBVcGRhdGVkIHVzZXIgb2JqZWN0XG4gICAgICogQGFwaUVycm9yICg0MDEpIHtTdHJpbmd9IEF1dGhlbnRpZmljYXRpb25FcnJvciBOb3QgYWxsb3dlZCB0byBhY2Nlc3MgcmVzc291cmNlXG4gICAgICovXG4gICAgLnBvc3QoW2F1dGhlbnRpY2F0ZSwgdXBsb2FkRmlsZUhhbmRsZXIuc2luZ2xlKCdhdmF0YXInKSwgY2hlY2tTY2hlbWEodXNlcm5hbWUgYXMgYW55KSwgY2hlY2tTY2hlbWFWYWxpZGF0aW9uLCB1cGRhdGVVc2VyXSwgKHJlcSwgcmVzKSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgdXNlcjogcmVzLmxvY2Fscy51c2VyIH0pXG4gICAgfSlcblxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXIiXX0=