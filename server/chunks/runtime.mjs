import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { promises, existsSync } from 'node:fs';
import { dirname as dirname$1, resolve as resolve$1, join } from 'node:path';
import BaseStyle from '@primevue/core/base/style';
import { isNotEmpty, isEmpty } from '@primeuix/utils/object';
import { Theme } from '@primeuix/styled';
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import { fileURLToPath } from 'node:url';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import passwordGenerator from 'generate-password';
import require$$1 from 'crypto';
import crypto from 'node:crypto';
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import { getIcons } from '@iconify/utils';
import { createConsola as createConsola$1 } from 'consola/core';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXH3Handler } from 'ipx';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE = /%252f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function encodeParam(text) {
  return encodePath(text).replace(SLASH_RE, "%2F");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class WordArray {
  constructor(words, sigBytes) {
    __publicField$1(this, "words");
    __publicField$1(this, "sigBytes");
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    __publicField$1(this, "_data", new WordArray());
    __publicField$1(this, "_nDataBytes", 0);
    __publicField$1(this, "_minBufferSize", 0);
    __publicField$1(this, "blockSize", 512 / 32);
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$3(obj, key + "" , value);
  return value;
};
const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    __publicField$3(this, "_hash", new WordArray([...H]));
  }
  /**
   * Resets the internal state of the hash object to initial values.
   */
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  /**
   * Finishes the hash calculation and returns the hash as a WordArray.
   *
   * @param {string} messageUpdate - Additional message content to include in the hash.
   * @returns {WordArray} The finalised hash as a WordArray.
   */
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

function isEqual(object1, object2, hashOptions = {}) {
  if (object1 === object2) {
    return true;
  }
  if (objectHash(object1, hashOptions) === objectHash(object2, hashOptions)) {
    return true;
  }
  return false;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  // eslint-disable-next-line require-yield
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

function useBase(base, handler) {
  base = withoutTrailingSlash(base);
  if (!base || base === "/") {
    return handler;
  }
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _path = event._path || event.node.req.url || "/";
    event._path = withoutBase(event.path || "/", base);
    event.node.req.url = event._path;
    try {
      return await handler(event);
    } finally {
      event._path = event.node.req.url = _path;
    }
  });
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function parse(multipartBodyBuffer, boundary) {
  let lastline = "";
  let state = 0 /* INIT */;
  let buffer = [];
  const allParts = [];
  let currentPartHeaders = [];
  for (let i = 0; i < multipartBodyBuffer.length; i++) {
    const prevByte = i > 0 ? multipartBodyBuffer[i - 1] : null;
    const currByte = multipartBodyBuffer[i];
    const newLineChar = currByte === 10 || currByte === 13;
    if (!newLineChar) {
      lastline += String.fromCodePoint(currByte);
    }
    const newLineDetected = currByte === 10 && prevByte === 13;
    if (0 /* INIT */ === state && newLineDetected) {
      if ("--" + boundary === lastline) {
        state = 1 /* READING_HEADERS */;
      }
      lastline = "";
    } else if (1 /* READING_HEADERS */ === state && newLineDetected) {
      if (lastline.length > 0) {
        const i2 = lastline.indexOf(":");
        if (i2 > 0) {
          const name = lastline.slice(0, i2).toLowerCase();
          const value = lastline.slice(i2 + 1).trim();
          currentPartHeaders.push([name, value]);
        }
      } else {
        state = 2 /* READING_DATA */;
        buffer = [];
      }
      lastline = "";
    } else if (2 /* READING_DATA */ === state) {
      if (lastline.length > boundary.length + 4) {
        lastline = "";
      }
      if ("--" + boundary === lastline) {
        const j = buffer.length - lastline.length;
        const part = buffer.slice(0, j - 1);
        allParts.push(process$1(part, currentPartHeaders));
        buffer = [];
        currentPartHeaders = [];
        lastline = "";
        state = 3 /* READING_PART_SEPARATOR */;
      } else {
        buffer.push(currByte);
      }
      if (newLineDetected) {
        lastline = "";
      }
    } else if (3 /* READING_PART_SEPARATOR */ === state && newLineDetected) {
      state = 1 /* READING_HEADERS */;
    }
  }
  return allParts;
}
function process$1(data, headers) {
  const dataObj = {};
  const contentDispositionHeader = headers.find((h) => h[0] === "content-disposition")?.[1] || "";
  for (const i of contentDispositionHeader.split(";")) {
    const s = i.split("=");
    if (s.length !== 2) {
      continue;
    }
    const key = (s[0] || "").trim();
    if (key === "name" || key === "filename") {
      const _value = (s[1] || "").trim().replace(/"/g, "");
      dataObj[key] = Buffer.from(_value, "latin1").toString("utf8");
    }
  }
  const contentType = headers.find((h) => h[0] === "content-type")?.[1] || "";
  if (contentType) {
    dataObj.type = contentType;
  }
  dataObj.data = Buffer.from(data);
  return dataObj;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const xForwardedHost = event.node.req.headers["x-forwarded-host"];
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
async function readMultipartFormData(event) {
  const contentType = getRequestHeader(event, "content-type");
  if (!contentType || !contentType.startsWith("multipart/form-data")) {
    return;
  }
  const boundary = contentType.match(/boundary=([^;]*)(;|$)/i)?.[1];
  if (!boundary) {
    return;
  }
  const body = await readRawBody(event, false);
  if (!body) {
    return;
  }
  return parse(body, boundary);
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function parseCookies(event) {
  return parse$1(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions) {
  serializeOptions = { path: "/", ...serializeOptions };
  const cookieStr = serialize(name, value, serializeOptions);
  let setCookies = event.node.res.getHeader("set-cookie");
  if (!Array.isArray(setCookies)) {
    setCookies = [setCookies];
  }
  const _optionsHash = objectHash(serializeOptions);
  setCookies = setCookies.filter((cookieValue) => {
    return cookieValue && _optionsHash !== objectHash(parse$1(cookieValue));
  });
  event.node.res.setHeader("set-cookie", [...setCookies, cookieStr]);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
const setHeader = setResponseHeader;
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name)) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    // Hooks
    __publicField(this, "_onBeforeResponseCalled");
    __publicField(this, "_onAfterResponseCalled");
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch$1({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch$1 = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch$1({ fetch: fetch$1, Headers: Headers$1, AbortController });
const $fetch$1 = ofetch;

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const inlineAppConfig = {
  "nuxt": {},
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 500
  }
};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "14d01f99-6385-4606-aa09-30a7d7e87739",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "iamVerifyRegistrations": "true",
    "iamAllowGoogleAuth": "false",
    "publicUrl": "https://health.dentestore.info",
    "appName": "Dente Store",
    "clientId": "BAA3Ed4K6B7Vwb6XZcjC-Qw38bT-Ga7bw55d3Fyu88WGD_Vy6kPqs-EZ4qXKRU3tXLdBKYHaOzx9FstEzs",
    "metaPixel": "1041916916627297",
    "googleSignIn": {
      "clientId": "246597668177-k0k16auvrks41vr0ubbuihf693eppeti.apps.googleusercontent.com"
    },
    "piniaPluginPersistedstate": {},
    "primevue": {
      "usePrimeVue": true,
      "autoImport": true,
      "resolvePath": "",
      "importPT": "",
      "importTheme": {
        "from": "~/assets/primevue-theme.ts"
      },
      "loadStyles": true,
      "options": {},
      "components": [
        {
          "name": "AutoComplete",
          "as": "AutoComplete",
          "from": "primevue/autocomplete",
          "export": "default",
          "filePath": "primevue/autocomplete",
          "global": true
        },
        {
          "name": "Calendar",
          "as": "Calendar",
          "from": "primevue/calendar",
          "export": "default",
          "filePath": "primevue/calendar",
          "global": true
        },
        {
          "name": "CascadeSelect",
          "as": "CascadeSelect",
          "from": "primevue/cascadeselect",
          "export": "default",
          "filePath": "primevue/cascadeselect",
          "global": true
        },
        {
          "name": "Checkbox",
          "as": "Checkbox",
          "from": "primevue/checkbox",
          "export": "default",
          "filePath": "primevue/checkbox",
          "global": true
        },
        {
          "name": "Chips",
          "as": "Chips",
          "from": "primevue/chips",
          "export": "default",
          "filePath": "primevue/chips",
          "global": true
        },
        {
          "name": "ColorPicker",
          "as": "ColorPicker",
          "from": "primevue/colorpicker",
          "export": "default",
          "filePath": "primevue/colorpicker",
          "global": true
        },
        {
          "name": "DatePicker",
          "as": "DatePicker",
          "from": "primevue/datepicker",
          "export": "default",
          "filePath": "primevue/datepicker",
          "global": true
        },
        {
          "name": "Dropdown",
          "as": "Dropdown",
          "from": "primevue/dropdown",
          "export": "default",
          "filePath": "primevue/dropdown",
          "global": true
        },
        {
          "name": "FloatLabel",
          "as": "FloatLabel",
          "from": "primevue/floatlabel",
          "export": "default",
          "filePath": "primevue/floatlabel",
          "global": true
        },
        {
          "name": "Fluid",
          "as": "Fluid",
          "from": "primevue/fluid",
          "export": "default",
          "filePath": "primevue/fluid",
          "global": true
        },
        {
          "name": "IconField",
          "as": "IconField",
          "from": "primevue/iconfield",
          "export": "default",
          "filePath": "primevue/iconfield",
          "global": true
        },
        {
          "name": "IftaLabel",
          "as": "IftaLabel",
          "from": "primevue/iftalabel",
          "export": "default",
          "filePath": "primevue/iftalabel",
          "global": true
        },
        {
          "name": "InputChips",
          "as": "InputChips",
          "from": "primevue/inputchips",
          "export": "default",
          "filePath": "primevue/inputchips",
          "global": true
        },
        {
          "name": "InputGroup",
          "as": "InputGroup",
          "from": "primevue/inputgroup",
          "export": "default",
          "filePath": "primevue/inputgroup",
          "global": true
        },
        {
          "name": "InputGroupAddon",
          "as": "InputGroupAddon",
          "from": "primevue/inputgroupaddon",
          "export": "default",
          "filePath": "primevue/inputgroupaddon",
          "global": true
        },
        {
          "name": "InputIcon",
          "as": "InputIcon",
          "from": "primevue/inputicon",
          "export": "default",
          "filePath": "primevue/inputicon",
          "global": true
        },
        {
          "name": "InputMask",
          "as": "InputMask",
          "from": "primevue/inputmask",
          "export": "default",
          "filePath": "primevue/inputmask",
          "global": true
        },
        {
          "name": "InputNumber",
          "as": "InputNumber",
          "from": "primevue/inputnumber",
          "export": "default",
          "filePath": "primevue/inputnumber",
          "global": true
        },
        {
          "name": "InputOtp",
          "as": "InputOtp",
          "from": "primevue/inputotp",
          "export": "default",
          "filePath": "primevue/inputotp",
          "global": true
        },
        {
          "name": "InputSwitch",
          "as": "InputSwitch",
          "from": "primevue/inputswitch",
          "export": "default",
          "filePath": "primevue/inputswitch",
          "global": true
        },
        {
          "name": "InputText",
          "as": "InputText",
          "from": "primevue/inputtext",
          "export": "default",
          "filePath": "primevue/inputtext",
          "global": true
        },
        {
          "name": "Knob",
          "as": "Knob",
          "from": "primevue/knob",
          "export": "default",
          "filePath": "primevue/knob",
          "global": true
        },
        {
          "name": "Listbox",
          "as": "Listbox",
          "from": "primevue/listbox",
          "export": "default",
          "filePath": "primevue/listbox",
          "global": true
        },
        {
          "name": "MultiSelect",
          "as": "MultiSelect",
          "from": "primevue/multiselect",
          "export": "default",
          "filePath": "primevue/multiselect",
          "global": true
        },
        {
          "name": "Password",
          "as": "Password",
          "from": "primevue/password",
          "export": "default",
          "filePath": "primevue/password",
          "global": true
        },
        {
          "name": "RadioButton",
          "as": "RadioButton",
          "from": "primevue/radiobutton",
          "export": "default",
          "filePath": "primevue/radiobutton",
          "global": true
        },
        {
          "name": "Rating",
          "as": "Rating",
          "from": "primevue/rating",
          "export": "default",
          "filePath": "primevue/rating",
          "global": true
        },
        {
          "name": "Select",
          "as": "Select",
          "from": "primevue/select",
          "export": "default",
          "filePath": "primevue/select",
          "global": true
        },
        {
          "name": "SelectButton",
          "as": "SelectButton",
          "from": "primevue/selectbutton",
          "export": "default",
          "filePath": "primevue/selectbutton",
          "global": true
        },
        {
          "name": "Slider",
          "as": "Slider",
          "from": "primevue/slider",
          "export": "default",
          "filePath": "primevue/slider",
          "global": true
        },
        {
          "name": "Textarea",
          "as": "Textarea",
          "from": "primevue/textarea",
          "export": "default",
          "filePath": "primevue/textarea",
          "global": true
        },
        {
          "name": "ToggleButton",
          "as": "ToggleButton",
          "from": "primevue/togglebutton",
          "export": "default",
          "filePath": "primevue/togglebutton",
          "global": true
        },
        {
          "name": "ToggleSwitch",
          "as": "ToggleSwitch",
          "from": "primevue/toggleswitch",
          "export": "default",
          "filePath": "primevue/toggleswitch",
          "global": true
        },
        {
          "name": "TreeSelect",
          "as": "TreeSelect",
          "from": "primevue/treeselect",
          "export": "default",
          "filePath": "primevue/treeselect",
          "global": true
        },
        {
          "name": "Button",
          "as": "Button",
          "from": "primevue/button",
          "export": "default",
          "filePath": "primevue/button",
          "global": true
        },
        {
          "name": "ButtonGroup",
          "as": "ButtonGroup",
          "from": "primevue/buttongroup",
          "export": "default",
          "filePath": "primevue/buttongroup",
          "global": true
        },
        {
          "name": "SpeedDial",
          "as": "SpeedDial",
          "from": "primevue/speeddial",
          "export": "default",
          "filePath": "primevue/speeddial",
          "global": true
        },
        {
          "name": "SplitButton",
          "as": "SplitButton",
          "from": "primevue/splitbutton",
          "export": "default",
          "filePath": "primevue/splitbutton",
          "global": true
        },
        {
          "name": "Column",
          "as": "Column",
          "from": "primevue/column",
          "export": "default",
          "filePath": "primevue/column",
          "global": true
        },
        {
          "name": "Row",
          "as": "Row",
          "from": "primevue/row",
          "export": "default",
          "filePath": "primevue/row",
          "global": true
        },
        {
          "name": "ColumnGroup",
          "as": "ColumnGroup",
          "from": "primevue/columngroup",
          "export": "default",
          "filePath": "primevue/columngroup",
          "global": true
        },
        {
          "name": "DataTable",
          "as": "DataTable",
          "from": "primevue/datatable",
          "export": "default",
          "filePath": "primevue/datatable",
          "global": true
        },
        {
          "name": "DataView",
          "as": "DataView",
          "from": "primevue/dataview",
          "export": "default",
          "filePath": "primevue/dataview",
          "global": true
        },
        {
          "name": "OrderList",
          "as": "OrderList",
          "from": "primevue/orderlist",
          "export": "default",
          "filePath": "primevue/orderlist",
          "global": true
        },
        {
          "name": "OrganizationChart",
          "as": "OrganizationChart",
          "from": "primevue/organizationchart",
          "export": "default",
          "filePath": "primevue/organizationchart",
          "global": true
        },
        {
          "name": "Paginator",
          "as": "Paginator",
          "from": "primevue/paginator",
          "export": "default",
          "filePath": "primevue/paginator",
          "global": true
        },
        {
          "name": "PickList",
          "as": "PickList",
          "from": "primevue/picklist",
          "export": "default",
          "filePath": "primevue/picklist",
          "global": true
        },
        {
          "name": "Tree",
          "as": "Tree",
          "from": "primevue/tree",
          "export": "default",
          "filePath": "primevue/tree",
          "global": true
        },
        {
          "name": "TreeTable",
          "as": "TreeTable",
          "from": "primevue/treetable",
          "export": "default",
          "filePath": "primevue/treetable",
          "global": true
        },
        {
          "name": "Timeline",
          "as": "Timeline",
          "from": "primevue/timeline",
          "export": "default",
          "filePath": "primevue/timeline",
          "global": true
        },
        {
          "name": "VirtualScroller",
          "as": "VirtualScroller",
          "from": "primevue/virtualscroller",
          "export": "default",
          "filePath": "primevue/virtualscroller",
          "global": true
        },
        {
          "name": "Accordion",
          "as": "Accordion",
          "from": "primevue/accordion",
          "export": "default",
          "filePath": "primevue/accordion",
          "global": true
        },
        {
          "name": "AccordionPanel",
          "as": "AccordionPanel",
          "from": "primevue/accordionpanel",
          "export": "default",
          "filePath": "primevue/accordionpanel",
          "global": true
        },
        {
          "name": "AccordionHeader",
          "as": "AccordionHeader",
          "from": "primevue/accordionheader",
          "export": "default",
          "filePath": "primevue/accordionheader",
          "global": true
        },
        {
          "name": "AccordionContent",
          "as": "AccordionContent",
          "from": "primevue/accordioncontent",
          "export": "default",
          "filePath": "primevue/accordioncontent",
          "global": true
        },
        {
          "name": "AccordionTab",
          "as": "AccordionTab",
          "from": "primevue/accordiontab",
          "export": "default",
          "filePath": "primevue/accordiontab",
          "global": true
        },
        {
          "name": "Card",
          "as": "Card",
          "from": "primevue/card",
          "export": "default",
          "filePath": "primevue/card",
          "global": true
        },
        {
          "name": "DeferredContent",
          "as": "DeferredContent",
          "from": "primevue/deferredcontent",
          "export": "default",
          "filePath": "primevue/deferredcontent",
          "global": true
        },
        {
          "name": "Divider",
          "as": "Divider",
          "from": "primevue/divider",
          "export": "default",
          "filePath": "primevue/divider",
          "global": true
        },
        {
          "name": "Fieldset",
          "as": "Fieldset",
          "from": "primevue/fieldset",
          "export": "default",
          "filePath": "primevue/fieldset",
          "global": true
        },
        {
          "name": "Panel",
          "as": "Panel",
          "from": "primevue/panel",
          "export": "default",
          "filePath": "primevue/panel",
          "global": true
        },
        {
          "name": "ScrollPanel",
          "as": "ScrollPanel",
          "from": "primevue/scrollpanel",
          "export": "default",
          "filePath": "primevue/scrollpanel",
          "global": true
        },
        {
          "name": "Splitter",
          "as": "Splitter",
          "from": "primevue/splitter",
          "export": "default",
          "filePath": "primevue/splitter",
          "global": true
        },
        {
          "name": "SplitterPanel",
          "as": "SplitterPanel",
          "from": "primevue/splitterpanel",
          "export": "default",
          "filePath": "primevue/splitterpanel",
          "global": true
        },
        {
          "name": "Stepper",
          "as": "Stepper",
          "from": "primevue/stepper",
          "export": "default",
          "filePath": "primevue/stepper",
          "global": true
        },
        {
          "name": "StepList",
          "as": "StepList",
          "from": "primevue/steplist",
          "export": "default",
          "filePath": "primevue/steplist",
          "global": true
        },
        {
          "name": "Step",
          "as": "Step",
          "from": "primevue/step",
          "export": "default",
          "filePath": "primevue/step",
          "global": true
        },
        {
          "name": "StepItem",
          "as": "StepItem",
          "from": "primevue/stepitem",
          "export": "default",
          "filePath": "primevue/stepitem",
          "global": true
        },
        {
          "name": "StepPanels",
          "as": "StepPanels",
          "from": "primevue/steppanels",
          "export": "default",
          "filePath": "primevue/steppanels",
          "global": true
        },
        {
          "name": "StepPanel",
          "as": "StepPanel",
          "from": "primevue/steppanel",
          "export": "default",
          "filePath": "primevue/steppanel",
          "global": true
        },
        {
          "name": "TabView",
          "as": "TabView",
          "from": "primevue/tabview",
          "export": "default",
          "filePath": "primevue/tabview",
          "global": true
        },
        {
          "name": "Tabs",
          "as": "Tabs",
          "from": "primevue/tabs",
          "export": "default",
          "filePath": "primevue/tabs",
          "global": true
        },
        {
          "name": "TabList",
          "as": "TabList",
          "from": "primevue/tablist",
          "export": "default",
          "filePath": "primevue/tablist",
          "global": true
        },
        {
          "name": "Tab",
          "as": "Tab",
          "from": "primevue/tab",
          "export": "default",
          "filePath": "primevue/tab",
          "global": true
        },
        {
          "name": "TabPanels",
          "as": "TabPanels",
          "from": "primevue/tabpanels",
          "export": "default",
          "filePath": "primevue/tabpanels",
          "global": true
        },
        {
          "name": "TabPanel",
          "as": "TabPanel",
          "from": "primevue/tabpanel",
          "export": "default",
          "filePath": "primevue/tabpanel",
          "global": true
        },
        {
          "name": "Toolbar",
          "as": "Toolbar",
          "from": "primevue/toolbar",
          "export": "default",
          "filePath": "primevue/toolbar",
          "global": true
        },
        {
          "name": "ConfirmDialog",
          "use": {
            "as": "ConfirmationService"
          },
          "as": "ConfirmDialog",
          "from": "primevue/confirmdialog",
          "export": "default",
          "filePath": "primevue/confirmdialog",
          "global": true
        },
        {
          "name": "ConfirmPopup",
          "use": {
            "as": "ConfirmationService"
          },
          "as": "ConfirmPopup",
          "from": "primevue/confirmpopup",
          "export": "default",
          "filePath": "primevue/confirmpopup",
          "global": true
        },
        {
          "name": "Dialog",
          "as": "Dialog",
          "from": "primevue/dialog",
          "export": "default",
          "filePath": "primevue/dialog",
          "global": true
        },
        {
          "name": "Drawer",
          "as": "Drawer",
          "from": "primevue/drawer",
          "export": "default",
          "filePath": "primevue/drawer",
          "global": true
        },
        {
          "name": "DynamicDialog",
          "use": {
            "as": "DialogService"
          },
          "as": "DynamicDialog",
          "from": "primevue/dynamicdialog",
          "export": "default",
          "filePath": "primevue/dynamicdialog",
          "global": true
        },
        {
          "name": "OverlayPanel",
          "as": "OverlayPanel",
          "from": "primevue/overlaypanel",
          "export": "default",
          "filePath": "primevue/overlaypanel",
          "global": true
        },
        {
          "name": "Popover",
          "as": "Popover",
          "from": "primevue/popover",
          "export": "default",
          "filePath": "primevue/popover",
          "global": true
        },
        {
          "name": "Sidebar",
          "as": "Sidebar",
          "from": "primevue/sidebar",
          "export": "default",
          "filePath": "primevue/sidebar",
          "global": true
        },
        {
          "name": "FileUpload",
          "as": "FileUpload",
          "from": "primevue/fileupload",
          "export": "default",
          "filePath": "primevue/fileupload",
          "global": true
        },
        {
          "name": "Breadcrumb",
          "as": "Breadcrumb",
          "from": "primevue/breadcrumb",
          "export": "default",
          "filePath": "primevue/breadcrumb",
          "global": true
        },
        {
          "name": "ContextMenu",
          "as": "ContextMenu",
          "from": "primevue/contextmenu",
          "export": "default",
          "filePath": "primevue/contextmenu",
          "global": true
        },
        {
          "name": "Dock",
          "as": "Dock",
          "from": "primevue/dock",
          "export": "default",
          "filePath": "primevue/dock",
          "global": true
        },
        {
          "name": "Menu",
          "as": "Menu",
          "from": "primevue/menu",
          "export": "default",
          "filePath": "primevue/menu",
          "global": true
        },
        {
          "name": "Menubar",
          "as": "Menubar",
          "from": "primevue/menubar",
          "export": "default",
          "filePath": "primevue/menubar",
          "global": true
        },
        {
          "name": "MegaMenu",
          "as": "MegaMenu",
          "from": "primevue/megamenu",
          "export": "default",
          "filePath": "primevue/megamenu",
          "global": true
        },
        {
          "name": "PanelMenu",
          "as": "PanelMenu",
          "from": "primevue/panelmenu",
          "export": "default",
          "filePath": "primevue/panelmenu",
          "global": true
        },
        {
          "name": "Steps",
          "as": "Steps",
          "from": "primevue/steps",
          "export": "default",
          "filePath": "primevue/steps",
          "global": true
        },
        {
          "name": "TabMenu",
          "as": "TabMenu",
          "from": "primevue/tabmenu",
          "export": "default",
          "filePath": "primevue/tabmenu",
          "global": true
        },
        {
          "name": "TieredMenu",
          "as": "TieredMenu",
          "from": "primevue/tieredmenu",
          "export": "default",
          "filePath": "primevue/tieredmenu",
          "global": true
        },
        {
          "name": "Message",
          "as": "Message",
          "from": "primevue/message",
          "export": "default",
          "filePath": "primevue/message",
          "global": true
        },
        {
          "name": "InlineMessage",
          "as": "InlineMessage",
          "from": "primevue/inlinemessage",
          "export": "default",
          "filePath": "primevue/inlinemessage",
          "global": true
        },
        {
          "name": "Toast",
          "use": {
            "as": "ToastService"
          },
          "as": "Toast",
          "from": "primevue/toast",
          "export": "default",
          "filePath": "primevue/toast",
          "global": true
        },
        {
          "name": "Carousel",
          "as": "Carousel",
          "from": "primevue/carousel",
          "export": "default",
          "filePath": "primevue/carousel",
          "global": true
        },
        {
          "name": "Galleria",
          "as": "Galleria",
          "from": "primevue/galleria",
          "export": "default",
          "filePath": "primevue/galleria",
          "global": true
        },
        {
          "name": "Image",
          "as": "Image",
          "from": "primevue/image",
          "export": "default",
          "filePath": "primevue/image",
          "global": true
        },
        {
          "name": "ImageCompare",
          "as": "ImageCompare",
          "from": "primevue/imagecompare",
          "export": "default",
          "filePath": "primevue/imagecompare",
          "global": true
        },
        {
          "name": "Avatar",
          "as": "Avatar",
          "from": "primevue/avatar",
          "export": "default",
          "filePath": "primevue/avatar",
          "global": true
        },
        {
          "name": "AvatarGroup",
          "as": "AvatarGroup",
          "from": "primevue/avatargroup",
          "export": "default",
          "filePath": "primevue/avatargroup",
          "global": true
        },
        {
          "name": "Badge",
          "as": "Badge",
          "from": "primevue/badge",
          "export": "default",
          "filePath": "primevue/badge",
          "global": true
        },
        {
          "name": "BlockUI",
          "as": "BlockUI",
          "from": "primevue/blockui",
          "export": "default",
          "filePath": "primevue/blockui",
          "global": true
        },
        {
          "name": "Chip",
          "as": "Chip",
          "from": "primevue/chip",
          "export": "default",
          "filePath": "primevue/chip",
          "global": true
        },
        {
          "name": "Inplace",
          "as": "Inplace",
          "from": "primevue/inplace",
          "export": "default",
          "filePath": "primevue/inplace",
          "global": true
        },
        {
          "name": "MeterGroup",
          "as": "MeterGroup",
          "from": "primevue/metergroup",
          "export": "default",
          "filePath": "primevue/metergroup",
          "global": true
        },
        {
          "name": "OverlayBadge",
          "as": "OverlayBadge",
          "from": "primevue/overlaybadge",
          "export": "default",
          "filePath": "primevue/overlaybadge",
          "global": true
        },
        {
          "name": "ScrollTop",
          "as": "ScrollTop",
          "from": "primevue/scrolltop",
          "export": "default",
          "filePath": "primevue/scrolltop",
          "global": true
        },
        {
          "name": "Skeleton",
          "as": "Skeleton",
          "from": "primevue/skeleton",
          "export": "default",
          "filePath": "primevue/skeleton",
          "global": true
        },
        {
          "name": "ProgressBar",
          "as": "ProgressBar",
          "from": "primevue/progressbar",
          "export": "default",
          "filePath": "primevue/progressbar",
          "global": true
        },
        {
          "name": "ProgressSpinner",
          "as": "ProgressSpinner",
          "from": "primevue/progressspinner",
          "export": "default",
          "filePath": "primevue/progressspinner",
          "global": true
        },
        {
          "name": "Tag",
          "as": "Tag",
          "from": "primevue/tag",
          "export": "default",
          "filePath": "primevue/tag",
          "global": true
        },
        {
          "name": "Terminal",
          "as": "Terminal",
          "from": "primevue/terminal",
          "export": "default",
          "filePath": "primevue/terminal",
          "global": true
        }
      ],
      "directives": [
        {
          "name": "badge",
          "as": "BadgeDirective",
          "from": "primevue/badgedirective"
        },
        {
          "name": "tooltip",
          "as": "Tooltip",
          "from": "primevue/tooltip"
        },
        {
          "name": "ripple",
          "as": "Ripple",
          "from": "primevue/ripple"
        },
        {
          "name": "styleclass",
          "as": "StyleClass",
          "from": "primevue/styleclass"
        },
        {
          "name": "focustrap",
          "as": "FocusTrap",
          "from": "primevue/focustrap"
        },
        {
          "name": "animateonscroll",
          "as": "AnimateOnScroll",
          "from": "primevue/animateonscroll"
        },
        {
          "name": "keyfilter",
          "as": "KeyFilter",
          "from": "primevue/keyfilter"
        }
      ],
      "composables": [
        {
          "name": "usePrimeVue",
          "as": "usePrimeVue",
          "from": "primevue/config"
        },
        {
          "name": "useStyle",
          "as": "useStyle",
          "from": "primevue/usestyle"
        },
        {
          "name": "useConfirm",
          "as": "useConfirm",
          "from": "primevue/useconfirm"
        },
        {
          "name": "useToast",
          "as": "useToast",
          "from": "primevue/usetoast"
        },
        {
          "name": "useDialog",
          "as": "useDialog",
          "from": "primevue/usedialog"
        }
      ],
      "config": [
        {
          "name": "PrimeVue",
          "as": "PrimeVue",
          "from": "primevue/config"
        }
      ],
      "services": [
        {
          "name": "ConfirmationService",
          "as": "ConfirmationService",
          "from": "primevue/confirmationservice"
        },
        {
          "name": "DialogService",
          "as": "DialogService",
          "from": "primevue/dialogservice"
        },
        {
          "name": "ToastService",
          "as": "ToastService",
          "from": "primevue/toastservice"
        }
      ],
      "styles": [
        {
          "name": "BaseStyle",
          "as": "BaseStyle",
          "from": "@primevue/core/base/style"
        }
      ],
      "injectStylesAsString": [],
      "injectStylesAsStringToTop": [
        ""
      ]
    },
    "metapixel": {}
  },
  "iamAppName": "Dente Store",
  "iamAccessTokenSecret": "5e834d4538fb42610b44ceb4edcb6e01a10c81659767c2be3516a0af38d4b76c",
  "iamRefreshTokenSecret": "243c31fadffdbf9f74f362d5288685a3213cca3c155d0dcbe25e13acddf56738",
  "iamResetTokenSecret": "1d9ab2fdd8ec665c9a01b8e0d5207bfadc6c8f3299e7e9d596c4ebaeb99e2eea",
  "iamVerifyTokenSecret": "bacc37f4d25fa331febba54033ff21b9de9e46f0ff89e4d833dc9bcc9171587c",
  "iamPublicUrl": "https://health.dentestore.info",
  "iamEmailer": "nodemailer-service",
  "iamNodemailerService": "gmail",
  "iamNodemailerServiceSender": "storedente@gmail.com",
  "iamNodemailerServicePassword": "wookzwnvtstrvzxx",
  "iamNodemailerSmtpHost": "mysmtp.host",
  "iamNodemailerSmtpPort": "465",
  "iamNodemailerSmtpSender": "myname@mydomain.com",
  "iamNodemailerSmtpPassword": "myAmazingPassword753$",
  "iamSendGridApiKey": "12345678901234567890",
  "iamSendgridSender": "myname@mysendgridaccount.com",
  "iamGoogleClientId": "246597668177-k0k16auvrks41vr0ubbuihf693eppeti.apps.googleusercontent.com",
  "icon": {
    "serverKnownCssClasses": []
  },
  "ipx": {
    "baseURL": "/_ipx",
    "alias": {},
    "fs": {
      "dir": "../public"
    },
    "http": {
      "domains": []
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
const _sharedAppConfig = _deepFreeze(klona(appConfig));
function useAppConfig(event) {
  {
    return _sharedAppConfig;
  }
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
function checkBufferSupport() {
  if (typeof Buffer === "undefined") {
    throw new TypeError("[unstorage] Buffer is not supported!");
  }
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  checkBufferSupport();
  const base64 = Buffer.from(value).toString("base64");
  return BASE64_PREFIX + base64;
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  checkBufferSupport();
  return Buffer.from(value.slice(BASE64_PREFIX.length), "base64");
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter(
        (key) => key.startsWith(base) && key[key.length - 1] !== "$"
      ) : allKeys.filter((key) => key[key.length - 1] !== "$");
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"F:\\Project\\LP Script\\Olshop\\landing-page-4\\.data\\kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        variableHeaders[header] = incomingEvent.node.req.headers[header];
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        event.node.res.setHeader(name, value);
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const config$5 = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config$5.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const script = "\"use strict\";(()=>{const t=window,e=document.documentElement,c=[\"dark\",\"light\"],n=getStorageValue(\"localStorage\",\"nuxt-color-mode\")||\"system\";let i=n===\"system\"?u():n;const r=e.getAttribute(\"data-color-mode-forced\");r&&(i=r),l(i),t[\"__NUXT_COLOR_MODE__\"]={preference:n,value:i,getColorScheme:u,addColorScheme:l,removeColorScheme:d};function l(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.add(s):e.className+=\" \"+s,a&&e.setAttribute(\"data-\"+a,o)}function d(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.remove(s):e.className=e.className.replace(new RegExp(s,\"g\"),\"\"),a&&e.removeAttribute(\"data-\"+a)}function f(o){return t.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function u(){if(t.matchMedia&&f(\"\").media!==\"not all\"){for(const o of c)if(f(\":\"+o).matches)return o}return\"light\"}})();function getStorageValue(t,e){switch(t){case\"localStorage\":return window.localStorage.getItem(e);case\"sessionStorage\":return window.sessionStorage.getItem(e);case\"cookie\":return getCookie(e);default:return null}}function getCookie(t){const c=(\"; \"+window.document.cookie).split(\"; \"+t+\"=\");if(c.length===2)return c.pop()?.split(\";\").shift()}";

const _iHUNCkhhXC = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

var theme$6 = function theme(_ref) {
  var dt = _ref.dt;
  return "\n.p-badge {\n    display: inline-flex;\n    border-radius: ".concat(dt('badge.border.radius'), ";\n    align-items: center;\n    justify-content: center;\n    padding: ").concat(dt('badge.padding'), ";\n    background: ").concat(dt('badge.primary.background'), ";\n    color: ").concat(dt('badge.primary.color'), ";\n    font-size: ").concat(dt('badge.font.size'), ";\n    font-weight: ").concat(dt('badge.font.weight'), ";\n    min-width: ").concat(dt('badge.min.width'), ";\n    height: ").concat(dt('badge.height'), ";\n}\n\n.p-badge-dot {\n    width: ").concat(dt('badge.dot.size'), ";\n    min-width: ").concat(dt('badge.dot.size'), ";\n    height: ").concat(dt('badge.dot.size'), ";\n    border-radius: 50%;\n    padding: 0;\n}\n\n.p-badge-circle {\n    padding: 0;\n    border-radius: 50%;\n}\n\n.p-badge-secondary {\n    background: ").concat(dt('badge.secondary.background'), ";\n    color: ").concat(dt('badge.secondary.color'), ";\n}\n\n.p-badge-success {\n    background: ").concat(dt('badge.success.background'), ";\n    color: ").concat(dt('badge.success.color'), ";\n}\n\n.p-badge-info {\n    background: ").concat(dt('badge.info.background'), ";\n    color: ").concat(dt('badge.info.color'), ";\n}\n\n.p-badge-warn {\n    background: ").concat(dt('badge.warn.background'), ";\n    color: ").concat(dt('badge.warn.color'), ";\n}\n\n.p-badge-danger {\n    background: ").concat(dt('badge.danger.background'), ";\n    color: ").concat(dt('badge.danger.color'), ";\n}\n\n.p-badge-contrast {\n    background: ").concat(dt('badge.contrast.background'), ";\n    color: ").concat(dt('badge.contrast.color'), ";\n}\n\n.p-badge-sm {\n    font-size: ").concat(dt('badge.sm.font.size'), ";\n    min-width: ").concat(dt('badge.sm.min.width'), ";\n    height: ").concat(dt('badge.sm.height'), ";\n}\n\n.p-badge-lg {\n    font-size: ").concat(dt('badge.lg.font.size'), ";\n    min-width: ").concat(dt('badge.lg.min.width'), ";\n    height: ").concat(dt('badge.lg.height'), ";\n}\n\n.p-badge-xl {\n    font-size: ").concat(dt('badge.xl.font.size'), ";\n    min-width: ").concat(dt('badge.xl.min.width'), ";\n    height: ").concat(dt('badge.xl.height'), ";\n}\n");
};
var classes$7 = {
  root: function root(_ref2) {
    var props = _ref2.props,
      instance = _ref2.instance;
    return ['p-badge p-component', {
      'p-badge-circle': isNotEmpty(props.value) && String(props.value).length === 1,
      'p-badge-dot': isEmpty(props.value) && !instance.$slots["default"],
      'p-badge-sm': props.size === 'small',
      'p-badge-lg': props.size === 'large',
      'p-badge-xl': props.size === 'xlarge',
      'p-badge-info': props.severity === 'info',
      'p-badge-success': props.severity === 'success',
      'p-badge-warn': props.severity === 'warn',
      'p-badge-danger': props.severity === 'danger',
      'p-badge-secondary': props.severity === 'secondary',
      'p-badge-contrast': props.severity === 'contrast'
    }];
  }
};
var BadgeStyle = BaseStyle.extend({
  name: 'badge',
  theme: theme$6,
  classes: classes$7
});

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var theme$5 = function theme(_ref) {
  var dt = _ref.dt;
  return "\n.p-button {\n    display: inline-flex;\n    cursor: pointer;\n    user-select: none;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n    color: ".concat(dt('button.primary.color'), ";\n    background: ").concat(dt('button.primary.background'), ";\n    border: 1px solid ").concat(dt('button.primary.border.color'), ";\n    padding: ").concat(dt('button.padding.y'), " ").concat(dt('button.padding.x'), ";\n    font-size: 1rem;\n    font-family: inherit;\n    font-feature-settings: inherit;\n    transition: background ").concat(dt('button.transition.duration'), ", color ").concat(dt('button.transition.duration'), ", border-color ").concat(dt('button.transition.duration'), ",\n            outline-color ").concat(dt('button.transition.duration'), ", box-shadow ").concat(dt('button.transition.duration'), ";\n    border-radius: ").concat(dt('button.border.radius'), ";\n    outline-color: transparent;\n    gap: ").concat(dt('button.gap'), ";\n}\n\n.p-button:disabled {\n    cursor: default;\n}\n\n.p-button-icon-right {\n    order: 1;\n}\n\n.p-button-icon-bottom {\n    order: 2;\n}\n\n.p-button-icon-only {\n    width: ").concat(dt('button.icon.only.width'), ";\n    padding-left: 0;\n    padding-right: 0;\n    gap: 0;\n}\n\n.p-button-icon-only.p-button-rounded {\n    border-radius: 50%;\n    height: ").concat(dt('button.icon.only.width'), ";\n}\n\n.p-button-icon-only .p-button-label {\n    visibility: hidden;\n    width: 0;\n}\n\n.p-button-sm {\n    font-size: ").concat(dt('button.sm.font.size'), ";\n    padding: ").concat(dt('button.sm.padding.y'), " ").concat(dt('button.sm.padding.x'), ";\n}\n\n.p-button-sm .p-button-icon {\n    font-size: ").concat(dt('button.sm.font.size'), ";\n}\n\n.p-button-lg {\n    font-size: ").concat(dt('button.lg.font.size'), ";\n    padding: ").concat(dt('button.lg.padding.y'), " ").concat(dt('button.lg.padding.x'), ";\n}\n\n.p-button-lg .p-button-icon {\n    font-size: ").concat(dt('button.lg.font.size'), ";\n}\n\n.p-button-vertical {\n    flex-direction: column;\n}\n\n.p-button-label {\n    font-weight: ").concat(dt('button.label.font.weight'), ";\n}\n\n.p-button-fluid {\n    width: 100%;\n}\n\n.p-button-fluid.p-button-icon-only {\n    width: ").concat(dt('button.icon.only.width'), ";\n}\n\n.p-button:not(:disabled):hover {\n    background: ").concat(dt('button.primary.hover.background'), ";\n    border: 1px solid ").concat(dt('button.primary.hover.border.color'), ";\n    color: ").concat(dt('button.primary.hover.color'), ";\n}\n\n.p-button:not(:disabled):active {\n    background: ").concat(dt('button.primary.active.background'), ";\n    border: 1px solid ").concat(dt('button.primary.active.border.color'), ";\n    color: ").concat(dt('button.primary.active.color'), ";\n}\n\n.p-button:focus-visible {\n    box-shadow: ").concat(dt('button.primary.focus.ring.shadow'), ";\n    outline: ").concat(dt('button.focus.ring.width'), " ").concat(dt('button.focus.ring.style'), " ").concat(dt('button.primary.focus.ring.color'), ";\n    outline-offset: ").concat(dt('button.focus.ring.offset'), ";\n}\n\n.p-button .p-badge {\n    min-width: ").concat(dt('button.badge.size'), ";\n    height: ").concat(dt('button.badge.size'), ";\n    line-height: ").concat(dt('button.badge.size'), ";\n}\n\n.p-button-raised {\n    box-shadow: ").concat(dt('button.raised.shadow'), ";\n}\n\n.p-button-rounded {\n    border-radius: ").concat(dt('button.rounded.border.radius'), ";\n}\n\n.p-button-secondary {\n    background: ").concat(dt('button.secondary.background'), ";\n    border: 1px solid ").concat(dt('button.secondary.border.color'), ";\n    color: ").concat(dt('button.secondary.color'), ";\n}\n\n.p-button-secondary:not(:disabled):hover {\n    background: ").concat(dt('button.secondary.hover.background'), ";\n    border: 1px solid ").concat(dt('button.secondary.hover.border.color'), ";\n    color: ").concat(dt('button.secondary.hover.color'), ";\n}\n\n.p-button-secondary:not(:disabled):active {\n    background: ").concat(dt('button.secondary.active.background'), ";\n    border: 1px solid ").concat(dt('button.secondary.active.border.color'), ";\n    color: ").concat(dt('button.secondary.active.color'), ";\n}\n\n.p-button-secondary:focus-visible {\n    outline-color: ").concat(dt('button.secondary.focus.ring.color'), ";\n    box-shadow: ").concat(dt('button.secondary.focus.ring.shadow'), ";\n}\n\n.p-button-success {\n    background: ").concat(dt('button.success.background'), ";\n    border: 1px solid ").concat(dt('button.success.border.color'), ";\n    color: ").concat(dt('button.success.color'), ";\n}\n\n.p-button-success:not(:disabled):hover {\n    background: ").concat(dt('button.success.hover.background'), ";\n    border: 1px solid ").concat(dt('button.success.hover.border.color'), ";\n    color: ").concat(dt('button.success.hover.color'), ";\n}\n\n.p-button-success:not(:disabled):active {\n    background: ").concat(dt('button.success.active.background'), ";\n    border: 1px solid ").concat(dt('button.success.active.border.color'), ";\n    color: ").concat(dt('button.success.active.color'), ";\n}\n\n.p-button-success:focus-visible {\n    outline-color: ").concat(dt('button.success.focus.ring.color'), ";\n    box-shadow: ").concat(dt('button.success.focus.ring.shadow'), ";\n}\n\n.p-button-info {\n    background: ").concat(dt('button.info.background'), ";\n    border: 1px solid ").concat(dt('button.info.border.color'), ";\n    color: ").concat(dt('button.info.color'), ";\n}\n\n.p-button-info:not(:disabled):hover {\n    background: ").concat(dt('button.info.hover.background'), ";\n    border: 1px solid ").concat(dt('button.info.hover.border.color'), ";\n    color: ").concat(dt('button.info.hover.color'), ";\n}\n\n.p-button-info:not(:disabled):active {\n    background: ").concat(dt('button.info.active.background'), ";\n    border: 1px solid ").concat(dt('button.info.active.border.color'), ";\n    color: ").concat(dt('button.info.active.color'), ";\n}\n\n.p-button-info:focus-visible {\n    outline-color: ").concat(dt('button.info.focus.ring.color'), ";\n    box-shadow: ").concat(dt('button.info.focus.ring.shadow'), ";\n}\n\n.p-button-warn {\n    background: ").concat(dt('button.warn.background'), ";\n    border: 1px solid ").concat(dt('button.warn.border.color'), ";\n    color: ").concat(dt('button.warn.color'), ";\n}\n\n.p-button-warn:not(:disabled):hover {\n    background: ").concat(dt('button.warn.hover.background'), ";\n    border: 1px solid ").concat(dt('button.warn.hover.border.color'), ";\n    color: ").concat(dt('button.warn.hover.color'), ";\n}\n\n.p-button-warn:not(:disabled):active {\n    background: ").concat(dt('button.warn.active.background'), ";\n    border: 1px solid ").concat(dt('button.warn.active.border.color'), ";\n    color: ").concat(dt('button.warn.active.color'), ";\n}\n\n.p-button-warn:focus-visible {\n    outline-color: ").concat(dt('button.warn.focus.ring.color'), ";\n    box-shadow: ").concat(dt('button.warn.focus.ring.shadow'), ";\n}\n\n.p-button-help {\n    background: ").concat(dt('button.help.background'), ";\n    border: 1px solid ").concat(dt('button.help.border.color'), ";\n    color: ").concat(dt('button.help.color'), ";\n}\n\n.p-button-help:not(:disabled):hover {\n    background: ").concat(dt('button.help.hover.background'), ";\n    border: 1px solid ").concat(dt('button.help.hover.border.color'), ";\n    color: ").concat(dt('button.help.hover.color'), ";\n}\n\n.p-button-help:not(:disabled):active {\n    background: ").concat(dt('button.help.active.background'), ";\n    border: 1px solid ").concat(dt('button.help.active.border.color'), ";\n    color: ").concat(dt('button.help.active.color'), ";\n}\n\n.p-button-help:focus-visible {\n    outline-color: ").concat(dt('button.help.focus.ring.color'), ";\n    box-shadow: ").concat(dt('button.help.focus.ring.shadow'), ";\n}\n\n.p-button-danger {\n    background: ").concat(dt('button.danger.background'), ";\n    border: 1px solid ").concat(dt('button.danger.border.color'), ";\n    color: ").concat(dt('button.danger.color'), ";\n}\n\n.p-button-danger:not(:disabled):hover {\n    background: ").concat(dt('button.danger.hover.background'), ";\n    border: 1px solid ").concat(dt('button.danger.hover.border.color'), ";\n    color: ").concat(dt('button.danger.hover.color'), ";\n}\n\n.p-button-danger:not(:disabled):active {\n    background: ").concat(dt('button.danger.active.background'), ";\n    border: 1px solid ").concat(dt('button.danger.active.border.color'), ";\n    color: ").concat(dt('button.danger.active.color'), ";\n}\n\n.p-button-danger:focus-visible {\n    outline-color: ").concat(dt('button.danger.focus.ring.color'), ";\n    box-shadow: ").concat(dt('button.danger.focus.ring.shadow'), ";\n}\n\n.p-button-contrast {\n    background: ").concat(dt('button.contrast.background'), ";\n    border: 1px solid ").concat(dt('button.contrast.border.color'), ";\n    color: ").concat(dt('button.contrast.color'), ";\n}\n\n.p-button-contrast:not(:disabled):hover {\n    background: ").concat(dt('button.contrast.hover.background'), ";\n    border: 1px solid ").concat(dt('button.contrast.hover.border.color'), ";\n    color: ").concat(dt('button.contrast.hover.color'), ";\n}\n\n.p-button-contrast:not(:disabled):active {\n    background: ").concat(dt('button.contrast.active.background'), ";\n    border: 1px solid ").concat(dt('button.contrast.active.border.color'), ";\n    color: ").concat(dt('button.contrast.active.color'), ";\n}\n\n.p-button-contrast:focus-visible {\n    outline-color: ").concat(dt('button.contrast.focus.ring.color'), ";\n    box-shadow: ").concat(dt('button.contrast.focus.ring.shadow'), ";\n}\n\n.p-button-outlined {\n    background: transparent;\n    border-color: ").concat(dt('button.outlined.primary.border.color'), ";\n    color: ").concat(dt('button.outlined.primary.color'), ";\n}\n\n.p-button-outlined:not(:disabled):hover {\n    background: ").concat(dt('button.outlined.primary.hover.background'), ";\n    border-color: ").concat(dt('button.outlined.primary.border.color'), ";\n    color: ").concat(dt('button.outlined.primary.color'), ";\n}\n\n.p-button-outlined:not(:disabled):active {\n    background: ").concat(dt('button.outlined.primary.active.background'), ";\n    border-color: ").concat(dt('button.outlined.primary.border.color'), ";\n    color: ").concat(dt('button.outlined.primary.color'), ";\n}\n\n.p-button-outlined.p-button-secondary {\n    border-color: ").concat(dt('button.outlined.secondary.border.color'), ";\n    color: ").concat(dt('button.outlined.secondary.color'), ";\n}\n\n.p-button-outlined.p-button-secondary:not(:disabled):hover {\n    background: ").concat(dt('button.outlined.secondary.hover.background'), ";\n    border-color: ").concat(dt('button.outlined.secondary.border.color'), ";\n    color: ").concat(dt('button.outlined.secondary.color'), ";\n}\n\n.p-button-outlined.p-button-secondary:not(:disabled):active {\n    background: ").concat(dt('button.outlined.secondary.active.background'), ";\n    border-color: ").concat(dt('button.outlined.secondary.border.color'), ";\n    color: ").concat(dt('button.outlined.secondary.color'), ";\n}\n\n.p-button-outlined.p-button-success {\n    border-color: ").concat(dt('button.outlined.success.border.color'), ";\n    color: ").concat(dt('button.outlined.success.color'), ";\n}\n\n.p-button-outlined.p-button-success:not(:disabled):hover {\n    background: ").concat(dt('button.outlined.success.hover.background'), ";\n    border-color: ").concat(dt('button.outlined.success.border.color'), ";\n    color: ").concat(dt('button.outlined.success.color'), ";\n}\n\n.p-button-outlined.p-button-success:not(:disabled):active {\n    background: ").concat(dt('button.outlined.success.active.background'), ";\n    border-color: ").concat(dt('button.outlined.success.border.color'), ";\n    color: ").concat(dt('button.outlined.success.color'), ";\n}\n\n.p-button-outlined.p-button-info {\n    border-color: ").concat(dt('button.outlined.info.border.color'), ";\n    color: ").concat(dt('button.outlined.info.color'), ";\n}\n\n.p-button-outlined.p-button-info:not(:disabled):hover {\n    background: ").concat(dt('button.outlined.info.hover.background'), ";\n    border-color: ").concat(dt('button.outlined.info.border.color'), ";\n    color: ").concat(dt('button.outlined.info.color'), ";\n}\n\n.p-button-outlined.p-button-info:not(:disabled):active {\n    background: ").concat(dt('button.outlined.info.active.background'), ";\n    border-color: ").concat(dt('button.outlined.info.border.color'), ";\n    color: ").concat(dt('button.outlined.info.color'), ";\n}\n\n.p-button-outlined.p-button-warn {\n    border-color: ").concat(dt('button.outlined.warn.border.color'), ";\n    color: ").concat(dt('button.outlined.warn.color'), ";\n}\n\n.p-button-outlined.p-button-warn:not(:disabled):hover {\n    background: ").concat(dt('button.outlined.warn.hover.background'), ";\n    border-color: ").concat(dt('button.outlined.warn.border.color'), ";\n    color: ").concat(dt('button.outlined.warn.color'), ";\n}\n\n.p-button-outlined.p-button-warn:not(:disabled):active {\n    background: ").concat(dt('button.outlined.warn.active.background'), ";\n    border-color: ").concat(dt('button.outlined.warn.border.color'), ";\n    color: ").concat(dt('button.outlined.warn.color'), ";\n}\n\n.p-button-outlined.p-button-help {\n    border-color: ").concat(dt('button.outlined.help.border.color'), ";\n    color: ").concat(dt('button.outlined.help.color'), ";\n}\n\n.p-button-outlined.p-button-help:not(:disabled):hover {\n    background: ").concat(dt('button.outlined.help.hover.background'), ";\n    border-color: ").concat(dt('button.outlined.help.border.color'), ";\n    color: ").concat(dt('button.outlined.help.color'), ";\n}\n\n.p-button-outlined.p-button-help:not(:disabled):active {\n    background: ").concat(dt('button.outlined.help.active.background'), ";\n    border-color: ").concat(dt('button.outlined.help.border.color'), ";\n    color: ").concat(dt('button.outlined.help.color'), ";\n}\n\n.p-button-outlined.p-button-danger {\n    border-color: ").concat(dt('button.outlined.danger.border.color'), ";\n    color: ").concat(dt('button.outlined.danger.color'), ";\n}\n\n.p-button-outlined.p-button-danger:not(:disabled):hover {\n    background: ").concat(dt('button.outlined.danger.hover.background'), ";\n    border-color: ").concat(dt('button.outlined.danger.border.color'), ";\n    color: ").concat(dt('button.outlined.danger.color'), ";\n}\n\n.p-button-outlined.p-button-danger:not(:disabled):active {\n    background: ").concat(dt('button.outlined.danger.active.background'), ";\n    border-color: ").concat(dt('button.outlined.danger.border.color'), ";\n    color: ").concat(dt('button.outlined.danger.color'), ";\n}\n\n.p-button-outlined.p-button-contrast {\n    border-color: ").concat(dt('button.outlined.contrast.border.color'), ";\n    color: ").concat(dt('button.outlined.contrast.color'), ";\n}\n\n.p-button-outlined.p-button-contrast:not(:disabled):hover {\n    background: ").concat(dt('button.outlined.contrast.hover.background'), ";\n    border-color: ").concat(dt('button.outlined.contrast.border.color'), ";\n    color: ").concat(dt('button.outlined.contrast.color'), ";\n}\n\n.p-button-outlined.p-button-contrast:not(:disabled):active {\n    background: ").concat(dt('button.outlined.contrast.active.background'), ";\n    border-color: ").concat(dt('button.outlined.contrast.border.color'), ";\n    color: ").concat(dt('button.outlined.contrast.color'), ";\n}\n\n.p-button-outlined.p-button-plain {\n    border-color: ").concat(dt('button.outlined.plain.border.color'), ";\n    color: ").concat(dt('button.outlined.plain.color'), ";\n}\n\n.p-button-outlined.p-button-plain:not(:disabled):hover {\n    background: ").concat(dt('button.outlined.plain.hover.background'), ";\n    border-color: ").concat(dt('button.outlined.plain.border.color'), ";\n    color: ").concat(dt('button.outlined.plain.color'), ";\n}\n\n.p-button-outlined.p-button-plain:not(:disabled):active {\n    background: ").concat(dt('button.outlined.plain.active.background'), ";\n    border-color: ").concat(dt('button.outlined.plain.border.color'), ";\n    color: ").concat(dt('button.outlined.plain.color'), ";\n}\n\n.p-button-text {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt('button.text.primary.color'), ";\n}\n\n.p-button-text:not(:disabled):hover {\n    background: ").concat(dt('button.text.primary.hover.background'), ";\n    border-color: transparent;\n    color: ").concat(dt('button.text.primary.color'), ";\n}\n\n.p-button-text:not(:disabled):active {\n    background: ").concat(dt('button.text.primary.active.background'), ";\n    border-color: transparent;\n    color: ").concat(dt('button.text.primary.color'), ";\n}\n\n.p-button-text.p-button-secondary {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt('button.text.secondary.color'), ";\n}\n\n.p-button-text.p-button-secondary:not(:disabled):hover {\n    background: ").concat(dt('button.text.secondary.hover.background'), ";\n    border-color: transparent;\n    color: ").concat(dt('button.text.secondary.color'), ";\n}\n\n.p-button-text.p-button-secondary:not(:disabled):active {\n    background: ").concat(dt('button.text.secondary.active.background'), ";\n    border-color: transparent;\n    color: ").concat(dt('button.text.secondary.color'), ";\n}\n\n.p-button-text.p-button-success {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt('button.text.success.color'), ";\n}\n\n.p-button-text.p-button-success:not(:disabled):hover {\n    background: ").concat(dt('button.text.success.hover.background'), ";\n    border-color: transparent;\n    color: ").concat(dt('button.text.success.color'), ";\n}\n\n.p-button-text.p-button-success:not(:disabled):active {\n    background: ").concat(dt('button.text.success.active.background'), ";\n    border-color: transparent;\n    color: ").concat(dt('button.text.success.color'), ";\n}\n\n.p-button-text.p-button-info {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt('button.text.info.color'), ";\n}\n\n.p-button-text.p-button-info:not(:disabled):hover {\n    background: ").concat(dt('button.text.info.hover.background'), ";\n    border-color: transparent;\n    color: ").concat(dt('button.text.info.color'), ";\n}\n\n.p-button-text.p-button-info:not(:disabled):active {\n    background: ").concat(dt('button.text.info.active.background'), ";\n    border-color: transparent;\n    color: ").concat(dt('button.text.info.color'), ";\n}\n\n.p-button-text.p-button-warn {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt('button.text.warn.color'), ";\n}\n\n.p-button-text.p-button-warn:not(:disabled):hover {\n    background: ").concat(dt('button.text.warn.hover.background'), ";\n    border-color: transparent;\n    color: ").concat(dt('button.text.warn.color'), ";\n}\n\n.p-button-text.p-button-warn:not(:disabled):active {\n    background: ").concat(dt('button.text.warn.active.background'), ";\n    border-color: transparent;\n    color: ").concat(dt('button.text.warn.color'), ";\n}\n\n.p-button-text.p-button-help {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt('button.text.help.color'), ";\n}\n\n.p-button-text.p-button-help:not(:disabled):hover {\n    background: ").concat(dt('button.text.help.hover.background'), ";\n    border-color: transparent;\n    color: ").concat(dt('button.text.help.color'), ";\n}\n\n.p-button-text.p-button-help:not(:disabled):active {\n    background: ").concat(dt('button.text.help.active.background'), ";\n    border-color: transparent;\n    color: ").concat(dt('button.text.help.color'), ";\n}\n\n.p-button-text.p-button-danger {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt('button.text.danger.color'), ";\n}\n\n.p-button-text.p-button-danger:not(:disabled):hover {\n    background: ").concat(dt('button.text.danger.hover.background'), ";\n    border-color: transparent;\n    color: ").concat(dt('button.text.danger.color'), ";\n}\n\n.p-button-text.p-button-danger:not(:disabled):active {\n    background: ").concat(dt('button.text.danger.active.background'), ";\n    border-color: transparent;\n    color: ").concat(dt('button.text.danger.color'), ";\n}\n\n.p-button-text.p-button-plain {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt('button.text.plain.color'), ";\n}\n\n.p-button-text.p-button-plain:not(:disabled):hover {\n    background: ").concat(dt('button.text.plain.hover.background'), ";\n    border-color: transparent;\n    color: ").concat(dt('button.text.plain.color'), ";\n}\n\n.p-button-text.p-button-plain:not(:disabled):active {\n    background: ").concat(dt('button.text.plain.active.background'), ";\n    border-color: transparent;\n    color: ").concat(dt('button.text.plain.color'), ";\n}\n\n.p-button-link {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt('button.link.color'), ";\n}\n\n.p-button-link:not(:disabled):hover {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt('button.link.hover.color'), ";\n}\n\n.p-button-link:not(:disabled):hover .p-button-label {\n    text-decoration: underline;\n}\n\n.p-button-link:not(:disabled):active {\n    background: transparent;\n    border-color: transparent;\n    color: ").concat(dt('button.link.active.color'), ";\n}\n");
};
var classes$6 = {
  root: function root(_ref2) {
    var instance = _ref2.instance,
      props = _ref2.props;
    return ['p-button p-component', _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
      'p-button-icon-only': instance.hasIcon && !props.label && !props.badge,
      'p-button-vertical': (props.iconPos === 'top' || props.iconPos === 'bottom') && props.label,
      'p-button-loading': props.loading,
      'p-button-link': props.link
    }, "p-button-".concat(props.severity), props.severity), 'p-button-raised', props.raised), 'p-button-rounded', props.rounded), 'p-button-text', props.text), 'p-button-outlined', props.outlined), 'p-button-sm', props.size === 'small'), 'p-button-lg', props.size === 'large'), 'p-button-plain', props.plain), 'p-button-fluid', instance.hasFluid)];
  },
  loadingIcon: 'p-button-loading-icon',
  icon: function icon(_ref4) {
    var props = _ref4.props;
    return ['p-button-icon', _defineProperty({}, "p-button-icon-".concat(props.iconPos), props.label)];
  },
  label: 'p-button-label'
};
var ButtonStyle = BaseStyle.extend({
  name: 'button',
  theme: theme$5,
  classes: classes$6
});

