(function ($) {

  // function to find max z-index
  $.maxZIndex = function () {
    var indexes = $.map($('*'), function(el, index) {
      return parseInt($(el).css('z-index')) || 0;
    });
    return Array.max(indexes);
  }

  var Utils = {
    fadeToggle: function(animation, speed, easing, callback) {
      var attr = {opacity: 'toggle'};
      return this.animate($.extend(attr, animation), speed, easing, callback);
    },

    toggleAttr: function(attr) {
      this.attr(attr, !this.attr(attr));
    },

    showAboveAllElements: function () {
      if ($(this).css('position') == "auto" || $(this).css('position') == "static") {
        $(this).css('position', 'relative');
      };
      $(this).css('z-index', $.maxZIndex() + 1);
    },

    clearForm: function() {
      return this.each(function() {
        var type = this.type, tag = this.tagName.toLowerCase();
        if (tag == 'form')
          return $(':input',this).clearForm();
        if (type == 'text' || type == 'password' || tag == 'textarea')
          this.value = '';
        else if (type == 'checkbox' || type == 'radio')
          this.checked = false;
        else if (tag == 'select')
          this.selectedIndex = -1;
      });
    }
  }

  $.fn.extend(Utils);

})(jQuery);

// http://ejohn.org/blog/fast-javascript-maxmin/
Array.max = function( array ){
    return Math.max.apply( Math, array );
};

Array.min = function( array ){
    return Math.min.apply( Math, array );
};

// http://stackoverflow.com/questions/967096/using-jquery-to-test-if-an-input-has-focus
jQuery.extend(jQuery.expr[':'], {
    focus: function(element) {
        return element == document.activeElement;
    }
});