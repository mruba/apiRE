import { Router } from 'express'
import { middleware as query } from 'querymen'
import { status } from './controller'

const router = new Router()

/**
 * @api {get} /healt-checks Retrieve healt checks
 * @apiName RetrieveHealtChecks
 * @apiGroup HealtChecks
 * @apiUse listParams
 * @apiSuccess {Object[]} healtChecks List of healt checks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  status)

/**
 * @api {get} /healt-checks/:id Retrieve healt checks
 * @apiName RetrieveHealtChecks
 * @apiGroup HealtChecks
 * @apiSuccess {Object} healtChecks Healt checks's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Healt checks not found.
 */
// router.get('/:id',
//   show)

export default router
