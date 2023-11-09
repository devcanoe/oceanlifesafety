import { injectable } from "tsyringe";
import CalendarRepository from "../../common/database/repository/calendar.repository";
import Calendar from "../../common/database/models/calender.model";

@injectable()
export default class GetHighlightService {
    constructor(
        private calendarRepository: CalendarRepository,
    ) {

    }
    
    async execute(data: Date){
        const response = await this.calendarRepository.fetchData({ due_date: data.toISOString().split('T')[0]});

        let arrayMonthlyHighlight: number[] = []
        
        response.map((rows: Calendar)=> {
            const dateString = rows.due_date; // Replace with your date string
            const dateArray = dateString && dateString.split('-');
            const day = dateArray && dateArray[2];

            arrayMonthlyHighlight.push(Number(day))
        });

        console.log(arrayMonthlyHighlight)

        return arrayMonthlyHighlight 
    }
}