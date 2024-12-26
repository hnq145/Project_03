// Sử dung JavaScript để copy Navbar

const navPC = document.getElementById("#navbar__list--pc");
const navMobile = document.getElementById("#navbar__list--mobile");

// Sao chép
navMobile.innerHTML = navPC.innerHTML;
