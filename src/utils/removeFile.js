import fs from 'fs'
import path from "path"


export function removeFileFromFolder(folderPath, fileName) {
  // Construct the full path to the file
  const filePath = path.join(folderPath, fileName);

  // Check if the file exists before trying to delete it
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File ${fileName} does not exist in folder ${folderPath}`);
      return;
    }

    // Remove the file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error removing file ${fileName}:`, err);
        return;
      }
      console.log(`File ${fileName} removed successfully from ${folderPath}`);
    });
  });
}


export function removeFilesFromFolder(folderPath, fileNames) {
  if (!Array.isArray(fileNames) || fileNames.length === 0) {
    console.log("No files to remove.");
    return;
  }
  if (typeof folderPath !== 'string' || folderPath.trim() === '') {
    return;
  }
  fileNames.forEach((fileName) => {
    if (typeof fileName !== 'string' || fileName.trim() === '') {
      console.error(`Invalid file name: ${fileName}. Skipping removal.`);
      return;
    }
    const filePath = path.join(folderPath, fileName);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(`File ${fileName} does NOT exist in folder ${folderPath}`);
      } else {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error removing file ${fileName}:`, err);
            return;
          }
          console.log(`File ${fileName} removed successfully from ${folderPath}`);
        });
      }
    });
  });
}

