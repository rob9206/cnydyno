/* @ds-bundle: {"format":3,"namespace":"ThunderhorseTuningDesignSystem_fe7e73","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Badge","sourcePath":"components/data/Badge.jsx"},{"name":"StatReadout","sourcePath":"components/data/StatReadout.jsx"},{"name":"Tag","sourcePath":"components/data/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Card","sourcePath":"components/layout/Card.jsx"},{"name":"CardTitle","sourcePath":"components/layout/Card.jsx"},{"name":"Tabs","sourcePath":"components/layout/Tabs.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"f66032fb6ccb","components/buttons/IconButton.jsx":"dac5c1c48e8b","components/data/Badge.jsx":"d0e69f31ca87","components/data/StatReadout.jsx":"fadf476aa204","components/data/Tag.jsx":"d8844fa25e09","components/forms/Checkbox.jsx":"6a98cca42a3a","components/forms/Input.jsx":"c7157a8f7eb0","components/forms/Select.jsx":"62ff94cf424a","components/forms/Switch.jsx":"1380df1c1b70","components/layout/Card.jsx":"f4bb3bcf8b45","components/layout/Tabs.jsx":"cd2035069da4","ui_kits/web/Booking.jsx":"493c2de5487f","ui_kits/web/DynoAI.jsx":"19aea25ea735","ui_kits/web/DynoResults.jsx":"cc00d814740b","ui_kits/web/Home.jsx":"30b9689cd1d6","ui_kits/web/Nav.jsx":"5a5a28cb5b28","ui_kits/web/SEO.jsx":"696a017e1da4","ui_kits/web/Services.jsx":"3082cf23f65f","ui_kits/web/shared.jsx":"bb2d3eab65b7"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ThunderhorseTuningDesignSystem_fe7e73 = window.ThunderhorseTuningDesignSystem_fe7e73 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Thunderhorse Tuning — Button
 * Industrial, sharp-cornered action. Uppercase Oswald label.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const sizes = {
    sm: {
      height: 'var(--control-sm)',
      padding: '0 14px',
      font: '12px',
      gap: '6px'
    },
    md: {
      height: 'var(--control-md)',
      padding: '0 20px',
      font: '13.5px',
      gap: '8px'
    },
    lg: {
      height: 'var(--control-lg)',
      padding: '0 28px',
      font: '15px',
      gap: '10px'
    }
  };
  const s = sizes[size] || sizes.md;
  const palette = {
    primary: {
      bg: 'var(--accent)',
      bgH: 'var(--accent-hover)',
      bgA: 'var(--accent-press)',
      fg: 'var(--text-on-accent)',
      bd: 'transparent'
    },
    danger: {
      bg: 'var(--red-600)',
      bgH: 'var(--red-700)',
      bgA: 'var(--red-800)',
      fg: '#fff',
      bd: 'transparent'
    },
    secondary: {
      bg: 'transparent',
      bgH: 'var(--surface-sunken)',
      bgA: 'var(--surface-sunken)',
      fg: 'var(--text-strong)',
      bd: 'var(--border-strong)'
    },
    ghost: {
      bg: 'transparent',
      bgH: 'var(--accent-tint)',
      bgA: 'var(--accent-tint)',
      fg: 'var(--text-brand)',
      bd: 'transparent'
    },
    inverse: {
      bg: 'var(--bone)',
      bgH: '#fff',
      bgA: 'var(--steel-200)',
      fg: 'var(--ink-900)',
      bd: 'transparent'
    }
  };
  const p = palette[variant] || palette.primary;
  const bg = disabled ? 'var(--surface-sunken)' : active ? p.bgA : hover ? p.bgH : p.bg;
  const css = {
    display: block ? 'flex' : 'inline-flex',
    width: block ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: s.font,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: disabled ? 'var(--text-faint)' : p.fg,
    background: bg,
    border: `1px solid ${disabled ? 'var(--border)' : p.bd}`,
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
    transform: active && !disabled ? 'translateY(1px)' : 'none',
    boxShadow: hover && variant === 'primary' && !disabled ? 'var(--glow-voltage)' : 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: css
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Thunderhorse Tuning — IconButton
 * Square, sharp icon-only control. Pass a Lucide/SVG node as children.
 */
