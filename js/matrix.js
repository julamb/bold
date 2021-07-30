(function () {

  const svg = d3.select('.animation.matrix svg');

  const paths = svg.selectAll('path');

  const getGroupIdx = (i) => { return Math.floor (i/39)}

  function init() {
    makeGradientIdsUnique(svg);
    paths.attr('transform', (d, i, nodes) => scaleCenter(nodes[i], 0))

  }

  function appear() {
    return paths
      .transition()
      .duration(750)
      .delay((d,i) => (2-getGroupIdx(i)) * 150)
      .attr('transform', (d, i, nodes) => scaleCenter(nodes[i], 1))
      .end();
  }

  function perpetuate() {
    const selections = [0, 1, 2].map(groupIdx => paths.filter((d,i) => getGroupIdx(i) === groupIdx));
    selections.forEach(selection => {
      const pulse = () => {
        selection
          .transition()
          .duration(getRandomArbitrary(500, 2000))
          .ease(d3.easeSinInOut)
          .attr('transform', (d,i,nodes) => scaleCenter(nodes[i], getRandomArbitrary(0.5, 1)))
          .on('end', pulse)
      }
      pulse();
    })

  }

  init();
  runOnScrollIn(svg.node(), () => appear().then(perpetuate));
})();
