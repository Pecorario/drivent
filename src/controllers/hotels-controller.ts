import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getAllHotels(_req: AuthenticatedRequest, res: Response) {
  try {
    const hotels = await hotelsService.getAllHotels();

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const hotelId = Number(req.params.hotelId);

  if (isNaN(hotelId) || !hotelId) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }

  try {
    const hotel = await hotelsService.getHotelById(hotelId);

    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
