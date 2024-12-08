      const logo = document.getElementById('logo');
      const sidebar = document.getElementById('sidebar');
      const content = document.getElementById('content');

      // Toggle sidebar visibility when clicking the logo
      logo.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        content.classList.toggle('active');
      });

      // Close sidebar when clicking anywhere outside
      document.addEventListener('click', function (event) {
        if (!sidebar.contains(event.target) && !logo.contains(event.target)) {
          sidebar.classList.remove('active');
          content.classList.remove('active');
        }
      });
    