(() => {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      let node = this;
      while (node) {
        if (node.matches(css)) return node;
        node = node.parentElement;
      }
      return null;
    };
  }
  if (!String.prototype.capitalize) {
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    }
  }
})();
