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
  ];

  useEffect(() => {
    // Ensure the default preset is only set on the first mount
    if (onPresetSelect) {
      const defaultPreset = presets[1]; // "Last 30 Days"
      onPresetSelect(defaultPreset.label);
    }
  }, []); // Empty dependency array ensures this runs only once

  const handlePresetSelect = ([presetStartDate, presetEndDate], label) => {
    onDateChange(presetStartDate, presetEndDate);
    onPresetSelect(label); // Pass selected label back to parent
  };

  const handleStartDateChange = (date) => {
    onDateChange(date, endDate);
    onPresetSelect("Custom"); // Set to "Custom" for manual changes
  };

  const handleEndDateChange = (date) => {
    onDateChange(startDate, date);
    onPresetSelect("Custom"); // Set to "Custom" for manual changes
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
