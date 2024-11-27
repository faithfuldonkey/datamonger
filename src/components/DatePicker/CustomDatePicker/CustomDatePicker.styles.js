import styled from "styled-components";

export const StyledDatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin: 1rem auto;
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.5rem;
  }
`;



export const DateRangeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem; /* Adds space between the elements */
  margin-bottom: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack elements on smaller screens */
    gap: 0.5rem;
  }

  .react-datepicker-wrapper {
    flex: 1; /* Ensures date pickers take equal space */
    min-width: 150px; /* Prevents shrinking below a readable width */
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 0.9rem;
  }
`;



export const DatePresetButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: #f0f0f0;
  color: #333;
  font-size: 0.85rem;
  font-family: "Inter", sans-serif;
  font-weight: bold;
  border: 1px solid #ccc;
  margin: 0 0.5rem 0.5rem 0; /* Add spacing around buttons */
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #e0e0e0;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;


