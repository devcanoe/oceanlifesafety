import { injectable } from "tsyringe";
import CalendarRepository from "../../common/database/repository/calendar.repository";

@injectable()
export default class GetHighlightService {
    constructor(
        private calendarRepository: CalendarRepository,
    ) {

    }
    
    async execute(data: Date){
        return await this.calendarRepository.fetchData({ due_date: data.toISOString().split('T')[0]})
    }
}