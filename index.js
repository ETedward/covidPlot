async function drawLineChart(){
    const dataset = await d3.csv("./njdata.csv")
    //console.table(dataset[0])
    const yAccessor = d=>d.hospitalizedCurrently
    const dateParsor = d3.timeParse("%m/%d/%y")
    const xAccessor = d=> dateParsor(d.date)

    // dimensions for wrapper
    let dimensions = {
        width: window.innerWidth * 0.75,
        height: 500,
        margin:{
            top: 30,
            right: 15,
            bottom: 40,
            left: 60,
        },
    }

    // computer size of bounds
    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

    const wrapper = d3.select("#wrapper")
        .append("svg")
        .attr("width",dimensions.width)
        .attr("height",dimensions.height)
    //console.log(svg)

    const bounds = wrapper.append("g")
        .style("transform", 
        `translate(${
            dimensions.margin.left
        }px, ${
            dimensions.margin.top
        }px)`)

    const yScale = d3.scaleLinear()
        .domain([0,8200])
        .range([dimensions.boundedHeight,0])
    
    const xScale = d3.scaleTime()
        .domain(d3.extent(dataset, xAccessor))
        .range([0, dimensions.boundedWidth])
        
    //console.log(yScale(32))
    const freezingTemperaturePlacement = yScale(32)
    const freezingTemperatures = bounds.append("rect")
    .attr("x", 0)
    .attr("width", dimensions.boundedWidth)
    .attr("y", dimensions.boundedHeight - 106)
    .attr("height", 106)
    .attr("fill", "#fc9070")

    // bounds.append("path").attr("d", "M 0 0 L 100 0 L 100 100 Z")
    // }
    
    const lineGenerator = d3.line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)))

    // Drawing the line

    const line = bounds.append("path")
        .attr("d", lineGenerator(dataset))  
        .attr("fill", "none")
        .attr("stroke", "#af9358")
        .attr("stroke-width", 2)

    const yAxis = bounds.append("g")
        .call(d3.axisLeft().scale(yScale))
        
    const xAxis = bounds.append("g")
        .call(d3.axisBottom().scale(xScale))
        .style("transform", `translateY(${
            dimensions.boundedHeight
          }px)`)

    console.log(yScale)
    console.log(xScale)
}
drawLineChart()