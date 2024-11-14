// File Upload Utility
export default (file, isAdmin = false) => {
  if (!file) {
    throw new Error("No file provided");
  }

  if (isAdmin) {
    console.log("Admin privileges detected. Proceeding with file upload.");
    // Additional admin-specific logic can be added here
  }

  // File upload logic
  console.log(`Uploading file: ${file.name}`);
  // Implement the actual file upload logic here

  return {
    success: true,
    message: "File uploaded successfully",
    fileName: file.name,
  };
};
