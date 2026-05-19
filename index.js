const bola = document.querySelector(".bola");

document.addEventListener("mousemove", (e) => {

    // posição do mouse
    let x = e.clientX;
    let y = e.clientY;

    // centro da tela
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;

    // diferença
    let rotateY = (x - centerX) / 20;
    let rotateX = -(y - centerY) / 20;

    // aplica rotação
    bola.style.transform =
    `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

});