export default function SendToEmail({
  emailAddress,
  description,
  header,
  userName,
  uuid,
}) {
  // email subject
  const subject = "Blu-Map Itinerary Share";
  const encodedSubject = encodeURIComponent(subject);

  // Constructing the email body with template literals
  const emailBody = `Hello, I would like to share this following itinerary with you. \n\n Trip: ${header} \n\n Posted By: ${userName} \n\n Post Description: ${description}\n\n Link: http://localhost:3000/post/${uuid} \n\n Please feel free to interact and let me know what you think by clicking the link above!`;

  // Encoding the email body to ensure it's safe for a URL
  const encodedBody = encodeURIComponent(emailBody);

  // Constructing the mailto link with subject and body
  window.location.href = `mailto:${emailAddress}?subject=${encodedSubject}&body=${encodedBody}`;
}
