import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createRandomRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number(),
      hotelId,
    },
  });
}

export async function createRoom(hotelId: number, capacity: number) {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity,
      hotelId,
    },
  });
}

export async function getCapacityOfRoom(id: number) {
  return prisma.room.findUnique({
    where: {
      id,
    },
    select: {
      capacity: true,
    },
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
