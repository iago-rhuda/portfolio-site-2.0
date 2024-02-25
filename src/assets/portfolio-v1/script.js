/* Abre e fecha menu lateral em modo mobile */

const menuMobile = document.querySelector(".menu-mobile");
const body = document.querySelector("body");

menuMobile.addEventListener("click", () => {
  menuMobile.classList.contains("bi-list-nested")
    ? menuMobile.classList.replace("bi-list-nested", "bi-x")
    : menuMobile.classList.replace("bi-x", "bi-list-nested");
  body.classList.toggle("menu-nav-active");
});

/* Fecha o menu quando clicar em algum item e muda o icone para list */

const navItem = document.querySelectorAll(".nav-item");

navItem.forEach((item) => {
  item.addEventListener("click", () => {
    if (body.classList.contains("menu-nav-active")) {
      body.classList.remove("menu-nav-active");
      menuMobile.classList.replace("bi-x", "bi-list-nested");
    }
  });
});

// Animar todos os itens na tela que tiverem meu atributo data-anime

const item = document.querySelectorAll("[data-anime]");
const animeScroll = () => {
  const windowTop = window.pageYOffset + window.innerHeight * 0.85 ;
  item.forEach((element) => {
    if (windowTop > element.offsetTop) {
      element.classList.add("animate");
    } else {
      element.classList.remove("animate");
    }
  });
};
animeScroll();
window.addEventListener("scroll", ()=>{
  animeScroll();
})


// Calculando idade atual
function idade() {
  var d = new Date,
      ano_atual = d.getFullYear(),
      mes_atual = d.getMonth() + 1,
      dia_atual = d.getDate(),
      ano_aniversario = 2003,
      mes_aniversario = 2,
      dia_aniversario = 7,
      quantos_anos = ano_atual - ano_aniversario;
  if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
      quantos_anos--;
  }
  return quantos_anos < 0 ? 0 : quantos_anos;
}
var mostrar_idade = idade();
console.log(mostrar_idade);
document.getElementById("idade").innerHTML = mostrar_idade + " anos";