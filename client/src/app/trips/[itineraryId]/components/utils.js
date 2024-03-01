export const sortActivities = (activities) => {
  return activities.reduce((acc, activity) => {
    const activityDate = activity.start.toDateString();
    if (!acc[activityDate]) {
      acc[activityDate] = [];
    }
    acc[activityDate].push(activity);
    return acc;
  }, {});
};

export const formatTime = (date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
};
