import roomRepository, { CreateRoom } from '@/repositories/room-repository';

import { notFoundError } from '@/errors';

async function getRoomById(id: number) {
  const room = await roomRepository.findRoomById(id);
  if (!room) throw notFoundError();

  return room;
}

async function createRoom(data: CreateRoom) {
  const room = await roomRepository.createRoom(data);

  return room;
}

async function bookingRoom(id: number) {
  const room = await roomRepository.bookingRoom(id);
  if (!room) throw notFoundError();

  return room;
}

async function refundRoom(id: number) {
  const room = await roomRepository.refundRoom(id);
  if (!room) throw notFoundError();

  return room;
}

const roomsService = {
  getRoomById,
  createRoom,
  bookingRoom,
  refundRoom,
};

export default roomsService;
