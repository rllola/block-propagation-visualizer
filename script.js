const numbersOfNodes = 3
const squareLength = 100
const connections = 2

var nodeArray = []

var gridElement = document.getElementById("grid")

/* Test */
var t = document.createElementNS("http://www.w3.org/2000/svg","svg")
t.style= "width:100%; height: 100%; position: absolute;"
var c = document.createElementNS("http://www.w3.org/2000/svg", "line")
c.setAttribute('x1', 0)
c.setAttribute('y1', 200)
c.setAttribute('x2', 200)
c.setAttribute('y2', 0)
c.style.stroke = "#000"

console.log(c.style)

t.appendChild(c)
gridElement.appendChild(t)


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
    indexNode2 = Math.floor(Math.random()*(numbersOfNodes-1))
  }

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

console.log(nodeArray)
