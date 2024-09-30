import Ticket from './models/ticket.model.js'; // Asegúrate de que el nombre de la clase siga la convención PascalCase
import { v4 as uuidv4 } from 'uuid';

class TicketDao {
  async create({ amount, purchaser }) {
    const newTicket = new Ticket({
      code: uuidv4(),
      purchase_datetime: new Date(),
      amount,
      purchaser,
    });
    return await newTicket.save();
  }

  async getById(ticketId) {
    return await Ticket.findById(ticketId);
  }

  async getAll() {
    return await Ticket.find();
  }
}

export default new TicketDao();
