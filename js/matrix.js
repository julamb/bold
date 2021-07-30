(function () {
  const svg = d3.select('.animation.matrix svg');
  makeGradientIdsUnique(svg);
  pulse(svg.selectAll('path'), 0.5);
})();
