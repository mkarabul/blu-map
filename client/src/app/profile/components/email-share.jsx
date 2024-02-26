export function sendToEmail(emailAddress) {
  // email subject
  const subject = "Blu-Map Itinerary Share";
  const encodedSubject = encodeURIComponent(subject);

  // email body
  const emailBody =
    "Hello, I would like to share this following itinerary with you.\n \n ";
  const encodedBody = encodeURIComponent(emailBody);

  window.location.href = `mailto:${emailAddress}?subject=${encodedSubject}&body=${encodedBody}`;
}
