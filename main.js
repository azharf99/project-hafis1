let defaultColor = "#808080"
let selectedColor = ""
let isClicked = false
let modeDrawing = "draw"

let editor_container = document.getElementById('container');
let header = document.getElementById('header');
let home = document.getElementById('home');
let editor_button = document.getElementById("editor_button")
let home_button = document.getElementById("home_button")
editor_button.addEventListener("click", function(e){
    editor_container.style.display = "block"
    home.style.display = "none"
    header.style.display = "none"
})
home_button.addEventListener("click", function(e){
    editor_container.style.display = "none"
    home.style.display = "block"
    header.style.display = "flex"
})

document.addEventListener("mousedown", function(event){
    isClicked = true
})

document.addEventListener("mouseup", function(event){
    isClicked = false
})


let modeElement = document.querySelector(".mode")

let colorSelector = document.querySelector(".color")
colorSelector.addEventListener("change", function(e){
    selectedColor = colorSelector.value
    modeDrawing = "draw"
})

colorSelector.addEventListener("click", function(e){
    modeDrawing = "draw"
    modeElement.innerHTML = "Mode DRAW"
})


let eraserSelector = document.querySelector(".eraser")
eraserSelector.addEventListener("click", function(e){
    modeDrawing = "eraser"
    modeElement.innerHTML = "Mode ERASER"
    selectedColor = defaultColor
    console.log(modeDrawing)
    console.log(selectedColor)
})

if (!selectedColor){
    selectedColor = defaultColor
}

let grids = document.querySelector("#grids")
for (let i=1; i <= 450; i++){
    let grid = document.createElement("div")
    grid.classList.add("grid")
    grid.setAttribute("id", `grid${i}`)
    grids.appendChild(grid)
}




let kumpulanGrid = document.querySelectorAll(".grid")
for (let grid of kumpulanGrid){
    grid.addEventListener("click", function(e){
        if (modeDrawing === "draw"){
            grid.style.backgroundColor = selectedColor;
        }
        else{
            grid.style.backgroundColor = defaultColor;
        }
    });
    grid.addEventListener("mouseover", (event) => {
        if (isClicked){
            if (modeDrawing === "draw"){
                grid.style.backgroundColor = selectedColor;
            }
            else{
                grid.style.backgroundColor = defaultColor;
            }
        }
    });
}

setInterval(function(e){
    result = ""
    for (let grid of kumpulanGrid){
        if (grid.style.backgroundColor === ""){
            grid.style.backgroundColor = defaultColor
        }
        result += `${grid.id}:${grid.style.backgroundColor.toString()}+`
    }
    localStorage.setItem("dataku", result)
}, 2000)

let data_grids = localStorage.getItem("dataku").split("+")
for (data of data_grids){
    [grid_id, color] = data.split(":")
    if (grid_id !== ""){
        let grid_data = document.getElementById(grid_id)
        grid_data.style.backgroundColor = color
    }
}

let save = document.getElementById('save');

save.addEventListener("click", function(e){
    let node = document.getElementById('container');

    domtoimage.toJpeg(node, { quality: 1 })
        .then(function (dataUrl) {
            let link = document.createElement("a")
            link.download = "result.jpg"
            link.href = dataUrl
            link.click()
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });

})