function IconButton({
  children,
  variant = 'secondary',
  size = 'md',
  disabled = false,
  'aria-label': ariaLabel,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const dims = {
    sm: 32,
    md: 40,
    lg: 48
  };
  const d = dims[size] || dims.md;
  const palette = {
    primary: {
      bg: 'var(--accent)',
      bgH: 'var(--accent-hover)',
      fg: '#fff',
      bd: 'transparent'
    },
    secondary: {
      bg: 'var(--surface-card)',
      bgH: 'var(--surface-sunken)',
      fg: 'var(--text-strong)',
      bd: 'var(--border-strong)'
    },
    ghost: {
      bg: 'transparent',
      bgH: 'var(--accent-tint)',
      fg: 'var(--text-body)',
      bd: 'transparent'
    }
  };
  const p = palette[variant] || palette.secondary;
  const css = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: d,
    height: d,
    color: disabled ? 'var(--text-faint)' : p.fg,
    background: disabled ? 'var(--surface-sunken)' : hover ? p.bgH : p.bg,
    border: `1px solid ${disabled ? 'var(--border)' : p.bd}`,
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
    transform: active && !disabled ? 'translateY(1px)' : 'none',
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: css
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data/Badge.jsx
try { (() => {
/**
 * Thunderhorse Tuning — Badge
 * Compact status pill. Uppercase mono label.
 */
function Badge({
  children,
  tone = 'neutral',
  solid = false,
  style = {}
}) {
  const tones = {
    neutral: {
      fg: 'var(--steel-600)',
      bg: 'var(--surface-sunken)',
      solidBg: 'var(--ink-700)'
    },
    brand: {
      fg: 'var(--red-700)',
      bg: 'var(--red-50)',
      solidBg: 'var(--red-500)'
    },
    success: {
      fg: '#0f7a3d',
      bg: 'var(--green-50)',
      solidBg: 'var(--green-500)'
    },
    warning: {
      fg: '#9a6206',
      bg: 'var(--amber-50)',
      solidBg: 'var(--amber-500)'
    },
    info: {
      fg: '#1c6ba0',
      bg: 'var(--blue-50)',
      solidBg: 'var(--blue-500)'
    },
    danger: {
      fg: 'var(--red-700)',
      bg: 'var(--red-50)',
      solidBg: 'var(--red-600)'
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      height: 22,
      padding: '0 9px',
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 10.5,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: solid ? '#fff' : t.fg,
      background: solid ? t.solidBg : t.bg,
      border: solid ? '1px solid transparent' : `1px solid ${t.fg}22`,
      borderRadius: 'var(--radius-sm)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data/StatReadout.jsx
try { (() => {
/**
 * Thunderhorse Tuning — StatReadout
 * Signature dyno/spec metric: big tabular mono value + unit + label.
 * Pairs naturally on a forge-black panel.
 */
function StatReadout({
  value,
  unit,
  label,
  delta,
  tone = 'brand',
  align = 'left',
  style = {}
}) {
  const toneColor = {
    brand: 'var(--text-brand)',
    strong: 'var(--text-strong)',
    success: 'var(--green-500)',
    warning: 'var(--amber-500)'
  }[tone] || 'var(--text-brand)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 40,
      lineHeight: 1,
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-0.01em',
      color: toneColor
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 14,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      color: 'var(--text-muted)'
    }
  }, unit)), delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 12,
      color: String(delta).trim().startsWith('-') ? 'var(--red-600)' : 'var(--green-500)'
    }
  }, String(delta).trim().startsWith('-') ? '▼' : '▲', " ", delta));
}
Object.assign(__ds_scope, { StatReadout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatReadout.jsx", error: String((e && e.message) || e) }); }

// components/data/Tag.jsx
try { (() => {
/**
 * Thunderhorse Tuning — Tag
 * Filter / category chip, optionally removable or selectable.
 */
function Tag({
  children,
  selected = false,
  onRemove,
  onClick,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const clickable = !!onClick;
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 28,
      padding: '0 10px',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 12.5,
      color: selected ? '#fff' : 'var(--text-body)',
      background: selected ? 'var(--accent)' : hover && clickable ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1px solid ${selected ? 'var(--accent)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-pill)',
      cursor: clickable ? 'pointer' : 'default',
      transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
      userSelect: 'none',
      ...style
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("button", {
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 16,
      height: 16,
      marginRight: -3,
      padding: 0,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: selected ? '#fff' : 'var(--text-faint)',
      fontSize: 13,
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/**
 * Thunderhorse Tuning — Checkbox
 * Sharp square check with voltage-red fill when on.
 */
function Checkbox({
  checked = false,
  onChange,
  label,
  disabled = false,
  id,
  style = {}
}) {
  const cid = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: cid,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 20,
      height: 20,
      flexShrink: 0,
      background: checked ? 'var(--accent)' : 'var(--surface-card)',
      border: `1px solid ${checked ? 'var(--accent)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-sm)',
      transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: cid,
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      cursor: 'inherit'
    }
  }), checked && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 6.2L5 9L10 3",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "square",
    strokeLinejoin: "miter"
  }))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Thunderhorse Tuning — Input
 * Sharp text field with eyebrow label, optional leading icon & error.
 */
function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  iconLeft = null,
  error = null,
  hint = null,
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useId();
  const border = error ? 'var(--red-500)' : focus ? 'var(--accent)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 'var(--control-md)',
      padding: '0 12px',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1px solid ${border}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? 'var(--ring-focus)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--text-faint)'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--text-strong)',
      minWidth: 0
    }
  }, rest))), error && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--red-600)'
    }
  }, error), !error && hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Thunderhorse Tuning — Select
 * Native select styled to match Input.
 */
function Select({
  label,
  value,
  onChange,
  options = [],
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const selId = id || React.useId();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      height: 'var(--control-md)',
      padding: '0 36px 0 12px',
      appearance: 'none',
      WebkitAppearance: 'none',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1px solid ${focus ? 'var(--accent)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? 'var(--ring-focus)' : 'none',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--text-strong)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'border-color var(--dur-fast) var(--ease-out)'
    }
  }, rest), options.map(o => {
    const val = typeof o === 'string' ? o : o.value;
    const lab = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lab);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--text-muted)',
      fontSize: 12
    }
  }, "\u25BE")));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/**
 * Thunderhorse Tuning — Switch
 * Toggle with mechanical feel; voltage-red track when on.
 */
function Switch({
  checked = false,
  onChange,
  label,
  disabled = false,
  id,
  style = {}
}) {
  const sid = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: sid,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": checked,
    style: {
      position: 'relative',
      width: 42,
      height: 24,
      flexShrink: 0,
      background: checked ? 'var(--accent)' : 'var(--steel-300)',
      borderRadius: 'var(--radius-pill)',
      transition: 'background var(--dur-base) var(--ease-out)',
      boxShadow: checked ? 'var(--glow-voltage)' : 'inset 0 1px 2px rgba(0,0,0,0.15)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: sid,
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      cursor: 'inherit'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 21 : 3,
      width: 18,
      height: 18,
      background: '#fff',
      borderRadius: 'var(--radius-pill)',
      transition: 'left var(--dur-base) var(--ease-out)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/layout/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Thunderhorse Tuning — Card
 * Sharp surface container. Optional left voltage rail + hover lift.
 */
function Card({
  children,
  rail = false,
  hover = false,
  padding = 'var(--space-6)',
  style = {},
  ...rest
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => hover && setH(true),
    onMouseLeave: () => hover && setH(false),
    style: {
      position: 'relative',
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderLeft: rail ? '3px solid var(--accent)' : '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding,
      boxShadow: h ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      transform: h ? 'translateY(-2px)' : 'none',
      transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
      ...style
    }
  }, rest), children);
}

/** Card title slot (Oswald, uppercase). */
function CardTitle({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 18,
      textTransform: 'uppercase',
      letterSpacing: '-0.005em',
      color: 'var(--text-strong)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card, CardTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Card.jsx", error: String((e && e.message) || e) }); }

// components/layout/Tabs.jsx
try { (() => {
/**
 * Thunderhorse Tuning — Tabs
 * Underline tabs with a voltage-red active indicator.
 */
function Tabs({
  tabs = [],
  value,
  onChange,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '1px solid var(--border)',
      ...style
    }
  }, tabs.map(t => {
    const val = typeof t === 'string' ? t : t.value;
    const lab = typeof t === 'string' ? t : t.label;
    const active = val === value;
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(val),
      style: {
        position: 'relative',
        padding: '10px 14px 12px',
        border: 'none',
        background: 'transparent',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: active ? 'var(--text-strong)' : 'var(--text-muted)',
        cursor: 'pointer',
        marginBottom: -1,
        borderBottom: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
        transition: 'color var(--dur-fast) var(--ease-out)'
      }
    }, lab);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/Booking.jsx
try { (() => {
/* Booking flow — bike + service form, then confirmation. */
function Booking({
  go
}) {
  const {
    Input,
    Select,
    Checkbox,
    Switch,
    Button,
    Card,
    CardTitle,
    Badge
  } = window.DS;
  const {
    isMobile
  } = useViewport();
  const [done, setDone] = React.useState(false);
  const [f, setF] = React.useState({
    bike: '2021 Harley Street Glide',
    make: 'Harley-Davidson',
    email: '',
    service: 'Full Dyno Tune',
    diag: false,
    mobile: false,
    notes: ''
  });
  const set = k => e => setF(s => ({
    ...s,
    [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
  }));
  const price = f.service === 'Full Dyno Tune' ? '650' : f.service === 'Diagnostic & Correction' ? '300' : 'Quote';
  if (done) {
    return /*#__PURE__*/React.createElement(Section, {
      style: {
        minHeight: 560,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Card, {
      padding: "44px 48px",
      style: {
        maxWidth: 560,
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--green-50)',
        borderRadius: 'var(--radius-pill)',
        color: 'var(--green-500)',
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement(Ico, {
      n: "Check",
      s: 34
    })), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 32,
        textTransform: 'uppercase',
        color: 'var(--text-strong)',
        margin: 0
      }
    }, "Request Sent"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 16,
        color: 'var(--text-muted)',
        margin: '12px 0 24px'
      }
    }, "We\u2019ll confirm your ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: 'var(--text-brand)'
      }
    }, f.service), " for the ", /*#__PURE__*/React.createElement("strong", null, f.bike), " within 24 hours. ", f.mobile ? 'Include your location in the notes for mobile/event service.' : ''), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => go('home')
    }, "Back Home"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setDone(false)
    }, "Edit Request"))));
  }
  return /*#__PURE__*/React.createElement(Section, {
    style: {
      paddingTop: 56
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Book your tune"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 44,
      textTransform: 'uppercase',
      letterSpacing: '-0.01em',
      color: 'var(--text-strong)',
      margin: '8px 0 28px'
    }
  }, "Reserve Dyno Time"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1.4fr 0.9fr',
      gap: 24,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "28px 30px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Year / Make / Model",
    value: f.bike,
    onChange: set('bike'),
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      n: "Bike",
      s: 16
    })
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    value: f.email,
    onChange: set('email'),
    placeholder: "you@email.com",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      n: "Mail",
      s: 16
    })
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Make",
    value: f.make,
    onChange: set('make'),
    options: ['Harley-Davidson', 'Indian', 'Ducati', 'Metric / Sport', 'Other']
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Service",
    value: f.service,
    onChange: set('service'),
    options: ['Full Dyno Tune', 'Diagnostic & Correction', 'Performance Build']
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--divider)',
      margin: '22px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 14
    }
  }, "Options"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: f.diag,
    onChange: set('diag'),
    label: "Add baseline diagnostic pull (+$300)"
  }), /*#__PURE__*/React.createElement(Switch, {
    checked: f.mobile,
    onChange: set('mobile'),
    label: "Group / event service (5+ bikes, CNY)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Mods & Notes",
    value: f.notes,
    onChange: set('notes'),
    placeholder: "Exhaust, air cleaner, cams, big bore\u2026",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      n: "StickyNote",
      s: 16
    })
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "0",
    rail: true,
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "th-dark",
    style: {
      background: 'var(--ink-900)',
      padding: '22px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(CardTitle, {
    style: {
      color: 'var(--white)'
    }
  }, "Summary"), /*#__PURE__*/React.createElement(Badge, {
    tone: "brand",
    solid: true
  }, f.make.split(' ')[0]))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px'
    }
  }, [['Bike', f.bike], ['Service', f.service], ['Diagnostic pull', f.diag ? 'Yes (+$300)' : 'No'], ['Group / event', f.mobile ? 'Yes' : 'No']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '9px 0',
      borderBottom: '1px solid var(--divider)',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--text-muted)',
      flexShrink: 0
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-strong)',
      textAlign: 'right'
    }
  }, v))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 13,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Est. From"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 28,
      color: 'var(--text-brand)'
    }
  }, price === 'Quote' ? 'Quote' : '$' + (f.diag && price !== 'Quote' ? (parseInt(price) + 300).toLocaleString() : price))), /*#__PURE__*/React.createElement(Button, {
    block: true,
    size: "lg",
    style: {
      marginTop: 18
    },
    onClick: () => setDone(true),
    iconRight: /*#__PURE__*/React.createElement(Ico, {
      n: "ArrowRight",
      s: 18
    })
  }, "Submit Request"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--text-faint)',
      textAlign: 'center',
      margin: '12px 0 0'
    }
  }, "No charge until your appointment is confirmed.")))));
}
Object.assign(window, {
  Booking
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/Booking.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/DynoAI.jsx
try { (() => {
/* DynoAI product page — stats, how it works, live VE calculator, business case. */
function DynoAI({
  go
}) {
  const {
    StatReadout,
    Card,
    CardTitle,
    Button,
    Badge,
    Tabs
  } = window.DS;
  const {
    isMobile
  } = useViewport();
  const [audience, setAudience] = React.useState('Customers');

  // VE calculator state
  const [cur, setCur] = React.useState(85);
  const [target, setTarget] = React.useState(13.2);
  const [measured, setMeasured] = React.useState(14.5);
  const correction = target / measured;
  const newVE = cur * correction;
  const lean = measured > target;
  const Slider = ({
    label,
    value,
    min,
    max,
    step,
    onChange,
    fmt
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--steel-400)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--red-400)'
    }
  }, fmt ? fmt(value) : value)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(parseFloat(e.target.value)),
    style: {
      width: '100%',
      accentColor: 'var(--red-500)',
      height: 4
    }
  }));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    className: "th-dark",
    style: {
      position: 'relative',
      background: 'var(--ink-900)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(800px 460px at 30% 10%, rgba(209,10,17,0.16), transparent 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: isMobile ? '44px 20px 40px' : '64px 32px 52px',
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.85fr',
      gap: isMobile ? 28 : 44,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Our Technology"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 76,
      lineHeight: 0.95,
      textTransform: 'uppercase',
      color: 'var(--white)',
      margin: '10px 0 0'
    }
  }, "Dyno", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--red-500)'
    }
  }, "AI")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 15,
      color: 'var(--steel-300)',
      margin: '14px 0 0'
    }
  }, "AI-Powered ECU Calibration. Built for the Real World."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 18,
      lineHeight: 1.55,
      color: 'var(--steel-300)',
      maxWidth: 560,
      margin: '16px 0 0'
    }
  }, "Proprietary tuning software developed in-house. It uses ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--bone)'
    }
  }, "physics-based modeling and real-time data analysis"), " to generate accurate VE tables from minimal dyno pulls \u2014 replacing the slow trial-and-error most shops still rely on."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
      marginTop: 36,
      maxWidth: 480
    }
  }, /*#__PURE__*/React.createElement(StatReadout, {
    label: "VE accuracy \xB7 1 WOT pull",
    value: "97.5",
    unit: "%"
  }), /*#__PURE__*/React.createElement(StatReadout, {
    label: "Less dyno time / bike",
    value: "60-70",
    unit: "%",
    tone: "strong"
  }), /*#__PURE__*/React.createElement(StatReadout, {
    label: "More bikes / day",
    value: "2-3x",
    tone: "strong"
  }), /*#__PURE__*/React.createElement(StatReadout, {
    label: "VE cell coverage",
    value: "98",
    unit: "%"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      border: '1px solid var(--ink-600)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: '0 24px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(209,10,17,0.18)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 5,
      background: 'var(--hazard)'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: window.PHOTO + 'dyno-ve-map.jpg',
    alt: "DynoAI volumetric-efficiency map on the dyno screen",
    style: {
      display: 'block',
      width: '100%',
      height: 440,
      objectFit: 'cover',
      objectPosition: 'center 32%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: '28px 14px 11px',
      background: 'linear-gradient(transparent, rgba(8,8,12,0.92))',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--green-500)',
      boxShadow: '0 0 8px var(--green-500)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      letterSpacing: '0.05em',
      color: 'var(--steel-200)'
    }
  }, "DYNOAI \xB7 LIVE VE TABLE, RUNNING IN THE SHOP")))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: 'var(--hazard)'
    }
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Eyebrow, null, "How it works"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 38,
      textTransform: 'uppercase',
      color: 'var(--text-strong)',
      margin: '8px 0 28px'
    }
  }, "Math & data, not guesswork"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
      gap: 16
    }
  }, [{
    n: '01',
    t: 'One-Pull Baseline™',
    d: 'A single wide-open-throttle pull captures AFR across the entire RPM range. DynoAI builds a physics model of how your engine breathes from that data alone.'
  }, {
    n: '02',
    t: 'AI-Generated VE Table',
    d: 'Instead of correcting only the cells you tested, DynoAI predicts and fills the entire VE table — including part-throttle and cruise cells most shops never touch.'
  }, {
    n: '03',
    t: 'Real-Time Safety',
    d: 'Every pull, DynoAI monitors knock, AFR deviation and torque. If something looks wrong, the pull aborts before your engine gets hurt.'
  }, {
    n: '04',
    t: 'Refine & Validate',
    d: '2–4 refinement pulls dial in the calibration. You get full dyno sheets, before/after numbers, and an explanation of every change.'
  }].map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.n,
    rail: true,
    padding: "22px 24px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 26,
      color: 'var(--red-500)',
      lineHeight: 1
    }
  }, s.n), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CardTitle, null, s.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--text-muted)',
      margin: '6px 0 0'
    }
  }, s.d))))))), /*#__PURE__*/React.createElement(Section, {
    dark: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Try the VE calculator"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 34,
      textTransform: 'uppercase',
      color: 'var(--white)',
      margin: '8px 0 24px'
    }
  }, "See VE correction in real time"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "24px 26px",
    style: {
      background: 'var(--ink-800)',
      borderColor: 'var(--ink-600)'
    }
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Current VE",
    value: cur,
    min: 50,
    max: 120,
    step: 0.5,
    onChange: setCur,
    fmt: v => v + '%'
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Target AFR",
    value: target,
    min: 11,
    max: 15,
    step: 0.1,
    onChange: setTarget,
    fmt: v => v.toFixed(1)
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Measured AFR",
    value: measured,
    min: 11,
    max: 16,
    step: 0.1,
    onChange: setMeasured,
    fmt: v => v.toFixed(1)
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "24px 26px",
    style: {
      background: 'var(--black)',
      borderColor: 'var(--ink-600)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--steel-400)',
      marginBottom: 16
    }
  }, "The Math"), [['Correction Factor', correction.toFixed(3)], ['Target ÷ Measured', `${target.toFixed(1)} / ${measured.toFixed(1)}`]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 0',
      borderBottom: '1px solid var(--ink-700)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--steel-400)'
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--bone)'
    }
  }, v))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      margin: '18px 0 14px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 13,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--steel-400)'
    }
  }, "New VE"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 34,
      color: 'var(--red-400)'
    }
  }, newVE.toFixed(1), "%")), /*#__PURE__*/React.createElement(Badge, {
    tone: lean ? 'warning' : 'info',
    solid: true
  }, lean ? 'Running LEAN — add fuel' : 'Running RICH — pull fuel')))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      gap: 16,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Who it\u2019s for"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 34,
      textTransform: 'uppercase',
      color: 'var(--text-strong)',
      margin: '8px 0 0'
    }
  }, "The business case")), /*#__PURE__*/React.createElement(Tabs, {
    value: audience,
    onChange: setAudience,
    tabs: ['Customers', 'Shops & Partners']
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "0",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--surface-sunken)'
    }
  }, ['Metric', 'Traditional', 'With DynoAI'].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: i === 0 ? 'left' : 'right',
      padding: '12px 20px',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: i === 2 ? 'var(--text-brand)' : 'var(--text-muted)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, [['Dyno pulls per tune', '15-20', '3-5'], ['Time per tune', '5-6 hours', '2-3 hours'], ['Bikes per day', '1-2', '2-3'], ['VE map coverage', '~80%', '~98%'], ['Result consistency', 'Operator-dependent', 'Repeatable, data-driven']].map(r => /*#__PURE__*/React.createElement("tr", {
    key: r[0],
    style: {
      borderTop: '1px solid var(--divider)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 20px',
      fontSize: 14,
      color: 'var(--text-body)'
    }
  }, r[0]), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 20px',
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, r[1]), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 20px',
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, r[2]))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => go('book'),
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      n: "Calendar",
      s: 18
    })
  }, "Book a Tune"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => go('book'),
    iconRight: /*#__PURE__*/React.createElement(Ico, {
      n: "ArrowRight",
      s: 18
    })
  }, "Schedule a Consultation"))));
}
Object.assign(window, {
  DynoAI
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/DynoAI.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/DynoResults.jsx
try { (() => {
/* DynoAI session dashboard — power curve, live stats, run history. */
function DynoResults() {
  const {
    StatReadout,
    Tabs,
    Badge,
    Button,
    Card
  } = window.DS;
  const {
    isMobile
  } = useViewport();
  const [tab, setTab] = React.useState('Power');
  const [run, setRun] = React.useState(0);
  const canvasRef = React.useRef();
  const runs = [{
    id: 0,
    name: 'Pull 04 · Final',
    whp: 118,
    tq: 132,
    afr: 13.2,
    status: 'pass'
  }, {
    id: 1,
    name: 'Pull 03',
    whp: 115,
    tq: 129,
    afr: 13.0,
    status: 'pass'
  }, {
    id: 2,
    name: 'Pull 02',
    whp: 109,
    tq: 121,
    afr: 12.4,
    status: 'warn'
  }, {
    id: 3,
    name: 'Baseline',
    whp: 91,
    tq: 108,
    afr: 14.1,
    status: 'base'
  }];
  const active = runs[run];
  const AXIS = 160; // hp/tq axis max

  React.useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const dpr = window.devicePixelRatio || 1;
    const W = cv.clientWidth,
      H = cv.clientHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    const ctx = cv.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);
    const padL = 40,
      padB = 28,
      padT = 14,
      padR = 14;
    const plotW = W - padL - padR,
      plotH = H - padB - padT;
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    for (let i = 0; i <= 4; i++) {
      const y = padT + plotH / 4 * i;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(W - padR, y);
      ctx.stroke();
      ctx.fillText(String(AXIS - i * 40), 6, y + 3);
    }
    for (let i = 0; i <= 5; i++) {
      const x = padL + plotW / 5 * i;
      ctx.fillText(String(2 + i) + 'k', x - 6, H - 8);
    }
    const factor = run === 3 ? 0.78 : run === 2 ? 0.92 : run === 1 ? 0.975 : 1;
    const curve = (peak, peakAt, fall, color, fill) => {
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const t = i / 60;
        const shape = Math.pow(Math.sin(Math.min(t / peakAt, 1) * Math.PI / 2), 0.9) * (t > peakAt ? 1 - (t - peakAt) * fall : 1);
        const v = Math.max(0, peak * shape * factor);
        const x = padL + plotW * t;
        const y = padT + plotH * (1 - v / AXIS);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      if (fill) {
        ctx.lineTo(W - padR, padT + plotH);
        ctx.lineTo(padL, padT + plotH);
        ctx.closePath();
        const g = ctx.createLinearGradient(0, padT, 0, padT + plotH);
        g.addColorStop(0, 'rgba(209,10,17,0.28)');
        g.addColorStop(1, 'rgba(209,10,17,0)');
        ctx.fillStyle = g;
        ctx.fill();
      }
    };
    if (tab === 'Power') {
      curve(118, 0.82, 0.35, '#D10A11', true);
      curve(132, 0.55, 0.28, '#E8920C', false);
    } else if (tab === 'AFR') {
      curve(132, 0.5, 0.08, '#18A957', true);
    } else {
      curve(124, 0.62, 0.2, '#E8920C', true);
    }
  }, [tab, run]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    className: "th-dark",
    style: {
      position: 'relative',
      height: 180,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.PHOTO + 'tuner-fence.jpg',
    alt: "Thunderhorse Tuning \u2014 dialing in the calibration",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 28%',
      display: 'block',
      filter: 'brightness(0.45)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right, rgba(8,8,12,0.92) 0%, rgba(8,8,12,0.4) 70%, transparent)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      padding: '0 44px',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.ASSET + 'thunderhorse-badge-cream.png',
    alt: "",
    style: {
      height: 56,
      opacity: 0.85
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 11,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--red-400)',
      marginBottom: 6
    }
  }, "Dyno Cell 1 \xB7 Utica"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 34,
      textTransform: 'uppercase',
      color: 'var(--white)',
      lineHeight: 1
    }
  }, "Live Session"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 5,
      background: 'var(--hazard)'
    }
  })), /*#__PURE__*/React.createElement(Section, {
    dark: true,
    style: {
      minHeight: 500,
      paddingTop: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 20,
      flexWrap: 'wrap',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "DynoAI \xB7 Cell 1 \xB7 Utica"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 38,
      textTransform: 'uppercase',
      color: 'var(--white)',
      margin: '6px 0 0'
    }
  }, "M8 117 \xB7 Stage 1")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      n: "Play",
      s: 18
    })
  }, "Start Pull")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 280px',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "0",
    style: {
      background: 'var(--ink-800)',
      borderColor: 'var(--ink-600)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 18px',
      borderBottom: '1px solid var(--ink-700)'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    tabs: ['Power', 'AFR', 'Torque']
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      width: '100%',
      height: 300,
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      padding: '6px 8px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--steel-300)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: 12,
      height: 3,
      background: '#D10A11',
      display: 'inline-block'
    }
  }), " Power (whp)"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--steel-300)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: 12,
      height: 3,
      background: '#E8920C',
      display: 'inline-block'
    }
  }), " Torque (lb-ft)")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px",
    style: {
      background: 'var(--black)',
      borderColor: 'var(--ink-600)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(StatReadout, {
    label: "Power",
    value: active.whp,
    unit: "whp"
  }), /*#__PURE__*/React.createElement(StatReadout, {
    label: "Torque",
    value: active.tq,
    unit: "lb-ft",
    tone: "warning"
  }), /*#__PURE__*/React.createElement(StatReadout, {
    label: "AFR",
    value: active.afr,
    unit: "\u03BB",
    tone: "strong"
  }), /*#__PURE__*/React.createElement(StatReadout, {
    label: "Knock",
    value: "0.0",
    unit: "\xB0",
    tone: "success"
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "14px 16px",
    style: {
      background: 'var(--ink-800)',
      borderColor: 'var(--ink-600)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--steel-400)',
      marginBottom: 10
    }
  }, "Runs"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, runs.map(r => /*#__PURE__*/React.createElement("button", {
    key: r.id,
    onClick: () => setRun(r.id),
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '9px 11px',
      border: `1px solid ${run === r.id ? 'var(--red-500)' : 'var(--ink-600)'}`,
      background: run === r.id ? 'rgba(209,10,17,0.12)' : 'transparent',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--bone)'
    }
  }, r.name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 13,
      color: 'var(--red-400)'
    }
  }, r.whp), /*#__PURE__*/React.createElement(Badge, {
    tone: r.status === 'pass' ? 'success' : r.status === 'warn' ? 'warning' : 'neutral'
  }, r.status === 'base' ? 'Base' : r.status === 'warn' ? 'Rich' : 'Pass')))))), /*#__PURE__*/React.createElement(Card, {
    padding: "14px 16px",
    style: {
      background: 'var(--ink-800)',
      borderColor: 'var(--ink-600)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--steel-400)'
    }
  }, "VE table accuracy"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 16,
      color: 'var(--green-500)'
    }
  }, "97.5%")))))));
}
Object.assign(window, {
  DynoResults
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/DynoResults.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/Home.jsx
try { (() => {
/* Marketing homepage — hero, dyno stat panel, services grid, DynoAI process, CTA. */
function Home({
  go
}) {
  const {
    Button,
    StatReadout,
    Card,
    CardTitle,
    Badge
  } = window.DS;
  const {
    isMobile
  } = useViewport();
  const services = [{
    icon: 'Target',
    title: 'Precision Calibration',
    body: 'Custom ECU tuning for your specific bike, mods, and riding conditions — not copy-pasted from someone else’s build.'
  }, {
    icon: 'ShieldAlert',
    title: 'Real-Time Knock Detection',
    body: 'DynoAI watches knock, AFR and torque live. If something’s wrong, the pull aborts before your engine gets hurt.'
  }, {
    icon: 'Cpu',
    title: 'Custom Software',
    body: 'Proprietary tuning tools built in-house — physics and data instead of trial-and-error guesswork.'
  }, {
    icon: 'Users',
    title: 'Group & Event Tuning',
    body: 'Rallies, MC club meets and shop events across Central New York (5+ bikes).'
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    className: "th-dark",
    style: {
      position: 'relative',
      background: 'var(--ink-900)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(900px 500px at 78% 25%, rgba(209,10,17,0.18), transparent 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 6,
      background: 'var(--hazard)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: isMobile ? '52px 20px 56px' : '84px 32px 92px',
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.85fr',
      gap: isMobile ? 32 : 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Utica, NY \u2014 Shop & Mobile Service"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: isMobile ? 40 : 62,
      lineHeight: 0.98,
      letterSpacing: '-0.01em',
      textTransform: 'uppercase',
      color: 'var(--white)',
      margin: '14px 0 0'
    }
  }, "Precision", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--red-500)'
    }
  }, "V-Twin"), " Performance"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      letterSpacing: '0.04em',
      color: 'var(--steel-300)',
      margin: '18px 0 0'
    }
  }, "Tuned by Thunder. Powered by Intelligence."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 18,
      lineHeight: 1.55,
      color: 'var(--steel-300)',
      maxWidth: 520,
      margin: '14px 0 30px'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--bone)'
    }
  }, "V-twin specialists. All bikes welcome."), " Professional motorcycle dyno tuning in Central New York \u2014 where iron meets algorithm."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => go('book'),
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      n: "Calendar",
      s: 18
    })
  }, "Book Your Tune"), /*#__PURE__*/React.createElement(Button, {
    variant: "inverse",
    size: "lg",
    onClick: () => go('services'),
    iconRight: /*#__PURE__*/React.createElement(Ico, {
      n: "ArrowRight",
      s: 18
    })
  }, "Services & Pricing")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      marginTop: 26,
      flexWrap: 'wrap'
    }
  }, ['Proprietary Tuning Software', 'V-Twin Specialists', 'Full Dyno Sheets Included'].map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--steel-400)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    n: "Zap",
    s: 13,
    color: "var(--red-500)"
  }), " ", t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      border: '1px solid var(--ink-600)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: '0 24px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(209,10,17,0.18)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 5,
      background: 'var(--hazard)'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: window.PHOTO + 'dyno-rider-plaid.jpg',
    alt: "Customer bike strapped to the dyno at Thunderhorse Tuning",
    style: {
      display: 'block',
      width: '100%',
      height: isMobile ? 260 : 460,
      objectFit: 'cover',
      objectPosition: '60% center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: '28px 16px 12px',
      background: 'linear-gradient(transparent, rgba(8,8,12,0.92))',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--red-500)',
      boxShadow: '0 0 8px var(--red-500)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      letterSpacing: '0.06em',
      color: 'var(--steel-200)'
    }
  }, "ON THE DYNO \xB7 609 COLUMBIA ST, UTICA NY"))))), /*#__PURE__*/React.createElement("div", {
    className: "th-dark",
    style: {
      borderTop: '1px solid var(--ink-700)',
      background: 'var(--black)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: isMobile ? '16px 20px' : '22px 32px',
      display: 'flex',
      gap: isMobile ? 20 : 52,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--steel-500)'
    }
  }, "Last pull \xB7 M8 117 \xB7 Stage 1"), /*#__PURE__*/React.createElement(StatReadout, {
    label: "Peak Power",
    value: "118",
    unit: "whp",
    delta: "+27"
  }), /*#__PURE__*/React.createElement(StatReadout, {
    label: "Torque",
    value: "132",
    unit: "lb-ft",
    delta: "+24"
  }), /*#__PURE__*/React.createElement(StatReadout, {
    label: "AFR",
    value: "13.2",
    unit: "\u03BB",
    tone: "strong"
  }), /*#__PURE__*/React.createElement(StatReadout, {
    label: "Knock",
    value: "0.0",
    unit: "\xB0",
    tone: "success"
  })))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "What we do"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 40,
      textTransform: 'uppercase',
      letterSpacing: '-0.01em',
      color: 'var(--text-strong)',
      margin: '8px 0 0'
    }
  }, "Built Different")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => go('services'),
    iconRight: /*#__PURE__*/React.createElement(Ico, {
      n: "ArrowRight",
      s: 16
    })
  }, "All services & pricing")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: 16
    }
  }, services.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.title,
    rail: true,
    hover: true,
    padding: "var(--space-6)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: 46,
      height: 46,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--red-50)',
      borderRadius: 'var(--radius-md)',
      color: 'var(--red-600)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    n: s.icon,
    s: 24
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CardTitle, null, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--text-muted)',
      margin: '6px 0 0'
    }
  }, s.body))))))), /*#__PURE__*/React.createElement(Section, {
    dark: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 36,
      flexWrap: 'wrap',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "How we tune \xB7 DynoAI"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 40,
      textTransform: 'uppercase',
      color: 'var(--white)',
      margin: '8px 0 0'
    }
  }, "Stop guessing. Start modeling.")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => go('dynoai'),
    iconRight: /*#__PURE__*/React.createElement(Ico, {
      n: "ArrowRight",
      s: 16
    })
  }, "About DynoAI")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
      gap: 1,
      background: 'var(--ink-700)',
      border: '1px solid var(--ink-700)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, [{
    n: '01',
    t: 'One-Pull Baseline',
    d: 'A single WOT pull captures AFR across the whole RPM range.'
  }, {
    n: '02',
    t: 'AI VE Table',
    d: 'Physics fills the entire VE table — even cruise cells most shops skip.'
  }, {
    n: '03',
    t: 'Real-Time Safety',
    d: 'Knock, AFR and torque watched live; the pull aborts if it’s wrong.'
  }, {
    n: '04',
    t: 'Refine & Validate',
    d: '2–4 pulls dial it in. You leave with the full data.'
  }].map(p => /*#__PURE__*/React.createElement("div", {
    key: p.n,
    style: {
      background: 'var(--ink-800)',
      padding: '24px 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 30,
      color: 'var(--red-500)'
    }
  }, p.n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 17,
      textTransform: 'uppercase',
      color: 'var(--bone)',
      margin: '8px 0 6px'
    }
  }, p.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--steel-400)',
      margin: 0,
      lineHeight: 1.5
    }
  }, p.d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 56,
      marginTop: 36,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(StatReadout, {
    label: "VE Accuracy \xB7 1 pull",
    value: "97.5",
    unit: "%"
  }), /*#__PURE__*/React.createElement(StatReadout, {
    label: "Less Dyno Time",
    value: "60-70",
    unit: "%",
    tone: "strong"
  }), /*#__PURE__*/React.createElement(StatReadout, {
    label: "Bikes / Day",
    value: "2-3x",
    tone: "strong"
  }), /*#__PURE__*/React.createElement(StatReadout, {
    label: "VE Cell Coverage",
    value: "98",
    unit: "%"
  }))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 40,
      flexWrap: 'wrap',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "From the shop floor"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 40,
      lineHeight: 1.05,
      textTransform: 'uppercase',
      letterSpacing: '-0.01em',
      color: 'var(--text-strong)',
      margin: '8px 0 0'
    }
  }, "Real bikes. Real pulls.")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, "Utica, NY \xB7 V-twin specialists")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gridAutoRows: isMobile ? 160 : 240,
      gap: 4,
      background: 'var(--ink-900)',
      padding: 4,
      borderRadius: 'var(--radius-md)'
    }
  }, [{
    src: 'dyno-pull.jpg',
    cap: 'Wide-open pull on the Dynojet',
    span: 2,
    pos: 'center 38%'
  }, {
    src: 'dyno-ve-map.jpg',
    cap: 'Live VE map — DynoAI',
    span: 1,
    pos: 'center 30%'
  }, {
    src: 'laptop-tuning.jpg',
    cap: 'Datalogging a build',
    span: 1,
    pos: '40% center'
  }, {
    src: 'shop-front-609.jpg',
    cap: '609 Columbia St',
    span: 1,
    pos: 'center 65%'
  }, {
    src: 'tuner-fence.jpg',
    cap: 'Dialing it in',
    span: 1,
    pos: 'center 30%'
  }].map(p => /*#__PURE__*/React.createElement("figure", {
    key: p.src,
    className: "gtile",
    style: {
      gridColumn: p.span === 2 && !isMobile ? 'span 2' : 'span 1',
      position: 'relative',
      margin: 0,
      overflow: 'hidden',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.PHOTO + p.src,
    alt: p.cap,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: p.pos,
      display: 'block',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: '24px 12px 9px',
      background: 'linear-gradient(transparent, rgba(8,8,12,0.88))',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.04em',
      color: 'var(--steel-200)'
    }
  }, p.cap))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-page)',
      padding: '0 32px 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--red-600)',
      borderRadius: 'var(--radius-lg)',
      padding: isMobile ? '36px 24px' : '52px 48px',
      display: 'flex',
      alignItems: isMobile ? 'flex-start' : 'center',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      gap: isMobile ? 20 : 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'repeating-linear-gradient(-45deg, transparent 0 18px, rgba(0,0,0,0.06) 18px 36px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 38,
      textTransform: 'uppercase',
      color: '#fff',
      margin: 0,
      lineHeight: 1
    }
  }, "No guesswork. No compromise. Just results."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 17,
      color: 'rgba(255,255,255,0.88)',
      margin: '12px 0 0'
    }
  }, "Full dyno tunes from $650. Book online \u2014 we\u2019ll confirm within 24 hours.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "inverse",
    size: "lg",
    onClick: () => go('book'),
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      n: "Calendar",
      s: 18
    })
  }, "Book Your Tune")))));
}
Object.assign(window, {
  Home
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/Nav.jsx
try { (() => {
/* Top navigation — forge black, badge mark, hamburger on mobile. */
function Nav({
  route,
  go
}) {
  const {
    isMobile
  } = useViewport();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const links = [{
    id: 'home',
    label: 'Home'
  }, {
    id: 'services',
    label: 'Services'
  }, {
    id: 'dynoai',
    label: 'DynoAI'
  }, {
    id: 'dyno',
    label: 'Dyno'
  }];
  const navigate = id => {
    go(id);
    setMenuOpen(false);
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "th-dark",
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(15,15,20,0.96)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--ink-700)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      height: isMobile ? 58 : 68,
      padding: isMobile ? '0 18px' : '0 32px',
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? 0 : 28
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('home'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.ASSET + 'thunderhorse-badge-cream.png',
    alt: "Thunderhorse Tuning",
    style: {
      height: isMobile ? 34 : 42,
      width: 'auto'
    }
  }), !isMobile && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 17,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--bone)',
      lineHeight: 1,
      textAlign: 'left'
    }
  }, "Thunderhorse", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--steel-400)',
      fontWeight: 500,
      letterSpacing: '0.22em'
    }
  }, "Tuning"))), !isMobile && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 4,
      marginLeft: 12
    }
  }, links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l.id,
    onClick: () => navigate(l.id),
    style: {
      padding: '8px 14px',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 13,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: route === l.id ? 'var(--bone)' : 'var(--steel-400)',
      borderBottom: `2px solid ${route === l.id ? 'var(--red-500)' : 'transparent'}`
    }
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      color: 'var(--steel-300)',
      fontFamily: 'var(--font-mono)',
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    n: "Phone",
    s: 14,
    color: "var(--red-400)"
  }), " (607) 621-6885"), /*#__PURE__*/React.createElement(window.DS.Button, {
    variant: "primary",
    size: "md",
    onClick: () => navigate('book'),
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      n: "Calendar",
      s: 16
    })
  }, "Book Your Tune"))), isMobile && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(window.DS.Button, {
    variant: "primary",
    size: "sm",
    onClick: () => navigate('book')
  }, "Book"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMenuOpen(o => !o),
    "aria-label": menuOpen ? 'Close menu' : 'Open menu',
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      border: '1px solid var(--ink-600)',
      background: 'transparent',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      color: 'var(--bone)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    n: menuOpen ? 'X' : 'Menu',
    s: 20
  })))), isMobile && menuOpen && /*#__PURE__*/React.createElement("nav", {
    style: {
      background: 'var(--ink-900)',
      borderTop: '1px solid var(--ink-700)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l.id,
    onClick: () => navigate(l.id),
    style: {
      padding: '16px 22px',
      border: 'none',
      borderBottom: '1px solid var(--ink-800)',
      background: route === l.id ? 'var(--ink-800)' : 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 16,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: route === l.id ? 'var(--bone)' : 'var(--steel-400)'
    }
  }, l.label, route === l.id && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--red-500)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px'
    }
  }, /*#__PURE__*/React.createElement(window.DS.Button, {
    block: true,
    variant: "primary",
    size: "md",
    onClick: () => navigate('book'),
    iconLeft: /*#__PURE__*/React.createElement(Ico, {
      n: "Calendar",
      s: 16
    })
  }, "Book Your Tune")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 22px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      borderTop: '1px solid var(--ink-800)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    n: "Phone",
    s: 14,
    color: "var(--red-400)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--steel-300)'
    }
  }, "(607) 621-6885"))));
}
Object.assign(window, {
  Nav
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/SEO.jsx
try { (() => {
/* ================================================================
   SEO.jsx — Thunderhorse Tuning
   Manages <head> meta tags dynamically as the SPA route changes.
   Injects:
     · <title> + description + robots + canonical
     · Open Graph (og:*) + Twitter Card
     · LocalBusiness JSON-LD (once, all routes)
     · FAQPage JSON-LD (dynoai route only)
   ================================================================ */

const SITE_URL = 'https://thunderhorsetuning.com';
const OG_IMAGE = SITE_URL + '/assets/og-image.jpg';

/* ── Per-route copy ─────────────────────────────────────────── */
const PAGE_META = {
  home: {
    title: 'Thunderhorse Tuning | Precision V-Twin Dyno Tuning — Utica, NY',
    description: 'Professional motorcycle dyno tuning in Utica, NY. V-twin specialists for Harley-Davidson, Indian & Ducati. Powered by DynoAI — 97.5% VE accuracy. Full tunes from $650.',
    path: '/'
  },
  services: {
    title: 'Dyno Tuning Services & Pricing | Thunderhorse Tuning — Utica, NY',
    description: 'Full dyno tunes from $650, diagnostic & tune correction from $300. V-twin performance builds, Stage 1 through forced induction. Group & event tuning across Central New York.',
    path: '/services/'
  },
  dynoai: {
    title: 'DynoAI — Proprietary Motorcycle ECU Calibration | Thunderhorse Tuning',
    description: 'DynoAI uses physics-based volumetric-efficiency modeling for 97.5% VE accuracy from one WOT pull. 60–70% less dyno time. Written in-house by Rob Dawson.',
    path: '/dynoai/'
  },
  book: {
    title: 'Book a Dyno Tune | Thunderhorse Tuning — Utica, NY',
    description: 'Schedule your motorcycle dyno tune online. Free 30-min consult. Full tunes from $650. Confirmed within 24 hours. V-twin specialists.',
    path: '/book/'
  },
  dyno: {
    title: 'Dyno Results Dashboard | Thunderhorse Tuning',
    description: 'Live dyno results — peak power, torque, AFR, and knock monitoring. Powered by DynoAI proprietary calibration software.',
    path: '/dyno/'
  }
};

/* ── LocalBusiness JSON-LD ──────────────────────────────────── */
const LOCAL_BUSINESS_LD = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'AutoRepair'],
  '@id': SITE_URL + '/#business',
  name: 'Thunderhorse Tuning',
  legalName: 'Dawson Motoring LLC',
  description: 'Precision V-twin motorcycle dyno tuning in Utica, NY. Harley-Davidson, Indian & Ducati specialists. Proprietary DynoAI calibration software — 97.5% VE accuracy.',
  url: SITE_URL,
  telephone: '+16076216885',
  logo: SITE_URL + '/assets/logos/thunderhorse-badge-red.png',
  image: SITE_URL + '/assets/photos/dyno-rider-plaid.jpg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '609 Columbia St',
    addressLocality: 'Utica',
    addressRegion: 'NY',
    postalCode: '13501',
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.100921,
    longitude: -75.232738
  },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00'
  }, {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday'],
    opens: '09:00',
    closes: '15:00'
  }],
  priceRange: '$$',
  currenciesAccepted: 'USD',
  areaServed: ['Utica, NY', 'Rome, NY', 'Syracuse, NY', 'Cooperstown, NY', 'Oneonta, NY', 'Herkimer, NY'].map(function (name) {
    return {
      '@type': 'City',
      name: name
    };
  }),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Motorcycle Dyno Tuning Services',
    itemListElement: [{
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Full Dyno Tune',
        description: 'Custom ECU calibration via DynoAI — physics-based VE modeling, real-time knock/AFR monitoring, full dyno sheets included.',
        provider: {
          '@id': SITE_URL + '/#business'
        }
      },
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'USD',
        minPrice: 650,
        maxPrice: 850
      }
    }, {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Diagnostic & Tune Correction',
        description: 'Identify and correct existing tune issues — AFR analysis, knock review, VE table correction.',
        provider: {
          '@id': SITE_URL + '/#business'
        }
      },
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'USD',
        price: 300
      }
    }, {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Performance Build Tuning',
        description: 'Stage 1 through big bore, stroker and forced induction — quoted individually.',
        provider: {
          '@id': SITE_URL + '/#business'
        }
      }
    }, {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Group & Event Tuning',
        description: 'Motorcycle rallies, MC club meets and shop events across Central New York. 5-bike minimum.',
        provider: {
          '@id': SITE_URL + '/#business'
        }
      }
    }]
  },
  sameAs: ['https://www.thunderhorsetuning.com']
};

/* ── DynoAI FAQ JSON-LD ─────────────────────────────────────── */
const DYNOAI_FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [{
    '@type': 'Question',
    name: 'What is DynoAI?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'DynoAI is Thunderhorse Tuning\'s proprietary ECU calibration software. It uses physics-based volumetric-efficiency (VE) modeling to achieve 97.5% VE accuracy from a single WOT pull — covering ~98% of the VE table versus ~80% with traditional methods.'
    }
  }, {
    '@type': 'Question',
    name: 'How much does a motorcycle dyno tune cost?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Full dyno tunes at Thunderhorse Tuning start at $650 (most $650–$850). Diagnostic & tune correction starts at $300. Performance build tuning is quoted individually. Book a free 30-minute consult online.'
    }
  }, {
    '@type': 'Question',
    name: 'How long does a dyno tune take with DynoAI?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'DynoAI uses 60–70% less dyno time than traditional methods, allowing 2–3× more bikes per day. A full tune typically requires only 2–4 pulls to dial in.'
    }
  }, {
    '@type': 'Question',
    name: 'What motorcycles does Thunderhorse Tuning work on?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Thunderhorse Tuning specializes in V-twins — Harley-Davidson, Indian, and Ducati — but all bikes are welcome including sport, ADV, metric cruisers, and custom builds.'
    }
  }, {
    '@type': 'Question',
    name: 'Does Thunderhorse Tuning offer mobile or event tuning?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes. In addition to in-house dyno tuning at 609 Columbia St, Utica NY, Thunderhorse Tuning offers group and event tuning at rallies, MC club meets, and shop events across Central New York. Minimum 5 bikes.'
    }
  }]
};

/* ── DOM helpers ────────────────────────────────────────────── */
function setMeta(selector, attr, value) {
  var el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    var m = selector.match(/\[([^\]="]+)="([^"]+)"\]/);
    if (m) el.setAttribute(m[1], m[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}
function setLink(rel, href) {
  var el = document.querySelector('link[rel="' + rel + '"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}
function injectLD(id, data) {
  var el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}
function removeLD(id) {
  var el = document.getElementById(id);
  if (el) el.remove();
}

/* ── Hooks ──────────────────────────────────────────────────── */
function useSEOMeta(route) {
  React.useEffect(function () {
    var m = PAGE_META[route] || PAGE_META.home;
    var url = SITE_URL + m.path;
    document.title = m.title;

    // Standard
    setMeta('meta[name="description"]', 'content', m.description);
    setMeta('meta[name="robots"]', 'content', 'index, follow');
    setLink('canonical', url);

    // Open Graph
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:site_name"]', 'content', 'Thunderhorse Tuning');
    setMeta('meta[property="og:locale"]', 'content', 'en_US');
    setMeta('meta[property="og:title"]', 'content', m.title);
    setMeta('meta[property="og:description"]', 'content', m.description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:image"]', 'content', OG_IMAGE);
    setMeta('meta[property="og:image:width"]', 'content', '1024');
    setMeta('meta[property="og:image:height"]', 'content', '537');
    setMeta('meta[property="og:image:alt"]', 'content', 'Thunderhorse Tuning — Precision V-Twin Dyno Tuning, Utica NY');

    // Twitter Card
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', m.title);
    setMeta('meta[name="twitter:description"]', 'content', m.description);
    setMeta('meta[name="twitter:image"]', 'content', OG_IMAGE);
    setMeta('meta[name="twitter:image:alt"]', 'content', 'Thunderhorse Tuning — Precision V-Twin Dyno Tuning');

    // Route-specific LD
    if (route === 'dynoai') {
      injectLD('ld-faq', DYNOAI_FAQ_LD);
    } else {
      removeLD('ld-faq');
    }
  }, [route]);
}
function useStructuredData() {
  React.useEffect(function () {
    injectLD('ld-local-business', LOCAL_BUSINESS_LD);
  }, []);
}

/* ── Component (renders nothing — head-only side-effects) ───── */
function SEOMeta(props) {
  useSEOMeta(props.route);
  useStructuredData();
  return null;
}
Object.assign(window, {
  SEOMeta,
  PAGE_META,
  LOCAL_BUSINESS_LD,
  DYNOAI_FAQ_LD
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/SEO.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/Services.jsx
try { (() => {
/* Services / pricing — real Thunderhorse offerings, filterable. */
function Services({
  go
}) {
  const {
    Card,
    CardTitle,
    Button,
    Badge,
    Tag
  } = window.DS;
  const {
    isMobile
  } = useViewport();
  const [filter, setFilter] = React.useState('all');
  const tiers = [{
    id: 'tune',
    cat: 'shop',
    name: 'Full Dyno Tune',
    price: '650',
    suffix: 'starting at',
    popular: true,
    blurb: 'Complete ECU calibration on our in-house dyno. Fueling, timing, idle — dialed in for your motor and your mods, not copy-pasted from someone else’s bike.',
    feats: ['In-house dyno session', 'DynoAI calibration', 'Knock & AFR targeting', 'V-twin specialty, all bikes', 'Full dyno sheets included']
  }, {
    id: 'diag',
    cat: 'shop',
    name: 'Diagnostic & Correction',
    price: '300',
    suffix: 'starting at',
    popular: false,
    blurb: 'ECU scan plus a baseline dyno pull to see where your bike actually sits. Also covers fixing a bad tune from another shop — lean cruise, rich idle, bad timing.',
    feats: ['ECU scan', 'Baseline dyno pull', 'Bad-tune correction', 'We show you the data', 'Fixed right']
  }, {
    id: 'build',
    cat: 'build',
    name: 'Performance Builds',
    price: 'Quote',
    suffix: 'per build',
    popular: false,
    blurb: 'Parts, install and calibration — Stage 1 upgrades through big bore, strokers and forced induction. Quoted individually because no two builds are the same.',
    feats: ['Stage 1 → forced induction', 'Big bore & strokers', 'Parts + install + tune', 'Free consultation', 'Built to your goals']
  }];
  const event = {
    name: 'Group & Event Tuning',
    area: 'Central New York',
    blurb: 'Club rides, rallies and shop events across CNY — Utica, Rome, Syracuse, Cooperstown, Oneonta. We bring the operation to you. Five-bike minimum makes the move worth it.'
  };
  const filters = [['all', 'All'], ['shop', 'Shop'], ['build', 'Builds'], ['event', 'Group / Event']];
  const showTier = t => filter === 'all' || t.cat === filter;
  const showEvent = filter === 'all' || filter === 'event';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    className: "th-dark",
    style: {
      position: 'relative',
      height: 260,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.PHOTO + 'dyno-rider-plaid.jpg',
    alt: "Customer bike on the Thunderhorse Tuning dyno",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: '60% 35%',
      display: 'block',
      filter: 'brightness(0.55)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right, rgba(8,8,12,0.85) 0%, rgba(8,8,12,0.3) 60%, transparent)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      padding: '0 44px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: 8
    }
  }, "Utica, NY \xB7 All bikes welcome"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 52,
      lineHeight: 0.97,
      textTransform: 'uppercase',
      color: 'var(--white)',
      margin: 0
    }
  }, "Services", /*#__PURE__*/React.createElement("br", null), "& Pricing"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 6,
      background: 'var(--hazard)'
    }
  })), /*#__PURE__*/React.createElement(Section, {
    style: {
      paddingBottom: 24
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 17,
      color: 'var(--text-muted)',
      maxWidth: 640,
      margin: '0 0 24px'
    }
  }, "Full dyno tuning at our Utica shop. We specialize in V-twins \u2014 Harley-Davidson, Indian, Ducati \u2014 and tune everything else too. Most tunes run $650\u2013$850 depending on mods."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, filters.map(([id, lab]) => /*#__PURE__*/React.createElement(Tag, {
    key: id,
    selected: filter === id,
    onClick: () => setFilter(id)
  }, lab)))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-page)',
      padding: '0 32px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
      gap: 16
    }
  }, tiers.filter(showTier).map(t => /*#__PURE__*/React.createElement(Card, {
    key: t.id,
    rail: t.popular,
    padding: "0",
    style: {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 24px 18px',
      borderBottom: '1px solid var(--border)',
      background: t.popular ? 'var(--ink-900)' : 'var(--surface-card)'
    },
    className: t.popular ? 'th-dark' : ''
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(CardTitle, {
    style: {
      color: t.popular ? 'var(--white)' : 'var(--text-strong)'
    }
  }, t.name), t.popular && /*#__PURE__*/React.createElement(Badge, {
    tone: "brand",
    solid: true
  }, "Most Booked")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 4
    }
  }, t.price !== 'Quote' && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 16,
      color: t.popular ? 'var(--steel-400)' : 'var(--text-muted)'
    }
  }, "$"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: t.price === 'Quote' ? 30 : 42,
      lineHeight: 1,
      color: t.popular ? 'var(--red-400)' : 'var(--text-strong)'
    }
  }, t.price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: t.popular ? 'var(--steel-400)' : 'var(--text-muted)',
      marginLeft: 4
    }
  }, t.suffix)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      lineHeight: 1.5,
      color: t.popular ? 'var(--steel-300)' : 'var(--text-muted)',
      margin: '12px 0 0'
    }
  }, t.blurb)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 24px 22px',
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 9,
      flex: 1
    }
  }, t.feats.map(f => /*#__PURE__*/React.createElement("li", {
    key: f,
    style: {
      display: 'flex',
      gap: 9,
      alignItems: 'center',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    n: "Check",
    s: 15,
    color: "var(--red-500)"
  }), " ", f))), /*#__PURE__*/React.createElement(Button, {
    block: true,
    variant: t.popular ? 'primary' : 'secondary',
    style: {
      marginTop: 20
    },
    onClick: () => go('book')
  }, t.price === 'Quote' ? 'Request Quote' : 'Book Now')))))), showEvent && /*#__PURE__*/React.createElement(Section, {
    style: {
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "0",
    rail: true,
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      alignItems: 'center',
      gap: 24,
      padding: '26px 30px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: 50,
      height: 50,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--red-50)',
      borderRadius: 'var(--radius-md)',
      color: 'var(--red-600)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    n: "Users",
    s: 26
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(CardTitle, null, event.name), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "5+ bikes")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--text-muted)',
      margin: '6px 0 0',
      maxWidth: 680
    }
  }, event.blurb))), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => go('book'),
    iconRight: /*#__PURE__*/React.createElement(Ico, {
      n: "ArrowRight",
      s: 16
    })
  }, "Request Event Quote")))));
}
Object.assign(window, {
  Services
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/Services.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/shared.jsx
try { (() => {
/* Shared helpers for the Thunderhorse web UI kit. Exports to window. */
const DS = window.ThunderhorseTuningDesignSystem_fe7e73;

// Lucide icon helper
function Ico({
  n,
  s = 18,
  color,
  style
}) {
  const ref = React.useRef();
  React.useEffect(() => {
    if (ref.current && window.lucide && window.lucide[n]) {
      ref.current.innerHTML = '';
      const el = window.lucide.createElement(window.lucide[n]);
      el.setAttribute('width', s);
      el.setAttribute('height', s);
      el.setAttribute('stroke-width', '2');
      ref.current.appendChild(el);
    }
  }, [n, s]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      color: color || 'currentColor',
      ...style
    }
  });
}
const ASSET = '../../assets/logos/';
const PHOTO = '../../assets/photos/';

// Responsive hook — subscribe to window width
function useViewport() {
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const h = () => setWidth(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return {
    isMobile: width < 768,
    isTablet: width < 1024,
    width
  };
}

// Section wrapper with max-width container
function Section({
  children,
  dark = false,
  style = {},
  id
}) {
  const {
    isMobile
  } = useViewport();
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    className: dark ? 'th-dark' : '',
    style: {
      background: dark ? 'var(--ink-900)' : 'var(--surface-page)',
      padding: isMobile ? '48px 20px' : '72px 32px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto'
    }
  }, children));
}
function Eyebrow({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--text-brand)',
      ...style
    }
  }, children);
}
function HazardRule({
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: 'var(--hazard)',
      ...style
    }
  });
}
Object.assign(window, {
  DS,
  Ico,
  ASSET,
  PHOTO,
  Section,
  Eyebrow,
  HazardRule,
  useViewport
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/shared.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.StatReadout = __ds_scope.StatReadout;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
