import React from "react";
import DatePicker from "react-datepicker";
import {
  StyledDatePickerContainer,
  DatePresetButton,
  DateRangeContainer,
} from "./CustomDatePicker.styles";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ startDate, endDate, onDateChange }) => {
    const presets = [
      {
        label: "Last 7 Days",
        value: [
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          new Date(), // Today
        ],
      },
      {
        label: "Last 30 Days",
        value: [
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
          new Date(), // Today
        ],
      },
      {
        label: "Last 365 Days",
        value: [
          new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // 365 days ago
          new Date(), // Today
        ],
      },
    ];
    const handlePresetSelect = ([presetStartDate, presetEndDate]) => {
        onDateChange(presetStartDate, presetEndDate);
      };
    
      const handleStartDateChange = (date) => {
        onDateChange(date, endDate);
      };
    
      const handleEndDateChange = (date) => {
        onDateChange(startDate, date);
      };
    
      return (
        <StyledDatePickerContainer>
          <DateRangeContainer>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="MM/dd/yyyy"
            />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="MM/dd/yyyy"
            />
          </DateRangeContainer>
          <div>
            {presets.map((preset) => (
              <DatePresetButton
                key={preset.label}
                onClick={() => handlePresetSelect(preset.value)}
              >
                {preset.label}
              </DatePresetButton>
            ))}
          </div>
        </StyledDatePickerContainer>
      );
    };
    
    export default CustomDatePicker;