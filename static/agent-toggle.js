function initAgentToggle() {
  const checkbox = document.getElementById("agent-switch");

  // Restore state
  const enabled = localStorage.getItem("agent-mode") === "true";
  document.body.classList.toggle("agent-enabled", enabled);

  if (checkbox) {
    checkbox.checked = enabled;

    checkbox.addEventListener("change", () => {
      document.body.classList.toggle("agent-enabled", checkbox.checked);
      localStorage.setItem("agent-mode", checkbox.checked);
    });
  }
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