var theme$4 = function theme(_ref) {
  var dt = _ref.dt;
  return "\n.p-toolbar {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex-wrap: wrap;\n    padding: ".concat(dt('toolbar.padding'), ";\n    background: ").concat(dt('toolbar.background'), ";\n    border: 1px solid ").concat(dt('toolbar.border.color'), ";\n    color: ").concat(dt('toolbar.color'), ";\n    border-radius: ").concat(dt('toolbar.border.radius'), ";\n    gap: ").concat(dt('toolbar.gap'), ";\n}\n\n.p-toolbar-start,\n.p-toolbar-center,\n.p-toolbar-end {\n    display: flex;\n    align-items: center;\n}\n");
};
var classes$5 = {
  root: 'p-toolbar p-component',
  start: 'p-toolbar-start',
  center: 'p-toolbar-center',
  end: 'p-toolbar-end'
};
var ToolbarStyle = BaseStyle.extend({
  name: 'toolbar',
  theme: theme$4,
  classes: classes$5
});

var classes$4 = {
  root: 'p-inputicon'
};
var InputIconStyle = BaseStyle.extend({
  name: 'inputicon',
  classes: classes$4
});

var theme$3 = function theme(_ref) {
  var dt = _ref.dt;
  return "\n.p-inputtext {\n    font-family: inherit;\n    font-feature-settings: inherit;\n    font-size: 1rem;\n    color: ".concat(dt('inputtext.color'), ";\n    background: ").concat(dt('inputtext.background'), ";\n    padding: ").concat(dt('inputtext.padding.y'), " ").concat(dt('inputtext.padding.x'), ";\n    border: 1px solid ").concat(dt('inputtext.border.color'), ";\n    transition: background ").concat(dt('inputtext.transition.duration'), ", color ").concat(dt('inputtext.transition.duration'), ", border-color ").concat(dt('inputtext.transition.duration'), ", outline-color ").concat(dt('inputtext.transition.duration'), ", box-shadow ").concat(dt('inputtext.transition.duration'), ";\n    appearance: none;\n    border-radius: ").concat(dt('inputtext.border.radius'), ";\n    outline-color: transparent;\n    box-shadow: ").concat(dt('inputtext.shadow'), ";\n}\n\n.p-inputtext:enabled:hover {\n    border-color: ").concat(dt('inputtext.hover.border.color'), ";\n}\n\n.p-inputtext:enabled:focus {\n    border-color: ").concat(dt('inputtext.focus.border.color'), ";\n    box-shadow: ").concat(dt('inputtext.focus.ring.shadow'), ";\n    outline: ").concat(dt('inputtext.focus.ring.width'), " ").concat(dt('inputtext.focus.ring.style'), " ").concat(dt('inputtext.focus.ring.color'), ";\n    outline-offset: ").concat(dt('inputtext.focus.ring.offset'), ";\n}\n\n.p-inputtext.p-invalid {\n    border-color: ").concat(dt('inputtext.invalid.border.color'), ";\n}\n\n.p-inputtext.p-variant-filled {\n    background: ").concat(dt('inputtext.filled.background'), ";\n}\n\n.p-inputtext.p-variant-filled:enabled:hover {\n    background: ").concat(dt('inputtext.filled.hover.background'), ";\n}\n\n.p-inputtext.p-variant-filled:enabled:focus {\n    background: ").concat(dt('inputtext.filled.focus.background'), ";\n}\n\n.p-inputtext:disabled {\n    opacity: 1;\n    background: ").concat(dt('inputtext.disabled.background'), ";\n    color: ").concat(dt('inputtext.disabled.color'), ";\n}\n\n.p-inputtext::placeholder {\n    color: ").concat(dt('inputtext.placeholder.color'), ";\n}\n\n.p-inputtext-sm {\n    font-size: ").concat(dt('inputtext.sm.font.size'), ";\n    padding: ").concat(dt('inputtext.sm.padding.y'), " ").concat(dt('inputtext.sm.padding.x'), ";\n}\n\n.p-inputtext-lg {\n    font-size: ").concat(dt('inputtext.lg.font.size'), ";\n    padding: ").concat(dt('inputtext.lg.padding.y'), " ").concat(dt('inputtext.lg.padding.x'), ";\n}\n\n.p-inputtext-fluid {\n    width: 100%;\n}\n");
};
var classes$3 = {
  root: function root(_ref2) {
    var instance = _ref2.instance,
      props = _ref2.props;
    return ['p-inputtext p-component', {
      'p-filled': instance.filled,
      'p-inputtext-sm': props.size === 'small',
      'p-inputtext-lg': props.size === 'large',
      'p-invalid': props.invalid,
      'p-variant-filled': props.variant ? props.variant === 'filled' : instance.$primevue.config.inputStyle === 'filled' || instance.$primevue.config.inputVariant === 'filled',
      'p-inputtext-fluid': instance.hasFluid
    }];
  }
};
var InputTextStyle = BaseStyle.extend({
  name: 'inputtext',
  theme: theme$3,
  classes: classes$3
});

