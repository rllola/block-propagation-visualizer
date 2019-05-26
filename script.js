const numbersOfNodes = 3
const squareLength = 100
const connections = 2

var nodeArray = []
var connectionArray = []

var gridElement = document.getElementById("grid")

var horizontalLines = Math.round(gridElement.clientHeight / squareLength)

for (var i = 1; i < horizontalLines; i++) {
  let divElement = document.createElement("div")
  divElement.style = "top: " + i*squareLength + "px; width: 100%; position: absolute; border: 1px solid LightGrey;"
  gridElement.appendChild(divElement)
}

var verticalLines = Math.round(gridElement.clientWidth / squareLength)

for (var i = 1; i < verticalLines; i++) {
  let divElement = document.createElement("div")
  divElement.style = "left: " + i*squareLength + "px; width: 0px; height: 100%; position: absolute; border: 1px solid LightGrey;"
  gridElement.appendChild(divElement)
}

for (var node = 0; node < numbersOfNodes; node++) {
  let coordonate = {x: 0, y: 0}
  coordonate.x = Math.round(Math.random()*gridElement.clientWidth / squareLength) % Math.floor(gridElement.clientWidth / squareLength)
  coordonate.y = Math.round(Math.random()*gridElement.clientHeight / squareLength) % Math.floor(gridElement.clientHeight / squareLength)
  nodeArray.push(coordonate)
  let divElement = document.createElement("div")
  divElement.style = "left: " + (coordonate.x*squareLength - 11) + "px; top:" + (coordonate.y*squareLength - 11) + "px; width: 8px; height: 8px; position: absolute; border: 8px solid black; border-radius: 50%; background-color: black; box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.5)"
  gridElement.appendChild(divElement)
}

var svgElement = document.createElementNS("http://www.w3.org/2000/svg","svg")
for (var c = 0; c < connections; c++) {
  let indexNode1 = Math.floor(Math.random()*numbersOfNodes)
  let indexNode2 = indexNode1

  while (indexNode2 === indexNode1) {
    indexNode2 = Math.floor(Math.random()*(numbersOfNodes))

    if (indexNode1 !== indexNode2) {
      /* Verify if connection already exist */
      connectionArray.map((connection) => {
        if ((nodeArray[indexNode1] === connection[0] || nodeArray[indexNode1] === connection[1]) && (nodeArray[indexNode2] === connection[0] || nodeArray[indexNode2] === connection[1])) {
          console.log('Need to regenerate a new connection')
          indexNode2 = indexNode1
          return
        }
      })
    }

  }

  connectionArray.push([nodeArray[indexNode1], nodeArray[indexNode2]])
  console.log(connectionArray)

  console.log('A connection between (' + nodeArray[indexNode1].x + ',' + nodeArray[indexNode1].y + ') and (' + nodeArray[indexNode2].x + ',' + nodeArray[indexNode2].y + ') will be drawn')

  let lineElement = document.createElementNS("http://www.w3.org/2000/svg", "line")
  lineElement.setAttribute('x1', nodeArray[indexNode1].x*squareLength+2)
  lineElement.setAttribute('x2', nodeArray[indexNode2].x*squareLength+2)
  lineElement.setAttribute('y1', nodeArray[indexNode1].y*squareLength+2)
  lineElement.setAttribute('y2', nodeArray[indexNode2].y*squareLength+2)
  lineElement.style = "stroke:black;stroke-width:4;"
  svgElement.appendChild(lineElement)
  console.log(lineElement)
}

svgElement.style = "width: 100%; height: 100%; position: absolute; z-index:999; margin: -2px;"
gridElement.appendChild(svgElement)

/* A node find a block */
let nodeWinnerIndex = Math.floor(Math.random()*numbersOfNodes)
let svgBlock = document.createElementNS("http://www.w3.org/2000/svg","svg")
svgBlock.style = "width: 100%; height: 100%; position: absolute; z-index:9999;"
let circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle")
/* <circle cx="5" cy="5" r="10" fill="red" /> */
circleElement.setAttribute("cx", nodeArray[nodeWinnerIndex].x*squareLength+1)
circleElement.setAttribute("cy", nodeArray[nodeWinnerIndex].y*squareLength+1)
circleElement.setAttribute("r", 10)
circleElement.setAttribute("fill", "red")
svgBlock.appendChild(circleElement)
gridElement.appendChild(svgBlock)


/* Move to connected node */
let startTime = 0;
const totalTime = 5000; // 1000ms = 1s
const animateStep = (timestamp) => {
  if (!startTime) {
    startTime = timestamp
  }
  const progress = (timestamp - startTime) / totalTime

  circleElement.setAttribute("transform", "translate("+(nodeArray[(nodeWinnerIndex+1)%3].x-nodeArray[nodeWinnerIndex].x)*100*progress +", "+ (nodeArray[(nodeWinnerIndex+1)%3].y-nodeArray[nodeWinnerIndex].y)*100*progress +")")
  if (progress < 1) {
    window.requestAnimationFrame(animateStep)
  }
}
window.requestAnimationFrame(animateStep)
