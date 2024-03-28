import { useState } from 'react';

export function useReportLogic(user, userName) {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  const [reportType, setReportType] = useState('');

  const openReportDialog = () => setIsReportOpen(true);
  const closeReportDialog = () => setIsReportOpen(false);

  const handleReportSubmit = async (event) => {
    event.preventDefault();
  
    const reportResponse = await fetch(`/api/reports`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reporterUserID: user?.sub,
        reportedUserName: userName,
        header,
        description,
        reportType,
      }),
    });

    if (reportResponse.ok) {
      setHeader("");
      setDescription("");
      setReportType("");
      setIsReportOpen(false);
      alert("The report was successfully submitted");
    } else {
      console.error("Error submitting report");
      alert("There was an error, try again later");
    }
  };

  return {
    isReportOpen,
    header,
    description,
    reportType,
    setHeader,
    setDescription,
    setReportType,
    openReportDialog,
    closeReportDialog,
    handleReportSubmit,
  };
}
