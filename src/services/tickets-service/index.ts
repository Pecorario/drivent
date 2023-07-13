import { Ticket, TicketType, TicketStatus } from '@prisma/client';
import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { CreateTicket } from '@/protocols';

async function getAllTicketsTypes(): Promise<TicketType[]> {
  const ticketsTypes = await ticketRepository.findAllTicketsTypes();
  if (!ticketsTypes) throw notFoundError();

  return ticketsTypes;
}

async function getTicketByUser(userId: number): Promise<GetTicket> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number): Promise<GetTicket> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const data: CreateTicket = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };
  const ticket = await ticketRepository.create(data);

  return ticket;
}

type GetTicket = Ticket & {
  TicketType: TicketType;
};

const ticketsService = {
  getAllTicketsTypes,
  getTicketByUser,
  createTicket,
};

export default ticketsService;
