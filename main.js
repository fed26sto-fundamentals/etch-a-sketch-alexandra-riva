document.addEventListener("DOMContentLoaded", () => {
    // default values
    let setting = "color";
    let mousedown = false;
  
    // add buttons/container, button event listeners
    const container = document.querySelector("#container");
    const colorBtn = document.querySelector("#color-btn");
    const randomBtn = document.querySelector("#random-btn");
    const darkeningBtn = document.querySelector("#darkening-btn");
    const eraserBtn = document.querySelector("#eraser-btn");
    const resetBtn = document.querySelector("#reset-btn");
    const gridsizeBtn = document.querySelector("#gridsize-btn");
  
    // create the grid
    function creategrid(size) {
      container.innerHTML = "";
      const gridsquaresize = parseFloat(window.getComputedStyle(container).width) / size;
      for (let i = 0; i < size * size; i++){
        const gridsquare = document.createElement("div");
        gridsquare.classList.add("grid-square");
        gridsquare.style.height = `${gridsquaresize}px`;
        gridsquare.style.width = `${gridsquaresize}px`;
        gridsquare.style.backgroundColor = "white";
    
        gridsquare.addEventListener("mousedown", () => {
            mousedown = true;
            changecolor(gridsquare);
          });
      
          gridsquare.addEventListener("mouseover", () => {
            if (mousedown) {
              changecolor(gridsquare);
            }
          });
      
          gridsquare.addEventListener("mouseup", () => {
            mousedown = false;
            changecolor(gridsquare);
          });
      
          container.appendChild(gridsquare);
        }
      }
  
    // event listeners
    colorBtn.addEventListener("click", () => {
      setting = "color";
    });
  
    randomBtn.addEventListener("click", () => {
      setting = "random";
    });
  
    darkeningBtn.addEventListener("click", () => {
      setting = "darkening";
    });
  
    eraserBtn.addEventListener("click", () => {
      setting = "eraser";
    });
  
    resetBtn.addEventListener("click", () => {
      creategrid(16);
    });
  
    gridsizeBtn.addEventListener("click", () => {
      const newSize = parseInt(prompt("Enter a new grid size between 4 and 64: "));
      if (newSize >= 4 && newSize <= 64) {
        creategrid(newSize);
      } else {
        alert("Invalid grid size. Please enter a number between 4 and 64.");
      }
    });
  
    // change color
    function changecolor(gridsquare) {
        switch (setting) {
          case "color":
            gridsquare.style.backgroundColor = "gray";
            break;
          case "random":
            gridsquare.style.backgroundColor = randomcolor();
            break;
          case "darkening":
            gridsquare.style.backgroundColor = darkencolor(gridsquare); // Ensure darkencolor function exists
            break;
          case "eraser":
            gridsquare.style.backgroundColor = "white";
            break;
          default:
            console.log("Unknown setting:", setting); // Optional: Handle unexpected values
        }
      }

    function randomcolor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
     }
          
     function darkencolor(gridsquare) {
        const currentColor = window.getComputedStyle(gridsquare).backgroundColor;
        const rgbValues = currentColor.match(/\d+/g).map(Number);
        let [r, g, b] = rgbValues;
        r = Math.max(r - 25, 0);
        g = Math.max(g - 25, 0);
        b = Math.max(b - 25, 0);
        return `rgb(${r}, ${g}, ${b})`;
      }      
  
    // initialize
    creategrid(16);
  });  