var theme$2 = function theme(_ref) {
  var dt = _ref.dt;
  return "\n.p-iconfield {\n    position: relative;\n}\n\n.p-inputicon {\n    position: absolute;\n    top: 50%;\n    margin-top: calc(-1 * (".concat(dt('icon.size'), " / 2));\n    color: ").concat(dt('iconfield.icon.color'), ";\n    line-height: 1;\n}\n\n.p-iconfield .p-inputicon:first-child {\n    left: ").concat(dt('form.field.padding.x'), ";\n}\n\n.p-iconfield .p-inputicon:last-child {\n    right: ").concat(dt('form.field.padding.x'), ";\n}\n\n.p-iconfield .p-inputtext:not(:first-child) {\n    padding-left: calc((").concat(dt('form.field.padding.x'), " * 2) + ").concat(dt('icon.size'), ");\n}\n\n.p-iconfield .p-inputtext:not(:last-child) {\n    padding-right: calc((").concat(dt('form.field.padding.x'), " * 2) + ").concat(dt('icon.size'), ");\n}\n");
};
var classes$2 = {
  root: 'p-iconfield'
};
var IconFieldStyle = BaseStyle.extend({
  name: 'iconfield',
  theme: theme$2,
  classes: classes$2
});

var ColumnStyle = BaseStyle.extend({
  name: 'column'
});

var theme$1 = function theme(_ref) {
  var dt = _ref.dt;
  return "\n.p-datatable {\n    position: relative;\n}\n\n.p-datatable-table {\n    border-spacing: 0;\n    width: 100%;\n}\n\n.p-datatable-scrollable > .p-datatable-table-container {\n    position: relative;\n}\n\n.p-datatable-scrollable-table > .p-datatable-thead {\n    top: 0;\n    z-index: 1;\n}\n\n.p-datatable-scrollable-table > .p-datatable-frozen-tbody {\n    position: sticky;\n    z-index: 1;\n}\n\n.p-datatable-scrollable-table>.p-datatable-tfoot {\n    bottom: 0;\n    z-index: 1;\n}\n\n.p-datatable-scrollable .p-datatable-frozen-column {\n    position: sticky;\n    background: ".concat(dt('datatable.header.cell.background'), ";\n}\n\n.p-datatable-scrollable th.p-datatable-frozen-column {\n    z-index: 1;\n}\n\n.p-datatable-scrollable > .p-datatable-table-container > .p-datatable-table > .p-datatable-thead,\n.p-datatable-scrollable > .p-datatable-table-container > .p-virtualscroller > .p-datatable-table > .p-datatable-thead {\n    background: ").concat(dt('datatable.header.cell.background'), ";\n}\n\n.p-datatable-scrollable > .p-datatable-table-container > .p-datatable-table > .p-datatable-tfoot,\n.p-datatable-scrollable > .p-datatable-table-container > .p-virtualscroller > .p-datatable-table > .p-datatable-tfoot {\n    background: ").concat(dt('datatable.footer.cell.background'), ";\n}\n\n.p-datatable-flex-scrollable {\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n}\n\n.p-datatable-flex-scrollable > .p-datatable-table-container {\n    display: flex;\n    flex-direction: column;\n    flex: 1;\n    height: 100%;\n}\n\n.p-datatable-scrollable-table > .p-datatable-tbody > .p-datatable-row-group-header {\n    position: sticky;\n    z-index: 1;\n}\n\n.p-datatable-resizable-table > .p-datatable-thead > tr > th,\n.p-datatable-resizable-table > .p-datatable-tfoot > tr > td,\n.p-datatable-resizable-table > .p-datatable-tbody > tr > td {\n    overflow: hidden;\n    white-space: nowrap;\n}\n\n.p-datatable-resizable-table > .p-datatable-thead > tr > th.p-datatable-resizable-column:not(.p-datatable-frozen-column) {\n    background-clip: padding-box;\n    position: relative;\n}\n\n.p-datatable-resizable-table-fit > .p-datatable-thead > tr > th.p-datatable-resizable-column:last-child .p-datatable-column-resizer {\n    display: none;\n}\n\n.p-datatable-column-resizer {\n    display: block;\n    position: absolute;\n    top: 0;\n    right: 0;\n    margin: 0;\n    width: ").concat(dt('datatable.column.resizer.width'), ";\n    height: 100%;\n    padding: 0px;\n    cursor: col-resize;\n    border: 1px solid transparent;\n}\n\n.p-datatable-column-header-content {\n    display: flex;\n    align-items: center;\n    gap: ").concat(dt('datatable.header.cell.gap'), ";\n}\n\n.p-datatable-column-resize-indicator {\n    width: ").concat(dt('datatable.resize.indicator.width'), ";\n    position: absolute;\n    z-index: 10;\n    display: none;\n    background: ").concat(dt('datatable.resize.indicator.color'), ";\n}\n\n.p-datatable-row-reorder-indicator-up,\n.p-datatable-row-reorder-indicator-down {\n    position: absolute;\n    display: none;\n}\n\n.p-datatable-reorderable-column,\n.p-datatable-reorderable-row-handle {\n    cursor: move;\n}\n\n.p-datatable-mask {\n    position: absolute;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 2;\n}\n\n.p-datatable-inline-filter {\n    display: flex;\n    align-items: center;\n    width: 100%;\n    gap: ").concat(dt('datatable.filter.inline.gap'), ";\n}\n\n.p-datatable-inline-filter .p-datatable-filter-element-container {\n    flex: 1 1 auto;\n    width: 1%;\n}\n\n.p-datatable-filter-overlay {\n    background: ").concat(dt('datatable.filter.overlay.select.background'), ";\n    color: ").concat(dt('datatable.filter.overlay.select.color'), ";\n    border: 1px solid ").concat(dt('datatable.filter.overlay.select.border.color'), ";\n    border-radius: ").concat(dt('datatable.filter.overlay.select.border.radius'), ";\n    box-shadow: ").concat(dt('datatable.filter.overlay.select.shadow'), ";\n    min-width: 12.5rem;\n}\n\n.p-datatable-filter-constraint-list {\n    margin: 0;\n    list-style: none;\n    display: flex;\n    flex-direction: column;\n    padding: ").concat(dt('datatable.filter.constraint.list.padding'), ";\n    gap: ").concat(dt('datatable.filter.constraint.list.gap'), ";\n}\n\n.p-datatable-filter-constraint {\n    padding: ").concat(dt('datatable.filter.constraint.padding'), ";\n    color: ").concat(dt('datatable.filter.constraint.color'), ";\n    border-radius: ").concat(dt('datatable.filter.constraint.border.radius'), ";\n    cursor: pointer;\n    transition: background ").concat(dt('datatable.transition.duration'), ", color ").concat(dt('datatable.transition.duration'), ", border-color ").concat(dt('datatable.transition.duration'), ",\n        box-shadow ").concat(dt('datatable.transition.duration'), ";\n}\n\n.p-datatable-filter-constraint-selected {\n    background: ").concat(dt('datatable.filter.constraint.selected.background'), ";\n    color: ").concat(dt('datatable.filter.constraint.selected.color'), ";\n}\n\n.p-datatable-filter-constraint:not(.p-datatable-filter-constraint-selected):not(.p-disabled):hover {\n    background: ").concat(dt('datatable.filter.constraint.focus.background'), ";\n    color: ").concat(dt('datatable.filter.constraint.focus.color'), ";\n}\n\n.p-datatable-filter-constraint:focus-visible {\n    outline: 0 none;\n    background: ").concat(dt('datatable.filter.constraint.focus.background'), ";\n    color: ").concat(dt('datatable.filter.constraint.focus.color'), ";\n}\n\n.p-datatable-filter-constraint-selected:focus-visible {\n    outline: 0 none;\n    background: ").concat(dt('datatable.filter.constraint.selected.focus.background'), ";\n    color: ").concat(dt('datatable.filter.constraint.selected.focus.color'), ";\n}\n\n.p-datatable-filter-constraint-separator {\n    border-top: 1px solid ").concat(dt('datatable.filter.constraint.separator.border.color'), ";\n}\n\n.p-datatable-popover-filter {\n    display: inline-flex;\n    margin-left: auto;\n}\n\n.p-datatable-filter-overlay-popover {\n    background: ").concat(dt('datatable.filter.overlay.popover.background'), ";\n    color: ").concat(dt('datatable.filter.overlay.popover.color'), ";\n    border: 1px solid ").concat(dt('datatable.filter.overlay.popover.border.color'), ";\n    border-radius: ").concat(dt('datatable.filter.overlay.popover.border.radius'), ";\n    box-shadow: ").concat(dt('datatable.filter.overlay.popover.shadow'), ";\n    min-width: 12.5rem;\n    padding: ").concat(dt('datatable.filter.overlay.popover.padding'), ";\n    display: flex;\n    flex-direction: column;\n    gap: ").concat(dt('datatable.filter.overlay.popover.gap'), ";\n}\n\n.p-datatable-filter-operator-dropdown {\n    width: 100%;\n}\n\n.p-datatable-filter-rule-list,\n.p-datatable-filter-rule {\n    display: flex;\n    flex-direction: column;\n    gap: ").concat(dt('datatable.filter.overlay.popover.gap'), ";\n}\n\n.p-datatable-filter-rule {\n    border-bottom: 1px solid ").concat(dt('datatable.filter.rule.border.color'), ";\n}\n\n.p-datatable-filter-rule:last-child {\n    border-bottom: 0 none;\n}\n\n.p-datatable-filter-add-rule-button {\n    width: 100%;\n}\n\n.p-datatable-filter-remove-button {\n    width: 100%;\n}\n\n.p-datatable-filter-buttonbar {\n    padding: 0;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n}\n\n.p-datatable-virtualscroller-spacer {\n    display: flex;\n}\n\n.p-datatable .p-virtualscroller .p-virtualscroller-loading {\n    transform: none !important;\n    min-height: 0;\n    position: sticky;\n    top: 0;\n    left: 0;\n}\n\n.p-datatable-paginator-top {\n    border-color: ").concat(dt('datatable.paginator.top.border.color'), ";\n    border-style: solid;\n    border-width: ").concat(dt('datatable.paginator.top.border.width'), ";\n}\n\n.p-datatable-paginator-bottom {\n    border-color: ").concat(dt('datatable.paginator.bottom.border.color'), ";\n    border-style: solid;\n    border-width: ").concat(dt('datatable.paginator.bottom.border.width'), ";\n}\n\n.p-datatable-header {\n    background: ").concat(dt('datatable.header.background'), ";\n    color: ").concat(dt('datatable.header.color'), ";\n    border-color: ").concat(dt('datatable.header.border.color'), ";\n    border-style: solid;\n    border-width: ").concat(dt('datatable.header.border.width'), ";\n    padding: ").concat(dt('datatable.header.padding'), ";\n}\n\n.p-datatable-footer {\n    background: ").concat(dt('datatable.footer.background'), ";\n    color: ").concat(dt('datatable.footer.color'), ";\n    border-color: ").concat(dt('datatable.footer.border.color'), ";\n    border-style: solid;\n    border-width: ").concat(dt('datatable.footer.border.width'), ";\n    padding: ").concat(dt('datatable.footer.padding'), ";\n}\n\n.p-datatable-header-cell {\n    padding: ").concat(dt('datatable.header.cell.padding'), ";\n    background: ").concat(dt('datatable.header.cell.background'), ";\n    border-color: ").concat(dt('datatable.header.cell.border.color'), ";\n    border-style: solid;\n    border-width: 0 0 1px 0;\n    color: ").concat(dt('datatable.header.cell.color'), ";\n    font-weight: normal;\n    text-align: left;\n    transition: background ").concat(dt('datatable.transition.duration'), ", color ").concat(dt('datatable.transition.duration'), ", border-color ").concat(dt('datatable.transition.duration'), ",\n            outline-color ").concat(dt('datatable.transition.duration'), ", box-shadow ").concat(dt('datatable.transition.duration'), ";\n}\n\n.p-datatable-column-title {\n    font-weight: ").concat(dt('datatable.column.title.font.weight'), ";\n}\n\n.p-datatable-tbody > tr {\n    outline-color: transparent;\n    background: ").concat(dt('datatable.row.background'), ";\n    color: ").concat(dt('datatable.row.color'), ";\n    transition: background ").concat(dt('datatable.transition.duration'), ", color ").concat(dt('datatable.transition.duration'), ", border-color ").concat(dt('datatable.transition.duration'), ",\n            outline-color ").concat(dt('datatable.transition.duration'), ", box-shadow ").concat(dt('datatable.transition.duration'), ";\n}\n\n.p-datatable-tbody > tr > td {\n    text-align: left;\n    border-color: ").concat(dt('datatable.body.cell.border.color'), ";\n    border-style: solid;\n    border-width: 0 0 1px 0;\n    padding: ").concat(dt('datatable.body.cell.padding'), ";\n}\n\n.p-datatable-hoverable .p-datatable-tbody > tr:not(.p-datatable-row-selected):hover {\n    background: ").concat(dt('datatable.row.hover.background'), ";\n    color: ").concat(dt('datatable.row.hover.color'), ";\n}\n\n.p-datatable-tbody > tr.p-datatable-row-selected {\n    background: ").concat(dt('datatable.row.selected.background'), ";\n    color: ").concat(dt('datatable.row.selected.color'), ";\n}\n\n.p-datatable-tbody > tr:has(+ .p-datatable-row-selected) > td {\n    border-bottom-color: ").concat(dt('datatable.body.cell.selected.border.color'), ";\n}\n\n.p-datatable-tbody > tr.p-datatable-row-selected > td {\n    border-bottom-color: ").concat(dt('datatable.body.cell.selected.border.color'), ";\n}\n\n.p-datatable-tbody > tr:focus-visible,\n.p-datatable-tbody > tr.p-datatable-contextmenu-row-selected {\n    box-shadow: ").concat(dt('datatable.row.focus.ring.shadow'), ";\n    outline: ").concat(dt('datatable.row.focus.ring.width'), " ").concat(dt('datatable.row.focus.ring.style'), " ").concat(dt('datatable.row.focus.ring.color'), ";\n    outline-offset: ").concat(dt('datatable.row.focus.ring.offset'), ";\n}\n\n.p-datatable-tfoot > tr > td {\n    text-align: left;\n    padding: ").concat(dt('datatable.footer.cell.padding'), ";\n    border-color: ").concat(dt('datatable.footer.cell.border.color'), ";\n    border-style: solid;\n    border-width: 0 0 1px 0;\n    color: ").concat(dt('datatable.footer.cell.color'), ";\n    background: ").concat(dt('datatable.footer.cell.background'), ";\n}\n\n.p-datatable-column-footer {\n    font-weight: ").concat(dt('datatable.column.footer.font.weight'), ";\n}\n\n.p-datatable-sortable-column {\n    cursor: pointer;\n    user-select: none;\n    outline-color: transparent;\n}\n\n.p-datatable-column-title,\n.p-datatable-sort-icon,\n.p-datatable-sort-badge {\n    vertical-align: middle;\n}\n\n.p-datatable-sort-icon {\n    color: ").concat(dt('datatable.sort.icon.color'), ";\n    font-size: ").concat(dt('datatable.sort.icon.size'), ";\n    width: ").concat(dt('datatable.sort.icon.size'), ";\n    height: ").concat(dt('datatable.sort.icon.size'), ";\n    transition: color ").concat(dt('datatable.transition.duration'), ";\n}\n\n.p-datatable-sortable-column:not(.p-datatable-column-sorted):hover {\n    background: ").concat(dt('datatable.header.cell.hover.background'), ";\n    color: ").concat(dt('datatable.header.cell.hover.color'), ";\n}\n\n.p-datatable-sortable-column:not(.p-datatable-column-sorted):hover .p-datatable-sort-icon {\n    color: ").concat(dt('datatable.sort.icon.hover.color'), ";\n}\n\n.p-datatable-column-sorted {\n    background: ").concat(dt('datatable.header.cell.selected.background'), ";\n    color: ").concat(dt('datatable.header.cell.selected.color'), ";\n}\n\n.p-datatable-column-sorted .p-datatable-sort-icon {\n    color: ").concat(dt('datatable.header.cell.selected.color'), ";\n}\n\n.p-datatable-sortable-column:focus-visible {\n    box-shadow: ").concat(dt('datatable.header.cell.focus.ring.shadow'), ";\n    outline: ").concat(dt('datatable.header.cell.focus.ring.width'), " ").concat(dt('datatable.header.cell.focus.ring.style'), " ").concat(dt('datatable.header.cell.focus.ring.color'), ";\n    outline-offset: ").concat(dt('datatable.header.cell.focus.ring.offset'), ";\n}\n\n.p-datatable-hoverable .p-datatable-selectable-row {\n    cursor: pointer;\n}\n\n.p-datatable-tbody > tr.p-datatable-dragpoint-top > td {\n    box-shadow: inset 0 2px 0 0 ").concat(dt('datatable.drop.point.color'), ";\n}\n\n.p-datatable-tbody > tr.p-datatable-dragpoint-bottom > td {\n    box-shadow: inset 0 -2px 0 0 ").concat(dt('datatable.drop.point.color'), ";\n}\n\n.p-datatable-loading-icon {\n    font-size: ").concat(dt('datatable.loading.icon.size'), ";\n    width: ").concat(dt('datatable.loading.icon.size'), ";\n    height: ").concat(dt('datatable.loading.icon.size'), ";\n}\n\n.p-datatable-gridlines .p-datatable-header {\n    border-width: 1px 1px 0 1px;\n}\n\n.p-datatable-gridlines .p-datatable-footer {\n    border-width: 0 1px 1px 1px;\n}\n\n.p-datatable-gridlines .p-datatable-paginator-top {\n    border-width: 1px 1px 0 1px;\n}\n\n.p-datatable-gridlines .p-datatable-paginator-bottom {\n    border-width: 0 1px 1px 1px;\n}\n\n.p-datatable-gridlines .p-datatable-thead > tr > th {\n    border-width: 1px 0 1px 1px;\n}\n\n.p-datatable-gridlines .p-datatable-thead > tr > th:last-child {\n    border-width: 1px;\n}\n\n.p-datatable-gridlines .p-datatable-tbody > tr > td {\n    border-width: 1px 0 0 1px;\n}\n\n.p-datatable-gridlines .p-datatable-tbody > tr > td:last-child {\n    border-width: 1px 1px 0 1px;\n}\n\n.p-datatable-gridlines .p-datatable-tbody > tr:last-child > td {\n    border-width: 1px 0 1px 1px;\n}\n\n.p-datatable-gridlines .p-datatable-tbody > tr:last-child > td:last-child {\n    border-width: 1px;\n}\n\n.p-datatable-gridlines .p-datatable-tfoot > tr > td {\n    border-width: 1px 0 1px 1px;\n}\n\n.p-datatable-gridlines .p-datatable-tfoot > tr > td:last-child {\n    border-width: 1px 1px 1px 1px;\n}\n\n.p-datatable.p-datatable-gridlines .p-datatable-thead + .p-datatable-tfoot > tr > td {\n    border-width: 0 0 1px 1px;\n}\n\n.p-datatable.p-datatable-gridlines .p-datatable-thead + .p-datatable-tfoot > tr > td:last-child {\n    border-width: 0 1px 1px 1px;\n}\n\n.p-datatable.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody) .p-datatable-tbody > tr > td {\n    border-width: 0 0 1px 1px;\n}\n\n.p-datatable.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody) .p-datatable-tbody > tr > td:last-child {\n    border-width: 0 1px 1px 1px;\n}\n\n.p-datatable.p-datatable-gridlines:has(.p-datatable-tbody):has(.p-datatable-tfoot) .p-datatable-tbody > tr:last-child > td {\n    border-width: 0 0 0 1px;\n}\n\n.p-datatable.p-datatable-gridlines:has(.p-datatable-tbody):has(.p-datatable-tfoot) .p-datatable-tbody > tr:last-child > td:last-child {\n    border-width: 0 1px 0 1px;\n}\n\n.p-datatable.p-datatable-striped .p-datatable-tbody > tr.p-row-odd {\n    background: ").concat(dt('datatable.row.striped.background'), ";\n}\n\n.p-datatable.p-datatable-striped .p-datatable-tbody > tr.p-row-odd.p-datatable-row-selected {\n    background: ").concat(dt('datatable.row.selected.background'), ";\n    color: ").concat(dt('datatable.row.selected.color'), ";\n}\n\n.p-datatable.p-datatable-sm .p-datatable-header {\n    padding: 0.375rem 0.5rem;\n}\n\n.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {\n    padding: 0.375rem 0.5rem;\n}\n\n.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {\n    padding: 0.375rem 0.5rem;\n}\n\n.p-datatable.p-datatable-sm .p-datatable-tfoot > tr > td {\n    padding: 0.375rem 0.5rem;\n}\n\n.p-datatable.p-datatable-sm .p-datatable-footer {\n    padding: 0.375rem 0.5rem;\n}\n\n.p-datatable.p-datatable-lg .p-datatable-header {\n    padding: 1rem 1.25rem;\n}\n\n.p-datatable.p-datatable-lg .p-datatable-thead > tr > th {\n    padding: 1rem 1.25rem;\n}\n\n.p-datatable.p-datatable-lg .p-datatable-tbody>tr>td {\n    padding: 1rem 1.25rem;\n}\n\n.p-datatable.p-datatable-lg .p-datatable-tfoot>tr>td {\n    padding: 1rem 1.25rem;\n}\n\n.p-datatable.p-datatable-lg .p-datatable-footer {\n    padding: 1rem 1.25rem;\n}\n\n.p-datatable-row-toggle-button {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n    width: ").concat(dt('datatable.row.toggle.button.size'), ";\n    height: ").concat(dt('datatable.row.toggle.button.size'), ";\n    color: ").concat(dt('datatable.row.toggle.button.color'), ";\n    border: 0 none;\n    background: transparent;\n    cursor: pointer;\n    border-radius: ").concat(dt('datatable.row.toggle.button.border.radius'), ";\n    transition: background ").concat(dt('datatable.transition.duration'), ", color ").concat(dt('datatable.transition.duration'), ", border-color ").concat(dt('datatable.transition.duration'), ",\n            outline-color ").concat(dt('datatable.transition.duration'), ", box-shadow ").concat(dt('datatable.transition.duration'), ";\n    outline-color: transparent;\n    user-select: none;\n}\n\n.p-datatable-row-toggle-button:enabled:hover {\n    color: ").concat(dt('datatable.row.toggle.button.hover.color'), ";\n    background: ").concat(dt('datatable.row.toggle.button.hover.background'), ";\n}\n\n.p-datatable-tbody > tr.p-datatable-row-selected .p-datatable-row-toggle-button:hover {\n    background: ").concat(dt('datatable.row.toggle.button.selected.hover.background'), ";\n    ").concat(dt('datatable.row.toggle.button.selected.hover.color'), ";\n}\n\n.p-datatable-row-toggle-button:focus-visible {\n    box-shadow: ").concat(dt('datatable.row.toggle.button.focus.ring.shadow'), ";\n    outline: ").concat(dt('datatable.row.toggle.button.focus.ring.width'), " ").concat(dt('datatable.row.toggle.button.focus.ring.style'), " ").concat(dt('datatable.row.toggle.button.focus.ring.color'), ";\n    outline-offset: ").concat(dt('datatable.row.toggle.button.focus.ring.offset'), ";\n}\n");
};
var classes$1 = {
  root: function root(_ref2) {
    var props = _ref2.props;
    return ['p-datatable p-component', {
      'p-datatable-hoverable': props.rowHover || props.selectionMode,
      'p-datatable-resizable': props.resizableColumns,
      'p-datatable-resizable-fit': props.resizableColumns && props.columnResizeMode === 'fit',
      'p-datatable-scrollable': props.scrollable,
      'p-datatable-flex-scrollable': props.scrollable && props.scrollHeight === 'flex',
      'p-datatable-striped': props.stripedRows,
      'p-datatable-gridlines': props.showGridlines,
      'p-datatable-sm': props.size === 'small',
      'p-datatable-lg': props.size === 'large'
    }];
  },
  mask: 'p-datatable-mask p-overlay-mask',
  loadingIcon: 'p-datatable-loading-icon',
  header: 'p-datatable-header',
  pcPaginator: function pcPaginator(_ref3) {
    var position = _ref3.position;
    return 'p-datatable-paginator-' + position;
  },
  tableContainer: 'p-datatable-table-container',
  table: function table(_ref4) {
    var props = _ref4.props;
    return ['p-datatable-table', {
      'p-datatable-scrollable-table': props.scrollable,
      'p-datatable-resizable-table': props.resizableColumns,
      'p-datatable-resizable-table-fit': props.resizableColumns && props.columnResizeMode === 'fit'
    }];
  },
  thead: 'p-datatable-thead',
  headerCell: function headerCell(_ref5) {
    var instance = _ref5.instance,
      props = _ref5.props,
      column = _ref5.column;
    return column && !instance.columnProp(column, 'hidden') && (props.rowGroupMode !== 'subheader' || props.groupRowsBy !== instance.columnProp(column, 'field')) ? ['p-datatable-header-cell', {
      'p-datatable-frozen-column': instance.columnProp(column, 'frozen')
    }] : ['p-datatable-header-cell', {
      'p-datatable-sortable-column': instance.columnProp('sortable'),
      'p-datatable-resizable-column': instance.resizableColumns,
      'p-datatable-column-sorted': instance.isColumnSorted(),
      'p-datatable-frozen-column': instance.columnProp('frozen'),
      'p-datatable-reorderable-column': props.reorderableColumns
    }];
  },
  columnResizer: 'p-datatable-column-resizer',
  columnHeaderContent: 'p-datatable-column-header-content',
  columnTitle: 'p-datatable-column-title',
  columnFooter: 'p-datatable-column-footer',
  sortIcon: 'p-datatable-sort-icon',
  pcSortBadge: 'p-datatable-sort-badge',
  filter: function filter(_ref6) {
    var props = _ref6.props;
    return ['p-datatable-filter', {
      'p-datatable-inline-filter': props.display === 'row',
      'p-datatable-popover-filter': props.display === 'menu'
    }];
  },
  filterElementContainer: 'p-datatable-filter-element-container',
  pcColumnFilterButton: 'p-datatable-column-filter-button',
  pcColumnFilterClearButton: 'p-datatable-column-filter-clear-button',
  filterOverlay: function filterOverlay(_ref7) {
    _ref7.instance;
      var props = _ref7.props;
    return ['p-datatable-filter-overlay p-component', {
      'p-datatable-filter-overlay-popover': props.display === 'menu'
    }];
  },
  filterConstraintList: 'p-datatable-filter-constraint-list',
  filterConstraint: function filterConstraint(_ref8) {
    var instance = _ref8.instance,
      matchMode = _ref8.matchMode;
    return ['p-datatable-filter-constraint', {
      'p-datatable-filter-constraint-selected': matchMode && instance.isRowMatchModeSelected(matchMode.value)
    }];
  },
  filterConstraintSeparator: 'p-datatable-filter-constraint-separator',
  filterOperator: 'p-datatable-filter-operator',
  pcFilterOperatorDropdown: 'p-datatable-filter-operator-dropdown',
  filterRuleList: 'p-datatable-filter-rule-list',
  filterRule: 'p-datatable-filter-rule',
  pcFilterConstraintDropdown: 'p-datatable-filter-constraint-dropdown',
  pcFilterRemoveRuleButton: 'p-datatable-filter-remove-rule-button',
  pcFilterAddRuleButton: 'p-datatable-filter-add-rule-button',
  filterButtonbar: 'p-datatable-filter-buttonbar',
  pcFilterClearButton: 'p-datatable-filter-clear-button',
  pcFilterApplyButton: 'p-datatable-filter-apply-button',
  tbody: function tbody(_ref9) {
    var props = _ref9.props;
    return props.frozenRow ? 'p-datatable-tbody p-datatable-frozen-tbody' : 'p-datatable-tbody';
  },
  rowGroupHeader: 'p-datatable-row-group-header',
  rowToggleButton: 'p-datatable-row-toggle-button',
  rowToggleIcon: 'p-datatable-row-toggle-icon',
  row: function row(_ref10) {
    var instance = _ref10.instance,
      props = _ref10.props,
      index = _ref10.index,
      columnSelectionMode = _ref10.columnSelectionMode;
    var rowStyleClass = [];
    if (props.selectionMode) {
      rowStyleClass.push('p-datatable-selectable-row');
    }
    if (props.selection) {
      rowStyleClass.push({
        'p-datatable-row-selected': columnSelectionMode ? instance.isSelected && instance.$parentInstance.$parentInstance.highlightOnSelect : instance.isSelected
      });
    }
    if (props.contextMenuSelection) {
      rowStyleClass.push({
        'p-datatable-contextmenu-row-selected': instance.isSelectedWithContextMenu
      });
    }
    rowStyleClass.push(index % 2 === 0 ? 'p-row-even' : 'p-row-odd');
    return rowStyleClass;
  },
  rowExpansion: 'p-datatable-row-expansion',
  rowGroupFooter: 'p-datatable-row-group-footer',
  emptyMessage: 'p-datatable-empty-message',
  bodyCell: function bodyCell(_ref11) {
    var instance = _ref11.instance;
    return [{
      'p-datatable-frozen-column': instance.columnProp('frozen')
    }];
  },
  reorderableRowHandle: 'p-datatable-reorderable-row-handle',
  pcRowEditorInit: 'p-datatable-row-editor-init',
  pcRowEditorSave: 'p-datatable-row-editor-save',
  pcRowEditorCancel: 'p-datatable-row-editor-cancel',
  tfoot: 'p-datatable-tfoot',
  footerCell: function footerCell(_ref12) {
    var instance = _ref12.instance;
    return [{
      'p-datatable-frozen-column': instance.columnProp('frozen')
    }];
  },
  virtualScrollerSpacer: 'p-datatable-virtualscroller-spacer',
  footer: 'p-datatable-footer',
  columnResizeIndicator: 'p-datatable-column-resize-indicator',
  rowReorderIndicatorUp: 'p-datatable-row-reorder-indicator-up',
  rowReorderIndicatorDown: 'p-datatable-row-reorder-indicator-down'
};
var inlineStyles = {
  tableContainer: {
    overflow: 'auto'
  },
  thead: {
    position: 'sticky'
  },
  tfoot: {
    position: 'sticky'
  }
};
var DataTableStyle = BaseStyle.extend({
  name: 'datatable',
  theme: theme$1,
  classes: classes$1,
  inlineStyles: inlineStyles
});

