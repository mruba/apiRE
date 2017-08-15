
export const status = ({ querymen: { query, select, cursor } }, res, next) =>
  res.status(200).json({status: 'ok'})

// export const show = ({ params }, res, next) =>
//   res.status(200).json({})
