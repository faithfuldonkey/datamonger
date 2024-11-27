import styled from "styled-components";

export const StyledDatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 1rem;
  background: #ffffff;
  border-radius: 8px;
  max-width: 600px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.5rem;
  }
`;

export const DateRangeContainer = styled.div`
  display: flex;
  flex-direction: row; /* Align date pickers and separator horizontally */
  align-items: center; /* Center vertically */
  justify-content: space-between; /* Even spacing between items */

  /* Ensure the container does not allow children to grow indefinitely */
  width: 100%;

  .react-datepicker-wrapper {
    flex: 1 0 0; /* Ensure date pickers take equal space and shrink if needed */
    min-width: 100px; /* Prevent shrinking below a readable width */
    max-width: 200px; /* Prevent the date pickers from growing too large */
    box-sizing: border-box; /* Ensure padding/borders don't break layout */
  }

  .date-separator {
    font-size: 1.5rem;
    color: #333; /* Optional: color for the em dash */
    margin: 0 0.5rem;
    flex-shrink: 0; /* Ensure the dash doesn’t shrink */
  }

  input {
    width: 100%; /* Fill available space within the wrapper */
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 0.9rem;
    box-sizing: border-box; /* Include padding/borders in width */
  }
`;


export const DatePresetButton = styled.button`
  flex: 1; /* Equal width for all buttons */
  max-width: 150px; /* Optional: cap the button width */
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: #f0f0f0;
  color: #333;
  font-size: 0.85rem;
  font-family: "Inter", sans-serif;
  font-weight: bold;
  border: 1px solid #ccc;
  cursor: pointer;
  text-align: center; /* Ensure text stays centered */
  transition: background 0.3s;

  &:hover {
    background: #e0e0e0;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;


export const DatePresetsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap; /* Keep buttons on the same row */
  gap: 0.5rem; /* Even spacing between buttons */
  width: 100%; /* Ensure the container spans the full width */
  justify-content: space-between; /* Spread buttons evenly across the row */

  @media (max-width: 768px) {
    flex-wrap: wrap; /* Allow wrapping on smaller screens */
    justify-content: center; /* Center buttons when wrapped */
  }
`;

