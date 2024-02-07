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

     // Add a click event listener to each element to copy the color code
     const color = document.querySelectorAll(".color");
     color.forEach(li => {
      li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
     })
 
};
showColors();

const activateEyeDropper = async () => {
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
    console.log(error);
  }
};

colorPickerBtn.addEventListener("click", activateEyeDropper);
//clearBtn.addEventListener("click", clearData());
