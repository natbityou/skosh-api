/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  // Login / Logout
  'POST /login' : 'AuthController.login',
  'POST /logout': 'AuthController.logout',
  
  // Register a User
  'POST /register':'UserController.register',

  //authorization test 
  'GET /testing' : 'TestController.testing',

  // Skoshes
  'POST /skosh' : 'SkoshController.createSkosh',
  'GET /users/:user_id/skoshes' : 'SkoshController.listUserSkoshes',
  'GET /skosh-types' : 'SkoshController.listSkoshTypes',
  'GET /skosh-types/:skosh_type_id/skoshes' : 'SkoshController.listSkoshes',
};
