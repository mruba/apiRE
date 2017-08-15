import { predictionio, solr } from '../../config'
import { Engine } from 'predictionio-driver'
import Solr from 'solr-client'
import Promise from 'bluebird'
// import recommendations from '../../services/response/recommendations.js'

const engine = new Engine(predictionio.engine.user)
const engineCart = new Engine(predictionio.engine.cart)
const client = Solr.createClient(solr)

const solrRequest = (query) =>
  new Promise((resolve, reject) => {
    client.get('select', query, (err, obj) => {
      if (err) {
        reject(err)
      } else {
        resolve(obj.response.docs);
      }
    })
  });

const getSolrQuery = (items, numRows) => ({
  q: "code_string: (" + items + ")",
  start: 0,
  rows: numRows,
  fq: [
    "catalogId:\"fspProductCatalog\"",
    "catalogVersion:Online"
  ],
  fl: "name_text_es_mx, img-Fsp275Wx275H_string, code_string, basePriceValue_double, additionalDescription_text_es_mx, pk"
})

const handleResponse = (result) =>
  Promise.reduce(result.itemScores,
    (t,n) => {
      t.item +=  " " + n.item;
      t.scores[n.item] = n.score;
      return t;
    },
    {item: "", scores: {}})
  .then((parsedResponse) =>
    solrRequest(getSolrQuery(parsedResponse.item, result.itemScores.length))
    .then((solrDocs) => sortResponse(solrDocs, parsedResponse.scores))
    .then((res) => res.sort((a, b) => a.score - b.score).reverse())
  );

const sortResponse = (docs, scores) =>
  Promise.map(docs, (d) => ({
      name: d.name_text_es_mx,
      description: d.additionalDescription_text_es_mx,
      id: d.code_string,
      price: d.basePriceValue_double,
      formattedValue: d.basePriceValue_double ? `$${d.basePriceValue_double.toFixed(2)}` : undefined,
      imgSrc: d["img-Fsp275Wx275H_string"],
      score: scores[d.code_string]
    })
  );

const recommendation = (queryEngine, params, res) =>
  queryEngine.sendQuery(params)
  .then(handleResponse)
  .then((result) => res.status(200).json(result))
  .catch((error) => res.status(500).json(error));

export const index = ({ querymen: { query, select, cursor }}, res, next) =>
  recommendation(engine, {fields: [{name: "status",values: ["non-block"],bias: -1}]}, res)

export const show = ({ params, querymen: { query, select, cursor }}, res, next) =>
  recommendation(engine, {user: params.id, num: cursor.limit, fields: [{name: "status",values: ["non-block"],bias: -1}]}, res)

export const showProduct = ({ params, querymen: { query, select, cursor }}, res, next) =>
  recommendation(engine, {item: params.id, num: cursor.limit, fields: [{name: "status",values: ["non-block"],bias: -1}]}, res)

export const showCart = ({ params, querymen: { query, select, cursor }}, res, next) =>
  recommendation(engineCart, {user: params.id, num: cursor.limit}, res)

export const showCategory = ({params, querymen: { query, select, cursor }}, res, next) => {
  let filters = [{name: 'status', values: ['non-block'], bias: -1}, {name: 'categories', values: [params.cid], bias: -1}]
  recommendation(engine, {user: params.uid, num: cursor.limit, fields: filters}, res)
}
