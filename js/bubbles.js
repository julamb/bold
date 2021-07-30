(function() {
  const svg = d3.select('.animation.bubbles svg');
  makeGradientIdsUnique(svg);
  pulse({
    selection: svg.selectAll('path'),
    minDuration: 2000,
    maxDuration: 3000,
    minScale: 0.7,
    maxScale: 1
  })
})();
