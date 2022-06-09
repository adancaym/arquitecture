import {Placement} from '.'
import {findLastOffer} from '../../services/openSean/implementation'
import {Process} from '../process'

export const evaluatePlacements = async (placemnets) => {
  const diferentAccountOffer = await getAlreadyNotPlaced(placemnets)
  return await getPlacementsInTime(diferentAccountOffer)
}

export const getAlreadyNotPlaced = async (placements) => {
  const filtered = placements.filter((placement) => {
    return (placement.placeABid.acc_offer && placement.placeABid.acc_address && (placement.placeABid.acc_offer.toString().toLowerCase() === placement.placeABid.acc_address.toString().toLowerCase()))
  })
  for (const p of filtered) {
    await Placement.findById(p.id).then(async ps => {
      ps.status = 'placed'
      await ps.save()
    })
  }
  return placements.filter((placement) => (!placement.placeABid.acc_offer || !placement.placeABid.acc_address) || (placement.placeABid.acc_offer && placement.placeABid.acc_address && (placement.placeABid.acc_offer.toString().toLowerCase() !== placement.placeABid.acc_address.toString().toLowerCase())))
}

export const getPlacementsInTime = async (placements) => {
  const filtered = placements.filter((placement) => {
    const exptime = new Date()
    exptime.setHours(exptime.getHours() + parseInt(placement.placeABid.exp_time))
    return new Date() >= exptime
  })
  for (const p of filtered) {
    await Placement.findById(p.id).then(async ps => {
      ps.status = 'expired'
      await ps.save()
    })
  }
  return placements.filter((placement) => {
    const exptime = new Date()
    exptime.setHours(exptime.getHours() + parseInt(placement.placeABid.exp_time))
    return new Date() <= exptime
  })
}

export const findLastEvent = async (placements) => {
  const process = await Process.findOne({name: 'extract-events'})
    .populate('provider')
    .then(p => p.view())
  for (const p of placements) {
    const viewp = p.placeAbidView()
    const exptime = new Date()
    exptime.setHours(exptime.getHours() + parseInt(viewp.placeABid.exp_time))
    if (new Date() < exptime) {
      p.status = 'outbided'
      const { event } = await findLastOffer(process)(p.asset.id)
      p.event.push(event)
      await p.save()
    }
  }
}
