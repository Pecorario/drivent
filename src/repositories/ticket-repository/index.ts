import { prisma } from '@/config';
import { CreateTicket } from '@/protocols';

async function findAllTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function create(data: CreateTicket) {
  return prisma.ticket.create({
    data,
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = {
  findAllTicketsTypes,
  findTicketByEnrollmentId,
  create,
};

export default ticketRepository;
