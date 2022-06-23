import { success, notFound, authorOrAdmin } from "../../services/response/";
import { Placement } from ".";
import { evaluatePlacements, findLastEvent } from "./helpers";

export const create = ({ user, bodymen: { body } }, res, next) =>
  Placement.create({ ...body, user })
    .then((placement) => placement.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Placement.count(query)
    .then((count) =>
      Placement.find(query, select, cursor)
        .populate("wallet", "name")
        .populate("user", "name")
        .populate("asset", "name")
        .then((placements) => ({
          count,
          rows: placements.map((placement) => placement.view()),
        }))
    )
    .then(success(res))
    .catch(next);

export const dispatch = (req, res, next) =>
  Placement.find({ status: "created" }, {}, { limit: 4 })
    .populate("wallet")
    .populate("user")
    .populate("asset")
    .populate("bid")
    .then((placements) =>
      placements.map((placement) => placement.placeAbidView())
    )
    .then(async (placements) => await evaluatePlacements(placements))
    .then(success(res))
    .catch(next);

export const outBidPlacement = (req, res, next) =>
  Placement.find(
    { $or: [{ status: { $eq: "placed" } }, { status: { $eq: "dispatched" } }] },
    { limit: 4 }
  )
    .populate("wallet")
    .populate("user")
    .populate("asset")
    .populate("bid")
    .then(async (placements) => await findLastEvent(placements))
    .then(() =>
      Placement.find({ status: "outbided" }, {}, { limit: 4 })
        .populate("wallet")
        .populate("user")
        .populate("asset")
        .populate("bid")
    )
    .then((placements) =>
      placements.map((placement) => placement.placeAbidView())
    )
    .then(async (placements) => await evaluatePlacements(placements))
    .then(success(res))
    .catch(next);

export const dispatched = ({ body: { order }, params: { id } }, res, next) =>
  Placement.findById(id)
    .then(notFound(res))
    .then((placement) =>
      placement
        ? Object.assign(placement, { order, status: "dispatched" }).save()
        : null
    )
    .then((placement) => (placement ? placement.view(true) : null))
    .then(success(res))
    .catch(next);

export const dispatchedError = (
  { body: { error }, params: { id } },
  res,
  next
) =>
  Placement.findById(id)
    .then(notFound(res))
    .then((placement) =>
      placement
        ? Object.assign(placement, { error, status: "error" }).save()
        : null
    )
    .then((placement) => (placement ? placement.view(true) : null))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Placement.findById(params.id)
    .populate("user")
    .then(notFound(res))
    .then((placement) => (placement ? placement.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Placement.findById(params.id)
    .populate("user")
    .then(notFound(res))
    .then(authorOrAdmin(res, user, "user"))
    .then((placement) =>
      placement ? Object.assign(placement, body).save() : null
    )
    .then((placement) => (placement ? placement.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ user, params }, res, next) =>
  Placement.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, "user"))
    .then((placement) => (placement ? placement.remove() : null))
    .then(success(res, 204))
    .catch(next);
