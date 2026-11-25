// CSV parsing layer. Turns a File into headers + rows, using Papa Parse.
// This file has no DOM access: it only reads the file and returns data.

const MAX_FILE_SIZE_MB = 10;

/**
 * Read a CSV file and resolve with its headers, rows, delimiter and warnings.
 * @param {File} file - The file chosen by the user.
 * @returns {Promise<{headers: string[], rows: string[][], delimiter: string, errors: Array}>}
 */
function parseCsvFile(file) {
  return new Promise(function (resolve, reject) {
    // Fail early, before asking Papa Parse to read anything.
    if (typeof Papa === "undefined") {
      reject(new Error("The CSV library failed to load."));
      return;
    }

    if (file.size === 0) {
      reject(new Error("This file is empty."));
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      reject(new Error("This file is too large. The maximum size is " + MAX_FILE_SIZE_MB + " MB."));
      return;
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      reject(new Error("Please choose a .csv file."));
      return;
    }

    Papa.parse(file, {
      delimiter: "", // Let Papa Parse detect the delimiter.
      skipEmptyLines: true,
      encoding: "UTF-8",
      complete: function (results) {
        if (results.data.length === 0) {
          reject(new Error("This file has no data."));
          return;
        }

        resolve({
          headers: results.data[0],
          rows: results.data.slice(1),
          delimiter: results.meta.delimiter,
          errors: results.errors,
        });
      },
      error: function () {
        reject(new Error("The file could not be read."));
      },
    });
  });
}