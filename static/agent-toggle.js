function initAgentToggle() {
  const btn = document.getElementById("agent-toggle-btn");
  if (!btn) return;

  // restore state
  const enabled = localStorage.getItem("agent-mode") === "true";
  document.body.classList.toggle("agent-enabled", enabled);
  btn.classList.toggle("active", enabled);

  btn.addEventListener("click", () => {
    const newState = !document.body.classList.contains("agent-enabled");
    document.body.classList.toggle("agent-enabled", newState);
    localStorage.setItem("agent-mode", newState);
    btn.classList.toggle("active", newState);
  });
}

function markAgentPagesInNav() {

  const links = document.querySelectorAll(".bd-sidebar a");

  const AGENT_PAGES = [
    "saltiniai",
  ];

  links.forEach(link => {
    const href = link.getAttribute("href") || "";
    if (AGENT_PAGES.some(p => href.includes(p))) {
      link.classList.add("agent-only-link");
    }
  });

}

// Run on initial load
document.addEventListener("DOMContentLoaded", initAgentToggle);

// Run again after page navigation 
document.addEventListener("pjax:end", initAgentToggle);

document.addEventListener("DOMContentLoaded", markAgentPagesInNav);
document.addEventListener("pjax:end", markAgentPagesInNav);