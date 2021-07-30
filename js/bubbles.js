(function() {

  const svg = d3.select('.animation.bubbles svg');
  const paths = svg.selectAll('path');

  function init() {
    makeGradientIdsUnique(svg);
    paths.attr('transform', (d,i,nodes) => scaleCenter(nodes[i], 0));
  }

  function appear() {
    return paths
      .transition()
      .duration(300)
      .delay((d,i) => 150*(2-i))
      .attr('transform', (d,i,nodes) => scaleCenter(nodes[i], 1))
      .end();
  }

  function perpetuate() {
    pulse(svg.selectAll('path'), 0.7)
  }

  init();
  runOnScrollIn(svg.node(), () => appear().then(perpetuate));
})();
