import React, { useState } from "react";
import Select from "react-select";
import styles from "./DeliveryOptions.module.css";

function DeliveryOptions() {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(startDate.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timePeriod, setTimePeriod] = useState("AM");
  const [startTimeIndex, setStartTimeIndex] = useState(0);
  const [deliveryType, setDeliveryType] = useState("oneTime");
  const [regularDeliveryOption, setRegularDeliveryOption] =
    useState("everyday");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getFormattedDate = (date) => {
    const options = { weekday: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options).toUpperCase().split(" ");
  };

  const dates = Array.from({ length: 6 }, (_, i) => {
    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + i);
    const [day, date] = getFormattedDate(nextDate);
    return { day, date, fullDate: nextDate };
  });

  const handleNextDates = () => {
    setStartDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 1);
      return newDate;
    });
  };

  const handlePrevDates = () => {
    setStartDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  };

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value);
    setSelectedMonth(newMonth);
    const newDate = new Date();
    newDate.setMonth(newMonth);
    newDate.setDate(1);
    setStartDate(newDate);
  };

  const times = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const handleNextTimes = () => {
    setStartTimeIndex((prevIndex) =>
      prevIndex < 6 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrevTimes = () => {
    setStartTimeIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const weekDaysOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  const monthDatesOptions = Array.from({ length: 31 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }));

  return (
    <div>
      <div className={styles.deliveryOptionsContainer}>
        <div className={styles.deliveryDateSection}>
          <h3 className={styles.sectionTitle}>Delivery Date</h3>
          <div className={styles.monthDateContainer}>
            <div className={styles.monthSelector}>
              <select
                className={styles.monthDropdown}
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.dateSelector}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/271/271218.png"
                alt="Previous"
                className={styles.arrowIcon}
                onClick={handlePrevDates}
              />
              <div className={styles.dateList}>
                {dates.map((date, index) => (
                  <div
                    key={index}
                    className={`${styles.dateItem} ${
                      selectedDate?.toDateString() ===
                      date.fullDate.toDateString()
                        ? styles.activeDate
                        : ""
                    }`}
                    onClick={() => setSelectedDate(date.fullDate)}
                  >
                    <div className={styles.days}>
                      <span className={styles.day}>{date.day}</span>
                    </div>
                    <div className={styles.dates}>
                      <span className={styles.date}>{date.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/271/271226.png"
                alt="Next"
                className={styles.arrowIcon}
                onClick={handleNextDates}
              />
            </div>
          </div>
        </div>

        <div className={styles.deliveryTimeSection}>
          <h3 className={styles.sectionTitle}>Delivery Time</h3>
          <div className={styles.timesamp}>
            <div className={styles.timeSelector}>
              <div className={styles.amPmSelector}>
                <span
                  className={`${styles.timePeriod} ${
                    timePeriod === "AM" ? styles.activeTime : ""
                  }`}
                  onClick={() => setTimePeriod("AM")}
                >
                  AM
                </span>
                <span
                  className={`${styles.timePeriod} ${
                    timePeriod === "PM" ? styles.activeTime : ""
                  }`}
                  onClick={() => setTimePeriod("PM")}
                >
                  PM
                </span>
              </div>
              <div className={styles.timeList}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/271/271218.png"
                  alt="Previous"
                  className={styles.arrowIconTime}
                  onClick={handlePrevTimes}
                />
                {times
                  .slice(startTimeIndex, startTimeIndex + 6)
                  .map((time, index) => (
                    <div
                      key={index}
                      className={`${styles.timeItem} ${
                        selectedTime === `${time} ${timePeriod}`
                          ? styles.activeTime
                          : ""
                      }`}
                      onClick={() => setSelectedTime(`${time} ${timePeriod}`)}
                    >
                      {time}
                    </div>
                  ))}
                <img
                  src="https://cdn-icons-png.flaticon.com/128/271/271226.png"
                  alt="Next"
                  className={styles.arrowIconTime}
                  onClick={handleNextTimes}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.deliveryTypeSection}>
          <h3 className={styles.sectionTitle}>Delivery Type</h3>
          <select
            className={styles.deliveryop1}
            value={deliveryType}
            onChange={(e) => setDeliveryType(e.target.value)}
          >
            <option value="oneTime">One Time Delivery</option>
            <option value="regular">Regular Delivery</option>
          </select>

          {deliveryType === "regular" && (
            <>
              <select
                className={styles.selectday1}
                value={regularDeliveryOption}
                onChange={(e) => setRegularDeliveryOption(e.target.value)}
              >
                <option value="everyday">Every Day</option>
                <option value="everyweek">Every Week</option>
                <option value="everymonth">Every Month</option>
              </select>

              {regularDeliveryOption === "everyweek" && (
                <Select
                  isMulti
                  options={weekDaysOptions}
                  onChange={setSelectedDays}
                />
              )}
              {regularDeliveryOption === "everymonth" && (
                <Select
                  isMulti
                  options={monthDatesOptions}
                  onChange={setSelectedDates}
                  className={styles.monthOptions}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeliveryOptions;
