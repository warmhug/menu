var util = require('./utils/util');
var KeyCode = util.KeyCode;

var SubMenuStateMixin = {
  getInitialState: function () {
    return {
      open: this.props.open || false
    };
  },

  _getOpenClassName: function () {
    return this.props.openClassName || this.props.rootPrefixCls + '-submenu-open';
  },

  setOpenState: function (newState, onStateChangeComplete) {
    if (newState) {
      this.bindRootCloseHandlers();
    } else {
      this.unbindRootCloseHandlers();
    }

    this.setState({
      open: newState
    }, onStateChangeComplete);
  },

  handleDocumentKeyUp: function (e) {
    if (e.keyCode === KeyCode.ESC) {
      this.setOpenState(false);
    }
  },

  handleDocumentClick: function (e) {
    // If the click originated from within this component
    // don't do anything.
    if (util.contains(this.getDOMNode(), e.target)) {
      return;
    }
    // de active menu cause sub menu hide its menu
    this.props.onHover(null);
  },

  bindRootCloseHandlers: function () {
    this._onDocumentClickListener = util.addEventListener(document, 'click', this.handleDocumentClick);
    this._onDocumentKeyupListener = util.addEventListener(document, 'keyup', this.handleDocumentKeyUp);
  },

  unbindRootCloseHandlers: function () {
    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.remove();
    }

    if (this._onDocumentKeyupListener) {
      this._onDocumentKeyupListener.remove();
    }
  },

  componentWillUnmount: function () {
    this.unbindRootCloseHandlers();
  }
};

module.exports = SubMenuStateMixin;
