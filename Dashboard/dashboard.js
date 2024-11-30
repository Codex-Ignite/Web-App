const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const content = document.querySelector('.content');

// Toggle sidebar visibility and hide/show burger button
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  content.classList.toggle('active');

  // Hide the toggle button when the sidebar is active
  if (sidebar.classList.contains('active')) {
    toggleBtn.style.display = 'none';
  } else {
    toggleBtn.style.display = 'block';
  }

  // Update aria attributes for accessibility
  const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
  toggleBtn.setAttribute('aria-expanded', !expanded);
  sidebar.setAttribute('aria-hidden', expanded);
});

// Hide the sidebar if you click outside of it
document.addEventListener('click', (event) => {
  // Check if the click is outside the sidebar and the toggle button
  if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
    // Remove the 'active' class from the sidebar
    sidebar.classList.remove('active');
    content.classList.remove('active');

    // Show the burger button
    toggleBtn.style.display = 'block';

    // Update aria attributes for accessibility
    toggleBtn.setAttribute('aria-expanded', false);
    sidebar.setAttribute('aria-hidden', true);
  }
});
