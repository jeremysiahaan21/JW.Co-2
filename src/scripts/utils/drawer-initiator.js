const DrawerInitiator = {
  init({
    button, drawer, content, drawerListElement, drawerNavBar,
  }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawerNavBar);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawerNavBar);
    });

    window.addEventListener('resize', () => {
      const { innerWidth } = window;
      const { scrollY } = window;
      this._navBackgroundStyle(innerWidth, scrollY, drawer, drawerListElement);
    });
    window.addEventListener('scroll', () => {
      const { innerWidth } = window;
      const { scrollY } = window;
      this._navBackgroundStyle(innerWidth, scrollY, drawer, drawerListElement);
    });
  },

  _toggleDrawer(event, drawerNavBar) {
    event.stopPropagation();
    drawerNavBar.classList.toggle('open');
  },

  _closeDrawer(event, drawerNavBar) {
    event.stopPropagation();
    drawerNavBar.classList.remove('open');
  },

  _navBackgroundStyle(viewportWidth, viewportScrollY, drawer, drawerListElement) {
    if (viewportWidth < 500 || viewportScrollY !== 0) {
      drawer.style.position = 'fixed';
      drawer.style.backgroundColor = 'white';
      drawer.style.transition = '0.5s';
      drawer.style.color = 'black';
      drawer.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)';
      drawerListElement.forEach((element) => {
        element.style.color = 'black';
      });
    } else {
      drawer.style.position = 'absolute';
      drawer.style.backgroundColor = 'transparent';
      drawer.style.color = 'white';
      drawer.style.transition = '0.3s';
      drawer.style.boxShadow = '';
      drawerListElement.forEach((element) => {
        element.style.color = 'white';
      });
    }
  },
};

export default DrawerInitiator;
