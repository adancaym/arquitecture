import { success, notFound } from '../../services/response/'
import { Process } from '.'

export const onError = (res) => (error) => {
  res.status(500).json({ msg: error.message })
}

export const create = ({ bodymen: { body } }, res, next) =>
  Process.create(body)
    .then((process) => process.view(true))
    .then(success(res, 201))
    .catch(onError(res))

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Process.count(query)
    .then(count => Process.find(query, select, cursor)
      .populate('provider')
      .then((processes) => ({
        count,
        rows: processes.map((process) => process.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Process.findById(params.id)
    .then(notFound(res))
    .then((process) => process ? process.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Process.findById(params.id)
    .then(notFound(res))
    .then((process) => process ? Object.assign(process, body).save() : null)
    .then((process) => process ? process.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Process.findById(params.id)
    .then(notFound(res))
    .then((process) => process ? process.remove() : null)
    .then(success(res, 204))
    .catch(next)
