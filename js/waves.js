(function () {

  const svg = d3.select('.animation.waves svg');
  const paths = svg.selectAll('path');
  const line = d3.line().curve(d3.curveNatural);

  function init() {
    makeGradientIdsUnique(svg);

    paths.each(function () {
      const d = this.getAttribute('d').replaceAll(',', ' ').replaceAll('L0', 'H0');
      const points = [
        d.split('C')[0].substr(1).split(' ').map(parseFloat),
        ...d.split('C').slice(1).map(a => a.split('H')[0].split(' ')).map(a => a.slice(-2).map(parseFloat)),

      ]
      d3.select(this).datum(points.map(([x, y]) => [x, points[0][1]]));
      d3.select(this).attr('d', line);
      d3.select(this).datum(points);
    });
  }

  function appear() {
    return paths.transition()
      .duration(1000)
      .ease(d3.easeCubicOut)
      .delay((d, i) => i * 150)
      .attr('d', line)
      .end();
  }

  function perpetuate() {
    paths.each(function () {
      const path = d3.select(this);
      const originalPoints = path.datum().concat();
      const pulse = () => {
        const points = originalPoints.map(([x, y], i) => [x, i === 0 || i === (path.datum().length - 1) ? y : y * getRandomArbitrary(0.8, 1)]);
        path.datum(points)
          .transition()
          .ease(d3.easeSin)
          .duration(getRandomArbitrary(1000, 2000))
          .attr('d', line)
          .on('end', pulse)
      }
      pulse();
    })
  }

  init();
  runOnScrollIn(svg.node(), () => appear().then(perpetuate));

})();
