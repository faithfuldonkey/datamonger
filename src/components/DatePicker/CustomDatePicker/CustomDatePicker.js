import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import {
  StyledDatePickerContainer,
  DatePresetButton,
  DateRangeContainer,
  DatePresetsContainer,
} from "./CustomDatePicker.styles";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ startDate, endDate, onDateChange, onPresetSelect }) => {
  const presets = [
    {
      label: "Last 7 Days",
      value: [
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        new Date(),
      ],
    },
    {
      label: "Last 30 Days",
      value: [
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        new Date(),
      ],
    },
    {
      label: "Last 365 Days",
      value: [
        new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        new Date(),
      ],
    },
    {
      label: "All Time",
      value: [
        new Date("1970-01-01T00:00:00Z"),
        new Date(),
      ],
    },
  ];

  // Remove the initial useEffect that was setting default dates

  const handlePresetSelect = (preset) => {
    if (onDateChange) {
      onDateChange(preset.value[0], preset.value[1]);
    }
    if (onPresetSelect) {
      onPresetSelect(preset.label);
    }
  };

  const handleStartDateChange = (date) => {
    if (onDateChange) {
      // Ensure the start date isn't after the end date
      const newStartDate = date > endDate ? endDate : date;
      onDateChange(newStartDate, endDate);
    }
    if (onPresetSelect) {
      onPresetSelect("Custom");
    }
  };

  const handleEndDateChange = (date) => {
    if (onDateChange) {
      // Ensure the end date isn't before the start date
      const newEndDate = date < startDate ? startDate : date;
      onDateChange(startDate, newEndDate);
    }
    if (onPresetSelect) {
      onPresetSelect("Custom");
    }
  };

  return (
    <StyledDatePickerContainer onClick={(e) => e.stopPropagation()}>
      <DateRangeContainer>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="MM/dd/yyyy"
          maxDate={endDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <div className="date-separator">-</div>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="MM/dd/yyyy"
          minDate={startDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
        />
      </DateRangeContainer>
      <DatePresetsContainer>
        {presets.map((preset) => (
          <DatePresetButton
            key={preset.label}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handlePresetSelect(preset);
            }}
          >
            {preset.label}
          </DatePresetButton>
        ))}
      </DatePresetsContainer>
    </StyledDatePickerContainer>
  );
};

export default CustomDatePicker;