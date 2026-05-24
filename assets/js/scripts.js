const body = document.body;
const menuTrigger = document.querySelector("#toggle-main-menu-mobile");
const menuContainer = document.querySelector("#main-menu-mobile");

const openMenu = () => {
  menuContainer.classList.add("open");
  menuTrigger.classList.add("is-active");
  body.classList.add("lock-scroll");
};

const closeMenu = () => {
  menuContainer.classList.remove("open");
  menuTrigger.classList.remove("is-active");
  body.classList.remove("lock-scroll");
};

menuTrigger.addEventListener("click", () =>
  menuContainer.classList.contains("open") ? closeMenu() : openMenu()
);

menuContainer.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", closeMenu)
);

const header = document.getElementById("stickyHeader");
if (header) {
  const offset = header.offsetTop;

  const updateScrollPadding = () => {
    document.documentElement.style.scrollPaddingTop = `${header.offsetHeight}px`;
  };

  updateScrollPadding();
  window.addEventListener("resize", updateScrollPadding);

  document.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > offset);
  });
}
