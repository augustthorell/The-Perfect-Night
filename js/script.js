let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');

function toggleNavBar() {
    mainNav.classList.toggle('active');
    navBarToggle.classList.toggle('opened');
}

navBarToggle.addEventListener('click', toggleNavBar);