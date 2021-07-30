(function() {
  const svg = d3.select('.animation.bubbles svg');
  makeGradientIdsUnique(svg);
  pulse(svg.selectAll('path'), 0.7)
})();