var theme = function theme(_ref) {
  var dt = _ref.dt;
  return "\n.p-checkbox {\n    position: relative;\n    display: inline-flex;\n    user-select: none;\n    vertical-align: bottom;\n    width: ".concat(dt('checkbox.width'), ";\n    height: ").concat(dt('checkbox.height'), ";\n}\n\n.p-checkbox-input {\n    cursor: pointer;\n    appearance: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    padding: 0;\n    margin: 0;\n    opacity: 0;\n    z-index: 1;\n    outline: 0 none;\n    border: 1px solid transparent;\n    border-radius: ").concat(dt('checkbox.border.radius'), ";\n}\n\n.p-checkbox-box {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border-radius: ").concat(dt('checkbox.border.radius'), ";\n    border: 1px solid ").concat(dt('checkbox.border.color'), ";\n    background: ").concat(dt('checkbox.background'), ";\n    width: ").concat(dt('checkbox.width'), ";\n    height: ").concat(dt('checkbox.height'), ";\n    transition: background ").concat(dt('checkbox.transition.duration'), ", color ").concat(dt('checkbox.transition.duration'), ", border-color ").concat(dt('checkbox.transition.duration'), ", box-shadow ").concat(dt('checkbox.transition.duration'), ", outline-color ").concat(dt('checkbox.transition.duration'), ";\n    outline-color: transparent;\n    box-shadow: ").concat(dt('checkbox.shadow'), ";\n}\n\n.p-checkbox-icon {\n    transition-duration: ").concat(dt('checkbox.transition.duration'), ";\n    color: ").concat(dt('checkbox.icon.color'), ";\n    font-size: ").concat(dt('checkbox.icon.size'), ";\n    width: ").concat(dt('checkbox.icon.size'), ";\n    height: ").concat(dt('checkbox.icon.size'), ";\n}\n\n.p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n    border-color: ").concat(dt('checkbox.hover.border.color'), ";\n}\n\n.p-checkbox-checked .p-checkbox-box {\n    border-color: ").concat(dt('checkbox.checked.border.color'), ";\n    background: ").concat(dt('checkbox.checked.background'), ";\n}\n\n.p-checkbox-checked .p-checkbox-icon {\n    color: ").concat(dt('checkbox.icon.checked.color'), ";\n}\n\n.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n    background: ").concat(dt('checkbox.checked.hover.background'), ";\n    border-color: ").concat(dt('checkbox.checked.hover.border.color'), ";\n}\n\n.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {\n    color: ").concat(dt('checkbox.icon.checked.hover.color'), ";\n}\n\n.p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {\n    border-color: ").concat(dt('checkbox.focus.border.color'), ";\n    box-shadow: ").concat(dt('checkbox.focus.ring.shadow'), ";\n    outline: ").concat(dt('checkbox.focus.ring.width'), " ").concat(dt('checkbox.focus.ring.style'), " ").concat(dt('checkbox.focus.ring.color'), ";\n    outline-offset: ").concat(dt('checkbox.focus.ring.offset'), ";\n}\n\n.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {\n    border-color: ").concat(dt('checkbox.checked.focus.border.color'), ";\n}\n\n.p-checkbox.p-invalid > .p-checkbox-box {\n    border-color: ").concat(dt('checkbox.invalid.border.color'), ";\n}\n\n.p-checkbox.p-variant-filled .p-checkbox-box {\n    background: ").concat(dt('checkbox.filled.background'), ";\n}\n\n.p-checkbox-checked.p-variant-filled .p-checkbox-box {\n    background: ").concat(dt('checkbox.checked.background'), ";\n}\n\n.p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n    background: ").concat(dt('checkbox.checked.hover.background'), ";\n}\n\n.p-checkbox.p-disabled {\n    opacity: 1;\n}\n\n.p-checkbox.p-disabled .p-checkbox-box {\n    background: ").concat(dt('checkbox.disabled.background'), ";\n    border-color: ").concat(dt('checkbox.checked.disabled.border.color'), ";\n}\n\n.p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {\n    color: ").concat(dt('checkbox.icon.disabled.color'), ";\n}\n");
};
var classes = {
  root: function root(_ref2) {
    var instance = _ref2.instance,
      props = _ref2.props;
    return ['p-checkbox p-component', {
      'p-checkbox-checked': instance.checked,
      'p-disabled': props.disabled,
      'p-invalid': props.invalid,
      'p-variant-filled': props.variant ? props.variant === 'filled' : instance.$primevue.config.inputStyle === 'filled' || instance.$primevue.config.inputVariant === 'filled'
    }];
  },
  box: 'p-checkbox-box',
  input: 'p-checkbox-input',
  icon: 'p-checkbox-icon'
};
var CheckboxStyle = BaseStyle.extend({
  name: 'checkbox',
  theme: theme,
  classes: classes
});

const primevueTheme = definePreset(Aura, {
  sematic: {
    primary: {
      50: "{indigo.50}",
      100: "{indigo.100}",
      200: "{indigo.200}",
      300: "{indigo.300}",
      400: "{indigo.400}",
      500: "{indigo.500}",
      600: "{indigo.600}",
      700: "{indigo.700}",
      800: "{indigo.800}",
      900: "{indigo.900}",
      950: "{indigo.950}"
    }
  }
});
const undefined$1 = {
  preset: primevueTheme,
  options: {
    darkModeSelector: ".dark"
  }
};

const runtimeConfig = useRuntimeConfig();
const config$4 = runtimeConfig?.public?.primevue ?? {};
const { options = {} } = config$4;

const stylesToTop = [].join('');
const styleProps = {
    
};
const styles = [
    ,
    BaseStyle && BaseStyle.getStyleSheet ? BaseStyle.getStyleSheet(undefined$1, styleProps) : '',BadgeStyle && BadgeStyle.getStyleSheet ? BadgeStyle.getStyleSheet(undefined$1, styleProps) : '',ButtonStyle && ButtonStyle.getStyleSheet ? ButtonStyle.getStyleSheet(undefined$1, styleProps) : '',ToolbarStyle && ToolbarStyle.getStyleSheet ? ToolbarStyle.getStyleSheet(undefined$1, styleProps) : '',InputIconStyle && InputIconStyle.getStyleSheet ? InputIconStyle.getStyleSheet(undefined$1, styleProps) : '',InputTextStyle && InputTextStyle.getStyleSheet ? InputTextStyle.getStyleSheet(undefined$1, styleProps) : '',IconFieldStyle && IconFieldStyle.getStyleSheet ? IconFieldStyle.getStyleSheet(undefined$1, styleProps) : '',ColumnStyle && ColumnStyle.getStyleSheet ? ColumnStyle.getStyleSheet(undefined$1, styleProps) : '',DataTableStyle && DataTableStyle.getStyleSheet ? DataTableStyle.getStyleSheet(undefined$1, styleProps) : '',CheckboxStyle && CheckboxStyle.getStyleSheet ? CheckboxStyle.getStyleSheet(undefined$1, styleProps) : ''
].join('');

Theme.setTheme(undefined$1 || options?.theme);

const themes = 
[
    BaseStyle && BaseStyle.getCommonThemeStyleSheet ? BaseStyle.getCommonThemeStyleSheet(undefined$1, styleProps) : '',
    BaseStyle && BaseStyle.getThemeStyleSheet ? BaseStyle.getThemeStyleSheet(undefined$1, styleProps) : '',BadgeStyle && BadgeStyle.getThemeStyleSheet ? BadgeStyle.getThemeStyleSheet(undefined$1, styleProps) : '',ButtonStyle && ButtonStyle.getThemeStyleSheet ? ButtonStyle.getThemeStyleSheet(undefined$1, styleProps) : '',ToolbarStyle && ToolbarStyle.getThemeStyleSheet ? ToolbarStyle.getThemeStyleSheet(undefined$1, styleProps) : '',InputIconStyle && InputIconStyle.getThemeStyleSheet ? InputIconStyle.getThemeStyleSheet(undefined$1, styleProps) : '',InputTextStyle && InputTextStyle.getThemeStyleSheet ? InputTextStyle.getThemeStyleSheet(undefined$1, styleProps) : '',IconFieldStyle && IconFieldStyle.getThemeStyleSheet ? IconFieldStyle.getThemeStyleSheet(undefined$1, styleProps) : '',ColumnStyle && ColumnStyle.getThemeStyleSheet ? ColumnStyle.getThemeStyleSheet(undefined$1, styleProps) : '',DataTableStyle && DataTableStyle.getThemeStyleSheet ? DataTableStyle.getThemeStyleSheet(undefined$1, styleProps) : '',CheckboxStyle && CheckboxStyle.getThemeStyleSheet ? CheckboxStyle.getThemeStyleSheet(undefined$1, styleProps) : ''
].join('');

const defineNitroPlugin = (def) => def;
const _2nRNU1wFsa = defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook("render:html", (html) => {
    html.head.unshift(stylesToTop);
    html.head.push(styles);
    html.head.push(themes);
  });
});

