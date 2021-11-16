const accordianClicked = document.querySelectorAll(".accordian__question");
const accordianAnswer = document.querySelectorAll(".accordian__answer");
const hamMenu = document.querySelector(".ham__menu");
const hamMenuList = document.querySelector(".ham__menu__items");

accordianClicked.forEach((accordianClicked) => {
  accordianClicked.addEventListener("click", () => {
    accordianClicked.classList.toggle("active");
  });
});

hamMenu.addEventListener("click", () => {
  hamMenuList.classList.toggle("active");
});
