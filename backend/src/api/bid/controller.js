import { success, notFound, authorOrAdmin } from "../../services/response/";
import { Bid } from ".";
import { Placement } from "../placement";
import { Process } from "../process";
import { findLastOffer } from "../../services/openSean/implementation";
import {
  FindProcessExtractEvents,
  FindProcessIdCreateCollection,
} from "../provider/controller";

export const create = ({ header, user, bodymen: { body } }, res, next) => {
  console.log("body", body);
  return Bid.create({ ...body, user })
    .then((bid) => bid.view(true))
    .then(async (bid) => {
      await Promise.all(await saveBid(bid));
      return bid;
    })
    .then(success(res, 201))
    .catch(next);
};

export const saveBid = async ({ assets, id, user, wallet }) =>
  assets
    .map((asset) => ({
      asset,
      bid: id,
      status: "created",
      user: user.id,
      wallet,
    }))
    .map(
      async (placement) =>
        await FindProcessExtractEvents().then(async (provider) => {
          switch (provider.name) {
            case "opensea": {
              try {
                const lastOffer = await findLastOffer(provider)(
                  placement.asset
                );
                if (lastOffer && lastOffer.event) {
                  delete lastOffer.event.asset;
                  placement.event = [lastOffer.event];
                }
                await Placement.create(placement);
              } catch (e) {
                console.error("eror", e);
                await Placement.create(placement);
              }
              break;
            }
          }
        })
    );

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Bid.count(query)
    .then((count) =>
      Bid.find(query, select, cursor)
        .populate("user wallet")
        .then((bids) => ({
          count,
          rows: bids.map((bid) => bid.view()),
        }))
    )
    .then(success(res))
    .catch(next);

export const myBids = (
  { querymen: { query, select, cursor }, user },
  res,
  next
) =>
  Bid.count({ ...query, user: user.id })
    .then((count) =>
      Bid.find({ ...query, user: user.id }, select, {
        ...cursor,
        limit: Infinity,
      })
        .populate("wallet assets")
        .then(async (bids) => {
          const rows = [];
          for (const bid of bids) {
            rows.push(await bid.viewWithPlacements());
          }
          return {
            count,
            rows,
          };
        })
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Bid.findById(params.id)
    .populate("user")
    .then(notFound(res))
    .then((bid) => (bid ? bid.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Bid.findById(params.id)
    .populate("user")
    .then(notFound(res))
    .then(authorOrAdmin(res, user, "user"))
    .then((bid) => (bid ? Object.assign(bid, body).save() : null))
    .then((bid) => (bid ? bid.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ user, params }, res, next) =>
  Bid.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, "user"))
    .then((bid) => (bid ? bid.remove() : null))
    .then(success(res, 204))
    .catch(next);