const plugins = [
  _iHUNCkhhXC,
_2nRNU1wFsa
];

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, (error.message || error.toString() || "internal server error") + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await import('./_/error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const assets = {
  "/apple-touch-icon.png": {
    "type": "image/png",
    "etag": "\"2def-6t/F8PU2iSckyh8AXRav3Qxr4E8\"",
    "mtime": "2024-10-17T05:39:58.175Z",
    "size": 11759,
    "path": "../public/apple-touch-icon.png"
  },
  "/favicon-16x16.png": {
    "type": "image/png",
    "etag": "\"3e6-12Oqbn/IxNd2sL5j8mJO+N5TeLQ\"",
    "mtime": "2024-10-17T05:40:16.478Z",
    "size": 998,
    "path": "../public/favicon-16x16.png"
  },
  "/favicon-32x32.png": {
    "type": "image/png",
    "etag": "\"6c4-UnUSXbqaqCsJSp5TVcK7D5MRP98\"",
    "mtime": "2024-10-17T05:40:07.615Z",
    "size": 1732,
    "path": "../public/favicon-32x32.png"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-n8egyE9tcb7sKGr/pYCaQ4uWqxI\"",
    "mtime": "2024-10-18T21:23:03.000Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1-rcg7GeeTSRscbqD9i0bNnzLlkvw\"",
    "mtime": "2024-10-18T21:23:03.000Z",
    "size": 1,
    "path": "../public/robots.txt"
  },
  "/safari-pinned-tab.svg": {
    "type": "image/svg+xml",
    "etag": "\"40f-7ZVqeITce+SECFuu+51uKOjcKIY\"",
    "mtime": "2024-10-17T05:40:51.516Z",
    "size": 1039,
    "path": "../public/safari-pinned-tab.svg"
  },
  "/icons/ck-white.svg": {
    "type": "image/svg+xml",
    "etag": "\"d9-7vRkm1Pbb9eYCH3dnnQ+uVi0gZI\"",
    "mtime": "2024-10-20T07:04:24.257Z",
    "size": 217,
    "path": "../public/icons/ck-white.svg"
  },
  "/icons/facebook.svg": {
    "type": "image/svg+xml",
    "etag": "\"32a5-QVYYd3yX0XbOaLJE/M90dJBXm2k\"",
    "mtime": "2024-01-19T07:46:28.708Z",
    "size": 12965,
    "path": "../public/icons/facebook.svg"
  },
  "/icons/google.svg": {
    "type": "image/svg+xml",
    "etag": "\"60d-QVoCP0pVPz46YQyebchLe3cVCFk\"",
    "mtime": "2024-10-17T07:13:05.786Z",
    "size": 1549,
    "path": "../public/icons/google.svg"
  },
  "/icons/insta.svg": {
    "type": "image/svg+xml",
    "etag": "\"13c5d-UivAEujnuHWBnk0PXz2pHPsup/Y\"",
    "mtime": "2024-01-19T07:46:28.710Z",
    "size": 80989,
    "path": "../public/icons/insta.svg"
  },
  "/icons/linkedin.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f85-EWxtlZpeqJQsRAytoXAT3kBsoVI\"",
    "mtime": "2024-01-19T07:46:28.710Z",
    "size": 12165,
    "path": "../public/icons/linkedin.svg"
  },
  "/icons/twitter.svg": {
    "type": "image/svg+xml",
    "etag": "\"4895-gTcCJsxhlgto5KsHquXMm0Tq6QY\"",
    "mtime": "2024-01-19T07:46:28.710Z",
    "size": 18581,
    "path": "../public/icons/twitter.svg"
  },
  "/icons/whatsapp.svg": {
    "type": "image/svg+xml",
    "etag": "\"8d6-D6neL98dVrLR+KP/R0a7JDMcclU\"",
    "mtime": "2024-10-15T10:24:30.422Z",
    "size": 2262,
    "path": "../public/icons/whatsapp.svg"
  },
  "/users/0ieesh0jsh.png": {
    "type": "image/png",
    "etag": "\"9431-uDqi0ntGmKqyLahcp1i+4zTNaQA\"",
    "mtime": "2024-10-28T06:23:48.894Z",
    "size": 37937,
    "path": "../public/users/0ieesh0jsh.png"
  },
  "/_nuxt/6FLgL_on.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e9-gCIffgeXdWqLjAevQCdCQWI7q90\"",
    "mtime": "2024-10-30T07:01:20.725Z",
    "size": 489,
    "path": "../public/_nuxt/6FLgL_on.js"
  },
  "/_nuxt/6FLgL_on.js.map": {
    "type": "application/json",
    "etag": "\"295-SZy5j94X23jjgbcRm8bowE+gjP0\"",
    "mtime": "2024-10-30T07:01:20.752Z",
    "size": 661,
    "path": "../public/_nuxt/6FLgL_on.js.map"
  },
  "/_nuxt/9Bgc5Rlp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"137-uPzN4ttj5fprRfG4ZdhCgdPoyM0\"",
    "mtime": "2024-10-30T07:01:20.737Z",
    "size": 311,
    "path": "../public/_nuxt/9Bgc5Rlp.js"
  },
  "/_nuxt/9Bgc5Rlp.js.map": {
    "type": "application/json",
    "etag": "\"3fe-0fzXOULNi4WEyOWVxbggsoLaOgQ\"",
    "mtime": "2024-10-30T07:01:20.752Z",
    "size": 1022,
    "path": "../public/_nuxt/9Bgc5Rlp.js.map"
  },
  "/_nuxt/ACvAjTe3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13f7d-knFZFK4LOhxp5r7hriplycSNbLI\"",
    "mtime": "2024-10-30T07:01:20.725Z",
    "size": 81789,
    "path": "../public/_nuxt/ACvAjTe3.js"
  },
  "/_nuxt/ACvAjTe3.js.map": {
    "type": "application/json",
    "etag": "\"13b98-Targo/zExhL5uZKvUUBui9F+R50\"",
    "mtime": "2024-10-30T07:01:20.752Z",
    "size": 80792,
    "path": "../public/_nuxt/ACvAjTe3.js.map"
  },
  "/_nuxt/auth.B-zydxeE.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ba-APNXtJi+B2Wt5H568Hx1qZpXSzc\"",
    "mtime": "2024-10-30T07:01:20.725Z",
    "size": 186,
    "path": "../public/_nuxt/auth.B-zydxeE.css"
  },
  "/_nuxt/B0825VGy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"22dc-xbRHC2OfJncXmM/mqDmJUgEJhjM\"",
    "mtime": "2024-10-30T07:01:20.741Z",
    "size": 8924,
    "path": "../public/_nuxt/B0825VGy.js"
  },
  "/_nuxt/B0825VGy.js.map": {
    "type": "application/json",
    "etag": "\"8bf3-FLTIaF4mRUYanEeWBpKKMbrRXYs\"",
    "mtime": "2024-10-30T07:01:20.777Z",
    "size": 35827,
    "path": "../public/_nuxt/B0825VGy.js.map"
  },
  "/_nuxt/B3evBVDQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"73-CyYbR+R+JqA+qf/sS/Ukje2JnNM\"",
    "mtime": "2024-10-30T07:01:20.741Z",
    "size": 115,
    "path": "../public/_nuxt/B3evBVDQ.js"
  },
  "/_nuxt/B3evBVDQ.js.map": {
    "type": "application/json",
    "etag": "\"5c-6goVAOcD/YyPyaoOY+4fpkq19Ak\"",
    "mtime": "2024-10-30T07:01:20.745Z",
    "size": 92,
    "path": "../public/_nuxt/B3evBVDQ.js.map"
  },
  "/_nuxt/B5_h2jd3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"234-IhNziPSNyLjXJHeJmQvFNyJWCCY\"",
    "mtime": "2024-10-30T07:01:20.741Z",
    "size": 564,
    "path": "../public/_nuxt/B5_h2jd3.js"
  },
  "/_nuxt/B5_h2jd3.js.map": {
    "type": "application/json",
    "etag": "\"14d7-BZs4g7SslrgBASEx9SuTWb4fjiw\"",
    "mtime": "2024-10-30T07:01:20.752Z",
    "size": 5335,
    "path": "../public/_nuxt/B5_h2jd3.js.map"
  },
  "/_nuxt/BcCSN9MO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15e1-Eso5pck5xczxsvmTe79iAjTtDoQ\"",
    "mtime": "2024-10-30T07:01:20.726Z",
    "size": 5601,
    "path": "../public/_nuxt/BcCSN9MO.js"
  },
  "/_nuxt/BcCSN9MO.js.map": {
    "type": "application/json",
    "etag": "\"22d3-bouTtfbVgFgPBKtTRiGzpTRBR+U\"",
    "mtime": "2024-10-30T07:01:20.742Z",
    "size": 8915,
    "path": "../public/_nuxt/BcCSN9MO.js.map"
  },
  "/_nuxt/BdKTiowi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1172-ObRUgl3G1lHEjUhC68FSSaLH/2Y\"",
    "mtime": "2024-10-30T07:01:20.725Z",
    "size": 4466,
    "path": "../public/_nuxt/BdKTiowi.js"
  },
  "/_nuxt/BdKTiowi.js.map": {
    "type": "application/json",
    "etag": "\"20db-edmsY19VRpw5NMPST1MECVzLhfU\"",
    "mtime": "2024-10-30T07:01:20.754Z",
    "size": 8411,
    "path": "../public/_nuxt/BdKTiowi.js.map"
  },
  "/_nuxt/BDKvLFNl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30d-NWWjE8SRbkZug6pSoP2ssGMsC/Y\"",
    "mtime": "2024-10-30T07:01:20.737Z",
    "size": 781,
    "path": "../public/_nuxt/BDKvLFNl.js"
  },
  "/_nuxt/BDKvLFNl.js.map": {
    "type": "application/json",
    "etag": "\"cf4-vpAF/GigGjd7RoEQjNUAhiljNy8\"",
    "mtime": "2024-10-30T07:01:20.742Z",
    "size": 3316,
    "path": "../public/_nuxt/BDKvLFNl.js.map"
  },
  "/_nuxt/BeewlR_f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"651-SO21oZvgMdko5b8419Zo/ET5GbM\"",
    "mtime": "2024-10-30T07:01:20.736Z",
    "size": 1617,
    "path": "../public/_nuxt/BeewlR_f.js"
  },
  "/_nuxt/BeewlR_f.js.map": {
    "type": "application/json",
    "etag": "\"98d-uvO3FVrgiTLc/NNabYW9xwNYDV0\"",
    "mtime": "2024-10-30T07:01:20.752Z",
    "size": 2445,
    "path": "../public/_nuxt/BeewlR_f.js.map"
  },
  "/_nuxt/Bjew0SR7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2445-GlCSehIYMg6YBWECHOZHw+s1/o0\"",
    "mtime": "2024-10-30T07:01:20.736Z",
    "size": 9285,
    "path": "../public/_nuxt/Bjew0SR7.js"
  },
  "/_nuxt/Bjew0SR7.js.map": {
    "type": "application/json",
    "etag": "\"2dff-mlxYLEc2hV0FJybXR63riT2NwGw\"",
    "mtime": "2024-10-30T07:01:20.742Z",
    "size": 11775,
    "path": "../public/_nuxt/Bjew0SR7.js.map"
  },
  "/_nuxt/BmdcsA9B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"86cd-5xpurwfgj1junkVprIS4j1ckgGs\"",
    "mtime": "2024-10-30T07:01:20.736Z",
    "size": 34509,
    "path": "../public/_nuxt/BmdcsA9B.js"
  },
  "/_nuxt/BmdcsA9B.js.map": {
    "type": "application/json",
    "etag": "\"106f4-mPNa4JOI3LZiSrBvuRrZj25eOIg\"",
    "mtime": "2024-10-30T07:01:20.752Z",
    "size": 67316,
    "path": "../public/_nuxt/BmdcsA9B.js.map"
  },
  "/_nuxt/BUftVr1B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5fc-Z6JNdpXyjuX3WvjwC0VOfAX4AyY\"",
    "mtime": "2024-10-30T07:01:20.737Z",
    "size": 1532,
    "path": "../public/_nuxt/BUftVr1B.js"
  },
  "/_nuxt/BUftVr1B.js.map": {
    "type": "application/json",
    "etag": "\"5c-a7Zx3Q+iElkcKxVrxcxVUaSAMEc\"",
    "mtime": "2024-10-30T07:01:20.777Z",
    "size": 92,
    "path": "../public/_nuxt/BUftVr1B.js.map"
  },
  "/_nuxt/B_CLwRJg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b9-ifpZ6eEnelOdD0K14UxZekgKxrw\"",
    "mtime": "2024-10-30T07:01:20.742Z",
    "size": 185,
    "path": "../public/_nuxt/B_CLwRJg.js"
  },
  "/_nuxt/B_CLwRJg.js.map": {
    "type": "application/json",
    "etag": "\"5c-Y67YkW1Mq3E+8Lp/YlFk3SXCwto\"",
    "mtime": "2024-10-30T07:01:20.752Z",
    "size": 92,
    "path": "../public/_nuxt/B_CLwRJg.js.map"
  },
  "/_nuxt/c-SocDzn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"16b-aszITpPoO6RzXbx2dv9i3Wx2604\"",
    "mtime": "2024-10-30T07:01:20.737Z",
    "size": 363,
    "path": "../public/_nuxt/c-SocDzn.js"
  },
  "/_nuxt/c-SocDzn.js.map": {
    "type": "application/json",
    "etag": "\"457-RqtXIgXZ84ZmwcF+NFZhvMHD3yA\"",
    "mtime": "2024-10-30T07:01:20.752Z",
    "size": 1111,
    "path": "../public/_nuxt/c-SocDzn.js.map"
  },
  "/_nuxt/C2Lm12Wi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15ef-NkYXIrXt2erpRUSZHZRmUfJgvxk\"",
    "mtime": "2024-10-30T07:01:20.741Z",
    "size": 5615,
    "path": "../public/_nuxt/C2Lm12Wi.js"
  },
  "/_nuxt/C2Lm12Wi.js.map": {
    "type": "application/json",
    "etag": "\"5b1b-MfnhnTLclZeX4RA2rVQW5nlm3Z8\"",
    "mtime": "2024-10-30T07:01:20.742Z",
    "size": 23323,
    "path": "../public/_nuxt/C2Lm12Wi.js.map"
  },
  "/_nuxt/CEUgarys.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cae-OANAPVUW7mS6nizbWI5wPYEbgqo\"",
    "mtime": "2024-10-30T07:01:20.736Z",
    "size": 3246,
    "path": "../public/_nuxt/CEUgarys.js"
  },
  "/_nuxt/CEUgarys.js.map": {
    "type": "application/json",
    "etag": "\"1e7c-wQXt3LKVz/PRkO2oIEGu4pBS/4Q\"",
    "mtime": "2024-10-30T07:01:20.752Z",
    "size": 7804,
    "path": "../public/_nuxt/CEUgarys.js.map"
  },
  "/_nuxt/CEVRfAhG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"86a7-GH1jK9C/cfefvOrGRtNBH6qMCaw\"",
    "mtime": "2024-10-30T07:01:20.741Z",
    "size": 34471,
    "path": "../public/_nuxt/CEVRfAhG.js"
  },
  "/_nuxt/CEVRfAhG.js.map": {
    "type": "application/json",
    "etag": "\"141c7-NopXnQmda+b+PZyDlK5n7EKa3UI\"",
    "mtime": "2024-10-30T07:01:20.752Z",
    "size": 82375,
    "path": "../public/_nuxt/CEVRfAhG.js.map"
  },
  "/_nuxt/CmFh67vF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"58a5-KiuesmgKOqtqTmeurCqkE9WA1+4\"",
    "mtime": "2024-10-30T07:01:20.737Z",
    "size": 22693,
    "path": "../public/_nuxt/CmFh67vF.js"
  },
  "/_nuxt/CmFh67vF.js.map": {
    "type": "application/json",
    "etag": "\"510db-7TM9udO2gZG6G4I2dZeF6nkBjNU\"",
    "mtime": "2024-10-30T07:01:20.778Z",
    "size": 331995,
    "path": "../public/_nuxt/CmFh67vF.js.map"
  },
  "/_nuxt/CQ2oFrJR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a1ee-qSeSUZG2CnUrNK7eT5CgUts2yZs\"",
    "mtime": "2024-10-30T07:01:20.737Z",
    "size": 41454,
    "path": "../public/_nuxt/CQ2oFrJR.js"
  },
  "/_nuxt/CQ2oFrJR.js.map": {
    "type": "application/json",
    "etag": "\"1acec-WW2Bu3R4XqV6yK2HP6TPO7t3BEc\"",
    "mtime": "2024-10-30T07:01:20.777Z",
    "size": 109804,
    "path": "../public/_nuxt/CQ2oFrJR.js.map"
  },
  "/_nuxt/Cqk6iNzZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"397e-WSy/E5yCu43c4P3607zhSkSPqas\"",
    "mtime": "2024-10-30T07:01:20.736Z",
    "size": 14718,
    "path": "../public/_nuxt/Cqk6iNzZ.js"
  },
  "/_nuxt/Cqk6iNzZ.js.map": {
    "type": "application/json",
    "etag": "\"c2ad-cGbGrEqlTZNZ0EvwpFn2rIiClHw\"",
    "mtime": "2024-10-30T07:01:20.752Z",
    "size": 49837,
    "path": "../public/_nuxt/Cqk6iNzZ.js.map"
  },
  "/_nuxt/CzoN8ZlC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b5b6-1RBZ6NfXm4UDrRSmp9mlJlP2oS0\"",
    "mtime": "2024-10-30T07:01:20.725Z",
    "size": 177590,
    "path": "../public/_nuxt/CzoN8ZlC.js"
  },
  "/_nuxt/CzoN8ZlC.js.map": {
    "type": "application/json",
    "etag": "\"d8933-pMbkH6Hsk/5VVndN5RaTJwSQprY\"",
    "mtime": "2024-10-30T07:01:20.779Z",
    "size": 887091,
    "path": "../public/_nuxt/CzoN8ZlC.js.map"
  },
  "/_nuxt/D1z8ek6k.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"983-6hr5JapD08eewsW3kWC7Bv/2Mqs\"",
    "mtime": "2024-10-30T07:01:20.738Z",
    "size": 2435,
    "path": "../public/_nuxt/D1z8ek6k.js"
  },
  "/_nuxt/D1z8ek6k.js.map": {
    "type": "application/json",
    "etag": "\"2067-8KO8IDypP4fMpM+IPxnxS5zq8UA\"",
    "mtime": "2024-10-30T07:01:20.752Z",
    "size": 8295,
    "path": "../public/_nuxt/D1z8ek6k.js.map"
  },
  "/_nuxt/DaVecfs2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"548-12847XVgQTdf1Itj2/N6b6etsSc\"",
    "mtime": "2024-10-30T07:01:20.725Z",
    "size": 1352,
    "path": "../public/_nuxt/DaVecfs2.js"
  },
  "/_nuxt/DaVecfs2.js.map": {
    "type": "application/json",
    "etag": "\"80e-gj4ZST+OyH3YlZ3aj5luBB/qA/4\"",
    "mtime": "2024-10-30T07:01:20.752Z",
    "size": 2062,
    "path": "../public/_nuxt/DaVecfs2.js.map"
  },
  "/_nuxt/DAZJG0u4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4f4b-kW3GGaH2IucX6Uvm7YuWMESTxdA\"",
    "mtime": "2024-10-30T07:01:20.737Z",
    "size": 20299,
    "path": "../public/_nuxt/DAZJG0u4.js"
  },
  "/_nuxt/DAZJG0u4.js.map": {
    "type": "application/json",
    "etag": "\"6452-Dk4pq4RtPK8umMf9FJD4fq6UKjA\"",
    "mtime": "2024-10-30T07:01:20.752Z",
    "size": 25682,
    "path": "../public/_nuxt/DAZJG0u4.js.map"
  },
  "/_nuxt/default.mKTCgy6z.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ba-pbKwUOQGbXf2sn/5FOXAhqKozEg\"",
    "mtime": "2024-10-30T07:01:20.725Z",
    "size": 186,
    "path": "../public/_nuxt/default.mKTCgy6z.css"
  },
  "/_nuxt/dj0E3Byv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11e1-tP4xy0QYXiKFLdC0FLXdKIE1v1A\"",
    "mtime": "2024-10-30T07:01:20.725Z",
    "size": 4577,
    "path": "../public/_nuxt/dj0E3Byv.js"
  },
  "/_nuxt/dj0E3Byv.js.map": {
    "type": "application/json",
    "etag": "\"161d-ufx/ZzBz8mF6geve+lsmsh5i1bI\"",
    "mtime": "2024-10-30T07:01:20.753Z",
    "size": 5661,
    "path": "../public/_nuxt/dj0E3Byv.js.map"
  },
  "/_nuxt/DlAUqK2U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"80-8A+knFqFvzebg6m4ErNvHaiz5k4\"",
    "mtime": "2024-10-30T07:01:20.741Z",
    "size": 128,
    "path": "../public/_nuxt/DlAUqK2U.js"
  },
  "/_nuxt/DlAUqK2U.js.map": {
    "type": "application/json",
    "etag": "\"5c-9m64RmvsjF7efbhoh7NprClhjr4\"",
    "mtime": "2024-10-30T07:01:20.742Z",
    "size": 92,
    "path": "../public/_nuxt/DlAUqK2U.js.map"
  },
  "/_nuxt/DN7188LG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4e947-1L2sy41vsYrIvYd1uwcgkHhPO9Y\"",
    "mtime": "2024-10-30T07:01:20.725Z",
    "size": 321863,
    "path": "../public/_nuxt/DN7188LG.js"
  },
  "/_nuxt/DN7188LG.js.map": {
    "type": "application/json",
    "etag": "\"15df52-iNfzIXOXqRmchyndklPxn+N/WcI\"",
    "mtime": "2024-10-30T07:01:20.781Z",
    "size": 1433426,
    "path": "../public/_nuxt/DN7188LG.js.map"
  },
  "/_nuxt/DO2dREFA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e6-l/oF0CmLMkmJZe0Q8RkKjwilL64\"",
    "mtime": "2024-10-30T07:01:20.737Z",
    "size": 486,
    "path": "../public/_nuxt/DO2dREFA.js"
  },
  "/_nuxt/DO2dREFA.js.map": {
    "type": "application/json",
    "etag": "\"676-9nXBlHz8qz7A75MyUy3QPf/yUx8\"",
    "mtime": "2024-10-30T07:01:20.742Z",
    "size": 1654,
    "path": "../public/_nuxt/DO2dREFA.js.map"
  },
  "/_nuxt/DOXczUm3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"418-TJhwSXDvzI+94JadBoPiZU5KQMc\"",
    "mtime": "2024-10-30T07:01:20.736Z",
    "size": 1048,
    "path": "../public/_nuxt/DOXczUm3.js"
  },
  "/_nuxt/DOXczUm3.js.map": {
    "type": "application/json",
    "etag": "\"6d5-IABwM9ki2uE0T0ni7y952tKOxlM\"",
    "mtime": "2024-10-30T07:01:20.742Z",
    "size": 1749,
    "path": "../public/_nuxt/DOXczUm3.js.map"
  },
  "/_nuxt/DPAD2BC7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"126-AZ9KlSRQ5TKdtUFmRNXwg3LhRCM\"",
    "mtime": "2024-10-30T07:01:20.737Z",
    "size": 294,
    "path": "../public/_nuxt/DPAD2BC7.js"
  },
  "/_nuxt/DPAD2BC7.js.map": {
    "type": "application/json",
    "etag": "\"2c1-RG21IzbLmSWZefZP3evCy7xIQKo\"",
    "mtime": "2024-10-30T07:01:20.742Z",
    "size": 705,
    "path": "../public/_nuxt/DPAD2BC7.js.map"
  },
  "/_nuxt/DVC2V36u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5fe-RnXM1bsReLel04UQYlza82cuh3Q\"",
    "mtime": "2024-10-30T07:01:20.741Z",
    "size": 1534,
    "path": "../public/_nuxt/DVC2V36u.js"
  },
  "/_nuxt/DVC2V36u.js.map": {
    "type": "application/json",
    "etag": "\"99a-zp++gaDsMs6VFQe4O6WDPggBjNk\"",
    "mtime": "2024-10-30T07:01:20.742Z",
    "size": 2458,
    "path": "../public/_nuxt/DVC2V36u.js.map"
  },
  "/_nuxt/DwHjmrNy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9d3-KxKat26IJx5xIVCGOfy0HLkMasE\"",
    "mtime": "2024-10-30T07:01:20.725Z",
    "size": 2515,
    "path": "../public/_nuxt/DwHjmrNy.js"
  },
  "/_nuxt/DwHjmrNy.js.map": {
    "type": "application/json",
    "etag": "\"1157-NoXBrfb++CmNqGpQ+BEvKbqgOqo\"",
    "mtime": "2024-10-30T07:01:20.777Z",
    "size": 4439,
    "path": "../public/_nuxt/DwHjmrNy.js.map"
  },
  "/_nuxt/ouk2tjhM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3178-RByuhfh79yfUaNFQ1XFkFnkEdyM\"",
    "mtime": "2024-10-30T07:01:20.736Z",
    "size": 12664,
    "path": "../public/_nuxt/ouk2tjhM.js"
  },
  "/_nuxt/ouk2tjhM.js.map": {
    "type": "application/json",
    "etag": "\"7530-H1po/y0e/sgR1e8C8EDf+bPfMkI\"",
    "mtime": "2024-10-30T07:01:20.742Z",
    "size": 30000,
    "path": "../public/_nuxt/ouk2tjhM.js.map"
  },
  "/_nuxt/primeicons.C6QP2o4f.woff2": {
    "type": "font/woff2",
    "etag": "\"894c-g3wSebavnSl/NP20Pm/MkgannzI\"",
    "mtime": "2024-10-30T07:01:20.724Z",
    "size": 35148,
    "path": "../public/_nuxt/primeicons.C6QP2o4f.woff2"
  },
  "/_nuxt/primeicons.DMOk5skT.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"14ca4-4k7BPpU2bIK6aaghv2Wg6u8pRQw\"",
    "mtime": "2024-10-30T07:01:20.721Z",
    "size": 85156,
    "path": "../public/_nuxt/primeicons.DMOk5skT.eot"
  },
  "/_nuxt/primeicons.Dr5RGzOO.svg": {
    "type": "image/svg+xml",
    "etag": "\"539fd-oHrjkCfBp4C0L9gvrXV1wpJNnSg\"",
    "mtime": "2024-10-30T07:01:20.724Z",
    "size": 342525,
    "path": "../public/_nuxt/primeicons.Dr5RGzOO.svg"
  },
  "/_nuxt/primeicons.MpK4pl85.ttf": {
    "type": "font/ttf",
    "etag": "\"14bf4-O4eMp+iJRajsJYFIELlTZ9iXeuY\"",
    "mtime": "2024-10-30T07:01:20.724Z",
    "size": 84980,
    "path": "../public/_nuxt/primeicons.MpK4pl85.ttf"
  },
  "/_nuxt/primeicons.WjwUDZjB.woff": {
    "type": "font/woff",
    "etag": "\"14c40-Nh469xu05RX+6tL3hzSKkqVScVg\"",
    "mtime": "2024-10-30T07:01:20.725Z",
    "size": 85056,
    "path": "../public/_nuxt/primeicons.WjwUDZjB.woff"
  },
  "/_nuxt/PUTKIisE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"84d-g411xujCsD55aZMKtwtvDzuKoaY\"",
    "mtime": "2024-10-30T07:01:20.737Z",
    "size": 2125,
    "path": "../public/_nuxt/PUTKIisE.js"
  },
  "/_nuxt/PUTKIisE.js.map": {
    "type": "application/json",
    "etag": "\"b00-Ya8hvaKeApWx7xTFzC5KdUrkJn0\"",
    "mtime": "2024-10-30T07:01:20.752Z",
    "size": 2816,
    "path": "../public/_nuxt/PUTKIisE.js.map"
  },
  "/_nuxt/RdhH4-wq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1701-GlvQXedFY5k8nKmOnRoyNjky60M\"",
    "mtime": "2024-10-30T07:01:20.737Z",
    "size": 5889,
    "path": "../public/_nuxt/RdhH4-wq.js"
  },
  "/_nuxt/RdhH4-wq.js.map": {
    "type": "application/json",
    "etag": "\"2159-Mf+ZE43+vInAL63Yg9Mbt9FRFco\"",
    "mtime": "2024-10-30T07:01:20.742Z",
    "size": 8537,
    "path": "../public/_nuxt/RdhH4-wq.js.map"
  },
  "/_nuxt/rpuDTaHR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"384-3JaVS2q9hywIOX2r/6RWJNgUQ0k\"",
    "mtime": "2024-10-30T07:01:20.725Z",
    "size": 900,
    "path": "../public/_nuxt/rpuDTaHR.js"
  },
  "/_nuxt/rpuDTaHR.js.map": {
    "type": "application/json",
    "etag": "\"7cd-sG2zOrAAqzxs4VFMkeNIV6O6jHI\"",
    "mtime": "2024-10-30T07:01:20.751Z",
    "size": 1997,
    "path": "../public/_nuxt/rpuDTaHR.js.map"
  },
  "/_nuxt/sc50QwL0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"646fa-dGLO3Rkz3wqAZ1g0i4jwLLv60o4\"",
    "mtime": "2024-10-30T07:01:20.728Z",
    "size": 411386,
    "path": "../public/_nuxt/sc50QwL0.js"
  },
  "/_nuxt/sc50QwL0.js.map": {
    "type": "application/json",
    "etag": "\"1076a3-+Kb1ds41VSkVHecfSltU+j7xgeI\"",
    "mtime": "2024-10-30T07:01:20.781Z",
    "size": 1078947,
    "path": "../public/_nuxt/sc50QwL0.js.map"
  },
  "/_nuxt/sSTy_hj_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d260-BqxPezMLwqZwXYYHyfmmhV7W79M\"",
    "mtime": "2024-10-30T07:01:20.736Z",
    "size": 119392,
    "path": "../public/_nuxt/sSTy_hj_.js"
  },
  "/_nuxt/sSTy_hj_.js.map": {
    "type": "application/json",
    "etag": "\"9c429-FKIXTpI4awQoucFUyMZDoMpJHg4\"",
    "mtime": "2024-10-30T07:01:20.779Z",
    "size": 640041,
    "path": "../public/_nuxt/sSTy_hj_.js.map"
  },
  "/_nuxt/swiper-vue.DCASaf05.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"458b-ZRgiK6Rdj9nnlxRPZg+qVlCBZ+k\"",
    "mtime": "2024-10-30T07:01:20.725Z",
    "size": 17803,
    "path": "../public/_nuxt/swiper-vue.DCASaf05.css"
  },
  "/_nuxt/useDc4E9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1992-hfXWci0iNFLx9dd5iBOO/4J3NlE\"",
    "mtime": "2024-10-30T07:01:20.725Z",
    "size": 6546,
    "path": "../public/_nuxt/useDc4E9.js"
  },
  "/_nuxt/useDc4E9.js.map": {
    "type": "application/json",
    "etag": "\"449f-8sacpnXmmyKtsSFSZQRwgse/6iY\"",
    "mtime": "2024-10-30T07:01:20.753Z",
    "size": 17567,
    "path": "../public/_nuxt/useDc4E9.js.map"
  },
  "/_nuxt/ztEtAieQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"374-+Dxte6MlwsONQ7xwF6Oj7y0GPSg\"",
    "mtime": "2024-10-30T07:01:20.725Z",
    "size": 884,
    "path": "../public/_nuxt/ztEtAieQ.js"
  },
  "/_nuxt/ztEtAieQ.js.map": {
    "type": "application/json",
    "etag": "\"779-bcRuPnMZ+1SUTel1ufmzBhqko+M\"",
    "mtime": "2024-10-30T07:01:20.753Z",
    "size": 1913,
    "path": "../public/_nuxt/ztEtAieQ.js.map"
  },
  "/images/payment/credit-card.png": {
    "type": "image/png",
    "etag": "\"1605b-A4/q4evO8uzLiNUeaDKlfDtPZ8I\"",
    "mtime": "2024-10-15T18:46:27.330Z",
    "size": 90203,
    "path": "../public/images/payment/credit-card.png"
  },
  "/images/payment/paypal.png": {
    "type": "image/png",
    "etag": "\"10f3-yqslkPB1Jr0+KZUrDpHaijpbYNI\"",
    "mtime": "2024-01-19T07:46:28.701Z",
    "size": 4339,
    "path": "../public/images/payment/paypal.png"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-E0mqbN+iOhK/bfwwLHk6ERRE4oQ\"",
    "mtime": "2024-10-30T07:01:30.849Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/14d01f99-6385-4606-aa09-30a7d7e87739.json": {
    "type": "application/json",
    "etag": "\"8b-ks6ZBA+5Akf3CA/hpXcf55HwILs\"",
    "mtime": "2024-10-30T07:01:30.849Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/14d01f99-6385-4606-aa09-30a7d7e87739.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};
const basename = function(p, extension) {
  const lastSegment = normalizeWindowsPath(p).split("/").pop();
  return extension && lastSegment.endsWith(extension) ? lastSegment.slice(0, -extension.length) : lastSegment;
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    setResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

function getClientPlatform(event) {
  const clientPlatforms = ["app", "browser", "browser-dev"];
  let clientPlatform = event.node.req.headers["client-platform"];
  if (!clientPlatform) {
    console.log(
      "Missing required header 'client-platform'. 'client-platform' upgraded to 'browser'"
    );
    event.node.req.headers["client-platform"] = "browser";
    clientPlatform = "browser";
  }
  if (!clientPlatforms.includes(clientPlatform))
    return createError$1({
      statusCode: 400,
      statusMessage: "Required header 'client-platform' must be 'app', 'browser', or 'browser-dev' only"
    });
  return clientPlatform;
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  //
  // Note to future-self: No, you can't remove the `toLowerCase()` call.
  // REF: https://github.com/uuidjs/uuid/pull/677#issuecomment-1757351351
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate
let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

const native = {
  randomUUID: crypto.randomUUID
};

function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;
  return unsafeStringify(rnds);
}

const prisma$5 = new PrismaClient();
function makeRandomString32() {
  return require$$1.randomBytes(32).toString("hex");
}
async function hashPassword(password) {
  try {
    return await bcryptjs.hash(password, 12);
  } catch (err) {
    return createError$1({ statusCode: 500, statusMessage: "Password error" });
  }
}
function makeUuid() {
  return v4();
}
async function generatePassword() {
  const password = passwordGenerator.generate({
    length: 20,
    numbers: true,
    symbols: true,
    strict: true
  });
  return password;
}
async function generateNewPassword(uuid) {
  let error = null;
  const password = passwordGenerator.generate({
    length: 20,
    numbers: true,
    symbols: true,
    strict: true
  });
  const isValidPassword = validatePassword(password);
  if (!isValidPassword) {
    console.log("Failed to generate valid password");
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  const errorOrHashedPassword = await hashPassword(password);
  if (errorOrHashedPassword instanceof H3Error) {
    console.log("Error hashing password");
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  const hashedPassword = errorOrHashedPassword;
  await prisma$5.users.update({
    where: {
      uuid
    },
    data: {
      password: hashedPassword
    }
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error) {
    console.log("Error updating user password");
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  console.log("Updated user password");
  return password;
}
async function verifyPassword(hash, password) {
  try {
    const validate = await bcryptjs.compare(password, hash);
    console.log(password);
    if (validate) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

const prisma$4 = new PrismaClient();
async function getUserByEmail(email) {
  let user = null;
  await prisma$4.users.findFirst({
    where: {
      email
    }
  }).then(async (response) => {
    user = response;
  }).catch(async (e) => {
    console.error(e);
  });
  return user;
}
async function getUserByUuid(uuid) {
  let user = null;
  await prisma$4.users.findFirst({
    where: {
      uuid
    }
  }).then(async (response) => {
    user = response;
  }).catch(async (e) => {
    console.error(e);
  });
  return user;
}
async function getUserById(id) {
  let user = null;
  await prisma$4.users.findFirst({
    where: {
      id
    }
  }).then(async (response) => {
    user = response;
  }).catch(async (e) => {
    console.error(e);
  });
  return user;
}
async function updateLastLogin(email) {
  let result = null;
  await prisma$4.users.update({
    where: {
      email
    },
    data: {
      last_login: /* @__PURE__ */ new Date()
    }
  }).then(async (response) => {
    result = response;
  }).catch(async (e) => {
    console.error(e);
  });
  return result;
}
async function updateUserProfile(event) {
  const errorOrVoid = await validateUserProfileUpdate(event);
  if (errorOrVoid instanceof H3Error)
    return errorOrVoid;
  const body = await readBody(event);
  let user = {};
  let error = null;
  const userDataOrError = await getUserByUuid(body.uuid);
  if (userDataOrError instanceof H3Error)
    return userDataOrError;
  const userData = userDataOrError;
  let newHashedPassword = "";
  if ("new_password" in body === true && "current_password" in body === true) {
    const newHashedPasswordOrError = await hashPassword(body.new_password);
    if (newHashedPasswordOrError instanceof H3Error)
      return newHashedPasswordOrError;
    newHashedPassword = newHashedPasswordOrError;
  }
  await prisma$4.users.update({
    where: {
      uuid: body.uuid
    },
    data: {
      name: body.name ? body.name : userData.name,
      // If we got a new password, update it, otherwise keep old password
      password: newHashedPassword.length > 0 ? newHashedPassword : userData.password
    }
  }).then(async (response) => {
    user = response;
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error)
    return error;
  return user;
}
async function updateEmailVerifiedTrue(email) {
  let error = null;
  if (!email) {
    console.log("Error no email provided to update email verified to true");
    return createError$1({ statusCode: 400, statusMessage: "No email provided" });
  }
  await prisma$4.users.update({
    where: {
      email
    },
    data: {
      email_verified: true
    }
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error) {
    console.log("Error updating email verified to true");
    return createError$1({ statusCode: 500, statusMessage: "Password error" });
  }
}

const prisma$3 = new PrismaClient();
async function validateNewUser(event) {
  const body = await readBody(event);
  const bodyError = await validateNewUserBody(event);
  if (bodyError) {
    return createError$1({ statusCode: 400, statusMessage: bodyError });
  }
  if (!validateEmail(body.user.email)) {
    return createError$1({ statusCode: 400, statusMessage: "Bad email format" });
  }
}
async function validateNewTransaction(event) {
  const bodyError = await validateNewTransactionBody(event);
  if (bodyError) {
    return createError$1({ statusCode: 400, statusMessage: bodyError });
  }
}
async function validateUserUpdate(event) {
  var _a;
  const updatableProperties = [
    "first_name",
    "last_name",
    "current_password",
    "new_password",
    "is_active",
    "role"
  ];
  const uuid = (_a = event.context.params) == null ? void 0 : _a.uuid;
  const body = await readBody(event);
  if (!uuid)
    return createError$1({
      statusCode: 400,
      statusMessage: "Uuid not supplied"
    });
  if (!await userExists(uuid))
    return createError$1({
      statusCode: 400,
      statusMessage: "User not found"
    });
  let nothingToUpdate = true;
  for (let i = 0; i < updatableProperties.length; i++) {
    if (updatableProperties[i] in body === true)
      nothingToUpdate = false;
  }
  if (nothingToUpdate)
    return createError$1({
      statusCode: 400,
      statusMessage: "No updatable properties supplied"
    });
  if ("first_name" in body && !body.first_name)
    return createError$1({
      statusCode: 400,
      statusMessage: "first_name must have data"
    });
  if ("last_name" in body && !body.last_name)
    return createError$1({
      statusCode: 400,
      statusMessage: "last_name must have data"
    });
  if ("role" in body && !body.role)
    return createError$1({
      statusCode: 400,
      statusMessage: "role must have data"
    });
}
async function validateUserProfileUpdate(event) {
  const updatableProperties = [
    "first_name",
    "last_name",
    "current_password",
    "new_password",
    "is_active",
    "role"
  ];
  const body = await readBody(event);
  if (!body.uuid)
    return createError$1({
      statusCode: 400,
      statusMessage: "User uuid not provided"
    });
  let nothingToUpdate = true;
  for (let i = 0; i < updatableProperties.length; i++) {
    if (updatableProperties[i] in body === true)
      nothingToUpdate = false;
  }
  if (nothingToUpdate)
    return createError$1({
      statusCode: 400,
      statusMessage: "No updatable properties supplied"
    });
  const user = await getUserByUuid(body.uuid);
  if (!user) {
    console.log("This error should really not be happening!");
    return createError$1({
      statusCode: 400,
      statusMessage: "User not found"
    });
  }
  if ("first_name" in body === true && body.first_name.trim() === "")
    return createError$1({
      statusCode: 400,
      statusMessage: "first_name must have a value"
    });
  if ("last_name" in body === true && body.last_name.trim() === "")
    return createError$1({
      statusCode: 400,
      statusMessage: "last_name must have a value"
    });
  if ("new_password" in body === true && "current_password" in body === false)
    return createError$1({
      statusCode: 400,
      statusMessage: "Both current_password and new_password must be supplied"
    });
  if ("new_password" in body === false && "current_password" in body === true)
    return createError$1({
      statusCode: 400,
      statusMessage: "Both current_password and new_password must be supplied"
    });
  if ("current_password" in body) {
    if (!await verifyPassword(user.password, body.current_password))
      return createError$1({
        statusCode: 400,
        statusMessage: "Wrong current password"
      });
  }
  if ("new_password" in body === true && !validatePassword(body.new_password))
    return createError$1({
      statusCode: 400,
      statusMessage: `Poor new password strength. Password must contain at least 6 characters, an upper-case letter, and a lower-case letter, 
      a number, and a non-alphanumeric character.`
    });
}
async function validateUserDelete(event) {
  var _a;
  const uuid = (_a = event.context.params) == null ? void 0 : _a.uuid;
  if (!uuid)
    return createError$1({
      statusCode: 400,
      statusMessage: "Uuid not supplied"
    });
  if (!await userExists(uuid))
    return createError$1({
      statusCode: 400,
      statusMessage: "User not found"
    });
}
async function validateUserLogin(event) {
  const body = await readBody(event);
  const bodyError = validateLoginBody(body);
  if (bodyError) {
    return createError$1({ statusCode: 400, statusMessage: bodyError });
  }
  if (!validateEmail(body.email)) {
    return createError$1({ statusCode: 400, statusMessage: "Bad email format" });
  }
}
async function validateUploadAvatar(event) {
  const mimeType = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/svg",
    ,
    "image/webp"
  ];
  const body = await readMultipartFormData(event);
  if (!mimeType.includes(body == null ? void 0 : body[0].type))
    return createError$1({
      statusCode: 400,
      statusMessage: "Type file not allowed"
    });
}
async function validateNewUserBody(event) {
  const body = await readBody(event);
  if ("name" in body.user === false) {
    return "'name' is required";
  }
  if ("email" in body.user === false) {
    return "'email' is required";
  }
}
async function validateNewTransactionBody(event) {
  const body = await readBody(event);
  if ("sku" in body.transaction === false) {
    return "'sku' is required";
  }
  if ("orderID" in body.transaction === false) {
    return "'orderID' is required";
  }
  if ("phone" in body.transaction === false) {
    return "'phone' is required";
  }
  if ("country" in body.transaction === false) {
    return "'country' is required";
  }
  if ("state" in body.transaction === false) {
    return "'state' is required";
  }
  if ("city" in body.transaction === false) {
    return "'city' is required";
  }
  if ("address_1" in body.transaction === false) {
    return "'address' is required";
  }
  if ("postal_code" in body.transaction === false) {
    return "'postal code' is required";
  }
  if ("amount" in body.transaction === false) {
    return "'amount' is required";
  }
  if ("quantity" in body.transaction === false) {
    return "'quantity' is required";
  }
  if ("payerID" in body.transaction === false) {
    return "'payerID' is required";
  }
  if ("paymentID" in body.transaction === false) {
    return "'paymentID' is required";
  }
  if ("paymentSource" in body.transaction === false) {
    return "'paymentSource' is required";
  }
}
async function validateChangePasswordBody(event, user) {
  const body = await readBody(event);
  console.log(body);
  if ("currentPassword" in body === false) {
    return createError$1({
      statusCode: 400,
      statusMessage: "'Current Password' is required"
    });
  }
  if ("password" in body === false) {
    return createError$1({
      statusCode: 400,
      statusMessage: "'Password' is required"
    });
  }
  if ("confPassword" in body === false) {
    return createError$1({
      statusCode: 400,
      statusMessage: "'Confirm password' is required"
    });
  }
  if (!validatePassword(body.password)) {
    return createError$1({
      statusCode: 400,
      statusMessage: "Poor new password strength. Password must contain at least 6 characters and spaces are not allowed"
    });
  }
  const checkUser = await getUserByEmail(user.email);
  if (checkUser === null) {
    return createError$1({ statusCode: 401, statusMessage: "Account not found" });
  }
  const isMatch = body.password === body.confPassword ? true : false;
  if (!isMatch) {
    return createError$1({
      statusCode: 400,
      statusMessage: "New password and confirm password dont't match"
    });
  }
  if (!await verifyPassword(checkUser.password, body.currentPassword))
    return createError$1({
      statusCode: 400,
      statusMessage: "Wrong current password"
    });
}
function validateLoginBody(body) {
  if ("email" in body === false) {
    return "'email' is required";
  }
  if ("password" in body === false) {
    return "'password' is required";
  }
}
function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}
async function userExists(uuid) {
  if (!uuid)
    return false;
  let user = void 0;
  await prisma$3.users.findFirst({
    where: {
      uuid
    }
  }).then(async (result) => {
    user = result;
  }).catch(async (e) => {
    console.error(e);
  });
  if (user === null)
    return false;
  return true;
}
function validatePassword(password) {
  if (password.length < 6)
    return false;
  if (!/\d/.test(password))
    return false;
  return true;
}

const prisma$2 = new PrismaClient();
async function createUserSession(userId, accessToken, event) {
  let error = null;
  let session = null;
  if (!userId) {
    console.log("User id not provided for create session");
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  if (!accessToken) {
    console.log("Access token not provided for create session");
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  if (!event) {
    console.log("Event not provided for create session");
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  const csrfToken = makeRandomString32();
  const ipAddress = getRequestHeader(event, "x-forwarded-for");
  await prisma$2.sessions.create({
    data: {
      user_id: userId,
      sid: makeUuid(),
      start_time: /* @__PURE__ */ new Date(),
      access_token: accessToken,
      csrf_token: csrfToken,
      is_active: true,
      ip_address: ipAddress ? ipAddress : "unable to get IP address"
    }
  }).then(async (result) => {
    session = result;
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error) {
    console.log("Error creating user session");
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  if (session)
    return session;
  console.log("We should not be getting this session error");
  return createError$1({
    statusCode: 500,
    statusMessage: "Server error"
  });
}
async function getUserSession(sessionId) {
  let error = null;
  let session = null;
  await prisma$2.sessions.findUnique({
    where: {
      sid: sessionId
    }
  }).then(async (result) => {
    session = result;
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error) {
    console.log("Error retrieving user session");
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  if (session)
    return session;
  console.log("We should not be getting this retrieve session error");
  return createError$1({
    statusCode: 500,
    statusMessage: "Server error"
  });
}
async function deactivateUserSessions(userId) {
  let error = null;
  let session = null;
  await prisma$2.sessions.updateMany({
    where: {
      user_id: userId
    },
    data: {
      is_active: false
    }
  }).then(async (result) => {
    session = result;
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error) {
    console.log("Error deactivating user session");
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  if (session)
    return session;
  console.log("We should not be getting this deactivate user session error");
  return createError$1({
    statusCode: 500,
    statusMessage: "Server error"
  });
}
async function endUserSession(sessionId) {
  let error = null;
  let session = null;
  await prisma$2.sessions.update({
    where: {
      sid: sessionId
    },
    data: {
      end_time: /* @__PURE__ */ new Date()
    }
  }).then(async (result) => {
    session = result;
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error) {
    console.log("Error ending user session");
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  if (session)
    return session;
  console.log("We should not be getting this update user session error");
  return createError$1({
    statusCode: 500,
    statusMessage: "Server error"
  });
}

const config$3 = useRuntimeConfig();
const prisma$1 = new PrismaClient();
async function getNewTokens(event) {
  let refreshToken = null;
  const errorOrPlatform = getClientPlatform(event);
  if (errorOrPlatform instanceof H3Error)
    return errorOrPlatform;
  const platform = errorOrPlatform;
  if (platform === "app")
    refreshToken = event.node.req.headers["iam-refresh-token"];
  else if (["browser", "browser-dev"].includes(platform))
    refreshToken = getCookie(event, "iam-refresh-token");
  if (!refreshToken) {
    console.log("Error: No refresh token provided");
    return createError$1({
      statusCode: 400,
      statusMessage: "No refresh token provided"
    });
  }
  const bearerToken = refreshToken.split(" ");
  if (bearerToken[0] !== "Bearer") {
    console.log("Missing word 'Bearer' in token");
    return createError$1({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  if (!bearerToken[1]) {
    console.log("Missing token");
    return createError$1({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const errorOrUser = await verifyRefreshToken(bearerToken[1]);
  if (errorOrUser instanceof H3Error) {
    console.log("Failed to retrieve user from token");
    return createError$1({
      statusCode: 403,
      statusMessage: "Forbidden"
    });
  }
  const user = errorOrUser;
  if (!user.email)
    return createError$1({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  const userInDb = await getUserByEmail(user.email);
  if (userInDb === null) {
    console.log("User not found in database");
    return createError$1({
      statusCode: 403,
      statusMessage: "Forbidden"
    });
  }
  const errorOrTokens = createNewTokensFromRefresh(bearerToken[1], event);
  if (errorOrTokens instanceof H3Error)
    return errorOrTokens;
  const tokens = await errorOrTokens;
  return tokens;
}
function verifyAccessToken(token) {
  let error = null;
  let tokenExpiredError = null;
  let jwtUser = null;
  jwt.verify(token, config$3.iamAccessTokenSecret, (err, user) => {
    if (err) {
      console.log(err);
      if (err instanceof jwt.TokenExpiredError) {
        console.log("Expired access token");
        console.log("Attempt reAuthentication");
        tokenExpiredError = err;
      }
      error = createError$1({
        statusCode: 401,
        statusMessage: "Unauthorized"
      });
    } else {
      jwtUser = user;
    }
  });
  if (tokenExpiredError)
    return tokenExpiredError;
  if (error)
    return createError$1({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  if (jwtUser)
    return jwtUser;
  return createError$1({
    statusCode: 401,
    statusMessage: "Unauthorized"
  });
}
function verifyPasswordResetToken(token) {
  let error = null;
  let tokenExpiredError = null;
  let jwtUser = null;
  jwt.verify(token, config$3.iamResetTokenSecret, (err, user) => {
    if (err) {
      console.log(err);
      if (err instanceof jwt.TokenExpiredError) {
        console.log("Expired password reset token");
        tokenExpiredError = err;
      }
      error = createError$1({
        statusCode: 401,
        statusMessage: "Unauthorized"
      });
    } else {
      jwtUser = user;
    }
  });
  if (tokenExpiredError)
    return tokenExpiredError;
  if (error)
    return createError$1({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  if (jwtUser)
    return jwtUser;
  return createError$1({
    statusCode: 401,
    statusMessage: "Unauthorized"
  });
}
function verifyEmailVerificationToken(token) {
  let error = null;
  let tokenExpiredError = null;
  let jwtUser = null;
  jwt.verify(token, config$3.iamVerifyTokenSecret, (err, user) => {
    if (err) {
      console.log(err);
      if (err instanceof jwt.TokenExpiredError) {
        console.log("Expired email verification token");
        tokenExpiredError = err;
      }
      error = createError$1({
        statusCode: 401,
        statusMessage: "Unauthorized"
      });
    } else {
      jwtUser = user;
    }
  });
  if (tokenExpiredError)
    return tokenExpiredError;
  if (error)
    return createError$1({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  if (jwtUser)
    return jwtUser;
  return createError$1({
    statusCode: 401,
    statusMessage: "Unauthorized"
  });
}
async function createNewTokensFromRefresh(token, event) {
  const errorOrUser = await verifyRefreshToken(token);
  if (errorOrUser instanceof H3Error)
    return errorOrUser;
  const user = errorOrUser;
  const publicUser = {
    uuid: user == null ? void 0 : user.uuid,
    email: user == null ? void 0 : user.email
  };
  if (user) {
    const accessToken = jwt.sign(publicUser, config$3.iamAccessTokenSecret, {
      expiresIn: "15m"
    });
    const refreshTokenId = makeUuid();
    const refreshToken = jwt.sign(publicUser, config$3.iamRefreshTokenSecret, {
      expiresIn: "14d",
      issuer: "NuxtIam",
      jwtid: refreshTokenId
    });
    const deactivateTokenError = await deactivateRefreshTokens(user.id);
    if (deactivateTokenError)
      return deactivateTokenError;
    const storeTokenError = await storeRefreshToken(refreshTokenId, user.id);
    if (storeTokenError)
      return storeTokenError;
    const deactivateSessionsError = await deactivateUserSessions(user.id);
    if (deactivateSessionsError instanceof H3Error)
      return deactivateSessionsError;
    const sessionOrError = await createUserSession(user.id, accessToken, event);
    if (sessionOrError instanceof H3Error)
      return sessionOrError;
    const session = sessionOrError;
    return {
      accessToken,
      refreshToken,
      sid: session.sid
    };
  }
  console.log("Error creating tokens");
  return createError$1({
    statusCode: 500,
    statusMessage: "Server error"
  });
}
async function refreshTokenActive(tokenId) {
  let error = null;
  await prisma$1.refresh_tokens.findFirstOrThrow({
    where: {
      token_id: tokenId,
      is_active: true
    }
  }).then(async () => {
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error)
    return createError$1({ statusCode: 500, statusMessage: "Server error" });
}
async function verifyRefreshToken(token) {
  let error = null;
  let verifiedUser = null;
  let verifiedTokenPayload = null;
  jwt.verify(token, config$3.iamRefreshTokenSecret, async (err, token2) => {
    if (err) {
      console.log(err);
      error = createError$1({
        statusCode: 403,
        statusMessage: "Forbidden"
      });
    }
    verifiedTokenPayload = token2;
  });
  if (error)
    return error;
  if (verifiedTokenPayload) {
    if (verifiedTokenPayload.iss !== "NuxtIam") {
      console.log("Token issuer unknown");
      return createError$1({
        statusCode: 403,
        statusMessage: "Forbidden"
      });
    }
    const tokenId = verifiedTokenPayload.jti;
    if (!tokenId) {
      console.log("Token id not found");
      return createError$1({
        statusCode: 403,
        statusMessage: "Forbidden"
      });
    }
    const tokenNotActiveError = await refreshTokenActive(tokenId);
    if (tokenNotActiveError) {
      console.log("Token not active");
      console.log("Detecting a stolen refresh token");
      const user2 = await getUserByEmail(verifiedTokenPayload.email);
      if (!user2) {
        console.log("User not found from verified refresh token");
        console.log("This should not happen. Please check system integrity.");
        return createError$1({
          statusCode: 403,
          statusMessage: "Forbidden"
        });
      }
      console.log(
        `Attempt to deactivate all user:${user2.email}'s refresh tokens`
      );
      const deactivateError = await deactivateRefreshTokens(user2.id);
      if (deactivateError) {
        console.log(
          `Deactivate all user:${user2.email}'s refresh tokens failed`
        );
        console.log(
          `Should attempt to lock user's account if feature is available`
        );
        return deactivateError;
      }
      console.log(
        `All user:${user2.email}'s refresh tokens deactivated. User must login`
      );
      return tokenNotActiveError;
    }
    const user = await getUserByEmail(verifiedTokenPayload.email);
    if (!user) {
      console.log("Failed to return user by email");
      return createError$1({
        statusCode: 403,
        statusMessage: "Forbidden"
      });
    }
    verifiedUser = user;
  }
  if (verifiedUser)
    return verifiedUser;
  return createError$1({
    statusCode: 403,
    statusMessage: "Forbidden"
  });
}
async function storeRefreshToken(tokenId, userId) {
  let error = null;
  await prisma$1.refresh_tokens.create({
    data: {
      token_id: tokenId,
      user_id: userId,
      is_active: true
    }
  }).then(async () => {
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error)
    return createError$1({ statusCode: 500, statusMessage: "Server error" });
}
async function deactivateRefreshTokens(userId) {
  let error = null;
  await prisma$1.refresh_tokens.updateMany({
    where: {
      user_id: userId
    },
    data: {
      is_active: false
    }
  }).then(async () => {
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error)
    return createError$1({ statusCode: 500, statusMessage: "Server error" });
}
async function addOneTimeToken(tokenId, expiresAt) {
  let error = null;
  await prisma$1.one_time_tokens.create({
    data: {
      token_id: tokenId,
      expires_at: expiresAt
    }
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error) {
    console.log("Error adding one time token");
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  console.log("One time token added successfully");
  return tokenId;
}
function getTokenPayload(token, type) {
  let error = null;
  const tokenTypes = ["access", "refresh", "reset"];
  let tokenSecret = "";
  let tempPayload = null;
  let payload = null;
  if (!tokenTypes.includes(type)) {
    console.log("Invalid token type");
    return error = createError$1({
      statusCode: 500,
      statusMessage: "Serve error"
    });
  }
  switch (type) {
    case "access":
      tokenSecret = config$3.iamAccessTokenSecret;
      break;
    case "refresh":
      tokenSecret = config$3.iamRefreshTokenSecret;
      break;
    case "reset":
      tokenSecret = config$3.iamResetTokenSecret;
      break;
  }
  jwt.verify(token, tokenSecret, (err, jwtPayload) => {
    if (err) {
      console.log(err);
      error = createError$1({
        statusCode: 500,
        statusMessage: "Server error"
      });
    } else {
      tempPayload = jwtPayload;
    }
  });
  if (error)
    return error;
  if (tempPayload) {
    console.log("Jwt payload obtained successfully");
    payload = tempPayload;
    return payload;
  }
  console.log("We should never reach here");
  return createError$1({
    statusCode: 500,
    statusMessage: "Server error"
  });
}
async function validateCsrfToken(event) {
  const body = await readBody(event);
  const csrfToken = body.csrf_token;
  const sessionId = getCookie(event, "iam-sid");
  if (!sessionId) {
    console.log("Missing session id cookie");
    return createError$1({
      statusCode: 403,
      statusMessage: "Invalid session"
    });
  }
  if (!csrfToken) {
    console.log("Missing csrf token");
    return createError$1({
      statusCode: 403,
      statusMessage: "Missing csrf token"
    });
  }
  const sessionOrError = await validateCsrfSessionToken(sessionId, csrfToken);
  if (sessionOrError instanceof H3Error)
    return sessionOrError;
}
async function validateCsrfSessionToken(sessionId, csrfToken) {
  let error = null;
  let session = null;
  await prisma$1.sessions.findFirst({
    where: {
      sid: sessionId,
      csrf_token: csrfToken,
      is_active: true
    }
  }).then(async (result) => {
    session = result;
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error) {
    console.log("Error validating user session");
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  if (session)
    return session;
  console.log(
    "We should not be getting this validate csrf session token error"
  );
  return createError$1({
    statusCode: 500,
    statusMessage: "Server error"
  });
}
async function requestUserToken(event) {
  let accessToken = null;
  const errorOrPlatform = getClientPlatform(event);
  if (errorOrPlatform instanceof H3Error)
    return errorOrPlatform;
  const platform = errorOrPlatform;
  if (platform === "app")
    accessToken = event.node.req.headers["iam-access-token"];
  else if (["browser", "browser-dev"].includes(platform))
    accessToken = getCookie(event, "iam-access-token");
  if (!accessToken) {
    console.log("Error: No access token provided");
    return createError$1({
      statusCode: 400,
      statusMessage: "No access token provided"
    });
  }
  const accessTokenArr = accessToken.split(" ");
  const errorOrJwtPayload = verifyAccessToken(accessTokenArr[1]);
  if (errorOrJwtPayload instanceof jwt.TokenExpiredError) {
    console.log("Yes, attempt to reauthenticate");
    const errorOrTokens = await getNewTokens(event);
    if (errorOrTokens instanceof H3Error) {
      console.log("ReAuthentication failed");
      return createError$1({
        statusCode: 500,
        statusMessage: "ReAuthentication failed. Login required."
      });
    }
    const tokens = errorOrTokens;
    if (platform === "app") {
      setHeader(event, "iam-access-token", "Bearer " + tokens.accessToken);
      setHeader(event, "iam-refresh-token", "Bearer " + tokens.refreshToken);
      if (tokens.sid)
        setHeader(event, "iam-sid", tokens.sid);
    }
    if (platform === "browser") {
      setCookie(event, "iam-access-token", "Bearer " + tokens.accessToken, {
        httpOnly: true,
        secure: true
      });
      setCookie(event, "iam-refresh-token", "Bearer " + tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        expires: dayjs().add(14, "day").toDate()
      });
      if (tokens.sid)
        setCookie(event, "iam-sid", tokens.sid);
    }
    if (platform === "browser-dev") {
      setCookie(event, "iam-access-token", "Bearer " + tokens.accessToken, {
        expires: dayjs().add(1, "day").toDate()
      });
      setCookie(event, "iam-refresh-token", "Bearer " + tokens.refreshToken, {
        expires: dayjs().add(1, "day").toDate()
      });
      if (tokens.sid)
        setCookie(event, "iam-sid", tokens.sid);
    }
  }
  if (errorOrJwtPayload instanceof H3Error) {
    console.log("Error: ", errorOrJwtPayload);
    return errorOrJwtPayload;
  } else {
    const jwtUser = errorOrJwtPayload;
    const user = await getUserByEmail(jwtUser.email);
    if (!user) {
      console.log("Failed obtaining user from getUserByEmail");
      return createError$1({
        statusCode: 500,
        statusMessage: "Failed to obtain user profile"
      });
    }
    if (!user.is_active)
      return createError$1({
        statusCode: 403,
        statusMessage: "Forbidden. Account has been deactivated. Please contact your administrator."
      });
    user.password = "[hidden]";
    return user;
  }
}

const config$2 = useRuntimeConfig();
async function login(event) {
  const tokens = {};
  const body = await readBody(event);
  if (!body)
    return createError$1({
      statusCode: 401,
      statusMessage: "No email or password provided"
    });
  const user = await getUserByEmail(body.email);
  console.log(user);
  if (user === null) {
    return createError$1({ statusCode: 401, statusMessage: "Invalid login" });
  }
  if (await verifyPassword(user.password, body.password)) {
    if (!user.email_verified) {
      return createError$1({
        statusCode: 401,
        statusMessage: "account is not verified"
      });
    }
    await updateLastLogin(user.email);
    const publicUser = {
      uuid: user.uuid,
      email: user.email
    };
    const accessToken = jwt.sign(publicUser, config$2.iamAccessTokenSecret, {
      expiresIn: "15m",
      issuer: "NuxtIam",
      jwtid: makeUuid()
    });
    const tokenId = makeUuid();
    const refreshToken = jwt.sign(publicUser, config$2.iamRefreshTokenSecret, {
      expiresIn: "14d",
      issuer: "NuxtIam",
      jwtid: tokenId
    });
    const deactivateTokenError = await deactivateRefreshTokens(user.id);
    if (deactivateTokenError)
      return deactivateTokenError;
    const storeTokenError = await storeRefreshToken(tokenId, user.id);
    if (storeTokenError)
      return storeTokenError;
    tokens.accessToken = accessToken;
    tokens.refreshToken = refreshToken;
    const sessionOrTokenError = await createUserSession(
      user.id,
      accessToken,
      event
    );
    if (sessionOrTokenError instanceof H3Error) {
      console.log("Trouble creating session");
      return createError$1({ statusCode: 500, statusMessage: "Server error" });
    }
    const session = sessionOrTokenError;
    tokens.sid = session.sid;
    return tokens;
  }
  return createError$1({ statusCode: 401, statusMessage: "Invalid login" });
}
async function logout(event) {
  let sessionOrError = {};
  const sessionId = getCookie(event, "iam-sid");
  if (sessionId)
    sessionOrError = await getUserSession(sessionId);
  if (sessionOrError instanceof H3Error) {
    console.log(
      "Error with logout. Sessions might not be disabled. Security risk."
    );
    console.log("Proceeding with removing all cookies");
    deleteCookie(event, "iam-access-token");
    deleteCookie(event, "iam-refresh-token");
    deleteCookie(event, "iam-sid");
  } else {
    const session = sessionOrError;
    const userOrNull = await getUserById(session.user_id);
    console.log("Cookies and session id removed.");
    deleteCookie(event, "iam-access-token");
    deleteCookie(event, "iam-refresh-token");
    deleteCookie(event, "iam-sid");
    if (userOrNull === null) {
      console.log("Error with logout. User not found");
    } else {
      const user = userOrNull;
      const deactivateError = await deactivateRefreshTokens(user.id);
      if (deactivateError) {
        console.log(`Failed to deactivate user:${user.email}'s refresh tokens`);
        return createError$1({
          statusCode: 500,
          statusMessage: "Logout error."
        });
      }
      const deactivateSessionsError = await deactivateUserSessions(user.id);
      if (deactivateSessionsError instanceof H3Error)
        return deactivateSessionsError;
      let endUserSessionOrError = {};
      if (sessionId)
        endUserSessionOrError = await endUserSession(sessionId);
      if (endUserSessionOrError instanceof H3Error) {
        console.log("Error ending user session in logout. Security risk");
      }
    }
  }
}
function getAuthenticatedRoutes() {
  return ["/api/users", "/api/refresh-tokens"];
}

const config$1 = useRuntimeConfig();
async function sendVerifyTransactionEmail(user, transaction, token, password) {
  const emailers = ["nodemailer-service", "nodemailer-smtp", "sendgrid"];
  console.log("Preparing to send verification email");
  const appName = config$1.iamAppName;
  const emailer = config$1.iamEmailer;
  const url = config$1.iamPublicUrl;
  const service = config$1.iamNodemailerService;
  const serviceSender = config$1.iamNodemailerServiceSender;
  const servicePassword = config$1.iamNodemailerServicePassword;
  const smtpHost = config$1.iamNodemailerSmtpHost;
  const smtpPort = config$1.iamNodemailerSmtpPort;
  const smtpSender = config$1.iamNodemailerSmtpSender;
  const smtpPassword = config$1.iamNodemailerSmtpPassword;
  if (!emailers.includes(emailer)) {
    console.log(
      `Error: Emailer: ${emailer} is an unknown emailer. Aborting send.`
    );
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  const options = {
    to: user.email,
    subject: `${appName} please verify your email`,
    text: `
    Dear ${user.name},
    Thanks for buying with us. The leading online dental supply marketplace. Hopefully, the process was quick and simple for you.
    `,
    html: `<!DOCTYPE html>
        <html
          xmlns="http://www.w3.org/1999/xhtml"
          xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office"
        >
          <head>
            <title> </title>
            <!--[if !mso]><!-- -->
            <meta
              http-equiv="X-UA-Compatible"
              content="IE=edge"
            />
            <!--<![endif]-->
            <meta
              http-equiv="Content-Type"
              content="text/html; charset=UTF-8"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <style type="text/css">
              #outlook a {
                padding: 0;
              }

              .ReadMsgBody {
                width: 100%;
              }

              .ExternalClass {
                width: 100%;
              }

              .ExternalClass * {
                line-height: 100%;
              }

              body {
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
              }

              table,
              td {
                border-collapse: collapse;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
              }

              img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
              }

              p {
                display: block;
                margin: 13px 0;
              }
            </style>
            <!--[if !mso]><!-->
            <style type="text/css">
              @media only screen and (max-width: 480px) {
                @-ms-viewport {
                  width: 320px;
                }
                @viewport {
                  width: 320px;
                }
              }
            </style>
            <!--<![endif]-->
            <!--[if mso]>
              <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG />
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
              </xml>
            <![endif]-->
            <!--[if lte mso 11]>
              <style type="text/css">
                .outlook-group-fix {
                  width: 100% !important;
                }
              </style>
            <![endif]-->

            <style type="text/css">
              @media only screen and (min-width: 480px) {
                .mj-column-per-100 {
                  width: 100% !important;
                }
              }
            </style>

            <style type="text/css"></style>
          </head>

          <body style="background-color: #f9f9f9">
            <div style="background-color: #f9f9f9">
              <!--[if mso | IE]>
              <table
                align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->

              <div
                style="
                  background: #f9f9f9;
                  background-color: #f9f9f9;
                  margin: 0px auto;
                  max-width: 600px;
                "
              >
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background: #f9f9f9; background-color: #f9f9f9; width: 100%"
                >
                  <tbody>
                    <tr>
                      <td
                        style="
                          border-bottom: #333957 solid 5px;
                          direction: ltr;
                          font-size: 0px;
                          padding: 20px 0;
                          text-align: center;
                          vertical-align: top;
                        "
                      >
                        <!--[if mso | IE]>
                          <table
                            role="presentation"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                          >
                            <tr></tr>
                          </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              
              <table
                align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->

              <div
                style="
                  background: #fff;
                  background-color: #fff;
                  margin: 0px auto;
                  max-width: 600px;
                "
              >
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background: #fff; background-color: #fff; width: 100%"
                >
                  <tbody>
                    <tr>
                      <td
                        style="
                          border: #dddddd solid 1px;
                          border-top: 0px;
                          direction: ltr;
                          font-size: 0px;
                          padding: 20px 0;
                          text-align: center;
                          vertical-align: top;
                        "
                      >
                        <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                      style="vertical-align:bottom;width:600px;"
                    >
                  <![endif]-->

                        <div
                          class="mj-column-per-100 outlook-group-fix"
                          style="
                            font-size: 13px;
                            text-align: left;
                            direction: ltr;
                            display: inline-block;
                            vertical-align: bottom;
                            width: 100%;
                          "
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="vertical-align: bottom"
                            width="100%"
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <table
                                  align="center"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="border-collapse: collapse; border-spacing: 0px"
                                >
                                  <tbody>
                                    <tr>
                                      <td style="width: 230px">
                                        <img
                                          height="auto"
                                          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi2ZW7SFvODqYH8GwyUfc1dGpIDFLsX5KBKT9uhEbWAqrWo_0kQRDNh6Jd6DX4bdEVpa1uit1kjvkMa5UzB7HpFOKLtce9yUTg1RjKgY44yLiQNFokRhUCUr2KRbvxg-eS7opmRsSqb2KRcjyP7mO_Q2cBJsBP4sR2BqAtAt2VxiL5hRJ1gbB7dnvRnuRq2/s16000/logo-inver.png"
                                          style="
                                            border: 0;
                                            display: block;
                                            outline: none;
                                            text-decoration: none;
                                            width: 100%;
                                          "
                                          width="64"
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 24px;
                                    font-weight: bold;
                                    line-height: 22px;
                                    text-align: center;
                                    color: #525252;
                                  "
                                >
                                  Thank you for your order
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="left"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 14px;
                                    line-height: 22px;
                                    text-align: left;
                                    color: #525252;
                                  "
                                >
                                  <p>Dear ${user.name}</p>

                                  <p>
                                    Thanks for buying with us. The leading online dental
                                    supply marketplace. Hopefully, the process was quick
                                    and simple for you.
                                  </p>
                                  <p>
                                    To use your account, you\u2019ll first need to verify
                                    your email via the button below.
                                  </p>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  padding-top: 0px;
                                  padding-bottom: 15px;
                                  word-break: break-word;
                                "
                              >
                                <table
                                  align="center"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="border-collapse: separate; line-height: 100%"
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      bgcolor="#e97c00"
                                      role="presentation"
                                      style="
                                        border: none;
                                        border-radius: 3px;
                                        color: #ffffff;
                                        cursor: auto;
                                        padding: 15px 25px;
                                      "
                                      valign="middle"
                                    >
                                      <p
                                        style="
                                          background: #e97c00;
                                          color: #e97c00;
                                          font-family: 'Helvetica Neue', Arial,
                                            sans-serif;
                                          font-size: 15px;
                                          font-weight: bold;
                                          line-height: 120%;
                                          margin: 0;
                                          text-decoration: none;
                                          text-transform: none;
                                        "
                                      >
                                        <a
                                          href="${url}/auth/verify-email?token=${token}"
                                          style="color: #fff; text-decoration: none"
                                        >
                                          Confirm Your Email</a
                                        >
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="right"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 20px;
                                    font-weight: bold;
                                    line-height: 22px;
                                    text-align: left;
                                    color: #525252;
                                  "
                                >
                                  Here is a summary of your recent purchases :
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="left"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <table
                                  0="[object Object]"
                                  1="[object Object]"
                                  2="[object Object]"
                                  border="0"
                                  style="
                                    cellspacing: 0;
                                    color: #000;
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 13px;
                                    line-height: 22px;
                                    table-layout: auto;
                                    width: 100%;
                                  "
                                >
                                  <tr
                                    style="
                                      border-bottom: 1px solid #ecedee;
                                      text-align: left;
                                    "
                                  >
                                    <th style="padding: 0 15px 10px 0">Item</th>
                                    <th style="padding: 0 15px">Qt.</th>
                                    <th
                                      style="padding: 0 0 0 15px"
                                      align="right"
                                    >
                                      Price
                                    </th>
                                  </tr>
                                  <tr>
                                    <td style="padding: 5px 15px 5px 0">Quantity</td>
                                    <td style="padding: 0 15px">${transaction.quantity}</td>
                                    <td
                                      style="padding: 0 0 0 15px"
                                      align="right"
                                    >
                                      $${transaction.amount}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 0 15px 5px 0">
                                      Shipping + Handling
                                    </td>
                                    <td style="padding: 0 15px">1</td>
                                    <td
                                      style="padding: 0 0 0 15px"
                                      align="right"
                                    >
                                      $0
                                    </td>
                                  </tr>
                                  <tr
                                    style="
                                      border-bottom: 2px solid #ecedee;
                                      text-align: left;
                                      padding: 15px 0;
                                    "
                                  >
                                    <td style="padding: 0 15px 5px 0">Sales Tax</td>
                                    <td style="padding: 0 15px">1</td>
                                    <td
                                      style="padding: 0 0 0 15px"
                                      align="right"
                                    >
                                      $0
                                    </td>
                                  </tr>
                                  <tr
                                    style="
                                      border-bottom: 2px solid #ecedee;
                                      text-align: left;
                                      padding: 15px 0;
                                    "
                                  >
                                    <td
                                      style="padding: 5px 15px 5px 0; font-weight: bold"
                                    >
                                      TOTAL
                                    </td>
                                    <td style="padding: 0 15px"></td>
                                    <td
                                      style="padding: 0 0 0 15px; font-weight: bold"
                                      align="right"
                                    >
                                      $${transaction.amount}
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="right"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 16px;
                                    font-weight: normal;
                                    line-height: 22px;
                                    text-align: left;
                                    color: #525252;
                                  "
                                >
                                  Here is the order invoice number :
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 24px;
                                    font-weight: bold;
                                    line-height: 22px;
                                    text-align: center;
                                    color: #525252;
                                    text-transform: uppercase;
                                  "
                                >
                                  ${transaction.orderID}
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="right"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 16px;
                                    font-weight: normal;
                                    line-height: 22px;
                                    text-align: left;
                                    color: #525252;
                                  "
                                >
                                  You can use it to track your order here :
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  padding-top: 10px;
                                  padding-bottom: 10px;
                                  word-break: break-word;
                                "
                              >
                                <table
                                  align="center"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="border-collapse: separate; line-height: 100%"
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      bgcolor="#2F67F6"
                                      role="presentation"
                                      style="
                                        border: none;
                                        border-radius: 3px;
                                        color: #ffffff;
                                        cursor: auto;
                                        padding: 15px 25px;
                                      "
                                      valign="middle"
                                    >
                                      <p
                                        style="
                                          background: #2f67f6;
                                          color: #ffffff;
                                          font-family: 'Helvetica Neue', Arial,
                                            sans-serif;
                                          font-size: 15px;
                                          font-weight: normal;
                                          line-height: 120%;
                                          margin: 0;
                                          text-decoration: none;
                                          text-transform: none;
                                        "
                                      >
                                        <a
                                          href="${url}/tracking"
                                          style="color: #fff; text-decoration: none"
                                        >
                                          Check Shipping Status</a
                                        >
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="right"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 20px;
                                    font-weight: bold;
                                    line-height: 22px;
                                    text-align: left;
                                    color: #525252;
                                  "
                                >
                                  Account information :
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="right"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <ul style="list-style: disc">
                                  <li
                                    style="
                                      font-family: 'Helvetica Neue', Arial, sans-serif;
                                      font-size: 16px;
                                      font-weight: 600;
                                      line-height: 22px;
                                      text-align: left;
                                      color: #525252;
                                    "
                                  >
                                    Name :
                                    <span
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: normal;
                                        line-height: 22px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                      >${user.name}</span
                                    >
                                  </li>
                                  <li
                                    style="
                                      font-family: 'Helvetica Neue', Arial, sans-serif;
                                      font-size: 16px;
                                      font-weight: 600;
                                      line-height: 22px;
                                      text-align: left;
                                      color: #525252;
                                    "
                                  >
                                    Email :
                                    <span
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: normal;
                                        line-height: 22px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                      >${user.email}</span
                                    >
                                  </li>
                                  <li
                                    style="
                                      font-family: 'Helvetica Neue', Arial, sans-serif;
                                      font-size: 16px;
                                      font-weight: 600;
                                      line-height: 22px;
                                      text-align: left;
                                      color: #525252;
                                    "
                                  >
                                    Password :
                                    <span
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: normal;
                                        line-height: 22px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                      >${password}</span
                                    >
                                  </li>
                                </ul>
                              </td>
                            </tr>

                            <tr>
                              <td
                                align="left"
                                style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 14px;
                                    line-height: 20px;
                                    text-align: left;
                                    color: #525252;
                                  "
                                >
                                  Best regards,<br /><br />
                                  Dentestore<br />1581 Commerce St. Corona CA 92880<br />
                                  <a
                                    href="${url}"
                                    style="color: #2f67f6"
                                    >${url.replace("https://", "")}</a
                                  >
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>

                        <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              
              <table
                align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->

              <div style="margin: 0px auto; max-width: 600px">
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="width: 100%"
                >
                  <tbody>
                    <tr>
                      <td
                        style="
                          direction: ltr;
                          font-size: 0px;
                          padding: 20px 0;
                          text-align: center;
                          vertical-align: top;
                        "
                      >
                        <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                      style="vertical-align:bottom;width:600px;"
                    >
                  <![endif]-->

                        <div
                          class="mj-column-per-100 outlook-group-fix"
                          style="
                            font-size: 13px;
                            text-align: left;
                            direction: ltr;
                            display: inline-block;
                            vertical-align: bottom;
                            width: 100%;
                          "
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            width="100%"
                          >
                            <tbody>
                              <tr>
                                <td style="vertical-align: bottom; padding: 0">
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    width="100%"
                                  >
                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          font-size: 0px;
                                          padding: 0;
                                          word-break: break-word;
                                        "
                                      >
                                        <div
                                          style="
                                            font-family: 'Helvetica Neue', Arial,
                                              sans-serif;
                                            font-size: 12px;
                                            font-weight: 300;
                                            line-height: 1;
                                            text-align: center;
                                            color: #575757;
                                          "
                                        >
                                          1581 Commerce St. Corona CA 92880, USA
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td
                                        align="center"
                                        style="
                                          font-size: 0px;
                                          padding: 10;
                                          word-break: break-word;
                                        "
                                      >
                                        <div
                                          style="
                                            font-family: 'Helvetica Neue', Arial,
                                              sans-serif;
                                            font-size: 12px;
                                            font-weight: 300;
                                            line-height: 1;
                                            text-align: center;
                                            color: #575757;
                                          "
                                        >
                                          <a
                                            href=""
                                            style="color: #575757"
                                            >Unsubscribe</a
                                          >
                                          from our emails
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <!--[if mso | IE]>
                    </td>
                  
                </tr>
              
                          </table>
                        <![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              <![endif]-->
            </div>
          </body>
        </html>
        `
  };
  if (emailer === "nodemailer-service") {
    const serviceOptions = options;
    serviceOptions.from = serviceSender;
    const errorOrSent = await emailWithNodemailerService(
      serviceSender,
      servicePassword,
      service,
      serviceOptions
    );
    if (errorOrSent instanceof H3Error) {
      return errorOrSent;
    }
    return true;
  }
  if (emailer === "nodemailer-smtp") {
    const smtpOptions = options;
    smtpOptions.from = smtpSender;
    const errorOrSent = await emailWithNodemailerSmtp(
      smtpSender,
      smtpPassword,
      smtpHost,
      smtpPort,
      smtpOptions
    );
    if (errorOrSent instanceof H3Error)
      return errorOrSent;
    return true;
  }
  if (emailer === "sendgrid") {
    const sendgridOptions = options;
    sendgridOptions.from = config$1.iamSendgridSender;
    const errorOrSent = await emailWithSendgrid(options);
    if (errorOrSent instanceof H3Error)
      return errorOrSent;
    return true;
  }
  console.log("We should not get here");
  return createError$1({
    statusCode: 500,
    statusMessage: "Server error"
  });
}
async function sendExitingUserTransaction(user, transaction, password) {
  const emailers = ["nodemailer-service", "nodemailer-smtp", "sendgrid"];
  console.log("Preparing to send verification email");
  const appName = config$1.iamAppName;
  const emailer = config$1.iamEmailer;
  const url = config$1.iamPublicUrl;
  const service = config$1.iamNodemailerService;
  const serviceSender = config$1.iamNodemailerServiceSender;
  const servicePassword = config$1.iamNodemailerServicePassword;
  const smtpHost = config$1.iamNodemailerSmtpHost;
  const smtpPort = config$1.iamNodemailerSmtpPort;
  const smtpSender = config$1.iamNodemailerSmtpSender;
  const smtpPassword = config$1.iamNodemailerSmtpPassword;
  if (!emailers.includes(emailer)) {
    console.log(
      `Error: Emailer: ${emailer} is an unknown emailer. Aborting send.`
    );
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  const options = {
    to: user.email,
    subject: `${appName} Dentastore purchase receipt`,
    text: `
    Dear ${user.name},
    Thanks for buying with us. The leading online dental supply marketplace. Hopefully, the process was quick and simple for you.
    `,
    html: `<!DOCTYPE html>
            <html
              xmlns="http://www.w3.org/1999/xhtml"
              xmlns:v="urn:schemas-microsoft-com:vml"
              xmlns:o="urn:schemas-microsoft-com:office:office"
            >
              <head>
                <title> </title>
                <!--[if !mso]><!-- -->
                <meta
                  http-equiv="X-UA-Compatible"
                  content="IE=edge"
                />
                <!--<![endif]-->
                <meta
                  http-equiv="Content-Type"
                  content="text/html; charset=UTF-8"
                />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <style type="text/css">
                  #outlook a {
                    padding: 0;
                  }

                  .ReadMsgBody {
                    width: 100%;
                  }

                  .ExternalClass {
                    width: 100%;
                  }

                  .ExternalClass * {
                    line-height: 100%;
                  }

                  body {
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                  }

                  table,
                  td {
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                  }

                  img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                  }

                  p {
                    display: block;
                    margin: 13px 0;
                  }
                </style>
                <!--[if !mso]><!-->
                <style type="text/css">
                  @media only screen and (max-width: 480px) {
                    @-ms-viewport {
                      width: 320px;
                    }
                    @viewport {
                      width: 320px;
                    }
                  }
                </style>
                <!--<![endif]-->
                <!--[if mso]>
                  <xml>
                    <o:OfficeDocumentSettings>
                      <o:AllowPNG />
                      <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                  </xml>
                <![endif]-->
                <!--[if lte mso 11]>
                  <style type="text/css">
                    .outlook-group-fix {
                      width: 100% !important;
                    }
                  </style>
                <![endif]-->

                <style type="text/css">
                  @media only screen and (min-width: 480px) {
                    .mj-column-per-100 {
                      width: 100% !important;
                    }
                  }
                </style>

                <style type="text/css"></style>
              </head>

              <body style="background-color: #f9f9f9">
                <div style="background-color: #f9f9f9">
                  <!--[if mso | IE]>
                          <table
                            align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
                          >
                            <tr>
                              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                          <![endif]-->

                  <div
                    style="
                      background: #f9f9f9;
                      background-color: #f9f9f9;
                      margin: 0px auto;
                      max-width: 600px;
                    "
                  >
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="background: #f9f9f9; background-color: #f9f9f9; width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              border-bottom: #333957 solid 5px;
                              direction: ltr;
                              font-size: 0px;
                              padding: 20px 0;
                              text-align: center;
                              vertical-align: top;
                            "
                          >
                            <!--[if mso | IE]>
                              <table
                                role="presentation"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                              >
                                <tr></tr>
                              </table>
                            <![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!--[if mso | IE]>
                              </td>
                            </tr>
                          </table>
                          
                          <table
                            align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
                          >
                            <tr>
                              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                          <![endif]-->

                  <div
                    style="
                      background: #fff;
                      background-color: #fff;
                      margin: 0px auto;
                      max-width: 600px;
                    "
                  >
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="background: #fff; background-color: #fff; width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              border: #dddddd solid 1px;
                              border-top: 0px;
                              direction: ltr;
                              font-size: 0px;
                              padding: 20px 0;
                              text-align: center;
                              vertical-align: top;
                            "
                          >
                            <!--[if mso | IE]>
                                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    
                            <tr>
                          
                                <td
                                  style="vertical-align:bottom;width:600px;"
                                >
                              <![endif]-->

                            <div
                              class="mj-column-per-100 outlook-group-fix"
                              style="
                                font-size: 13px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: bottom;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="vertical-align: bottom"
                                width="100%"
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <table
                                      align="center"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="border-collapse: collapse; border-spacing: 0px"
                                    >
                                      <tbody>
                                        <tr>
                                          <td style="width: 230px">
                                            <img
                                              height="auto"
                                              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi2ZW7SFvODqYH8GwyUfc1dGpIDFLsX5KBKT9uhEbWAqrWo_0kQRDNh6Jd6DX4bdEVpa1uit1kjvkMa5UzB7HpFOKLtce9yUTg1RjKgY44yLiQNFokRhUCUr2KRbvxg-eS7opmRsSqb2KRcjyP7mO_Q2cBJsBP4sR2BqAtAt2VxiL5hRJ1gbB7dnvRnuRq2/s16000/logo-inver.png"
                                              style="
                                                border: 0;
                                                display: block;
                                                outline: none;
                                                text-decoration: none;
                                                width: 100%;
                                              "
                                              width="64"
                                            />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 24px;
                                        font-weight: bold;
                                        line-height: 22px;
                                        text-align: center;
                                        color: #525252;
                                      "
                                    >
                                      Thank you for your order
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 14px;
                                        line-height: 22px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                    >
                                      <p>Dear ${user.name}</p>

                                      <p>
                                        Thanks for buying with us. The leading online dental
                                        supply marketplace. Hopefully, the process was quick
                                        and simple for you.
                                      </p>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="right"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 20px;
                                        font-weight: bold;
                                        line-height: 22px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                    >
                                      Here is a summary of your recent purchases :
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <table
                                      0="[object Object]"
                                      1="[object Object]"
                                      2="[object Object]"
                                      border="0"
                                      style="
                                        cellspacing: 0;
                                        color: #000;
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 13px;
                                        line-height: 22px;
                                        table-layout: auto;
                                        width: 100%;
                                      "
                                    >
                                      <tr
                                        style="
                                          border-bottom: 1px solid #ecedee;
                                          text-align: left;
                                        "
                                      >
                                        <th style="padding: 0 15px 10px 0">Item</th>
                                        <th style="padding: 0 15px">Qt.</th>
                                        <th
                                          style="padding: 0 0 0 15px"
                                          align="right"
                                        >
                                          Price
                                        </th>
                                      </tr>
                                      <tr>
                                        <td style="padding: 5px 15px 5px 0">Quantity</td>
                                        <td style="padding: 0 15px">
                                          ${transaction.quantity}
                                        </td>
                                        <td
                                          style="padding: 0 0 0 15px"
                                          align="right"
                                        >
                                          $${transaction.amount}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="padding: 0 15px 5px 0">
                                          Shipping + Handling
                                        </td>
                                        <td style="padding: 0 15px">1</td>
                                        <td
                                          style="padding: 0 0 0 15px"
                                          align="right"
                                        >
                                          $0
                                        </td>
                                      </tr>
                                      <tr
                                        style="
                                          border-bottom: 2px solid #ecedee;
                                          text-align: left;
                                          padding: 15px 0;
                                        "
                                      >
                                        <td style="padding: 0 15px 5px 0">Sales Tax</td>
                                        <td style="padding: 0 15px">1</td>
                                        <td
                                          style="padding: 0 0 0 15px"
                                          align="right"
                                        >
                                          $0
                                        </td>
                                      </tr>
                                      <tr
                                        style="
                                          border-bottom: 2px solid #ecedee;
                                          text-align: left;
                                          padding: 15px 0;
                                        "
                                      >
                                        <td
                                          style="padding: 5px 15px 5px 0; font-weight: bold"
                                        >
                                          TOTAL
                                        </td>
                                        <td style="padding: 0 15px"></td>
                                        <td
                                          style="padding: 0 0 0 15px; font-weight: bold"
                                          align="right"
                                        >
                                          $${transaction.amount}
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="right"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: normal;
                                        line-height: 22px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                    >
                                      Here is the order invoice number :
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 24px;
                                        font-weight: bold;
                                        line-height: 22px;
                                        text-align: center;
                                        color: #525252;
                                        text-transform: uppercase;
                                      "
                                    >
                                      ${transaction.orderID}
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="right"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 16px;
                                        font-weight: normal;
                                        line-height: 22px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                    >
                                      You can use it to track your order here :
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      padding-top: 10px;
                                      padding-bottom: 10px;
                                      word-break: break-word;
                                    "
                                  >
                                    <table
                                      align="center"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="border-collapse: separate; line-height: 100%"
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          bgcolor="#2F67F6"
                                          role="presentation"
                                          style="
                                            border: none;
                                            border-radius: 3px;
                                            color: #ffffff;
                                            cursor: auto;
                                            padding: 15px 25px;
                                          "
                                          valign="middle"
                                        >
                                          <p
                                            style="
                                              background: #2f67f6;
                                              color: #ffffff;
                                              font-family: 'Helvetica Neue', Arial,
                                                sans-serif;
                                              font-size: 15px;
                                              font-weight: normal;
                                              line-height: 120%;
                                              margin: 0;
                                              text-decoration: none;
                                              text-transform: none;
                                            "
                                          >
                                            <a
                                              href="${url}/tracking"
                                              style="color: #fff; text-decoration: none"
                                            >
                                              Check Shipping Status</a
                                            >
                                          </p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="right"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 20px;
                                        font-weight: bold;
                                        line-height: 22px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                    >
                                      Account information :
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="right"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <ul style="list-style: disc">
                                      <li
                                        style="
                                          font-family: 'Helvetica Neue', Arial, sans-serif;
                                          font-size: 16px;
                                          font-weight: 600;
                                          line-height: 22px;
                                          text-align: left;
                                          color: #525252;
                                        "
                                      >
                                        Name :
                                        <span
                                          style="
                                            font-family: 'Helvetica Neue', Arial, sans-serif;
                                            font-size: 16px;
                                            font-weight: normal;
                                            line-height: 22px;
                                            text-align: left;
                                            color: #525252;
                                          "
                                          >${user.name}</span
                                        >
                                      </li>
                                      <li
                                        style="
                                          font-family: 'Helvetica Neue', Arial, sans-serif;
                                          font-size: 16px;
                                          font-weight: 600;
                                          line-height: 22px;
                                          text-align: left;
                                          color: #525252;
                                        "
                                      >
                                        Email :
                                        <span
                                          style="
                                            font-family: 'Helvetica Neue', Arial, sans-serif;
                                            font-size: 16px;
                                            font-weight: normal;
                                            line-height: 22px;
                                            text-align: left;
                                            color: #525252;
                                          "
                                          >${user.email}</span
                                        >
                                      </li>
                                      <li
                                        style="
                                          font-family: 'Helvetica Neue', Arial, sans-serif;
                                          font-size: 16px;
                                          font-weight: 600;
                                          line-height: 22px;
                                          text-align: left;
                                          color: #525252;
                                        "
                                      >
                                        Password :
                                        <span
                                          style="
                                            font-family: 'Helvetica Neue', Arial, sans-serif;
                                            font-size: 16px;
                                            font-weight: normal;
                                            line-height: 22px;
                                            text-align: left;
                                            color: #525252;
                                          "
                                          >${password}</span
                                        >
                                      </li>
                                    </ul>
                                  </td>
                                </tr>

                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: 'Helvetica Neue', Arial, sans-serif;
                                        font-size: 14px;
                                        line-height: 20px;
                                        text-align: left;
                                        color: #525252;
                                      "
                                    >
                                      Best regards,<br /><br />
                                      Dentestore<br />1581 Commerce St. Corona CA 92880<br />
                                      <a
                                        href="${url}"
                                        style="color: #2f67f6"
                                        >${url.replace("https://", "")}</a
                                      >
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </div>

                            <!--[if mso | IE]>
                                </td>
                              
                            </tr>
                          
                                      </table>
                                    <![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!--[if mso | IE]>
                              </td>
                            </tr>
                          </table>
                          
                          <table
                            align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
                          >
                            <tr>
                              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                          <![endif]-->

                  <div style="margin: 0px auto; max-width: 600px">
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              direction: ltr;
                              font-size: 0px;
                              padding: 20px 0;
                              text-align: center;
                              vertical-align: top;
                            "
                          >
                            <!--[if mso | IE]>
                                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    
                            <tr>
                          
                                <td
                                  style="vertical-align:bottom;width:600px;"
                                >
                              <![endif]-->

                            <div
                              class="mj-column-per-100 outlook-group-fix"
                              style="
                                font-size: 13px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: bottom;
                                width: 100%;
                              "
                            >
                              <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td style="vertical-align: bottom; padding: 0">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            align="center"
                                            style="
                                              font-size: 0px;
                                              padding: 0;
                                              word-break: break-word;
                                            "
                                          >
                                            <div
                                              style="
                                                font-family: 'Helvetica Neue', Arial,
                                                  sans-serif;
                                                font-size: 12px;
                                                font-weight: 300;
                                                line-height: 1;
                                                text-align: center;
                                                color: #575757;
                                              "
                                            >
                                              1581 Commerce St. Corona CA 92880, USA
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td
                                            align="center"
                                            style="
                                              font-size: 0px;
                                              padding: 10;
                                              word-break: break-word;
                                            "
                                          >
                                            <div
                                              style="
                                                font-family: 'Helvetica Neue', Arial,
                                                  sans-serif;
                                                font-size: 12px;
                                                font-weight: 300;
                                                line-height: 1;
                                                text-align: center;
                                                color: #575757;
                                              "
                                            >
                                              <a
                                                href=""
                                                style="color: #575757"
                                                >Unsubscribe</a
                                              >
                                              from our emails
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <!--[if mso | IE]>
                                </td>
                              
                            </tr>
                          
                                      </table>
                                    <![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!--[if mso | IE]>
                              </td>
                            </tr>
                          </table>
                          <![endif]-->
                </div>
              </body>
            </html>
`
  };
  if (emailer === "nodemailer-service") {
    const serviceOptions = options;
    serviceOptions.from = serviceSender;
    const errorOrSent = await emailWithNodemailerService(
      serviceSender,
      servicePassword,
      service,
      serviceOptions
    );
    if (errorOrSent instanceof H3Error) {
      return errorOrSent;
    }
    return true;
  }
  if (emailer === "nodemailer-smtp") {
    const smtpOptions = options;
    smtpOptions.from = smtpSender;
    const errorOrSent = await emailWithNodemailerSmtp(
      smtpSender,
      smtpPassword,
      smtpHost,
      smtpPort,
      smtpOptions
    );
    if (errorOrSent instanceof H3Error)
      return errorOrSent;
    return true;
  }
  if (emailer === "sendgrid") {
    const sendgridOptions = options;
    sendgridOptions.from = config$1.iamSendgridSender;
    const errorOrSent = await emailWithSendgrid(options);
    if (errorOrSent instanceof H3Error)
      return errorOrSent;
    return true;
  }
  console.log("We should not get here");
  return createError$1({
    statusCode: 500,
    statusMessage: "Server error"
  });
}
async function sendResetEmail(user, token) {
  const emailers = ["nodemailer-service", "nodemailer-smtp", "sendgrid"];
  console.log("Preparing to send reset email");
  const appName = config$1.iamAppName;
  const emailer = config$1.iamEmailer;
  const url = config$1.iamPublicUrl;
  const service = config$1.iamNodemailerService;
  const serviceSender = config$1.iamNodemailerServiceSender;
  const servicePassword = config$1.iamNodemailerServicePassword;
  const smtpHost = config$1.iamNodemailerSmtpHost;
  const smtpPort = config$1.iamNodemailerSmtpPort;
  const smtpSender = config$1.iamNodemailerSmtpSender;
  const smtpPassword = config$1.iamNodemailerSmtpPassword;
  if (!emailers.includes(emailer)) {
    console.log(
      `Error: Emailer: ${emailer} is an unknown emailer. Aborting send.`
    );
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  const options = {
    to: user.email,
    subject: `${appName} reset password link`,
    text: `
    Hello ${user.name},
    You requested to reset your password. Please follow the link below. If you did not request to reset your password, 
    disregard this email. Your last login time was: ${user.last_login}.
      
    This is a one-time password link that will reveal a temporary password.
  
    Password reset link: ${url}/auth/verify-reset?token=${token}
    `,
    html: `
    <p>Hello ${user.name}</p>,
    <p>You requested to reset your password. Please follow the link below. If you did not request to reset your password, 
    disregard this email. Your last login time was: ${user.last_login}.</p>
    <p>This is a one-time password link that will reveal a temporary password.</p>
    <p>Password reset link: ${url}/auth/verify-reset?token=${token}</p>`
  };
  if (emailer === "nodemailer-service") {
    const serviceOptions = options;
    serviceOptions.from = serviceSender;
    const errorOrSent = await emailWithNodemailerService(
      serviceSender,
      servicePassword,
      service,
      serviceOptions
    );
    if (errorOrSent instanceof H3Error)
      return errorOrSent;
    return true;
  }
  if (emailer === "nodemailer-smtp") {
    const smtpOptions = options;
    smtpOptions.from = smtpSender;
    const errorOrSent = await emailWithNodemailerSmtp(
      smtpSender,
      smtpPassword,
      smtpHost,
      smtpPort,
      smtpOptions
    );
    if (errorOrSent instanceof H3Error)
      return errorOrSent;
    return true;
  }
  if (emailer === "sendgrid") {
    const sendgridOptions = options;
    sendgridOptions.from = config$1.iamSendgridSender;
    const errorOrSent = await emailWithSendgrid(options);
    if (errorOrSent instanceof H3Error)
      return errorOrSent;
    return true;
  }
  console.log("We should not get here");
  return createError$1({
    statusCode: 500,
    statusMessage: "Server error"
  });
}
async function sendVerifyEmail(user, token) {
  const emailers = ["nodemailer-service", "nodemailer-smtp", "sendgrid"];
  console.log("Preparing to send verification email");
  const appName = config$1.iamAppName;
  const emailer = config$1.iamEmailer;
  const url = config$1.iamPublicUrl;
  const service = config$1.iamNodemailerService;
  const serviceSender = config$1.iamNodemailerServiceSender;
  const servicePassword = config$1.iamNodemailerServicePassword;
  const smtpHost = config$1.iamNodemailerSmtpHost;
  const smtpPort = config$1.iamNodemailerSmtpPort;
  const smtpSender = config$1.iamNodemailerSmtpSender;
  const smtpPassword = config$1.iamNodemailerSmtpPassword;
  if (!emailers.includes(emailer)) {
    console.log(
      `Error: Emailer: ${emailer} is an unknown emailer. Aborting send.`
    );
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  const options = {
    to: user.email,
    subject: `${appName} please verify your email`,
    text: `
    Hello ${user.name},
    You recently created an account at ${url} on ${user.created_at}. Please verify your email to continue with your account. Please follow the link below to verify your email. 
      
    Follow the link to verify your email: ${url}/auth/verify-email?token=${token}
    `,
    html: `
    <p>Hello ${user.name}</p>,
    <p>You recently created an account at ${url} on ${user.created_at}. Please verify your email to continue with your account. Please follow the link below to verify your email.</p> 
      
    <p>Follow the link to verify your email: ${url}/auth/verify-email?token=${token}</p>`
  };
  if (emailer === "nodemailer-service") {
    const serviceOptions = options;
    serviceOptions.from = serviceSender;
    const errorOrSent = await emailWithNodemailerService(
      serviceSender,
      servicePassword,
      service,
      serviceOptions
    );
    if (errorOrSent instanceof H3Error) {
      return errorOrSent;
    }
    return true;
  }
  if (emailer === "nodemailer-smtp") {
    const smtpOptions = options;
    smtpOptions.from = smtpSender;
    const errorOrSent = await emailWithNodemailerSmtp(
      smtpSender,
      smtpPassword,
      smtpHost,
      smtpPort,
      smtpOptions
    );
    if (errorOrSent instanceof H3Error)
      return errorOrSent;
    return true;
  }
  if (emailer === "sendgrid") {
    const sendgridOptions = options;
    sendgridOptions.from = config$1.iamSendgridSender;
    const errorOrSent = await emailWithSendgrid(options);
    if (errorOrSent instanceof H3Error)
      return errorOrSent;
    return true;
  }
  console.log("We should not get here");
  return createError$1({
    statusCode: 500,
    statusMessage: "Server error"
  });
}
async function emailWithSendgrid(options) {
  const apiKey = config$1.iamSendGridApiKey;
  let emailError = null;
  if (!apiKey) {
    console.log("Sendgrid Api key not found. Cannot send email. Aborting.");
    return createError$1({ statusCode: 500, statusMessage: "Server error" });
  }
  sgMail.setApiKey(apiKey);
  const msg = {
    to: options.to,
    from: options.from,
    // Change to your verified sender
    subject: options.subject,
    text: options.text ? options.text : "",
    html: options.html ? options.html : options.text
  };
  console.log("=======SENDGRID EMAIL OPTIONS =========================");
  console.log("from: ", msg.from);
  console.log("to: ", msg.to);
  console.log("subject: ", msg.subject);
  console.log("=======SENDGRID EMAIL OPTIONS END=========================");
  console.log("Attempting to send email with Sendgrid");
  console.log(
    "Sendgrid requires verified senders. Make sure your sender is verified by Sendgrid."
  );
  await sgMail.send(msg).then(() => {
    console.log("Email sent");
  }).catch((error) => {
    console.error(error);
    emailError = error;
  });
  if (emailError) {
    console.log("Error when sending email in Sendgrid");
    return createError$1({ statusCode: 500, statusMessage: "Server error" });
  }
  return true;
}
async function emailWithNodemailerService(sender, password, service, options) {
  let ErrorFound;
  const emailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };
  console.log("Attempting to send mail using nodemailer-service");
  if (!service) {
    console.log("Error: Service not specified. Aborting email send.");
    return createError$1({ statusCode: 500, statusMessage: "Server error" });
  }
  if (!sender) {
    console.log("Error: Sender email not specified. Aborting email send.");
    return createError$1({ statusCode: 500, statusMessage: "Server error" });
  }
  if (!password) {
    console.log("Error: Email password not specified. Aborting email send.");
    return createError$1({ statusCode: 500, statusMessage: "Server error" });
  }
  console.log("=======NODEMAILER-SERVICE EMAIL OPTIONS=============");
  console.log("service: ", service);
  console.log("from: ", emailOptions.from);
  console.log("to: ", emailOptions.to);
  console.log("password: ", password);
  console.log("=========NODEMAILER-SERVICE EMAIL OPTIONS END=================");
  const transporter = nodemailer.createTransport({
    service,
    auth: {
      user: sender,
      pass: password
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
      console.log("Email server verify problem");
      ErrorFound = error;
    } else {
      console.log("Server is ready to take our messages");
      console.log("Success: ", success);
    }
  });
  if (ErrorFound) {
    return createError$1({ statusCode: 500, statusMessage: "Server error" });
  }
  transporter.sendMail(emailOptions, (err, result) => {
    console.log(`Attempting to send email to user: ${options.to}`);
    if (err) {
      console.log(err);
      console.log("Send email error");
      ErrorFound = err;
    } else {
      console.log("Email successfully sent");
      console.log("Email result: ", result);
    }
  });
  if (ErrorFound) {
    return createError$1({ statusCode: 500, statusMessage: "Server error" });
  }
  return true;
}
async function emailWithNodemailerSmtp(sender, password, host, port, options) {
  let errorFound = null;
  const emailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text
  };
  console.log("Attempting to send mail using nodemailer-SMTP");
  if (!host) {
    console.log("Error: Email host not specified. Aborting email send.");
    return createError$1({ statusCode: 500, statusMessage: "Server error" });
  }
  if (!sender) {
    console.log("Error: Sender email not specified. Aborting email send.");
    return createError$1({ statusCode: 500, statusMessage: "Server error" });
  }
  if (!sender) {
    console.log("Error: Sender password not specified. Aborting email send.");
    return createError$1({ statusCode: 500, statusMessage: "Server error" });
  }
  console.log("=======NODEMAILER-SMTP EMAIL OPTIONS=============");
  console.log("host: ", host);
  console.log("port: ", port);
  console.log("user: ", sender);
  console.log("=========NODEMAILER-SMTP EMAIL OPTIONS END=================");
  const transporter = nodemailer.createTransport({
    host,
    port: parseInt(port),
    pool: true,
    secure: true,
    auth: {
      user: sender,
      pass: password
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
      console.log("Email server verify problem");
      errorFound = error;
    } else {
      console.log("Server is ready to take our messages");
      console.log("Success: ", success);
    }
  });
  if (errorFound)
    return createError$1({ statusCode: 500, statusMessage: "Server error" });
  transporter.sendMail(emailOptions, (err, result) => {
    console.log(`Attempting to send email to user: ${options.to}`);
    if (err) {
      console.log(err);
      errorFound = err;
      console.log("Send email error");
    } else {
      console.log("Email successfully sent");
      console.log("Email result: ", result);
    }
  });
  if (errorFound)
    return createError$1({ statusCode: 500, statusMessage: "Server error" });
  return true;
}

const config = useRuntimeConfig();
const prisma = new PrismaClient();
async function isAuthenticated(event) {
  let accessToken = null;
  const errorOrPlatform = getClientPlatform(event);
  if (errorOrPlatform instanceof H3Error)
    return errorOrPlatform;
  const platform = errorOrPlatform;
  if (platform === "app")
    accessToken = event.node.req.headers["iam-access-token"];
  else if (["browser", "browser-dev"].includes(platform)) {
    accessToken = getCookie(event, "iam-access-token");
  }
  if (!accessToken) {
    console.log("Error: No access token provided");
    return createError$1({
      statusCode: 400,
      statusMessage: "No access token provided"
    });
  }
  const accessTokenArr = accessToken.split(" ");
  const errorOrUser = verifyAccessToken(accessTokenArr[1]);
  if (errorOrUser instanceof jwt.TokenExpiredError) {
    console.log("Yes, attempt to reauthenticate");
    const errorOrTokens = await getNewTokens(event);
    if (errorOrTokens instanceof H3Error) {
      console.log("ReAuthentication failed");
      return createError$1({
        statusCode: 500,
        statusMessage: "ReAuthentication failed. Login required."
      });
    }
    const tokens = errorOrTokens;
    const errorOrPlatform2 = getClientPlatform(event);
    if (errorOrPlatform2 instanceof H3Error)
      return errorOrPlatform2;
    const platform2 = errorOrPlatform2;
    if (platform2 === "app") {
      setHeader(event, "iam-access-token", "Bearer " + tokens.accessToken);
      setHeader(event, "iam-refresh-token", "Bearer " + tokens.refreshToken);
      if (tokens.sid)
        setHeader(event, "iam-sid", tokens.sid);
    }
    if (platform2 === "browser") {
      setCookie(event, "iam-access-token", "Bearer " + tokens.accessToken, {
        httpOnly: true,
        secure: true
      });
      setCookie(event, "iam-refresh-token", "Bearer " + tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        expires: dayjs().add(14, "day").toDate()
      });
      if (tokens.sid)
        setCookie(event, "iam-sid", tokens.sid);
    }
    if (platform2 === "browser-dev") {
      setCookie(event, "iam-access-token", "Bearer " + tokens.accessToken, {
        // Access tokens themselves expire in 15 mins
        expires: dayjs().add(1, "day").toDate()
      });
      setCookie(event, "iam-refresh-token", "Bearer " + tokens.refreshToken, {
        expires: dayjs().add(1, "day").toDate()
      });
      if (tokens.sid)
        setCookie(event, "iam-sid", tokens.sid);
    }
    console.log("ReAuthentication successful");
    return true;
  }
  if (errorOrUser instanceof H3Error) {
    console.log("Error: ", errorOrUser);
    return false;
  } else {
    return true;
  }
}
async function loginUser(event) {
  const validateError = await validateUserLogin(event);
  if (validateError instanceof H3Error)
    return validateError;
  const loginErrorOrTokens = await login(event);
  if (loginErrorOrTokens instanceof H3Error)
    return loginErrorOrTokens;
  const tokens = loginErrorOrTokens;
  return tokens;
}
async function refreshTokens(event) {
  const errorOrTokens = await getNewTokens(event);
  if (errorOrTokens instanceof H3Error)
    return errorOrTokens;
  const tokens = errorOrTokens;
  return tokens;
}
async function logoutUser(event) {
  const error = await logout(event);
  if (error instanceof H3Error)
    return error;
  return true;
}
async function getProfile(event) {
  let accessToken = null;
  const errorOrPlatform = getClientPlatform(event);
  if (errorOrPlatform instanceof H3Error)
    return errorOrPlatform;
  const platform = errorOrPlatform;
  if (platform === "app")
    accessToken = event.node.req.headers["iam-access-token"];
  else if (["browser", "browser-dev"].includes(platform))
    accessToken = getCookie(event, "iam-access-token");
  if (!accessToken) {
    console.log("Error: No access token provided");
    return createError$1({
      statusCode: 400,
      statusMessage: "No access token provided"
    });
  }
  const accessTokenArr = accessToken.split(" ");
  const errorOrJwtPayload = verifyAccessToken(accessTokenArr[1]);
  if (errorOrJwtPayload instanceof jwt.TokenExpiredError) {
    console.log("Yes, attempt to reauthenticate");
    const errorOrTokens = await getNewTokens(event);
    if (errorOrTokens instanceof H3Error) {
      console.log("ReAuthentication failed");
      return createError$1({
        statusCode: 500,
        statusMessage: "ReAuthentication failed. Login required."
      });
    }
    const tokens = errorOrTokens;
    if (platform === "app") {
      setHeader(event, "iam-access-token", "Bearer " + tokens.accessToken);
      setHeader(event, "iam-refresh-token", "Bearer " + tokens.refreshToken);
      if (tokens.sid)
        setHeader(event, "iam-sid", tokens.sid);
    }
    if (platform === "browser") {
      setCookie(event, "iam-access-token", "Bearer " + tokens.accessToken, {
        httpOnly: true,
        secure: true
      });
      setCookie(event, "iam-refresh-token", "Bearer " + tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        expires: dayjs().add(14, "day").toDate()
      });
      if (tokens.sid)
        setCookie(event, "iam-sid", tokens.sid);
    }
    if (platform === "browser-dev") {
      setCookie(event, "iam-access-token", "Bearer " + tokens.accessToken, {
        // Access tokens themselves expire in 15 mins
        expires: dayjs().add(1, "day").toDate()
      });
      setCookie(event, "iam-refresh-token", "Bearer " + tokens.refreshToken, {
        expires: dayjs().add(1, "day").toDate()
      });
      if (tokens.sid)
        setCookie(event, "iam-sid", tokens.sid);
    }
  }
  if (errorOrJwtPayload instanceof H3Error) {
    console.log("Error: ", errorOrJwtPayload);
    return errorOrJwtPayload;
  } else {
    const jwtUser = errorOrJwtPayload;
    const user = await getUserByEmail(jwtUser.email);
    if (!user) {
      console.log("Failed obtaining user from getUserByEmail");
      return createError$1({
        statusCode: 500,
        statusMessage: "Failed to obtain user profile"
      });
    }
    if (!user.is_active)
      return createError$1({
        statusCode: 403,
        statusMessage: "Forbidden. Account has been deactivated. Please contact your administrator."
      });
    user.password = "[hidden]";
    return user;
  }
}
async function updateProfile(event) {
  let accessToken = null;
  const errorOrPlatform = getClientPlatform(event);
  if (errorOrPlatform instanceof H3Error)
    return errorOrPlatform;
  const platform = errorOrPlatform;
  if (platform === "app")
    accessToken = event.node.req.headers["iam-access-token"];
  else if (["browser", "browser-dev"].includes(platform))
    accessToken = getCookie(event, "iam-access-token");
  if (!accessToken) {
    console.log("Error: No access token provided");
    return createError$1({
      statusCode: 400,
      statusMessage: "No access token provided"
    });
  }
  const accessTokenArr = accessToken.split(" ");
  const errorOrJwtPayload = verifyAccessToken(accessTokenArr[1]);
  if (errorOrJwtPayload instanceof jwt.TokenExpiredError) {
    console.log("Yes, attempt to reauthenticate");
    const errorOrTokens = await getNewTokens(event);
    if (errorOrTokens instanceof H3Error) {
      console.log("ReAuthentication failed");
      return createError$1({
        statusCode: 500,
        statusMessage: "ReAuthentication failed. Login required."
      });
    }
    const tokens = errorOrTokens;
    if (platform === "app") {
      setHeader(event, "iam-access-token", "Bearer " + tokens.accessToken);
      setHeader(event, "iam-refresh-token", "Bearer " + tokens.refreshToken);
      if (tokens.sid)
        setHeader(event, "iam-sid", tokens.sid);
    }
    if (platform === "browser") {
      setCookie(event, "iam-access-token", "Bearer " + tokens.accessToken, {
        httpOnly: true,
        secure: true
      });
      setCookie(event, "iam-refresh-token", "Bearer " + tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        expires: dayjs().add(14, "day").toDate()
      });
      if (tokens.sid)
        setCookie(event, "iam-sid", tokens.sid);
    }
    if (platform === "browser-dev") {
      setCookie(event, "iam-access-token", "Bearer " + tokens.accessToken, {
        // Access tokens themselves expire in 15 mins
        expires: dayjs().add(1, "day").toDate()
      });
      setCookie(event, "iam-refresh-token", "Bearer " + tokens.refreshToken, {
        expires: dayjs().add(1, "day").toDate()
      });
      if (tokens.sid)
        setCookie(event, "iam-sid", tokens.sid);
    }
  }
  if (errorOrJwtPayload instanceof H3Error) {
    console.log("Error: ", errorOrJwtPayload);
    return errorOrJwtPayload;
  } else {
    const errorOrUser = await updateUserProfile(event);
    if (errorOrUser instanceof H3Error)
      return errorOrUser;
    const user = errorOrUser;
    user.password = "[hidden]";
    return user;
  }
}
async function deleteAccount(event) {
  const body = await readBody(event);
  const uuid = body.uuid;
  if (!uuid)
    return createError$1({
      statusCode: 400,
      statusMessage: "User uuid not provided"
    });
  const nullOrUser = await getUserByUuid(uuid);
  if (!nullOrUser) {
    console.log(
      "User to delete from useIam not found. This should not happen."
    );
    return createError$1({
      statusCode: 500,
      statusMessage: "User not found"
    });
  }
  const user = nullOrUser;
  let deletedUser = null;
  let error = null;
  await prisma.refresh_tokens.deleteMany({
    where: {
      user_id: user.id
    }
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error)
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error. Failed to delete account."
    });
  await prisma.users.delete({
    where: {
      uuid
    }
  }).then(async (result) => {
    deletedUser = result;
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error)
    return createError$1({
      statusCode: 500,
      statusMessage: "Server error with deleting account"
    });
  deleteCookie(event, "iam-access-token");
  deleteCookie(event, "iam-refresh-token");
  deleteCookie(event, "iam-sid");
  const deactivateSessionsError = await deactivateUserSessions(
    user.id
  );
  if (deactivateSessionsError instanceof H3Error)
    return deactivateSessionsError;
  if (deletedUser)
    return true;
  else {
    console.log(
      "This shouldn't happen: Returning false in deleting user from profile"
    );
    return false;
  }
}
async function resetPassword(event) {
  const body = await readBody(event);
  if ("email" in body === false) {
    console.log("Email missing from body for password reset");
    return createError$1({
      statusCode: 400,
      statusMessage: "Email missing from body for password reset"
    });
  }
  if (!validateEmail(body.email)) {
    console.log("Bad email format for password reset");
    return createError$1({
      statusCode: 400,
      statusMessage: "Bad email format for password reset"
    });
  }
  const nullOrUser = await getUserByEmail(body.email);
  if (!nullOrUser) {
    console.log("Could not get user from email for password reset");
    return createError$1({
      statusCode: 400,
      statusMessage: "Could not get user from email for password reset"
    });
  }
  const user = nullOrUser;
  const voidOrError = await deactivateRefreshTokens(user.id);
  if (voidOrError instanceof H3Error)
    return voidOrError;
  const resetUser = {
    uuid: user.uuid
  };
  const resetToken = jwt.sign(resetUser, config.iamResetTokenSecret, {
    expiresIn: "1h",
    issuer: "NuxtIam",
    jwtid: makeUuid()
  });
  const errorOrSent = await sendResetEmail(user, resetToken);
  if (errorOrSent instanceof H3Error)
    return errorOrSent;
  return true;
}
async function verifyUserEmail(event) {
  const body = await readBody(event);
  if ("email" in body === false) {
    console.log("Email missing from body for email verification");
    return createError$1({
      statusCode: 400,
      statusMessage: "Email missing from body for email verification"
    });
  }
  if (!validateEmail(body.email)) {
    console.log("Bad email format for email verification");
    return createError$1({
      statusCode: 400,
      statusMessage: "Bad email format for email verification"
    });
  }
  const nullOrUser = await getUserByEmail(body.email);
  if (!nullOrUser) {
    console.log("Could not get user from email for email verification");
    return createError$1({
      statusCode: 400,
      statusMessage: "Could not get user from email for email verification"
    });
  }
  const user = nullOrUser;
  const verifyUser = {
    email: user.email
  };
  const emailVerifyToken = jwt.sign(verifyUser, config.iamVerifyTokenSecret, {
    expiresIn: "24h",
    issuer: "NuxtIam",
    jwtid: makeUuid()
  });
  const errorOrSent = await sendVerifyEmail(user, emailVerifyToken);
  if (errorOrSent instanceof H3Error)
    return errorOrSent;
  return true;
}

function isOwner(userUuid, routeUuid) {
  if (userUuid !== routeUuid) {
    console.log("Authorization failed. User is not owner of record.");
    return false;
  }
  return true;
}
async function getUserFromAccessToken(event) {
  let accessToken = null;
  let tokenPayload = null;
  console.log("Attempt to get user from access token");
  let clientPlatform = event.node.req.headers["client-platform"];
  if (!clientPlatform)
    clientPlatform = "browser";
  if (clientPlatform === "app")
    accessToken = event.node.req.headers["iam-access-token"];
  else if (["browser", "browser-dev"].includes(clientPlatform)) {
    accessToken = getCookie(event, "iam-access-token");
  } else {
    console.log("Invalid client platform: ", clientPlatform);
    return null;
  }
  if (!accessToken) {
    console.log("No access token provided. Cannot get user from access token");
    return null;
  }
  const accessTokenArr = accessToken.split(" ");
  const errorOrToken = verifyAccessToken(accessTokenArr[1]);
  if (errorOrToken instanceof H3Error) {
    console.log(errorOrToken);
    console.log("Error verifying access token");
    return null;
  }
  tokenPayload = errorOrToken;
  const userOrNull = await getUserByUuid(tokenPayload.uuid);
  if (userOrNull === null) {
    console.log("Failed to get user to check for isSuperAdmin");
    return null;
  }
  const user = userOrNull;
  return user;
}

const forbiddenError = createError$1({
  statusCode: 403,
  statusMessage: "Forbidden"
});
const _GlWh4A = defineEventHandler(async (event) => {
  const authRoutes = getAuthenticatedRoutes();
  if (event.node.req.url)
    for (let i = 0; i < authRoutes.length; i++) {
      if (event.node.req.url.includes(authRoutes[i])) {
        const authenticated = await isAuthenticated(event);
        if (authenticated instanceof H3Error)
          throw forbiddenError;
        if (authenticated === false)
          throw forbiddenError;
        const userOrNull = await getUserFromAccessToken(event);
        if (userOrNull === null) {
          console.log(
            "Missing access token after authentication. This should not happen."
          );
          throw createError$1({
            statusCode: 401,
            statusMessage: "Unauthorized. Missing access token."
          });
        }
        event.context.user = userOrNull;
        break;
      }
    }
});

const _cwtT7v = defineEventHandler(async (event) => {
});

const _LKKfR0 = defineEventHandler(async (event) => {
  const clientPlatforms = ["app", "browser", "browser-dev"];
  let clientPlatform = event.node.req.headers["client-platform"];
  if (!clientPlatform) {
    console.log(
      "Missing required header 'client-platform'. 'client-platform' upgraded to 'browser'"
    );
    event.node.req.headers["client-platform"] = "browser";
    clientPlatform = "browser";
  }
  if (!clientPlatforms.includes(clientPlatform))
    throw createError$1({
      statusCode: 400,
      statusMessage: "Required header 'client-platform' must be 'app', 'browser', or 'browser-dev' only"
    });
});

const basicReporter = {
  log(logObj) {
    (console[logObj.type] || console.log)(...logObj.args);
  }
};
function createConsola(options = {}) {
  return createConsola$1({
    reporters: [basicReporter],
    ...options
  });
}
const consola = createConsola();
consola.consola = consola;

const collections = {
  'ic': () => import('./_/icons.mjs').then(m => m.default),
  'line-md': () => import('./_/icons2.mjs').then(m => m.default),
  'material-symbols': () => import('./_/icons3.mjs').then(m => m.default),
  'material-symbols-light': () => import('./_/icons4.mjs').then(m => m.default),
  'mdi': () => import('./_/icons5.mjs').then(m => m.default),
  'mi': () => import('./_/icons6.mjs').then(m => m.default),
  'mingcute': () => import('./_/icons7.mjs').then(m => m.default),
  'solar': () => import('./_/icons8.mjs').then(m => m.default),
  'uil': () => import('./_/icons9.mjs').then(m => m.default),
};

const DEFAULT_ENDPOINT = "https://api.iconify.design";
const _N9XpRZ = defineCachedEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (!url)
    return createError$1({ status: 400, message: "Invalid icon request" });
  const options = useAppConfig().icon;
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint || DEFAULT_ENDPOINT;
  const icons = url.searchParams.get("icons")?.split(",");
  if (collection) {
    if (icons?.length) {
      const data = getIcons(
        collection,
        icons
      );
      consola.debug(`[Icon] serving ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
      return data;
    }
  }
  if (options.fallbackToApi === true || options.fallbackToApi === "server-only") {
    const apiUrl = new URL("./" + basename(url.pathname) + url.search, apiEndPoint);
    consola.debug(`[Icon] fetching ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError$1({ status: 400, message: "Invalid icon request" });
    }
    try {
      const data = await $fetch(apiUrl.href);
      return data;
    } catch (e) {
      console.error(e);
      if (e.status === 404)
        return createError$1({ status: 404 });
      else
        return createError$1({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError$1({ status: 404 });
}, {
  group: "nuxt",
  name: "icon",
  getKey(event) {
    const collection = event.context.params?.collection?.replace(/\.json$/, "") || "unknown";
    const icons = String(getQuery(event).icons || "");
    return `${collection}_${icons.split(",")[0]}_${icons.length}_${hash(icons)}`;
  },
  swr: true,
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});

const _z95M3T = lazyEventHandler(() => {
  const opts = useRuntimeConfig().ipx || {};
  const fsDir = opts?.fs?.dir ? (Array.isArray(opts.fs.dir) ? opts.fs.dir : [opts.fs.dir]).map((dir) => isAbsolute(dir) ? dir : fileURLToPath(new URL(dir, globalThis._importMeta_.url))) : void 0;
  const fsStorage = opts.fs?.dir ? ipxFSStorage({ ...opts.fs, dir: fsDir }) : void 0;
  const httpStorage = opts.http?.domains ? ipxHttpStorage({ ...opts.http }) : void 0;
  if (!fsStorage && !httpStorage) {
    throw new Error("IPX storage is not configured!");
  }
  const ipxOptions = {
    ...opts,
    storage: fsStorage || httpStorage,
    httpStorage
  };
  const ipx = createIPX(ipxOptions);
  const ipxHandler = createIPXH3Handler(ipx);
  return useBase(opts.baseURL, ipxHandler);
});

const _lazy_d0Pkso = () => import('./routes/api/auth/_..._.mjs');
const _lazy_uVmG9Q = () => import('./routes/api/index.mjs');
const _lazy_MFHFvg = () => import('./routes/api/refresh-tokens/_..._.mjs');
const _lazy_2eAH3T = () => import('./routes/api/index2.mjs');
const _lazy_sTQdhU = () => import('./routes/api/transaction/_..._.mjs');
const _lazy_FEgqKl = () => import('./routes/api/index3.mjs');
const _lazy_DiR69q = () => import('./routes/api/users/_..._.mjs');
const _lazy_QHn240 = () => import('./routes/api/index4.mjs');
const _lazy_7QV3um = () => import('./routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _GlWh4A, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _cwtT7v, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _LKKfR0, lazy: false, middleware: true, method: undefined },
  { route: '/api/auth/**', handler: _lazy_d0Pkso, lazy: true, middleware: false, method: undefined },
  { route: '/api/auth', handler: _lazy_uVmG9Q, lazy: true, middleware: false, method: undefined },
  { route: '/api/refresh-tokens/**', handler: _lazy_MFHFvg, lazy: true, middleware: false, method: undefined },
  { route: '/api/refresh-tokens', handler: _lazy_2eAH3T, lazy: true, middleware: false, method: undefined },
  { route: '/api/transaction/**', handler: _lazy_sTQdhU, lazy: true, middleware: false, method: undefined },
  { route: '/api/transaction', handler: _lazy_FEgqKl, lazy: true, middleware: false, method: undefined },
  { route: '/api/users/**', handler: _lazy_DiR69q, lazy: true, middleware: false, method: undefined },
  { route: '/api/users', handler: _lazy_QHn240, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_7QV3um, lazy: true, middleware: false, method: undefined },
  { route: '/api/_nuxt_icon/:collection', handler: _N9XpRZ, lazy: false, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _z95M3T, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_7QV3um, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  for (const plugin of plugins) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((err) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", function(req, res) {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", function() {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", function(socket) {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", function() {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((err) => {
      const errString = typeof err === "string" ? err : JSON.stringify(err);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { joinRelativeURL as $, createRouter as A, getQuery as B, useRuntimeConfig as C, validateNewUser as D, validateNewTransaction as E, generatePassword as F, hashPassword as G, H3Error as H, getUserByEmail as I, makeUuid as J, sendExitingUserTransaction as K, sendVerifyTransactionEmail as L, requestUserToken as M, getUserFromAccessToken as N, readMultipartFormData as O, validateUserUpdate as P, validateUserDelete as Q, validateUploadAvatar as R, validateChangePasswordBody as S, isOwner as T, eventHandler as U, setResponseHeader as V, send as W, getResponseStatus as X, setResponseStatus as Y, setResponseHeaders as Z, useNitroApp as _, deleteCookie as a, getRouteRules as a0, getResponseStatusText as a1, $fetch$1 as a2, hasProtocol as a3, isScriptProtocol as a4, joinURL as a5, withQuery as a6, klona as a7, defu as a8, sanitizeStatusCode as a9, defuFn as aa, createHooks as ab, parse$1 as ac, getRequestHeader as ad, destr as ae, isEqual as af, toRouteMatcher as ag, createRouter$1 as ah, consola as ai, parseQuery as aj, withTrailingSlash as ak, withoutTrailingSlash as al, v4 as am, encodeParam as an, withLeadingSlash as ao, parseURL as ap, encodePath as aq, nodeServer as ar, setCookie as b, refreshTokens as c, defineEventHandler as d, logoutUser as e, getProfile as f, getClientPlatform as g, getCookie as h, isAuthenticated as i, getUserSession as j, createError$1 as k, loginUser as l, deleteAccount as m, verifyEmailVerificationToken as n, updateEmailVerifiedTrue as o, resetPassword as p, verifyPasswordResetToken as q, readBody as r, setHeader as s, getTokenPayload as t, updateProfile as u, validateCsrfToken as v, addOneTimeToken as w, generateNewPassword as x, verifyUserEmail as y, useBase as z };
//# sourceMappingURL=runtime.mjs.map
