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
  export const formatDate = (date) => {
    const now = new Date();
    const eventDate = new Date(date);
  
    const diffInDays = Math.floor((now - eventDate) / (1000 * 60 * 60 * 24));
  
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays > 1 && diffInDays <= 5) return `${diffInDays} days ago`;
  
    return eventDate.toLocaleDateString("en-EN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  