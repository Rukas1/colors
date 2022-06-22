"use strict";

const container = document.querySelector(".container");
const warning = document.getElementById("alert");
const intersection = document.querySelector(".intersection-watcher");

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0 ; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createRandomItem(nbItem) {
    for (let i = 0 ; i < nbItem ; i++) {
        let color = getRandomColor();
        let item = `<div class="item" style="background-color:${color};">
                        <h4 class="hexa">${color}</h4>
                    </div>`;
        container.insertAdjacentHTML("beforeend", item);
    }
    document.querySelectorAll(".item").forEach(el => {
        el.addEventListener("click", (e) => {
            try {
                navigator.clipboard.writeText(e.target.innerText);
            } catch (e) {
                warning.style.visibility = "visible";
                warning.style.opacity = "1";
            }
        })
    })
}

const handleIntersect = (entries) => {
    if (entries[0].isIntersecting) {
        createRandomItem(50);
    }
};

const options = {
    threshold: 0
}

new IntersectionObserver(handleIntersect, options).observe(intersection);
