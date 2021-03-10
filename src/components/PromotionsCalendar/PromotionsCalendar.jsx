/* eslint-disable no-unused-vars */
import "./PromotionsCalendar.scss";
import "../../../node_modules/react-big-calendar/lib/sass/styles.scss";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const PromotionsCalendar = ({ promotions, course }) => {
  const [sessions, setSessions] = useState([]);
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    if (course) {
      let list = [];
      promotions.forEach((promo) => {
        const infos = {
          title: course.title,
          start: promo.start_date.split("").slice(0, 10).join(""),
          end: promo.start_date.split("").slice(0, 10).join(""),
          id: promo.id,
          allDay: true,
        };
        list.push(infos);
      });
      setSessions(list);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions]);

  return sessions && sessions.length > 0 ? (
    <>
      <div className="container">
        {sessions.length === 1 ? (
          <p>{sessions.length} session found</p>
        ) : (
          <p>{sessions.length} sessions found</p>
        )}
        <Calendar
          localizer={localizer}
          events={sessions}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={(event) =>
            alert(`You subscribe at: ${event.title} ${event.id}`)
          }
        />
      </div>
    </>
  ) : (
    <p>No sessions for this course yet</p>
  );
};

export default PromotionsCalendar;
