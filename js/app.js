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