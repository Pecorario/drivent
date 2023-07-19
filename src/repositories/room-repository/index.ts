import { Room } from '@prisma/client';
import { prisma } from '@/config';

async function findRoomById(id: number) {
  return prisma.room.findUnique({
    where: {
      id,
    },
  });
}

export async function createRoom(data: CreateRoom) {
  return prisma.room.create({
    data,
  });
}

export async function bookingRoom(id: number) {
  return prisma.room.update({
    where: {
      id,
    },
    data: {
      capacity: {
        decrement: 1,
      },
    },
  });
}

export async function refundRoom(id: number) {
  return prisma.room.update({
    where: {
      id,
    },
    data: {
      capacity: {
        increment: 1,
      },
    },
  });
}

export type CreateRoom = Omit<Room, 'id' | 'updatedAt' | 'createdAt'>;

const roomRepository = {
  findRoomById,
  createRoom,
  bookingRoom,
  refundRoom,
};

export default roomRepository;
