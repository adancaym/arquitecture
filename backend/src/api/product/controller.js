import {success, notFound, authorOrAdmin} from '../../services/response/'
import {Product} from '.'
import {Shop} from "../shop";

export const create = ({user, bodymen: {body}}, res, next) =>
  Product.create({...body, user})
    .then((product) => product.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({querymen: {query, select, cursor}}, res, next) =>
  Product.find(query, select, cursor)
    .then((products) => products.map((product) => product.view()))
    .then(success(res))
    .catch(next)

export const indexIn = (req, res, next) => {

  console.log(req.body);
  Product.find({_id: {$in: req.body}})
    .then((ps) => {
      console.log(ps)
      return ps;
    })
    .then((products) => products.map((product) => product.view()))
    .then(success(res))
    .catch(next)
}


export const show = ({params}, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? product.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({bodymen: {body}, params, user}, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((product) => product ? Object.assign(product, {...body, user: user.id}).save() : null)
    .then((product) => product ? product.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({params}, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? product.remove() : null)
    .then(success(res, 204))
    .catch(next)
