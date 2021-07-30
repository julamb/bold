
const $window = $(window);
function isScrolledIntoView($el) {
  return $el.offset().top + $el.height() <= $window.scrollTop() + $window.height();
}

function runOnScrollIn(el, fn) {
  const $el = $(el);
  $window.scroll(function() {
    if (isScrolledIntoView($el)) {
      if (!$el.attr('data-ran-on-scroll-in')) {
        fn()
        $el.attr('data-ran-on-scroll-in', true)
      }
    }
  })
}
function scaleCenter(el, scale) {
  const bbox = el.getBBox();
  const centerX = bbox.x + bbox.width / 2;
  const centerY = bbox.y + bbox.height / 2;
  return `translate(${(1 - scale) * centerX}, ${(1 - scale) * centerY}) scale(${scale})`
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function pulse(selection, minScale = 0.8, maxScale = 1, minDuration = 2000, maxDuration = 3000) {

  selection.each((_,i,nodes) => {
    const node = d3.select(nodes[i]);
    const pulseNode = () => {
      node.transition()
        .ease(d3.easeSinInOut)
        .duration(getRandomArbitrary(minDuration, maxDuration))
        .attr('transform', function() { return scaleCenter(this, getRandomArbitrary(minScale, maxScale))})
        .on('end', pulseNode)
    };
    pulseNode();
  });
}

function makeGradientIdsUnique(svg) {
  const id = (Math.random() + 1).toString(36).substring(7);
  svg.selectAll('[fill]')
    .attr('fill', function() {
      const fill = this.getAttribute('fill');
      if (fill.startsWith('url(#')) {
        return'url(#' + fill.substring(5, fill.length-1) + '_' + id + ')';
      }
      return fill
    })

  svg.selectAll('[stroke]')
    .attr('stroke', function() {
      const stroke = this.getAttribute('stroke');
      if (stroke.startsWith('url(#')) {
        return'url(#' + stroke.substring(5, stroke.length-1) + '_' + id + ')';
      }
      return stroke
    })

  svg.selectAll('linearGradient')
    .attr('id', function() {
      const gradientId = this.getAttribute('id');
      return gradientId + '_' + id;
    })
}
