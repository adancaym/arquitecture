import * as catalogos from './staticCatalogs'

export const catalogs = (req, res, next) => {
  res.json(catalogos)
}
