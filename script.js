const idIndice = "indice";
const idData = "data";
let countIndex = 0;
let countSubIndex = 1;
let imprimir = "";
const pathImg ="img/";
let flag = true;
const pacoTech =`<section class='logo'><img src='img/logo.png' width:'300px' ></section>
<section style="width:max-content; margin:auto;">
<p class='pacotech'>Este libro fue desarrollado por pacoTech.</p>
</section>`;
function loadIndice() {
  fetch("json/indice.json")
    .then((respuesta) => respuesta.json())
    .then((respuesta) => printIndice(respuesta));
}

function loadBloque(path) {
  fetch( path + ".json")
    .then((respuesta) => respuesta.json())
    .then((respuesta) => loadTitulo(respuesta));
}
function loadTitulo(data) {
  imprimir += `<div class="titulos"><h1>${data.titulo}</h1>
            <h2>${data.subtitulo}</h2>
            <h3>${data.moreInfo}</h3></div>`;
            flag = true;
  execute(data);
}

function printIndice(data) {
  let imprimirIndice = `<h3>${data.titulo}</h3> <ol>`;
  data.bloque.forEach((e) => {
    imprimirIndice += `<li class='pointer' onclick="loadBloque('${"json/bloque" + countIndex + "/index"}')">${
      e.titulo
    }</li><ol>`;
    e.subtitlos.forEach((element) => {
      imprimirIndice += `<a class='pointer' target="_blank"><li onclick="loadBloque('${
        "json/bloque" + countIndex + "/bloque" + countSubIndex
      }')">
                ${element}</li></a>`;
      countSubIndexF();
    });
    imprimirIndice += `</ol>`;
    countSubIndex = 1;
    countIndexF();
  });
  imprimirIndice += `</ol>`;
  document.getElementById(idIndice).innerHTML = imprimirIndice;
}
function countIndexF() {
  countIndex++;
}
function countSubIndexF() {
  countSubIndex++;
}

// imprime lista de textos;
function texts(array) {
  array.forEach((e) => {
    imprimir += `<p>${e}</p>`;
  });
}

function listD(object) {
  imprimir += `<h3 class="underline">${object.titulo}</h3><ul>`;
  object.texts.forEach((e) => {
    imprimir += `<li>${e}</li>`;
  });
  imprimir += "</ul>";
}
function listO(object) {
  imprimir += `<h3 class="underline">${object.titulo}</h3><ol>`;
  object.texts.forEach((e) => {
    imprimir += `<li>${e}</li>`;
  });
  imprimir += "</ol>";
}
function comparativeBox2(object) {
  imprimir += `
  <section class="underline" style="width:100%; text-align:center;">
        <h2>${object.titulo}</h2></section>
    <section class="comparativeBox2">`;
  imprimir += `<section class="comparativeBox2Box">
  <h3>${object.box1.titulo}</h3>`;
object.box1.texts.forEach((e) => {
imprimir += `<p>${e}</p>`;
});
imprimir += "</section>";
imprimir += `<section class="comparativeBox2Box">
<h3>${object.box2.titulo}</h3>`;
object.box2.texts.forEach((e) => {
imprimir += `<p>${e}</p>`;
});
imprimir += "</section>";
  imprimir += "</section>";
}

function greenColor(object){
    object.forEach((e) => {
        imprimir += `<p style="color:green">${e}</p>`;
      });
}
function blueColor(object){
    object.forEach((e) => {
        imprimir += `<p style="color:blue">${e}</p>`;
      });
}
function imgText(object){
  object.forEach( e =>{
    imprimir +=`<section style="display:flex; text-aling:center;">
    <img src="${pathImg+e.name+".png"}" class="imgText">
     <p>${e.text}</p>
      </section>
    `
  });
}

function imgText300px(object){
  console.log(object);
  imprimir += `<section class="imgText300px">
  <section style="margin:auto; display:flex;">
  <p style="margin-rigth:5px;">${object.titulo}<br>${object.info}</p>
  <img src="${object.img}">
  </section>
  </section>`;
}

loadIndice();

function execute(data){
  console.log(data);
  impresion();
  for (let index = 0; index < data.bloque.length; index++) {
    selectBloque(data.bloque[index],data.orden[index]);
    impresion();
  }
  imprimir += pacoTech;
  impresion();
}

function selectBloque(bloque,orden){
  console.log(bloque);
  if(orden == "texts"){ texts(bloque);}
  else if(orden == "listD") listD(bloque);
  else if (orden == "listO") listO(bloque);
  else if (orden == "comparativeBox2")  comparativeBox2(bloque);
  else if (orden == "greenColor") greenColor(bloque);
  else if (orden == "blueColor") blueColor(bloque);
  else if (orden == "imgText") imgText(bloque);
  else if (orden == "imgText300px") imgText300px(bloque);
}

function impresion(){
  if(flag){
    document.getElementById("data").innerHTML = "";
    flag = false;
  }
  document.getElementById("data").innerHTML += imprimir;
  imprimir = "";
}
  loadBloque("json/intro") 

















