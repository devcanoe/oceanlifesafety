import Ticket from "@/common/model/ticket.model";

export default interface IDashboard {
  tickets: Ticket[];
  agents: number;
  unassignedTicket: number;
  completedTicket: number;
  ongoingTicket: number;
}
