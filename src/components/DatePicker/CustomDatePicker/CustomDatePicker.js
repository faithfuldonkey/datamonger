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

  useEffect(() => {
    if (onPresetSelect) {
      const defaultPreset = presets[3];
      onDateChange(defaultPreset.value[0], defaultPreset.value[1]);
      onPresetSelect(defaultPreset.label);
    }
  }, []);

  const handlePresetSelect = ([presetStartDate, presetEndDate], label) => {
    onDateChange(presetStartDate, presetEndDate);
    onPresetSelect(label); 
  };

  const handleStartDateChange = (date) => {
    onDateChange(date, endDate);
    onPresetSelect("Custom"); 
  };

  const handleEndDateChange = (date) => {
    onDateChange(startDate, date);
    onPresetSelect("Custom"); 
  };

  return (
    <StyledDatePickerContainer>
      <DateRangeContainer>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="MM/dd/yyyy"
        />
        <div className="date-separator">-</div>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="MM/dd/yyyy"
        />
      </DateRangeContainer>
      <DatePresetsContainer>
        {presets.map((preset) => (
          <DatePresetButton
            key={preset.label}
            onClick={() => handlePresetSelect(preset.value, preset.label)}
          >
            {preset.label}
          </DatePresetButton>
        ))}
      </DatePresetsContainer>
    </StyledDatePickerContainer>
  );
};

export default CustomDatePicker;
