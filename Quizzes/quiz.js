
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
class AppletGallery {

  constructor(dataUrl) {
      this.dataUrl = dataUrl;
      this.appletgallery = [];
      this.init();
  }

  async init() {
      await this.fetchData();
      this.renderAppletGallery(this.appletgallery); 
      this.bindSearchEvent();
  }
  async fetchData() {
      try {
          const response = await fetch(this.dataUrl);
          this.appletgallery = await response.json();
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }

  renderAppletGallery(appletgallery) {
      const appletgalleryCont = document.getElementById('appletgalleryCont');
      appletgalleryCont.innerHTML = appletgallery.map(applet => 
          `<div class="card" style="width: 18rem;"> 
             <img src = "${applet.Image}" class="card-img-top image" alt="${applet.Applet_No}">
                  <h5 style="color: white; margin-top:10px; font-family: 'Poppins', sans-serif;"> ${applet.Name} </h5>
                  <p> ${applet.Description}</p>
                  <a href = "${applet.file}" class = "btn btn-primary" style="margin: auto; margin-bottom: 1rem; magin-top: 1rem;"> Take A Quiz </a>  
          </div>`
      ).join('');
  }
}
const appletgallery = new AppletGallery('quiz.json');