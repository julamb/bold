(function () {
  const svg = d3.select('.animation.matrix svg');
  makeGradientIdsUnique(svg);
  pulse({
    selection: svg.selectAll('path'),
    minDuration: 2000,
    maxDuration: 3000,
    minScale: 0.5,
    maxScale: 1
  })
})();
