export const groupEventsBySummary = (events) => {
  console.log("Events to group:", events);
  return events.reduce((acc, event) => {
    const title = event.summary || "Untitled";
    if (!acc[title]) acc[title] = [];
    acc[title].push(event);
    return acc;
  }, {});
};