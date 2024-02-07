const colorPickerBtn = document.querySelector(".btn");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");
const allColors = document.querySelector(".all-colors");
const clearBtn = document.querySelector(".clear-btn");



const copyColor = elem => {
  navigator.clipboard.writeText(elem.dataset.color);
  elem.innerText= "Copied";
  setTimeout(() => elem.innerText = elem.dataset.color, 1000);
}

const showColors = () => {

  if(!pickedColors.length) return; //Returning if there are no picked colors

  const liTag = pickedColors
    .map((color) => 
      `<li class="color">
       <span class="rect" style="background: ${color}; border: 1px solid ${color == "#c6d9da" ? "#ccc" : color}" >
       </span>
       <span class="value" data-color="${color}">${color}</span>
   </li>`
    )
    .join("");
     allColors.innerHTML = liTag;

     document.querySelector(".picked-colors").classList.remove("hide");

     // Add a click event listener to each element to copy the color code
     const color = document.querySelectorAll(".color");
     color.forEach(li => {
      li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
     })
 
};
showColors();

const activateEyeDropper = () => {
 document.body.style.display = "none";
 
 setTimeout( async () => {
  try {
    //open eye dropper and getting the selected color
    const eyeDropper = new EyeDropper();
    const { sRGBHex } = await eyeDropper.open();
    navigator.clipboard.writeText(sRGBHex);

    //Adding the colors to the list if it doesn't exist
    if(!pickedColors.includes(sRGBHex)){
    pickedColors.push(sRGBHex);
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    showColors();
    }

  } catch (error) {
    console.log("failed to copy the color code");
  }
}, 10);
  document.body.style.display = "block";
};

//clearing all picked colors, updating local storage, hiding the picked colors element
const clearAllColors = () => {
 pickedColors.length = 0;
 localStorage.setItem("picked-colors",JSON.stringify(pickedColors));
 document.querySelector(".picked-colors").classList.add("hide");
}

colorPickerBtn.addEventListener("click", activateEyeDropper);
clearBtn.addEventListener("click", clearAllColors());
