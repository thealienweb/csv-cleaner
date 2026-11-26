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
        // An unterminated quoted value breaks the row: fail with a clear message.
        const missingQuote = results.errors.find(function (error) {
          return error.code === "MissingQuotes";
        });

        if (missingQuote) {
          if (typeof missingQuote.row === "number") {
            reject(new Error(
              "A quoted value near row " + (missingQuote.row + 1) + " is never closed. Please fix the file and try again."
            ));
          } else {
            reject(new Error("A quoted value in the file is never closed. Please fix the file and try again."));
          }
          return;
        }

        if (results.data.length === 0) {
          reject(new Error("This file has no data."));
          return;
        }

        // Copy the header row and remove a possible BOM from the first cell.
        const headers = results.data[0].slice();

        if (typeof headers[0] === "string") {
          headers[0] = headers[0].replace(/^\uFEFF/, "");
        }

        resolve({
          headers: headers,
          rows: results.data.slice(1),
          delimiter: results.meta.delimiter || ",",
          errors: results.errors,
        });
      },
      error: function () {
        reject(new Error("The file could not be read."));
      },
    });
  });
}