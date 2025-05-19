"use client"
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
// react-multi-date-picker
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
// style
import "./datePicker.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/colors/teal.css";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const DatePickerCustom = ({
  value,
  onChange,
  error,
  touched,
  label,
  className,
  placeholder,
  ...rest
}) => {

  const { theme } = useTheme();
  const [internalValue, setInternalValue] = useState(value || (range ? [] : null));
  const [tempValue, setTempValue] = useState(value || (range ? [] : null));
  const datePickerRef = useRef(null);
  const { range } = rest

  useEffect(() => {
    setInternalValue(value || (range ? [] : null));
    setTempValue(value || (range ? [] : null));
  }, [value]);

  const handleDateChange = (val) => {
    if (range) {
      setTempValue(Array.isArray(val) ? val.map(date => new Date(date)) : []);
    } else {
      const selectedDate = val ? new Date(val) : null;
      setInternalValue(selectedDate);
      setTempValue(selectedDate);

      if (onChange) {
        onChange({ target: { value: selectedDate } });
      }
    }
  };

  const handleConfirm = () => {
    setInternalValue(tempValue);
    if (onChange) {
      onChange({ target: { value: range ? tempValue : tempValue?.[0] || null } });
    }
    datePickerRef.current?.closeCalendar();
  };

  return (
    <div className={`flex flex-col w-full ${theme === "dark" ? "dark-mode" : ""}`}>
      {label && <label className="mb-2 text-sm font-medium text-foreground/50">{label}</label>}

      <DatePicker
        ref={datePickerRef}
        headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
        className={theme === "dark" ? "dark teal" : "teal"}
        format="YYYY/MM/DD"
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        weekDays={weekDays}
        monthYearSeparator="‌"
        render={
          <CustomButton
            error={error}
            touched={touched}
            placeholder={placeholder}
            className={className}
          />
        }
        value={range ? tempValue : tempValue?.[0] || null}
        onChange={handleDateChange}
        {...rest}
      >
        {
          range && (
            <div className="pb-2 pl-2 flex">
              <button
                onClick={tempValue?.length === 2 ? handleConfirm : undefined}
                className={`rounded-md px-5 py-1.5 text-sm ${tempValue?.length === 2
                    ? "bg-primary-main text-tertiary-100 cursor-pointer"
                    : "bg-gray-200 text-tertiary-700 cursor-not-allowed opacity-60"
                  }`}
                  disabled={tempValue?.length !== 2}
              >
                تأیید
              </button>
            </div>
          )
        }
      </DatePicker>

      {error && touched ? (
        <div className='mt-1'>
          <span className='text-danger-400 font-bold text-[10px] p-0.5 px-2 bg-danger-300/20 rounded-[4px]'>{error}</span>
        </div>
      ) : null}
    </div>
  );
};

export default DatePickerCustom;

function CustomButton({ value, openCalendar, error, touched, placeholder, className }) {
  return (
    // <div
    //   as="input"
    //   className={`h-10 flex items-center px-3 rounded-lg focus:border-primary-main text-tertiary-700 border-2  text-sm cursor-pointer transition-all duration-300 ${error && touched ? 'border-danger-400' : 'border-border focus:border-primary-main'}`}
    //   onClick={openCalendar}
    // >
    //   {value || "انتخاب تاریخ"}
    // </div>
    <input
      readOnly
      value={value || ""}
      placeholder={placeholder || "انتخاب تاریخ"}
      className={`h-10 flex w-full items-center px-3 rounded-lg focus:border-primary-main text-tertiary-700 border outline-none text-sm cursor-pointer transition-all duration-300 ${error && touched ? 'border-danger-400' : 'border-border-cta-natural focus:border-primary-main'} ${className}`}
      onClick={openCalendar}
    />
  );
}
