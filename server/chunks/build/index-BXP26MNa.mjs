import { equals, contains, isEmpty } from '@primeuix/utils/object';
import { s as script$5 } from './index-BTjgdG92.mjs';
import { B as BaseStyle } from './server.mjs';
import { openBlock, createElementBlock, mergeProps, createElementVNode, resolveComponent, renderSlot, normalizeClass, createBlock, createCommentVNode } from 'vue';

var css = "\n.p-icon {\n    display: inline-block;\n    vertical-align: baseline;\n}\n\n.p-icon-spin {\n    -webkit-animation: p-icon-spin 2s infinite linear;\n    animation: p-icon-spin 2s infinite linear;\n}\n\n@-webkit-keyframes p-icon-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n\n@keyframes p-icon-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n";
var BaseIconStyle = BaseStyle.extend({
  name: "baseicon",
  css
});
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var script$4 = {
  name: "BaseIcon",
  "extends": script$5,
  props: {
    label: {
      type: String,
      "default": void 0
    },
    spin: {
      type: Boolean,
      "default": false
    }
  },
  style: BaseIconStyle,
  provide: function provide() {
    return {
      $pcIcon: this,
      $parentInstance: this
    };
  },
  methods: {
    pti: function pti() {
      var isLabelEmpty = isEmpty(this.label);
      return _objectSpread(_objectSpread({}, !this.isUnstyled && {
        "class": ["p-icon", {
          "p-icon-spin": this.spin
        }]
      }), {}, {
        role: !isLabelEmpty ? "img" : void 0,
        "aria-label": !isLabelEmpty ? this.label : void 0,
        "aria-hidden": isLabelEmpty
      });
    }
  }
};
var script$3 = {
  name: "CheckIcon",
  "extends": script$4
};
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _cache[0] || (_cache[0] = [createElementVNode("path", {
    d: "M4.86199 11.5948C4.78717 11.5923 4.71366 11.5745 4.64596 11.5426C4.57826 11.5107 4.51779 11.4652 4.46827 11.4091L0.753985 7.69483C0.683167 7.64891 0.623706 7.58751 0.580092 7.51525C0.536478 7.44299 0.509851 7.36177 0.502221 7.27771C0.49459 7.19366 0.506156 7.10897 0.536046 7.03004C0.565935 6.95111 0.613367 6.88 0.674759 6.82208C0.736151 6.76416 0.8099 6.72095 0.890436 6.69571C0.970973 6.67046 1.05619 6.66385 1.13966 6.67635C1.22313 6.68886 1.30266 6.72017 1.37226 6.76792C1.44186 6.81567 1.4997 6.8786 1.54141 6.95197L4.86199 10.2503L12.6397 2.49483C12.7444 2.42694 12.8689 2.39617 12.9932 2.40745C13.1174 2.41873 13.2343 2.47141 13.3251 2.55705C13.4159 2.64268 13.4753 2.75632 13.4938 2.87973C13.5123 3.00315 13.4888 3.1292 13.4271 3.23768L5.2557 11.4091C5.20618 11.4652 5.14571 11.5107 5.07801 11.5426C5.01031 11.5745 4.9368 11.5923 4.86199 11.5948Z",
    fill: "currentColor"
  }, null, -1)]), 16);
}
script$3.render = render$2;
var script$2 = {
  name: "MinusIcon",
  "extends": script$4
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _cache[0] || (_cache[0] = [createElementVNode("path", {
    d: "M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z",
    fill: "currentColor"
  }, null, -1)]), 16);
}
script$2.render = render$1;
var theme = function theme2(_ref) {
  var dt = _ref.dt;
  return "\n.p-checkbox {\n    position: relative;\n    display: inline-flex;\n    user-select: none;\n    vertical-align: bottom;\n    width: ".concat(dt("checkbox.width"), ";\n    height: ").concat(dt("checkbox.height"), ";\n}\n\n.p-checkbox-input {\n    cursor: pointer;\n    appearance: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    padding: 0;\n    margin: 0;\n    opacity: 0;\n    z-index: 1;\n    outline: 0 none;\n    border: 1px solid transparent;\n    border-radius: ").concat(dt("checkbox.border.radius"), ";\n}\n\n.p-checkbox-box {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border-radius: ").concat(dt("checkbox.border.radius"), ";\n    border: 1px solid ").concat(dt("checkbox.border.color"), ";\n    background: ").concat(dt("checkbox.background"), ";\n    width: ").concat(dt("checkbox.width"), ";\n    height: ").concat(dt("checkbox.height"), ";\n    transition: background ").concat(dt("checkbox.transition.duration"), ", color ").concat(dt("checkbox.transition.duration"), ", border-color ").concat(dt("checkbox.transition.duration"), ", box-shadow ").concat(dt("checkbox.transition.duration"), ", outline-color ").concat(dt("checkbox.transition.duration"), ";\n    outline-color: transparent;\n    box-shadow: ").concat(dt("checkbox.shadow"), ";\n}\n\n.p-checkbox-icon {\n    transition-duration: ").concat(dt("checkbox.transition.duration"), ";\n    color: ").concat(dt("checkbox.icon.color"), ";\n    font-size: ").concat(dt("checkbox.icon.size"), ";\n    width: ").concat(dt("checkbox.icon.size"), ";\n    height: ").concat(dt("checkbox.icon.size"), ";\n}\n\n.p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n    border-color: ").concat(dt("checkbox.hover.border.color"), ";\n}\n\n.p-checkbox-checked .p-checkbox-box {\n    border-color: ").concat(dt("checkbox.checked.border.color"), ";\n    background: ").concat(dt("checkbox.checked.background"), ";\n}\n\n.p-checkbox-checked .p-checkbox-icon {\n    color: ").concat(dt("checkbox.icon.checked.color"), ";\n}\n\n.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n    background: ").concat(dt("checkbox.checked.hover.background"), ";\n    border-color: ").concat(dt("checkbox.checked.hover.border.color"), ";\n}\n\n.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {\n    color: ").concat(dt("checkbox.icon.checked.hover.color"), ";\n}\n\n.p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {\n    border-color: ").concat(dt("checkbox.focus.border.color"), ";\n    box-shadow: ").concat(dt("checkbox.focus.ring.shadow"), ";\n    outline: ").concat(dt("checkbox.focus.ring.width"), " ").concat(dt("checkbox.focus.ring.style"), " ").concat(dt("checkbox.focus.ring.color"), ";\n    outline-offset: ").concat(dt("checkbox.focus.ring.offset"), ";\n}\n\n.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {\n    border-color: ").concat(dt("checkbox.checked.focus.border.color"), ";\n}\n\n.p-checkbox.p-invalid > .p-checkbox-box {\n    border-color: ").concat(dt("checkbox.invalid.border.color"), ";\n}\n\n.p-checkbox.p-variant-filled .p-checkbox-box {\n    background: ").concat(dt("checkbox.filled.background"), ";\n}\n\n.p-checkbox-checked.p-variant-filled .p-checkbox-box {\n    background: ").concat(dt("checkbox.checked.background"), ";\n}\n\n.p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n    background: ").concat(dt("checkbox.checked.hover.background"), ";\n}\n\n.p-checkbox.p-disabled {\n    opacity: 1;\n}\n\n.p-checkbox.p-disabled .p-checkbox-box {\n    background: ").concat(dt("checkbox.disabled.background"), ";\n    border-color: ").concat(dt("checkbox.checked.disabled.border.color"), ";\n}\n\n.p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {\n    color: ").concat(dt("checkbox.icon.disabled.color"), ";\n}\n");
};
var classes = {
  root: function root(_ref2) {
    var instance = _ref2.instance, props = _ref2.props;
    return ["p-checkbox p-component", {
      "p-checkbox-checked": instance.checked,
      "p-disabled": props.disabled,
      "p-invalid": props.invalid,
      "p-variant-filled": props.variant ? props.variant === "filled" : instance.$primevue.config.inputStyle === "filled" || instance.$primevue.config.inputVariant === "filled"
    }];
  },
  box: "p-checkbox-box",
  input: "p-checkbox-input",
  icon: "p-checkbox-icon"
};
var CheckboxStyle = BaseStyle.extend({
  name: "checkbox",
  theme,
  classes
});
var script$1 = {
  name: "BaseCheckbox",
  "extends": script$5,
  props: {
    value: null,
    modelValue: null,
    binary: Boolean,
    name: {
      type: String,
      "default": null
    },
    indeterminate: {
      type: Boolean,
      "default": false
    },
    trueValue: {
      type: null,
      "default": true
    },
    falseValue: {
      type: null,
      "default": false
    },
    variant: {
      type: String,
      "default": null
    },
    invalid: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    readonly: {
      type: Boolean,
      "default": false
    },
    required: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": null
    },
    inputId: {
      type: String,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    ariaLabelledby: {
      type: String,
      "default": null
    },
    ariaLabel: {
      type: String,
      "default": null
    }
  },
  style: CheckboxStyle,
  provide: function provide2() {
    return {
      $pcCheckbox: this,
      $parentInstance: this
    };
  }
};
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r)
      return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"])
    return Array.from(r);
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r))
    return _arrayLikeToArray(r);
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++)
    n[e] = r[e];
  return n;
}
var script = {
  name: "Checkbox",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["update:modelValue", "change", "focus", "blur", "update:indeterminate"],
  data: function data() {
    return {
      d_indeterminate: this.indeterminate
    };
  },
  watch: {
    indeterminate: function indeterminate(newValue) {
      this.d_indeterminate = newValue;
    }
  },
  methods: {
    getPTOptions: function getPTOptions(key) {
      var _ptm = key === "root" ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          checked: this.checked,
          indeterminate: this.d_indeterminate,
          disabled: this.disabled
        }
      });
    },
    onChange: function onChange(event) {
      var _this = this;
      if (!this.disabled && !this.readonly) {
        var newModelValue;
        if (this.binary) {
          newModelValue = this.d_indeterminate ? this.trueValue : this.checked ? this.falseValue : this.trueValue;
        } else {
          if (this.checked || this.d_indeterminate)
            newModelValue = this.modelValue.filter(function(val) {
              return !equals(val, _this.value);
            });
          else
            newModelValue = this.modelValue ? [].concat(_toConsumableArray(this.modelValue), [this.value]) : [this.value];
        }
        if (this.d_indeterminate) {
          this.d_indeterminate = false;
          this.$emit("update:indeterminate", this.d_indeterminate);
        }
        this.$emit("update:modelValue", newModelValue);
        this.$emit("change", event);
      }
    },
    onFocus: function onFocus(event) {
      this.$emit("focus", event);
    },
    onBlur: function onBlur(event) {
      this.$emit("blur", event);
    }
  },
  computed: {
    checked: function checked() {
      return this.d_indeterminate ? false : this.binary ? this.modelValue === this.trueValue : contains(this.value, this.modelValue);
    }
  },
  components: {
    CheckIcon: script$3,
    MinusIcon: script$2
  }
};
var _hoisted_1 = ["data-p-checked", "data-p-indeterminate", "data-p-disabled"];
var _hoisted_2 = ["id", "value", "name", "checked", "tabindex", "disabled", "readonly", "required", "aria-labelledby", "aria-label", "aria-invalid", "aria-checked"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CheckIcon = resolveComponent("CheckIcon");
  var _component_MinusIcon = resolveComponent("MinusIcon");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, $options.getPTOptions("root"), {
    "data-p-checked": $options.checked,
    "data-p-indeterminate": $data.d_indeterminate || void 0,
    "data-p-disabled": _ctx.disabled
  }), [createElementVNode("input", mergeProps({
    id: _ctx.inputId,
    type: "checkbox",
    "class": [_ctx.cx("input"), _ctx.inputClass],
    style: _ctx.inputStyle,
    value: _ctx.value,
    name: _ctx.name,
    checked: $options.checked,
    tabindex: _ctx.tabindex,
    disabled: _ctx.disabled,
    readonly: _ctx.readonly,
    required: _ctx.required,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    "aria-invalid": _ctx.invalid || void 0,
    "aria-checked": $data.d_indeterminate ? "mixed" : void 0,
    onFocus: _cache[0] || (_cache[0] = function() {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[1] || (_cache[1] = function() {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onChange: _cache[2] || (_cache[2] = function() {
      return $options.onChange && $options.onChange.apply($options, arguments);
    })
  }, $options.getPTOptions("input")), null, 16, _hoisted_2), createElementVNode("div", mergeProps({
    "class": _ctx.cx("box")
  }, $options.getPTOptions("box")), [renderSlot(_ctx.$slots, "icon", {
    checked: $options.checked,
    indeterminate: $data.d_indeterminate,
    "class": normalizeClass(_ctx.cx("icon"))
  }, function() {
    return [$options.checked ? (openBlock(), createBlock(_component_CheckIcon, mergeProps({
      key: 0,
      "class": _ctx.cx("icon")
    }, $options.getPTOptions("icon")), null, 16, ["class"])) : $data.d_indeterminate ? (openBlock(), createBlock(_component_MinusIcon, mergeProps({
      key: 1,
      "class": _ctx.cx("icon")
    }, $options.getPTOptions("icon")), null, 16, ["class"])) : createCommentVNode("", true)];
  })], 16)], 16, _hoisted_1);
}
script.render = render;

export { script$4 as a, script$3 as b, script as s };
//# sourceMappingURL=index-BXP26MNa.mjs.map
