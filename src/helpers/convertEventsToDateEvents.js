import { parseISO } from "date-fns"

//obtengo mis eventos y prseo las fechas a un formato js
export const convertEventsToDateEvents = ( events = []) => {
    return events.map( event => {
        event.end = parseISO( event.end );
        event.start = parseISO( event.start );

        return event;
    })
}
