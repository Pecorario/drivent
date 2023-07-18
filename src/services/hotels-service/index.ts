import hotelRepository from '@/repositories/hotel-repository';

import { notFoundError } from '@/errors';

async function getAllHotels() {
  const hotels = await hotelRepository.findAllHotels();
  if (!hotels) throw notFoundError();

  return hotels;
}

async function getHotelById(id: number) {
  const hotel = await hotelRepository.findHotelById(id);
  if (!hotel) throw notFoundError();

  return hotel;
}

const hotelsService = {
  getAllHotels,
  getHotelById,
};

export default hotelsService;
