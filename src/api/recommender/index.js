import { Router } from 'express'
import { middleware as query, Schema } from 'querymen'
import { index, show, showProduct, showCart, showCategory } from './controller'

const router = new Router()
const schema = new Schema({
  limit: {
    max: 1000,
    default: 20
  }
})

/**
 * @api {get} /recommendation Retrieve recommenders
 * @apiName RetrieveRecommenders
 * @apiGroup Recommender
 * @apiUse listParams
 * @apiSuccess {Object[]} recommenders List of recommenders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', query(schema), index)

router.get('/users/:id', query(schema), show)
router.get('/products/:id', query(schema), showProduct)
router.get('/carts/:id', query(schema), showCart)
router.get('/categories/:cid/users/:uid', query(schema), showCategory)

/**
 * @api {get} /recommendation/:id Retrieve recommender
 * @apiName RetrieveRecommender
 * @apiGroup Recommender
 * @apiSuccess {Object} recommender Recommender's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Recommender not found.
 */

export default router
