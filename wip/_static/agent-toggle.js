document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("agent-switch");

  // Restore state
  const enabled = localStorage.getItem("agent-mode") === "true";
  document.body.classList.toggle("agent-enabled", enabled);
  if (checkbox) checkbox.checked = enabled;

  // Toggle handler
  checkbox?.addEventListener("change", () => {
    document.body.classList.toggle("agent-enabled", checkbox.checked);
    localStorage.setItem("agent-mode", checkbox.checked);
  });
});