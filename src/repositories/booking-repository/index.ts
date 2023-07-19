import { prisma } from '@/config';

async function findBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function findBookingById(id: number) {
  return prisma.booking.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
    select: {
      id: true,
    },
  });
}

async function updateBooking(id: number, roomId: number) {
  return prisma.booking.update({
    where: {
      id,
    },
    data: {
      roomId,
    },
    select: {
      id: true,
    },
  });
}

const bookingRepository = {
  findBooking,
  findBookingById,
  createBooking,
  updateBooking,
};

export default bookingRepository;
