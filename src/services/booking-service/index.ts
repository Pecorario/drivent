import { TicketStatus } from '@prisma/client';
import roomsService from '../rooms-service';
import ticketsService from '../tickets-service';
import bookingRepository from '@/repositories/booking-repository';
import { notFoundError, roomNotAvailableError } from '@/errors';

async function checkTicketValidate(userId: number) {
  const ticket = await ticketsService.getTicketByUser(userId);
  const hasValidTicket =
    ticket && !ticket.TicketType.isRemote && ticket.status === TicketStatus.PAID && ticket.TicketType.includesHotel;

  if (!hasValidTicket) throw roomNotAvailableError();
}

async function getRoomWhenIsValid(roomId: number) {
  const room = await roomsService.getRoomById(roomId);
  if (!room) throw notFoundError();
  if (room.capacity === 0) throw roomNotAvailableError();

  return room;
}

async function getBookingByUserId(userId: number) {
  const booking = await bookingRepository.findBooking(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function createBooking(userId: number, roomId: number) {
  await checkTicketValidate(userId);
  const room = await getRoomWhenIsValid(roomId);

  const { id } = await bookingRepository.createBooking(userId, roomId);
  await roomsService.bookingRoom(room.id);
  return id;
}

async function updateBooking(userId: number, roomId: number, bookingId: number) {
  const userBooking = await bookingRepository.findBooking(userId);
  if (!userBooking) throw roomNotAvailableError();
  const booking = await bookingRepository.findBookingById(bookingId);
  if (!booking) throw notFoundError();

  if (userBooking.id !== booking.id) throw roomNotAvailableError();

  const room = await getRoomWhenIsValid(roomId);

  const { id } = await bookingRepository.updateBooking(bookingId, roomId);
  await roomsService.bookingRoom(room.id);
  await roomsService.refundRoom(booking.Room.id);

  return id;
}

const bookingService = {
  createBooking,
  getBookingByUserId,
  updateBooking,
};

export default bookingService;
