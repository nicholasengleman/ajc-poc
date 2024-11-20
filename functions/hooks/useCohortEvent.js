import { useMemo, useCallback } from 'react';

const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THURS', 'FRI', 'SAT'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const useCohortEvent = (events) => {
  const monthsFirstEvent = {};

  function getTimeInAMPM(date) {
    let hours = date?.getHours();
    const minutes = date?.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  }

  const dateHandler = useCallback((starttime, endtime) => {
    if (!starttime) return null;

    const startFullDate = new Date(starttime);
    const startYear = startFullDate?.getFullYear();
    const startMonth = startFullDate?.getMonth();
    const startDate = startFullDate?.getDate();
    const startDay = weekdays[startFullDate?.getDay()];
    const startTime = getTimeInAMPM(startFullDate);

    let event_date = `${months[startMonth]} ${startDate}, ${startYear}`;
    let event_time = startTime;
    let isFirstEvent = false;

    if (!monthsFirstEvent[startMonth]) {
      isFirstEvent = true;
      monthsFirstEvent[startMonth] = 'first_event';
    }

    if (endtime) {
      const endFullDate = new Date(endtime);
      const endYear = endFullDate?.getFullYear();
      const endMonth = endFullDate?.getMonth();
      const endDate = endFullDate?.getDate();
      const endTime = getTimeInAMPM(endFullDate);

      if (startYear === endYear) {
        if (startMonth === endMonth) {
          event_date =
            startDate === endDate
              ? `${months[startMonth]} ${startDate}, ${startYear}`
              : `${months[startMonth]} ${startDate}-${endDate}, ${startYear}`;
        } else {
          event_date = `${months[startMonth]} ${startDate} – ${months[endMonth]} ${endDate}, ${startYear}`;
        }
      } else {
        event_date = `${months[startMonth]} ${startDate}, ${startYear} – ${months[endMonth]} ${endDate}, ${endYear}`;
      }

      event_time = `${startTime} - ${endTime}`;
    }

    return {
      s_date: startDate,
      s_day: startDay,
      e_date: endtime ? new Date(endtime).getDate() : null,
      e_day: endtime ? weekdays[new Date(endtime).getDay()] : null,
      event_time,
      event_date,
      isFirstEvent,
      year: startYear,
      month: months[startMonth],
      startMonth,
    };
  }, []);

  const getTicketFee = (ticket) => {
    if (ticket.length === 2) {
      const adultTicket = `${ticket[0]?.name || ''} ${ticket[0]?.price === '0.00' ? 'Free' : `$${ticket[0]?.price}`.trim()}`;
      const childTicket = `${ticket[1]?.name || ''} ${ticket[1]?.price === '0.00' ? 'Free' : `$${ticket[1]?.price}`.trim()}`;
      return `${adultTicket}, ${childTicket}`.trim();
    }

    if (ticket.length === 1) {
      const adultTicket = `${ticket[0]?.price === '0.00' ? 'Free' : `$${ticket[0]?.price}`}`;
      return adultTicket;
    }

    return 'Cost not provided';
  };

  const filteredEvent = useMemo(
    () =>
      events?.map((event) => {
        const {
          name,
          starttime,
          moreinfo,
          endtime,
          ticketurl,
          id,
          multimedia,
          venue,
          categories,
          summary,
          tickets,
        } = event?._source;

        const {
          s_date,
          s_day,
          e_date,
          e_day,
          event_time,
          event_date,
          isFirstEvent,
          year,
          month,
          startMonth,
        } = dateHandler(starttime, endtime);

        const image =
          multimedia?.find((media) => media?.is_cover_image)?.image || null;
        const { id: categoryId } = categories[0] || {};

        const ticketFee = getTicketFee(tickets);

        return {
          id,
          name,
          categoryId,
          ticketurl: ticketurl || moreinfo,
          s_date,
          s_day,
          e_date,
          e_day,
          event_time,
          event_date,
          isFirstEvent,
          image,
          ticketFee,
          address: venue?.address,
          year,
          month,
          startMonth,
          summary,
          htmlContent: event?._source.description,
        };
      }),
    [dateHandler, events],
  );

  return filteredEvent;
};

export default useCohortEvent;
