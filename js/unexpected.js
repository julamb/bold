(function () {

  function init({svg}) {
    const line = svg.select('path')
    const totalLength = line.node().getTotalLength()
    line
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)

    svg.selectAll('path').filter((d,i) => i > 0 && i < 23).attr('transform', function() { return scaleCenter(this, 0); })

  }

  function appear({svg}, reverse) {
    const duration = 2000

    svg.select('path')
      .transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)

    const symbols = svg.selectAll('path').filter((d,i) => i > 0 && i < 23);
    const symbolOrder = [10, 1, 12, 21, 0, 13, 9, 14, 3, 5, 17, 11, 6, 2, 20, 19, 18, 15, 4, 16, 8, 7];
    symbols
      .transition()
      .duration(duration/symbolOrder.length)
      .delay((d,i) => symbolOrder.indexOf(i)*duration/symbolOrder.length)
      .attr('transform', function() { return scaleCenter(this, 1); })
      .end()
      .then(() => pulse({
        selection: svg.selectAll('path').filter((d,i) => i > 0),
        minDuration: 1000,
        maxDuration: 2000,
        minScale: 0.8,
        maxScale: 1.2
      }))
  }

  const svg = d3.select('.animation.unexpected svg')
  init({svg})
  runOnScrollIn(svg.node(), () => appear({svg}))

})();
