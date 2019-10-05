"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Link;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Link(props) {
  var _props = props,
      to = _props.to,
      children = _props.children;
  props = {
    href: to,
    onClick: handle.bind(null, props)
  };
  return _react["default"].createElement('a', props, children);
}

function handle(_ref, event) {
  var to = _ref.to,
      history = _ref.history,
      props = _ref.props;
  event.preventDefault();
  history.push(to, props || {});
  return false;
}
