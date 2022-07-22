import express from "express";
import { validate } from "../middleware/validate";

import * as userController from "../controllers/user/user.controller";
import * as userValidator from "../controllers/user/user.validator";
import * as restaurantController from "../controllers/restaurant/restaurant.controller";
import * as restaurantValidator from "../controllers/restaurant/restaurant.validator";

const router = express.Router();

//= ===============================
// Public routes
//= ===============================

/**
 *  @swagger
 *  /health-check/:
 *    get:
 *      summary: Lists all the restaurants
 *      tags: [Default]
 *      responses:
 *        200:
 *          description: Success Response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                 code:
 *                  type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                      message:
 *                        type: string
 *                 success:
 *                  type: boolean
 */
router.get("/health-check", userController.healthCheck);
/**
 *  @swagger
 *  /restaurants/:
 *    get:
 *      summary: Lists all the restaurants
 *      tags: [Restaurants]
 *      parameters:
 *        - name: 'day'
 *          in: 'query'
 *          schema:
 *            type: string
 *            format: 'sunday'
 *        - name: 'from'
 *          in: 'query'
 *          schema:
 *            type: 'time'
 *            format: '09:00'
 *        - name: 'to'
 *          in: 'query'
 *          schema:
 *            type: 'time'
 *            format: '20:00'
 *      responses:
 *        200:
 *          description: Success Response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                 code:
 *                  type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                   properties:
 *                      restaurantName:
 *                        type: string
 *                      cashBalance:
 *                        type: integer
 *                 success:
 *                  type: boolean
 */
router.get(
  "/restaurants",
  validate(restaurantValidator.getRestaurants, "query"),
  restaurantController.getRestaurants
);
/**
 *  @swagger
 *  /fetch/restaurants/{numberOfDishes}/:
 *    get:
 *      summary: Lists all the having dishes at certain price range
 *      tags: [Restaurants]
 *      parameters:
 *        - name: 'numberOfDishes'
 *          in: 'path'
 *          schema:
 *            type: integer
 *            format: 5
 *        - name: 'minPrice'
 *          in: 'query'
 *          schema:
 *            type: float
 *            format: 10.5
 *        - name: 'maxPrice'
 *          in: 'query'
 *          schema:
 *            type: float
 *            format: 20.5
 *      responses:
 *        200:
 *          description: Success Response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                 code:
 *                  type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                   properties:
 *                      restaurantName:
 *                        type: string
 *                      cashBalance:
 *                        type: integer
 *                      noOfDishes:
 *                        type: integer
 *                 success:
 *                  type: boolean
 */
router.get(
  "/fetch/restaurants/:numberOfDishes",
  validate(restaurantValidator.fetchRestaurantsParams, "params"),
  validate(restaurantValidator.fetchRestaurantsQuery, "query"),
  restaurantController.fetchRestaurants
);
/**
 *  @swagger
 *  /{searchString}/:
 *    get:
 *      summary: Lists all the restaurants and dishes relevance to the search string
 *      tags: [Restaurants]
 *      parameters:
 *        - name: 'searchString'
 *          in: 'path'
 *          schema:
 *            type: string
 *            format: 'Olives'
 *      responses:
 *        200:
 *          description: Success Response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                 code:
 *                  type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                   properties:
 *                      restaurantName:
 *                        type: string
 *                      dishName:
 *                        type: string
 *                 success:
 *                  type: boolean
 */
router.get(
  "/:searchString",
  validate(restaurantValidator.search, "params"),
  restaurantController.search
);
/**
 *  @swagger
 *  /purchase/:
 *    post:
 *      summary: Add a user purchase
 *      tags: [Users]
 *      requestBody:
 *        description: should be valid userID and menuID sent in the body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId:
 *                 type: string
 *                 format: uuid
 *                menuId:
 *                 type: string
 *                 format: uuid
 *      responses:
 *        200:
 *          description: Success Response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                 code:
 *                  type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                      message:
 *                        type:   string
 *                 success:
 *                  type: boolean
 */
router.post(
  "/purchase",
  validate(userValidator.purchase, "body"),
  userController.purchase
);

module.exports = router;
