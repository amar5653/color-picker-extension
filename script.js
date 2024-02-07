const colorPickerBtn = document.querySelector(".btn");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");
const allColors = document.querySelector(".all-colors");
const clearBtn = document.querySelector(".clear-btn");

const clearData = () => {
    localStorage.clear();
}

const showColors = () => {
  const liTag = pickedColors
    .map((color) => 
      `<li class="color">
       <span class="rect">
       </span>
       <span class="value">${color}</span>
   </li>`
    )
    .join("");

  console.log(liTag);

 allColors.innerHTML = liTag;
 
};


const activateEyeDropper = async () => {
  try {
    //open eye dropper and getting the selected color
    const eyeDropper = new EyeDropper();
    const { sRGBHex } = await eyeDropper.open();

    navigator.clipboard.writeText(sRGBHex);

    pickedColors.push(sRGBHex);

    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));

    showColors();
  } catch (error) {
    console.log(error);
  }
};

colorPickerBtn.addEventListener("click", activateEyeDropper);
clearBtn.addEventListener("click", clearData());
