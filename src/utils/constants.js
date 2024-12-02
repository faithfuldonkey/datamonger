export const COLORS = [
    "#F46F5C",
    "#5CABF4",
    "#BE9792",
    "#BC79F1",
    "#F4A55C",
    "#8FD284",
    "#84ADD2",
    "#D284CA",
    "#B4BF70",
    "#5772B8",
  ];
  
  export const getTrackerColor = (tracker, uniqueTitles) => {
    const index = uniqueTitles.indexOf(tracker);
    if (index === -1) return "#CCCCCC";
    return COLORS[index % COLORS.length];
  };
  