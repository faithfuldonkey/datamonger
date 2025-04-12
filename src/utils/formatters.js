// Format date into MM/DD/YYYY
export const formatToMMDDYYYY = (dateObj) => {
  const month = dateObj.getMonth() + 1; // JavaScript months are 0-based
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  return `${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}/${year}`;
};

// Sort events by date
export const sortEvents = (events, sortNewestFirst) =>
  [...events].sort((a, b) => {
    const dateA = new Date(a.start.dateTime || a.start.date);
    const dateB = new Date(b.start.dateTime || b.start.date);
    return sortNewestFirst ? dateB - dateA : dateA - dateB;
  });

// Format event date
export const formatDate = (date, style = "long") => {
  const now = new Date();
  const eventDate = new Date(date);

  const diffInDays = Math.floor((now - eventDate) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";

  const sameYear = now.getFullYear() === eventDate.getFullYear();

  const options =
    style === "short"
      ? {
          day: "numeric",
          month: "short",
          ...(sameYear ? {} : { year: "numeric" }),
        }
      : {
          day: "numeric",
          month: "long",
          year: "numeric",
        };

  return eventDate.toLocaleDateString("en-EN", options);
};

export const formatTimeDifference = (timeDifferenceInMs) => {
  const seconds = Math.floor(timeDifferenceInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30); // Approximation: 30 days in a month
  const years = Math.floor(days / 365); // Approximation: 365 days in a year

  // Helper function to return singular or plural
  const formatUnit = (value, unit) =>
    `${value} ${unit}${value === 1 ? "" : "s"}`;

  if (seconds < 60) return formatUnit(seconds, "second");
  if (minutes < 60) return formatUnit(minutes, "minute");

  // Display hours if less than 48 hours
  if (hours < 48) return formatUnit(hours, "hour");

  if (days < 7) return formatUnit(days, "day");
  if (weeks < 4) return formatUnit(weeks, "week");
  if (months < 12) return formatUnit(months, "month");
  return formatUnit(years, "year");
};

export const getTimeDifferenceFormats = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const formats = [];

  if (years >= 1) formats.push(`${years} year${years !== 1 ? "s" : ""}`);
  if (months >= 1) formats.push(`${months} month${months !== 1 ? "s" : ""}`);
  if (weeks >= 1) formats.push(`${weeks} week${weeks !== 1 ? "s" : ""}`);
  if (days >= 1) formats.push(`${days} day${days !== 1 ? "s" : ""}`);
  if (hours >= 1) formats.push(`${hours} hour${hours !== 1 ? "s" : ""}`);

  return formats.length > 0 ? formats : ["< 1 hour"];
};