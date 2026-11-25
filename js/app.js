// CSV Cleaner — interface wiring (no cleaning logic yet).

// The six interface states. Each one matches a section id "state-" + name.
const STATE_NAMES = ["initial", "selected", "preview", "processing", "results", "error"];

// Show only the requested state and hide the other five.
function showState(name) {
  STATE_NAMES.forEach(function (stateName) {
    const section = document.getElementById("state-" + stateName);
    section.hidden = stateName !== name;
  });
}

// TEMPORARY: read the hash to preview states, e.g. index.html#results.
// This will be removed in the integration phase.
function showStateFromHash() {
  const name = window.location.hash.slice(1);

  if (STATE_NAMES.indexOf(name) !== -1) {
    showState(name);
  } else {
    // Empty or unknown hash: always fall back to the initial state,
    // so the six sections are never hidden at the same time.
    showState("initial");
  }
}

showStateFromHash();
window.addEventListener("hashchange", showStateFromHash);

// ---------------------------------------------------------------------------
// File selection and preview (no cleaning logic yet)
// ---------------------------------------------------------------------------

// How many data rows we show in the preview table.
const PREVIEW_ROW_COUNT = 5;

// Turn a number of bytes into a readable size: "120 B", "4.2 KB" or "3.1 MB".
function formatFileSize(bytes) {
  if (bytes < 1024) {
    return bytes + " B";
  }

  const kilobytes = bytes / 1024;

  if (kilobytes < 1024) {
    return kilobytes.toFixed(1) + " KB";
  }

  return (kilobytes / 1024).toFixed(1) + " MB";
}

// Fill a table with the headers and the first rows only.
function buildPreviewTable(table, headers, rows) {
  table.replaceChildren();

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headers.forEach(function (header) {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);

  const tbody = document.createElement("tbody");

  rows.slice(0, PREVIEW_ROW_COUNT).forEach(function (row) {
    const tableRow = document.createElement("tr");

    // Paint only the cells the row has: no filling, no trimming.
    row.forEach(function (cell) {
      const td = document.createElement("td");
      td.textContent = cell;
      tableRow.appendChild(td);
    });

    tbody.appendChild(tableRow);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
}

const fileInput = document.getElementById("file-input");

fileInput.addEventListener("change", function () {
  if (fileInput.files.length === 0) {
    return;
  }

  const file = fileInput.files[0];

  // Empty the input so choosing the same file again fires "change".
  fileInput.value = "";

  parseCsvFile(file)
    .then(function (result) {
      document.getElementById("file-name").textContent = file.name;
      document.getElementById("file-size").textContent = formatFileSize(file.size);
      buildPreviewTable(
        document.querySelector("#state-preview table"),
        result.headers,
        result.rows
      );
      showState("preview");
    })
    .catch(function (error) {
      document.getElementById("error-message").textContent = error.message;
      showState("error");
    });
});