import React from "react";
import { BsArrowRepeat } from "react-icons/bs";

const days_list = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
];


const convertTo24HrFormat = (time) => {
    let [hours, modifier] = time.split(" ");
    let [hour, minute] = hours.split(":");
    if (hour === "12") {
        hour = "00";
    }
    if (modifier === "PM") {
        hour = parseInt(hour, 10) + 12;
    }
    return `${hour}:${minute}`;
};



const TimeAxis = (startingHour, endingHour) => {
    let timeAxisList = [];
    for (let i = startingHour; i <= endingHour; i++) {
        const suffix = i >= 12 ? "PM" : "AM";
        const formattedHour = `${i > 12 ? i - 12 : i} ${suffix}`;
        timeAxisList.push(formattedHour);
    }
    return timeAxisList;
};

const existInSlot = (start, end, currentSlot) => {
    return convertTo24HrFormat(currentSlot) >= convertTo24HrFormat(start) && convertTo24HrFormat(currentSlot) < convertTo24HrFormat(end);
}


const Appointments = (props) => {
    const data = props.data;
    const contentRefresh = props.contentRefresh;

    const timeAxis = TimeAxis(data.MIN_HOUR, data.MAX_HOUR);


    return (
        <div className="container mt-5">
            <table className="table table-bordered " style={{ fontFamily: "rajdhani" }}>
                <thead>
                    <tr>
                        <th
                            onClick={contentRefresh}
                            style={{ width: "100px", cursor: "pointer", borderRadius: "16px 0px 0px 0px", textAlign: "center" }}
                        >
                            <BsArrowRepeat size={25} color={"#0AA36E"} />
                        </th>
                        {days_list.map((day) => (
                            <th

                                style={{ minWidth: "5px", height: "5px", textAlign: "center", alignItems: "center" }}
                                key={day}
                            >
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeAxis.map((timeOfCurrSlot) => (
                        <tr key={timeOfCurrSlot}>
                            <td style={{ minWidth: "70px", textAlign: "center" }}>{timeOfCurrSlot}</td>
                            {days_list.map((day) => {
                                let slotAppointments = [];
                                Object.values(data).forEach((appointment) => {
                                    if (
                                        appointment.weekDay === day &&
                                        existInSlot(
                                            appointment.startTimeFormatted,
                                            appointment.endTimeFormatted,
                                            timeOfCurrSlot
                                        )
                                    ) {
                                        slotAppointments.push(appointment);
                                    }
                                });
                                return (
                                    <td
                                        key={day + timeOfCurrSlot}
                                        className="appointmentSlot"
                                    >
                                        {slotAppointments.map((appointment, index) => (
                                            <div
                                                key={index}
                                                className="appointmentBlock"
                                            >
                                                <div className="appointmentName">
                                                    {appointment.name}
                                                </div>
                                                <div className="appointmentReason" >
                                                    Reason
                                                </div>
                                                <div className="appointmentReason">
                                                    {appointment.reason}
                                                </div>
                                            </div>
                                        ))}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Appointments;
