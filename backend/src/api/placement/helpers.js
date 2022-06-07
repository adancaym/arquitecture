import placement, { Placement } from '.'
import { findLastOffer } from '../../services/openSean/implementation'
import { Process } from '../process'
import {Asset} from "../asset";

export const evaluatePlacements = async (placemnets) => {
  const diferentAccountOffer = await getAlreadyNotPlaced(placemnets)
  return await getPlacementsInTime(diferentAccountOffer)
}

export const getAlreadyNotPlaced = async (placements) => {
  const filtered = placements.filter((placement) => {
    console.log(placement.placeABid.acc_offer.toString().toLowerCase(), placement.placeABid.acc_address.toString().toLowerCase(), placement.id, 'account')
    return placement.placeABid.acc_offer.toString().toLowerCase() === placement.placeABid.acc_address.toString().toLowerCase()
  })
  for (const p of filtered) {
    await Placement.findById(p.id).then(ps => {
      ps.status = 'placed'
      ps.save()
    })
  }
  return placements.filter((placement) => placement.placeABid.acc_offer.toString().toLowerCase() !== placement.placeABid.acc_address.toString().toLowerCase())
}

export const getPlacementsInTime = async (placements) => {
  const filtered = placements.filter((placement) => {
    const exptime = new Date()
    exptime.setHours(exptime.getHours() + parseInt(placement.placeABid.exp_time))
    console.log(new Date(), exptime, placement.id, 'time')
    return new Date() >= exptime
  })
  for (const p of filtered) {
    await Placement.findById(p.id).then(ps => {
      ps.status = 'expired'
      ps.save()
    })
  }
  return placements.filter((placement) => {
    const exptime = new Date()
    exptime.setHours(exptime.getHours() + parseInt(placement.placeABid.exp_time))
    return new Date() <= exptime
  })
}

export const findLastEvent = async (placements) => {
  const process = await Process.findOne({ name: 'extract-events' })
    .populate('provider')
    .then(p => p.view())
  for (const p of placements) {
    p.event.push(await findLastOffer(process)(p.asset))
    p.save()
  }
}
