(function () {

  const defaultOptions = {
    duration: 500,
    scaleFactor: 0.2,
    delay: 25,
    ease: d3.easeCubic
  }

  function headAppear({svg, duration, delay, scaleFactor, delayReversed, ease}, reverse) {
    svg.selectAll('path')
      .transition()
      .ease(ease)
      .duration(duration)
      .delay((d, i) => delay * (reverse === delayReversed ? (4 - i) : i))
      .attr('transform', ((d, i) => `translate(147, 194) scale(${reverse ? 1 : 1 - scaleFactor * i}) translate(-147, -194)`))
      .end().then(() => headPulse({svg, scaleFactor}))
  }

  function headPulse({svg, duration, delay, scaleFactor, delayReversed, ease}) {
    console.log('pulse')
    svg.selectAll('path')
      .each((_, i, nodes) => {
        const path = d3.select(nodes[i])
        const pulsePath = () => {
          path
            .transition()
            .ease(d3.easeSinInOut)
            .duration(getRandomArbitrary(1000, 2000))
            .attr('transform', `translate(147, 194) scale(${getRandomArbitrary((1 - scaleFactor * i) * 0.85, (1 - scaleFactor * i))}) translate(-147, -194)`)
            .on('end', pulsePath)
        }
        pulsePath();
      })
  }


  const options = {
    ...defaultOptions,
    delay: 50, delayReversed: true,
    svg: d3.select('.animation.head svg')
  }
  runOnScrollIn(options.svg.node(), () => headAppear(options))

})();
