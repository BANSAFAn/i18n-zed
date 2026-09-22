"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/cli.ts
var import_fs2 = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));
var import_readline2 = __toESM(require("readline"));

// src/utils/flags.ts
var FLAGS = {
  uk: "\u{1F1FA}\u{1F1E6}",
  en: "\u{1F1EC}\u{1F1E7}",
  "en-us": "\u{1F1FA}\u{1F1F8}",
  "en-gb": "\u{1F1EC}\u{1F1E7}",
  "en-in": "\u{1F1EE}\u{1F1F3}",
  pl: "\u{1F1F5}\u{1F1F1}",
  de: "\u{1F1E9}\u{1F1EA}",
  fr: "\u{1F1EB}\u{1F1F7}",
  es: "\u{1F1EA}\u{1F1F8}",
  "es-es": "\u{1F1EA}\u{1F1F8}",
  "es-419": "\u{1F30E}",
  it: "\u{1F1EE}\u{1F1F9}",
  "it-it": "\u{1F1EE}\u{1F1F9}",
  pt: "\u{1F1F5}\u{1F1F9}",
  "pt-pt": "\u{1F1F5}\u{1F1F9}",
  "pt-br": "\u{1F1E7}\u{1F1F7}",
  nl: "\u{1F1F3}\u{1F1F1}",
  sv: "\u{1F1F8}\u{1F1EA}",
  da: "\u{1F1E9}\u{1F1F0}",
  fi: "\u{1F1EB}\u{1F1EE}",
  nb: "\u{1F1F3}\u{1F1F4}",
  no: "\u{1F1F3}\u{1F1F4}",
  nn: "\u{1F1F3}\u{1F1F4}",
  cs: "\u{1F1E8}\u{1F1FF}",
  sk: "\u{1F1F8}\u{1F1F0}",
  ro: "\u{1F1F7}\u{1F1F4}",
  hu: "\u{1F1ED}\u{1F1FA}",
  bg: "\u{1F1E7}\u{1F1EC}",
  el: "\u{1F1EC}\u{1F1F7}",
  hr: "\u{1F1ED}\u{1F1F7}",
  sr: "\u{1F1F7}\u{1F1F8}",
  sl: "\u{1F1F8}\u{1F1EE}",
  bs: "\u{1F1E7}\u{1F1E6}",
  mk: "\u{1F1F2}\u{1F1F0}",
  sq: "\u{1F1E6}\u{1F1F1}",
  et: "\u{1F1EA}\u{1F1EA}",
  lv: "\u{1F1F1}\u{1F1FB}",
  lt: "\u{1F1F1}\u{1F1F9}",
  ga: "\u{1F1EE}\u{1F1EA}",
  is: "\u{1F1EE}\u{1F1F8}",
  mt: "\u{1F1F2}\u{1F1F9}",
  ca: "\u{1F1EA}\u{1F1F8}",
  eu: "\u{1F1EA}\u{1F1F8}",
  gl: "\u{1F1EA}\u{1F1F8}",
  cy: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}",
  zh: "\u{1F1E8}\u{1F1F3}",
  "zh-cn": "\u{1F1E8}\u{1F1F3}",
  "zh-hans": "\u{1F1E8}\u{1F1F3}",
  "zh-tw": "\u{1F1F9}\u{1F1FC}",
  "zh-hant": "\u{1F1F9}\u{1F1FC}",
  "zh-hk": "\u{1F1ED}\u{1F1F0}",
  ja: "\u{1F1EF}\u{1F1F5}",
  "ja-jp": "\u{1F1EF}\u{1F1F5}",
  ko: "\u{1F1F0}\u{1F1F7}",
  "ko-kr": "\u{1F1F0}\u{1F1F7}",
  ar: "\u{1F1F8}\u{1F1E6}",
  "ar-sa": "\u{1F1F8}\u{1F1E6}",
  "ar-eg": "\u{1F1EA}\u{1F1EC}",
  he: "\u{1F1EE}\u{1F1F1}",
  fa: "\u{1F1EE}\u{1F1F7}",
  ur: "\u{1F1F5}\u{1F1F0}",
  hi: "\u{1F1EE}\u{1F1F3}",
  bn: "\u{1F1E7}\u{1F1E9}",
  ta: "\u{1F1EE}\u{1F1F3}",
  te: "\u{1F1EE}\u{1F1F3}",
  mr: "\u{1F1EE}\u{1F1F3}",
  gu: "\u{1F1EE}\u{1F1F3}",
  kn: "\u{1F1EE}\u{1F1F3}",
  ml: "\u{1F1EE}\u{1F1F3}",
  pa: "\u{1F1EE}\u{1F1F3}",
  sa: "\u{1F1EE}\u{1F1F3}",
  th: "\u{1F1F9}\u{1F1ED}",
  vi: "\u{1F1FB}\u{1F1F3}",
  id: "\u{1F1EE}\u{1F1E9}",
  ms: "\u{1F1F2}\u{1F1FE}",
  fil: "\u{1F1F5}\u{1F1ED}",
  tl: "\u{1F1F5}\u{1F1ED}",
  my: "\u{1F1F2}\u{1F1F2}",
  km: "\u{1F1F0}\u{1F1ED}",
  lo: "\u{1F1F1}\u{1F1E6}",
  tr: "\u{1F1F9}\u{1F1F7}",
  az: "\u{1F1E6}\u{1F1FF}",
  ka: "\u{1F1EC}\u{1F1EA}",
  hy: "\u{1F1E6}\u{1F1F2}",
  kk: "\u{1F1F0}\u{1F1FF}",
  kz: "\u{1F1F0}\u{1F1FF}",
  uz: "\u{1F1FA}\u{1F1FF}",
  ky: "\u{1F1F0}\u{1F1EC}",
  tg: "\u{1F1F9}\u{1F1EF}",
  mn: "\u{1F1F2}\u{1F1F3}",
  sw: "\u{1F1F0}\u{1F1EA}",
  am: "\u{1F1EA}\u{1F1F9}",
  yo: "\u{1F1F3}\u{1F1EC}",
  ig: "\u{1F1F3}\u{1F1EC}",
  ha: "\u{1F1F3}\u{1F1EC}",
  zu: "\u{1F1FF}\u{1F1E6}",
  af: "\u{1F1FF}\u{1F1E6}",
  ru: "\u{1F1F7}\u{1F1FA}",
  be: "\u{1F1E7}\u{1F1FE}",
  lolcat: "\u{1F431}"
};
function getFlag(code) {
  const norm = code.toLowerCase().replace("_", "-");
  if (FLAGS[norm]) return FLAGS[norm];
  const primary = norm.split("-")[0];
  if (FLAGS[primary]) return FLAGS[primary];
  return "\u{1F310}";
}
var LANGUAGE_NAMES = {
  uk: "Ukrainian",
  en: "English",
  pl: "Polish",
  de: "German",
  fr: "French",
  es: "Spanish",
  it: "Italian",
  pt: "Portuguese",
  nl: "Dutch",
  sv: "Swedish",
  da: "Danish",
  fi: "Finnish",
  nb: "Norwegian",
  no: "Norwegian",
  nn: "Norwegian",
  cs: "Czech",
  sk: "Slovak",
  ro: "Romanian",
  hu: "Hungarian",
  bg: "Bulgarian",
  el: "Greek",
  hr: "Croatian",
  sr: "Serbian",
  sl: "Slovenian",
  zh: "Chinese",
  ja: "Japanese",
  ko: "Korean",
  ar: "Arabic",
  he: "Hebrew",
  hi: "Hindi",
  bn: "Bengali",
  th: "Thai",
  vi: "Vietnamese",
  id: "Indonesian",
  ms: "Malay",
  tr: "Turkish",
  ru: "Russian",
  be: "Belarusian",
  lolcat: "LOLCAT",
  "zh-cn": "Chinese (Simplified)",
  "zh-tw": "Chinese (Traditional)",
  "zh-hk": "Chinese (Hong Kong)",
  "zh-hans": "Chinese (Simplified)",
  "zh-hant": "Chinese (Traditional)",
  "pt-br": "Portuguese (Brazil)",
  "pt-pt": "Portuguese (Portugal)",
  "es-es": "Spanish (Spain)",
  "es-419": "Spanish (Latin America)",
  "en-us": "English (US)",
  "en-gb": "English (UK)",
  "en-in": "English (India)",
  "ar-eg": "Arabic (Egypt)",
  "ar-sa": "Arabic (Saudi Arabia)",
  "ja-jp": "Japanese",
  "ko-kr": "Korean",
  "it-it": "Italian"
};
function getLangName(code) {
  const norm = code.toLowerCase().replace("_", "-");
  if (LANGUAGE_NAMES[norm]) return LANGUAGE_NAMES[norm];
  const primary = norm.split("-")[0];
  if (LANGUAGE_NAMES[primary]) return LANGUAGE_NAMES[primary];
  return code;
}

// src/utils/locales.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));

// node_modules/js-yaml/dist/js-yaml.mjs
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var jsYaml = {};
var loader = {};
var common = {};
var hasRequiredCommon;
function requireCommon() {
  if (hasRequiredCommon) return common;
  hasRequiredCommon = 1;
  function isNothing(subject) {
    return typeof subject === "undefined" || subject === null;
  }
  function isObject(subject) {
    return typeof subject === "object" && subject !== null;
  }
  function toArray(sequence) {
    if (Array.isArray(sequence)) return sequence;
    else if (isNothing(sequence)) return [];
    return [sequence];
  }
  function extend(target, source) {
    if (source) {
      const sourceKeys = Object.keys(source);
      for (let index = 0, length = sourceKeys.length; index < length; index += 1) {
        const key = sourceKeys[index];
        target[key] = source[key];
      }
    }
    return target;
  }
  function repeat(string, count) {
    let result = "";
    for (let cycle = 0; cycle < count; cycle += 1) {
      result += string;
    }
    return result;
  }
  function isNegativeZero(number) {
    return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
  }
  common.isNothing = isNothing;
  common.isObject = isObject;
  common.toArray = toArray;
  common.repeat = repeat;
  common.isNegativeZero = isNegativeZero;
  common.extend = extend;
  return common;
}
var exception;
var hasRequiredException;
function requireException() {
  if (hasRequiredException) return exception;
  hasRequiredException = 1;
  function formatError(exception2, compact) {
    let where = "";
    const message = exception2.reason || "(unknown reason)";
    if (!exception2.mark) return message;
    if (exception2.mark.name) {
      where += 'in "' + exception2.mark.name + '" ';
    }
    where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
    if (!compact && exception2.mark.snippet) {
      where += "\n\n" + exception2.mark.snippet;
    }
    return message + " " + where;
  }
  function YAMLException2(reason, mark) {
    Error.call(this);
    this.name = "YAMLException";
    this.reason = reason;
    this.mark = mark;
    this.message = formatError(this, false);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack || "";
    }
  }
  YAMLException2.prototype = Object.create(Error.prototype);
  YAMLException2.prototype.constructor = YAMLException2;
  YAMLException2.prototype.toString = function toString(compact) {
    return this.name + ": " + formatError(this, compact);
  };
  exception = YAMLException2;
  return exception;
}
var snippet;
var hasRequiredSnippet;
function requireSnippet() {
  if (hasRequiredSnippet) return snippet;
  hasRequiredSnippet = 1;
  const common2 = requireCommon();
  function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
    let head = "";
    let tail = "";
    const maxHalfLength = Math.floor(maxLineLength / 2) - 1;
    if (position - lineStart > maxHalfLength) {
      head = " ... ";
      lineStart = position - maxHalfLength + head.length;
    }
    if (lineEnd - position > maxHalfLength) {
      tail = " ...";
      lineEnd = position + maxHalfLength - tail.length;
    }
    return {
      str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "\u2192") + tail,
      pos: position - lineStart + head.length
      // relative position
    };
  }
  function padStart(string, max) {
    return common2.repeat(" ", max - string.length) + string;
  }
  function makeSnippet(mark, options) {
    options = Object.create(options || null);
    if (!mark.buffer) return null;
    if (!options.maxLength) options.maxLength = 79;
    if (typeof options.indent !== "number") options.indent = 1;
    if (typeof options.linesBefore !== "number") options.linesBefore = 3;
    if (typeof options.linesAfter !== "number") options.linesAfter = 2;
    const re = /\r?\n|\r|\0/g;
    const lineStarts = [0];
    const lineEnds = [];
    let match;
    let foundLineNo = -1;
    while (match = re.exec(mark.buffer)) {
      lineEnds.push(match.index);
      lineStarts.push(match.index + match[0].length);
      if (mark.position <= match.index && foundLineNo < 0) {
        foundLineNo = lineStarts.length - 2;
      }
    }
    if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
    let result = "";
    const lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
    const maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
    for (let i = 1; i <= options.linesBefore; i++) {
      if (foundLineNo - i < 0) break;
      const line2 = getLine(
        mark.buffer,
        lineStarts[foundLineNo - i],
        lineEnds[foundLineNo - i],
        mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
        maxLineLength
      );
      result = common2.repeat(" ", options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line2.str + "\n" + result;
    }
    const line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
    result += common2.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
    result += common2.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^\n";
    for (let i = 1; i <= options.linesAfter; i++) {
      if (foundLineNo + i >= lineEnds.length) break;
      const line2 = getLine(
        mark.buffer,
        lineStarts[foundLineNo + i],
        lineEnds[foundLineNo + i],
        mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
        maxLineLength
      );
      result += common2.repeat(" ", options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line2.str + "\n";
    }
    return result.replace(/\n$/, "");
  }
  snippet = makeSnippet;
  return snippet;
}
var type;
var hasRequiredType;
function requireType() {
  if (hasRequiredType) return type;
  hasRequiredType = 1;
  const YAMLException2 = requireException();
  const TYPE_CONSTRUCTOR_OPTIONS = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
  ];
  const YAML_NODE_KINDS = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function compileStyleAliases(map2) {
    const result = {};
    if (map2 !== null) {
      Object.keys(map2).forEach(function(style) {
        map2[style].forEach(function(alias) {
          result[String(alias)] = style;
        });
      });
    }
    return result;
  }
  function Type2(tag, options) {
    options = options || {};
    Object.keys(options).forEach(function(name) {
      if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
        throw new YAMLException2('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
      }
    });
    this.options = options;
    this.tag = tag;
    this.kind = options["kind"] || null;
    this.resolve = options["resolve"] || function() {
      return true;
    };
    this.construct = options["construct"] || function(data) {
      return data;
    };
    this.instanceOf = options["instanceOf"] || null;
    this.predicate = options["predicate"] || null;
    this.represent = options["represent"] || null;
    this.representName = options["representName"] || null;
    this.defaultStyle = options["defaultStyle"] || null;
    this.multi = options["multi"] || false;
    this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
    if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
      throw new YAMLException2('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
    }
  }
  type = Type2;
  return type;
}
var schema;
var hasRequiredSchema;
function requireSchema() {
  if (hasRequiredSchema) return schema;
  hasRequiredSchema = 1;
  const YAMLException2 = requireException();
  const Type2 = requireType();
  function compileList(schema2, name) {
    const result = [];
    schema2[name].forEach(function(currentType) {
      let newIndex = result.length;
      result.forEach(function(previousType, previousIndex) {
        if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
          newIndex = previousIndex;
        }
      });
      result[newIndex] = currentType;
    });
    return result;
  }
  function compileMap() {
    const result = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {},
      multi: {
        scalar: [],
        sequence: [],
        mapping: [],
        fallback: []
      }
    };
    function collectType(type2) {
      if (type2.multi) {
        result.multi[type2.kind].push(type2);
        result.multi["fallback"].push(type2);
      } else {
        result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
      }
    }
    for (let index = 0, length = arguments.length; index < length; index += 1) {
      arguments[index].forEach(collectType);
    }
    return result;
  }
  function Schema2(definition) {
    return this.extend(definition);
  }
  Schema2.prototype.extend = function extend(definition) {
    let implicit = [];
    let explicit = [];
    if (definition instanceof Type2) {
      explicit.push(definition);
    } else if (Array.isArray(definition)) {
      explicit = explicit.concat(definition);
    } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
      if (definition.implicit) implicit = implicit.concat(definition.implicit);
      if (definition.explicit) explicit = explicit.concat(definition.explicit);
    } else {
      throw new YAMLException2("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    }
    implicit.forEach(function(type2) {
      if (!(type2 instanceof Type2)) {
        throw new YAMLException2("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
      if (type2.loadKind && type2.loadKind !== "scalar") {
        throw new YAMLException2("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      }
      if (type2.multi) {
        throw new YAMLException2("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
      }
    });
    explicit.forEach(function(type2) {
      if (!(type2 instanceof Type2)) {
        throw new YAMLException2("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
    });
    const result = Object.create(Schema2.prototype);
    result.implicit = (this.implicit || []).concat(implicit);
    result.explicit = (this.explicit || []).concat(explicit);
    result.compiledImplicit = compileList(result, "implicit");
    result.compiledExplicit = compileList(result, "explicit");
    result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
    return result;
  };
  schema = Schema2;
  return schema;
}
var str;
var hasRequiredStr;
function requireStr() {
  if (hasRequiredStr) return str;
  hasRequiredStr = 1;
  const Type2 = requireType();
  str = new Type2("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(data) {
      return data !== null ? data : "";
    }
  });
  return str;
}
var seq;
var hasRequiredSeq;
function requireSeq() {
  if (hasRequiredSeq) return seq;
  hasRequiredSeq = 1;
  const Type2 = requireType();
  seq = new Type2("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(data) {
      return data !== null ? data : [];
    }
  });
  return seq;
}
var map;
var hasRequiredMap;
function requireMap() {
  if (hasRequiredMap) return map;
  hasRequiredMap = 1;
  const Type2 = requireType();
  map = new Type2("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(data) {
      return data !== null ? data : {};
    }
  });
  return map;
}
var failsafe;
var hasRequiredFailsafe;
function requireFailsafe() {
  if (hasRequiredFailsafe) return failsafe;
  hasRequiredFailsafe = 1;
  const Schema2 = requireSchema();
  failsafe = new Schema2({
    explicit: [
      requireStr(),
      requireSeq(),
      requireMap()
    ]
  });
  return failsafe;
}
var _null;
var hasRequired_null;
function require_null() {
  if (hasRequired_null) return _null;
  hasRequired_null = 1;
  const Type2 = requireType();
  function resolveYamlNull(data) {
    if (data === null) return true;
    const max = data.length;
    return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
  }
  function constructYamlNull() {
    return null;
  }
  function isNull(object) {
    return object === null;
  }
  _null = new Type2("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: resolveYamlNull,
    construct: constructYamlNull,
    predicate: isNull,
    represent: {
      canonical: function() {
        return "~";
      },
      lowercase: function() {
        return "null";
      },
      uppercase: function() {
        return "NULL";
      },
      camelcase: function() {
        return "Null";
      },
      empty: function() {
        return "";
      }
    },
    defaultStyle: "lowercase"
  });
  return _null;
}
var bool;
var hasRequiredBool;
function requireBool() {
  if (hasRequiredBool) return bool;
  hasRequiredBool = 1;
  const Type2 = requireType();
  function resolveYamlBoolean(data) {
    if (data === null) return false;
    const max = data.length;
    return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
  }
  function constructYamlBoolean(data) {
    return data === "true" || data === "True" || data === "TRUE";
  }
  function isBoolean(object) {
    return Object.prototype.toString.call(object) === "[object Boolean]";
  }
  bool = new Type2("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: resolveYamlBoolean,
    construct: constructYamlBoolean,
    predicate: isBoolean,
    represent: {
      lowercase: function(object) {
        return object ? "true" : "false";
      },
      uppercase: function(object) {
        return object ? "TRUE" : "FALSE";
      },
      camelcase: function(object) {
        return object ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  });
  return bool;
}
var int;
var hasRequiredInt;
function requireInt() {
  if (hasRequiredInt) return int;
  hasRequiredInt = 1;
  const common2 = requireCommon();
  const Type2 = requireType();
  function isHexCode(c) {
    return c >= 48 && c <= 57 || c >= 65 && c <= 70 || c >= 97 && c <= 102;
  }
  function isOctCode(c) {
    return c >= 48 && c <= 55;
  }
  function isDecCode(c) {
    return c >= 48 && c <= 57;
  }
  function resolveYamlInteger(data) {
    if (data === null) return false;
    const max = data.length;
    let index = 0;
    let hasDigits = false;
    if (!max) return false;
    let ch = data[index];
    if (ch === "-" || ch === "+") {
      ch = data[++index];
    }
    if (ch === "0") {
      if (index + 1 === max) return true;
      ch = data[++index];
      if (ch === "b") {
        index++;
        for (; index < max; index++) {
          ch = data[index];
          if (ch !== "0" && ch !== "1") return false;
          hasDigits = true;
        }
        return hasDigits && isFinite(parseYamlInteger(data));
      }
      if (ch === "x") {
        index++;
        for (; index < max; index++) {
          if (!isHexCode(data.charCodeAt(index))) return false;
          hasDigits = true;
        }
        return hasDigits && isFinite(parseYamlInteger(data));
      }
      if (ch === "o") {
        index++;
        for (; index < max; index++) {
          if (!isOctCode(data.charCodeAt(index))) return false;
          hasDigits = true;
        }
        return hasDigits && isFinite(parseYamlInteger(data));
      }
    }
    for (; index < max; index++) {
      if (!isDecCode(data.charCodeAt(index))) {
        return false;
      }
      hasDigits = true;
    }
    if (!hasDigits) return false;
    return isFinite(parseYamlInteger(data));
  }
  function parseYamlInteger(data) {
    let value = data;
    let sign = 1;
    let ch = value[0];
    if (ch === "-" || ch === "+") {
      if (ch === "-") sign = -1;
      value = value.slice(1);
      ch = value[0];
    }
    if (value === "0") return 0;
    if (ch === "0") {
      if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
      if (value[1] === "x") return sign * parseInt(value.slice(2), 16);
      if (value[1] === "o") return sign * parseInt(value.slice(2), 8);
    }
    return sign * parseInt(value, 10);
  }
  function constructYamlInteger(data) {
    return parseYamlInteger(data);
  }
  function isInteger(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common2.isNegativeZero(object));
  }
  int = new Type2("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: resolveYamlInteger,
    construct: constructYamlInteger,
    predicate: isInteger,
    represent: {
      binary: function(obj) {
        return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
      },
      octal: function(obj) {
        return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
      },
      decimal: function(obj) {
        return obj.toString(10);
      },
      hexadecimal: function(obj) {
        return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  });
  return int;
}
var float;
var hasRequiredFloat;
function requireFloat() {
  if (hasRequiredFloat) return float;
  hasRequiredFloat = 1;
  const common2 = requireCommon();
  const Type2 = requireType();
  const YAML_FLOAT_PATTERN = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  const YAML_FLOAT_SPECIAL_PATTERN = new RegExp(
    "^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function resolveYamlFloat(data) {
    if (data === null) return false;
    if (!YAML_FLOAT_PATTERN.test(data)) {
      return false;
    }
    if (isFinite(parseFloat(data, 10))) {
      return true;
    }
    return YAML_FLOAT_SPECIAL_PATTERN.test(data);
  }
  function constructYamlFloat(data) {
    let value = data.toLowerCase();
    const sign = value[0] === "-" ? -1 : 1;
    if ("+-".indexOf(value[0]) >= 0) {
      value = value.slice(1);
    }
    if (value === ".inf") {
      return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    } else if (value === ".nan") {
      return NaN;
    }
    return sign * parseFloat(value, 10);
  }
  const SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
  function representYamlFloat(object, style) {
    if (isNaN(object)) {
      switch (style) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    } else if (Number.POSITIVE_INFINITY === object) {
      switch (style) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    } else if (Number.NEGATIVE_INFINITY === object) {
      switch (style) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    } else if (common2.isNegativeZero(object)) {
      return "-0.0";
    }
    const res = object.toString(10);
    return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
  }
  function isFloat(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common2.isNegativeZero(object));
  }
  float = new Type2("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: resolveYamlFloat,
    construct: constructYamlFloat,
    predicate: isFloat,
    represent: representYamlFloat,
    defaultStyle: "lowercase"
  });
  return float;
}
var json;
var hasRequiredJson;
function requireJson() {
  if (hasRequiredJson) return json;
  hasRequiredJson = 1;
  json = requireFailsafe().extend({
    implicit: [
      require_null(),
      requireBool(),
      requireInt(),
      requireFloat()
    ]
  });
  return json;
}
var core;
var hasRequiredCore;
function requireCore() {
  if (hasRequiredCore) return core;
  hasRequiredCore = 1;
  core = requireJson();
  return core;
}
var timestamp;
var hasRequiredTimestamp;
function requireTimestamp() {
  if (hasRequiredTimestamp) return timestamp;
  hasRequiredTimestamp = 1;
  const Type2 = requireType();
  const YAML_DATE_REGEXP = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  );
  const YAML_TIMESTAMP_REGEXP = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function resolveYamlTimestamp(data) {
    if (data === null) return false;
    if (YAML_DATE_REGEXP.exec(data) !== null) return true;
    if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
    return false;
  }
  function constructYamlTimestamp(data) {
    let fraction = 0;
    let delta = null;
    let match = YAML_DATE_REGEXP.exec(data);
    if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
    if (match === null) throw new Error("Date resolve error");
    const year = +match[1];
    const month = +match[2] - 1;
    const day = +match[3];
    if (!match[4]) {
      return new Date(Date.UTC(year, month, day));
    }
    const hour = +match[4];
    const minute = +match[5];
    const second = +match[6];
    if (match[7]) {
      fraction = match[7].slice(0, 3);
      while (fraction.length < 3) {
        fraction += "0";
      }
      fraction = +fraction;
    }
    if (match[9]) {
      const tzHour = +match[10];
      const tzMinute = +(match[11] || 0);
      delta = (tzHour * 60 + tzMinute) * 6e4;
      if (match[9] === "-") delta = -delta;
    }
    const date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
    if (delta) date.setTime(date.getTime() - delta);
    return date;
  }
  function representYamlTimestamp(object) {
    return object.toISOString();
  }
  timestamp = new Type2("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: resolveYamlTimestamp,
    construct: constructYamlTimestamp,
    instanceOf: Date,
    represent: representYamlTimestamp
  });
  return timestamp;
}
var merge;
var hasRequiredMerge;
function requireMerge() {
  if (hasRequiredMerge) return merge;
  hasRequiredMerge = 1;
  const Type2 = requireType();
  function resolveYamlMerge(data) {
    return data === "<<" || data === null;
  }
  merge = new Type2("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: resolveYamlMerge
  });
  return merge;
}
var binary;
var hasRequiredBinary;
function requireBinary() {
  if (hasRequiredBinary) return binary;
  hasRequiredBinary = 1;
  const Type2 = requireType();
  const BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
  function resolveYamlBinary(data) {
    if (data === null) return false;
    let bitlen = 0;
    const max = data.length;
    const map2 = BASE64_MAP;
    for (let idx = 0; idx < max; idx++) {
      const code = map2.indexOf(data.charAt(idx));
      if (code > 64) continue;
      if (code < 0) return false;
      bitlen += 6;
    }
    return bitlen % 8 === 0;
  }
  function constructYamlBinary(data) {
    const input = data.replace(/[\r\n=]/g, "");
    const max = input.length;
    const map2 = BASE64_MAP;
    let bits = 0;
    const result = [];
    for (let idx = 0; idx < max; idx++) {
      if (idx % 4 === 0 && idx) {
        result.push(bits >> 16 & 255);
        result.push(bits >> 8 & 255);
        result.push(bits & 255);
      }
      bits = bits << 6 | map2.indexOf(input.charAt(idx));
    }
    const tailbits = max % 4 * 6;
    if (tailbits === 0) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    } else if (tailbits === 18) {
      result.push(bits >> 10 & 255);
      result.push(bits >> 2 & 255);
    } else if (tailbits === 12) {
      result.push(bits >> 4 & 255);
    }
    return new Uint8Array(result);
  }
  function representYamlBinary(object) {
    let result = "";
    let bits = 0;
    const max = object.length;
    const map2 = BASE64_MAP;
    for (let idx = 0; idx < max; idx++) {
      if (idx % 3 === 0 && idx) {
        result += map2[bits >> 18 & 63];
        result += map2[bits >> 12 & 63];
        result += map2[bits >> 6 & 63];
        result += map2[bits & 63];
      }
      bits = (bits << 8) + object[idx];
    }
    const tail = max % 3;
    if (tail === 0) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    } else if (tail === 2) {
      result += map2[bits >> 10 & 63];
      result += map2[bits >> 4 & 63];
      result += map2[bits << 2 & 63];
      result += map2[64];
    } else if (tail === 1) {
      result += map2[bits >> 2 & 63];
      result += map2[bits << 4 & 63];
      result += map2[64];
      result += map2[64];
    }
    return result;
  }
  function isBinary(obj) {
    return Object.prototype.toString.call(obj) === "[object Uint8Array]";
  }
  binary = new Type2("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: resolveYamlBinary,
    construct: constructYamlBinary,
    predicate: isBinary,
    represent: representYamlBinary
  });
  return binary;
}
var omap;
var hasRequiredOmap;
function requireOmap() {
  if (hasRequiredOmap) return omap;
  hasRequiredOmap = 1;
  const Type2 = requireType();
  const _hasOwnProperty = Object.prototype.hasOwnProperty;
  const _toString = Object.prototype.toString;
  function resolveYamlOmap(data) {
    if (data === null) return true;
    const objectKeys = {};
    const object = data;
    for (let index = 0, length = object.length; index < length; index += 1) {
      const pair = object[index];
      let pairHasKey = false;
      if (_toString.call(pair) !== "[object Object]") return false;
      let pairKey;
      for (pairKey in pair) {
        if (_hasOwnProperty.call(pair, pairKey)) {
          if (!pairHasKey) pairHasKey = true;
          else return false;
        }
      }
      if (!pairHasKey) return false;
      if (_hasOwnProperty.call(objectKeys, pairKey)) return false;
      Object.defineProperty(objectKeys, pairKey, { value: true });
    }
    return true;
  }
  function constructYamlOmap(data) {
    return data !== null ? data : [];
  }
  omap = new Type2("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: resolveYamlOmap,
    construct: constructYamlOmap
  });
  return omap;
}
var pairs;
var hasRequiredPairs;
function requirePairs() {
  if (hasRequiredPairs) return pairs;
  hasRequiredPairs = 1;
  const Type2 = requireType();
  const _toString = Object.prototype.toString;
  function resolveYamlPairs(data) {
    if (data === null) return true;
    const object = data;
    const result = new Array(object.length);
    for (let index = 0, length = object.length; index < length; index += 1) {
      const pair = object[index];
      if (_toString.call(pair) !== "[object Object]") return false;
      const keys = Object.keys(pair);
      if (keys.length !== 1) return false;
      result[index] = [keys[0], pair[keys[0]]];
    }
    return true;
  }
  function constructYamlPairs(data) {
    if (data === null) return [];
    const object = data;
    const result = new Array(object.length);
    for (let index = 0, length = object.length; index < length; index += 1) {
      const pair = object[index];
      const keys = Object.keys(pair);
      result[index] = [keys[0], pair[keys[0]]];
    }
    return result;
  }
  pairs = new Type2("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: resolveYamlPairs,
    construct: constructYamlPairs
  });
  return pairs;
}
var set;
var hasRequiredSet;
function requireSet() {
  if (hasRequiredSet) return set;
  hasRequiredSet = 1;
  const Type2 = requireType();
  const _hasOwnProperty = Object.prototype.hasOwnProperty;
  function resolveYamlSet(data) {
    if (data === null) return true;
    const object = data;
    for (const key in object) {
      if (_hasOwnProperty.call(object, key)) {
        if (object[key] !== null) return false;
      }
    }
    return true;
  }
  function constructYamlSet(data) {
    return data !== null ? data : {};
  }
  set = new Type2("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: resolveYamlSet,
    construct: constructYamlSet
  });
  return set;
}
var _default;
var hasRequired_default;
function require_default() {
  if (hasRequired_default) return _default;
  hasRequired_default = 1;
  _default = requireCore().extend({
    implicit: [
      requireTimestamp(),
      requireMerge()
    ],
    explicit: [
      requireBinary(),
      requireOmap(),
      requirePairs(),
      requireSet()
    ]
  });
  return _default;
}
var hasRequiredLoader;
function requireLoader() {
  if (hasRequiredLoader) return loader;
  hasRequiredLoader = 1;
  const common2 = requireCommon();
  const YAMLException2 = requireException();
  const makeSnippet = requireSnippet();
  const DEFAULT_SCHEMA2 = require_default();
  const _hasOwnProperty = Object.prototype.hasOwnProperty;
  const CONTEXT_FLOW_IN = 1;
  const CONTEXT_FLOW_OUT = 2;
  const CONTEXT_BLOCK_IN = 3;
  const CONTEXT_BLOCK_OUT = 4;
  const CHOMPING_CLIP = 1;
  const CHOMPING_STRIP = 2;
  const CHOMPING_KEEP = 3;
  const PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  const PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
  const PATTERN_FLOW_INDICATORS = /[,\[\]{}]/;
  const PATTERN_TAG_HANDLE = /^(?:!|!!|![0-9A-Za-z-]+!)$/;
  const PATTERN_TAG_URI = /^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;
  function _class(obj) {
    return Object.prototype.toString.call(obj);
  }
  function isEol(c) {
    return c === 10 || c === 13;
  }
  function isWhiteSpace(c) {
    return c === 9 || c === 32;
  }
  function isWsOrEol(c) {
    return c === 9 || c === 32 || c === 10 || c === 13;
  }
  function isFlowIndicator(c) {
    return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
  }
  function fromHexCode(c) {
    if (c >= 48 && c <= 57) {
      return c - 48;
    }
    const lc = c | 32;
    if (lc >= 97 && lc <= 102) {
      return lc - 97 + 10;
    }
    return -1;
  }
  function escapedHexLen(c) {
    if (c === 120) {
      return 2;
    }
    if (c === 117) {
      return 4;
    }
    if (c === 85) {
      return 8;
    }
    return 0;
  }
  function fromDecimalCode(c) {
    if (c >= 48 && c <= 57) {
      return c - 48;
    }
    return -1;
  }
  function simpleEscapeSequence(c) {
    switch (c) {
      case 48:
        return "\0";
      case 97:
        return "\x07";
      case 98:
        return "\b";
      case 116:
        return "	";
      case 9:
        return "	";
      case 110:
        return "\n";
      case 118:
        return "\v";
      case 102:
        return "\f";
      case 114:
        return "\r";
      case 101:
        return "\x1B";
      case 32:
        return " ";
      case 34:
        return '"';
      case 47:
        return "/";
      case 92:
        return "\\";
      case 78:
        return "\x85";
      case 95:
        return "\xA0";
      case 76:
        return "\u2028";
      case 80:
        return "\u2029";
      default:
        return "";
    }
  }
  function charFromCodepoint(c) {
    if (c <= 65535) {
      return String.fromCharCode(c);
    }
    return String.fromCharCode(
      (c - 65536 >> 10) + 55296,
      (c - 65536 & 1023) + 56320
    );
  }
  function setProperty(object, key, value) {
    if (key === "__proto__") {
      Object.defineProperty(object, key, {
        configurable: true,
        enumerable: true,
        writable: true,
        value
      });
    } else {
      object[key] = value;
    }
  }
  const simpleEscapeCheck = new Array(256);
  const simpleEscapeMap = new Array(256);
  for (let i = 0; i < 256; i++) {
    simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
    simpleEscapeMap[i] = simpleEscapeSequence(i);
  }
  function State(input, options) {
    this.input = input;
    this.filename = options["filename"] || null;
    this.schema = options["schema"] || DEFAULT_SCHEMA2;
    this.onWarning = options["onWarning"] || null;
    this.legacy = options["legacy"] || false;
    this.json = options["json"] || false;
    this.listener = options["listener"] || null;
    this.maxDepth = typeof options["maxDepth"] === "number" ? options["maxDepth"] : 100;
    this.maxTotalMergeKeys = typeof options["maxTotalMergeKeys"] === "number" ? options["maxTotalMergeKeys"] : 1e4;
    this.implicitTypes = this.schema.compiledImplicit;
    this.typeMap = this.schema.compiledTypeMap;
    this.length = input.length;
    this.position = 0;
    this.line = 0;
    this.lineStart = 0;
    this.lineIndent = 0;
    this.depth = 0;
    this.totalMergeKeys = 0;
    this.firstTabInLine = -1;
    this.documents = [];
    this.anchorMapTransactions = [];
  }
  function generateError(state, message) {
    const mark = {
      name: state.filename,
      buffer: state.input.slice(0, -1),
      // omit trailing \0
      position: state.position,
      line: state.line,
      column: state.position - state.lineStart
    };
    mark.snippet = makeSnippet(mark);
    return new YAMLException2(message, mark);
  }
  function throwError(state, message) {
    throw generateError(state, message);
  }
  function throwWarning(state, message) {
    if (state.onWarning) {
      state.onWarning.call(null, generateError(state, message));
    }
  }
  function storeAnchor(state, name, value) {
    const transactions = state.anchorMapTransactions;
    if (transactions.length !== 0) {
      const transaction = transactions[transactions.length - 1];
      if (!_hasOwnProperty.call(transaction, name)) {
        transaction[name] = {
          existed: _hasOwnProperty.call(state.anchorMap, name),
          value: state.anchorMap[name]
        };
      }
    }
    state.anchorMap[name] = value;
  }
  function beginAnchorTransaction(state) {
    state.anchorMapTransactions.push(/* @__PURE__ */ Object.create(null));
  }
  function commitAnchorTransaction(state) {
    const transaction = state.anchorMapTransactions.pop();
    const transactions = state.anchorMapTransactions;
    if (transactions.length === 0) return;
    const parent = transactions[transactions.length - 1];
    const names = Object.keys(transaction);
    for (let index = 0, length = names.length; index < length; index += 1) {
      const name = names[index];
      if (!_hasOwnProperty.call(parent, name)) {
        parent[name] = transaction[name];
      }
    }
  }
  function rollbackAnchorTransaction(state) {
    const transaction = state.anchorMapTransactions.pop();
    const names = Object.keys(transaction);
    for (let index = names.length - 1; index >= 0; index -= 1) {
      const entry = transaction[names[index]];
      if (entry.existed) {
        state.anchorMap[names[index]] = entry.value;
      } else {
        delete state.anchorMap[names[index]];
      }
    }
  }
  function snapshotState(state) {
    return {
      position: state.position,
      line: state.line,
      lineStart: state.lineStart,
      lineIndent: state.lineIndent,
      firstTabInLine: state.firstTabInLine,
      tag: state.tag,
      anchor: state.anchor,
      kind: state.kind,
      result: state.result
    };
  }
  function restoreState(state, snapshot) {
    state.position = snapshot.position;
    state.line = snapshot.line;
    state.lineStart = snapshot.lineStart;
    state.lineIndent = snapshot.lineIndent;
    state.firstTabInLine = snapshot.firstTabInLine;
    state.tag = snapshot.tag;
    state.anchor = snapshot.anchor;
    state.kind = snapshot.kind;
    state.result = snapshot.result;
  }
  const directiveHandlers = {
    YAML: function handleYamlDirective(state, name, args2) {
      if (state.version !== null) {
        throwError(state, "duplication of %YAML directive");
      }
      if (args2.length !== 1) {
        throwError(state, "YAML directive accepts exactly one argument");
      }
      const match = /^([0-9]+)\.([0-9]+)$/.exec(args2[0]);
      if (match === null) {
        throwError(state, "ill-formed argument of the YAML directive");
      }
      const major = parseInt(match[1], 10);
      const minor = parseInt(match[2], 10);
      if (major !== 1) {
        throwError(state, "unacceptable YAML version of the document");
      }
      state.version = args2[0];
      state.checkLineBreaks = minor < 2;
      if (minor !== 1 && minor !== 2) {
        throwWarning(state, "unsupported YAML version of the document");
      }
    },
    TAG: function handleTagDirective(state, name, args2) {
      let prefix;
      if (args2.length !== 2) {
        throwError(state, "TAG directive accepts exactly two arguments");
      }
      const handle = args2[0];
      prefix = args2[1];
      if (!PATTERN_TAG_HANDLE.test(handle)) {
        throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
      }
      if (_hasOwnProperty.call(state.tagMap, handle)) {
        throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
      }
      if (!PATTERN_TAG_URI.test(prefix)) {
        throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
      }
      try {
        prefix = decodeURIComponent(prefix);
      } catch (err) {
        throwError(state, "tag prefix is malformed: " + prefix);
      }
      state.tagMap[handle] = prefix;
    }
  };
  function captureSegment(state, start, end, checkJson) {
    if (start < end) {
      const _result = state.input.slice(start, end);
      if (checkJson) {
        for (let _position = 0, _length = _result.length; _position < _length; _position += 1) {
          const _character = _result.charCodeAt(_position);
          if (!(_character === 9 || _character >= 32 && _character <= 1114111)) {
            throwError(state, "expected valid JSON character");
          }
        }
      } else if (PATTERN_NON_PRINTABLE.test(_result)) {
        throwError(state, "the stream contains non-printable characters");
      }
      state.result += _result;
    }
  }
  function chargeMergeWork(state) {
    state.totalMergeKeys++;
    if (state.maxTotalMergeKeys !== -1 && state.totalMergeKeys > state.maxTotalMergeKeys) {
      throwError(state, "merge keys exceeded maxTotalMergeKeys (" + state.maxTotalMergeKeys + ")");
    }
  }
  function mergeMappings(state, destination, source, overridableKeys) {
    if (!common2.isObject(source)) {
      throwError(state, "cannot merge mappings; the provided source object is unacceptable");
    }
    chargeMergeWork(state);
    const sourceKeys = Object.keys(source);
    for (let index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
      const key = sourceKeys[index];
      chargeMergeWork(state);
      if (!_hasOwnProperty.call(destination, key)) {
        setProperty(destination, key, source[key]);
        overridableKeys[key] = true;
      }
    }
  }
  function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
    if (Array.isArray(keyNode)) {
      keyNode = Array.prototype.slice.call(keyNode);
      for (let index = 0, quantity = keyNode.length; index < quantity; index += 1) {
        if (Array.isArray(keyNode[index])) {
          throwError(state, "nested arrays are not supported inside keys");
        }
        if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
          keyNode[index] = "[object Object]";
        }
      }
    }
    if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
      keyNode = "[object Object]";
    }
    keyNode = String(keyNode);
    if (_result === null) {
      _result = {};
    }
    if (keyTag === "tag:yaml.org,2002:merge") {
      if (Array.isArray(valueNode)) {
        if (valueNode.length > 100) {
          throwError(state, "abnormal merge sequence size");
        }
        for (let index = 0, quantity = valueNode.length; index < quantity; index += 1) {
          mergeMappings(state, _result, valueNode[index], overridableKeys);
        }
      } else {
        mergeMappings(state, _result, valueNode, overridableKeys);
      }
    } else {
      if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
        state.line = startLine || state.line;
        state.lineStart = startLineStart || state.lineStart;
        state.position = startPos || state.position;
        throwError(state, "duplicated mapping key");
      }
      setProperty(_result, keyNode, valueNode);
      delete overridableKeys[keyNode];
    }
    return _result;
  }
  function readLineBreak(state) {
    const ch = state.input.charCodeAt(state.position);
    if (ch === 10) {
      state.position++;
    } else if (ch === 13) {
      state.position++;
      if (state.input.charCodeAt(state.position) === 10) {
        state.position++;
      }
    } else {
      throwError(state, "a line break is expected");
    }
    state.line += 1;
    state.lineStart = state.position;
    state.firstTabInLine = -1;
  }
  function skipSeparationSpace(state, allowComments, checkIndent) {
    let lineBreaks = 0;
    let ch = state.input.charCodeAt(state.position);
    while (ch !== 0) {
      while (isWhiteSpace(ch)) {
        if (ch === 9 && state.firstTabInLine === -1) {
          state.firstTabInLine = state.position;
        }
        ch = state.input.charCodeAt(++state.position);
      }
      if (allowComments && ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 10 && ch !== 13 && ch !== 0);
      }
      if (isEol(ch)) {
        readLineBreak(state);
        ch = state.input.charCodeAt(state.position);
        lineBreaks++;
        state.lineIndent = 0;
        while (ch === 32) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
      } else {
        break;
      }
    }
    if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
      throwWarning(state, "deficient indentation");
    }
    return lineBreaks;
  }
  function testDocumentSeparator(state) {
    let _position = state.position;
    let ch = state.input.charCodeAt(_position);
    if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
      _position += 3;
      ch = state.input.charCodeAt(_position);
      if (ch === 0 || isWsOrEol(ch)) {
        return true;
      }
    }
    return false;
  }
  function writeFoldedLines(state, count) {
    if (count === 1) {
      state.result += " ";
    } else if (count > 1) {
      state.result += common2.repeat("\n", count - 1);
    }
  }
  function readPlainScalar(state, nodeIndent, withinFlowCollection) {
    let captureStart;
    let captureEnd;
    let hasPendingContent;
    let _line;
    let _lineStart;
    let _lineIndent;
    const _kind = state.kind;
    const _result = state.result;
    let ch = state.input.charCodeAt(state.position);
    if (isWsOrEol(ch) || isFlowIndicator(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
      return false;
    }
    if (ch === 63 || ch === 45) {
      const following = state.input.charCodeAt(state.position + 1);
      if (isWsOrEol(following) || withinFlowCollection && isFlowIndicator(following)) {
        return false;
      }
    }
    state.kind = "scalar";
    state.result = "";
    captureStart = captureEnd = state.position;
    hasPendingContent = false;
    while (ch !== 0) {
      if (ch === 58) {
        const following = state.input.charCodeAt(state.position + 1);
        if (isWsOrEol(following) || withinFlowCollection && isFlowIndicator(following)) {
          break;
        }
      } else if (ch === 35) {
        const preceding = state.input.charCodeAt(state.position - 1);
        if (isWsOrEol(preceding)) {
          break;
        }
      } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && isFlowIndicator(ch)) {
        break;
      } else if (isEol(ch)) {
        _line = state.line;
        _lineStart = state.lineStart;
        _lineIndent = state.lineIndent;
        skipSeparationSpace(state, false, -1);
        if (state.lineIndent >= nodeIndent) {
          hasPendingContent = true;
          ch = state.input.charCodeAt(state.position);
          continue;
        } else {
          state.position = captureEnd;
          state.line = _line;
          state.lineStart = _lineStart;
          state.lineIndent = _lineIndent;
          break;
        }
      }
      if (hasPendingContent) {
        captureSegment(state, captureStart, captureEnd, false);
        writeFoldedLines(state, state.line - _line);
        captureStart = captureEnd = state.position;
        hasPendingContent = false;
      }
      if (!isWhiteSpace(ch)) {
        captureEnd = state.position + 1;
      }
      ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, captureEnd, false);
    if (state.result) {
      return true;
    }
    state.kind = _kind;
    state.result = _result;
    return false;
  }
  function readSingleQuotedScalar(state, nodeIndent) {
    let captureStart;
    let captureEnd;
    let ch = state.input.charCodeAt(state.position);
    if (ch !== 39) {
      return false;
    }
    state.kind = "scalar";
    state.result = "";
    state.position++;
    captureStart = captureEnd = state.position;
    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      if (ch === 39) {
        captureSegment(state, captureStart, state.position, true);
        ch = state.input.charCodeAt(++state.position);
        if (ch === 39) {
          captureStart = state.position;
          state.position++;
          captureEnd = state.position;
        } else {
          return true;
        }
      } else if (isEol(ch)) {
        captureSegment(state, captureStart, captureEnd, true);
        writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
        captureStart = captureEnd = state.position;
      } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
        throwError(state, "unexpected end of the document within a single quoted scalar");
      } else {
        state.position++;
        if (!isWhiteSpace(ch)) {
          captureEnd = state.position;
        }
      }
    }
    throwError(state, "unexpected end of the stream within a single quoted scalar");
  }
  function readDoubleQuotedScalar(state, nodeIndent) {
    let captureStart;
    let captureEnd;
    let tmp;
    let ch = state.input.charCodeAt(state.position);
    if (ch !== 34) {
      return false;
    }
    state.kind = "scalar";
    state.result = "";
    state.position++;
    captureStart = captureEnd = state.position;
    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      if (ch === 34) {
        captureSegment(state, captureStart, state.position, true);
        state.position++;
        return true;
      } else if (ch === 92) {
        captureSegment(state, captureStart, state.position, true);
        ch = state.input.charCodeAt(++state.position);
        if (isEol(ch)) {
          skipSeparationSpace(state, false, nodeIndent);
        } else if (ch < 256 && simpleEscapeCheck[ch]) {
          state.result += simpleEscapeMap[ch];
          state.position++;
        } else if ((tmp = escapedHexLen(ch)) > 0) {
          let hexLength = tmp;
          let hexResult = 0;
          for (; hexLength > 0; hexLength--) {
            ch = state.input.charCodeAt(++state.position);
            if ((tmp = fromHexCode(ch)) >= 0) {
              hexResult = (hexResult << 4) + tmp;
            } else {
              throwError(state, "expected hexadecimal character");
            }
          }
          state.result += charFromCodepoint(hexResult);
          state.position++;
        } else {
          throwError(state, "unknown escape sequence");
        }
        captureStart = captureEnd = state.position;
      } else if (isEol(ch)) {
        captureSegment(state, captureStart, captureEnd, true);
        writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
        captureStart = captureEnd = state.position;
      } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
        throwError(state, "unexpected end of the document within a double quoted scalar");
      } else {
        state.position++;
        if (!isWhiteSpace(ch)) {
          captureEnd = state.position;
        }
      }
    }
    throwError(state, "unexpected end of the stream within a double quoted scalar");
  }
  function readFlowCollection(state, nodeIndent) {
    let readNext = true;
    let _line;
    let _lineStart;
    let _pos;
    const _tag = state.tag;
    let _result;
    const _anchor = state.anchor;
    let terminator;
    let isPair;
    let isExplicitPair;
    let isMapping;
    const overridableKeys = /* @__PURE__ */ Object.create(null);
    let keyNode;
    let keyTag;
    let valueNode;
    let ch = state.input.charCodeAt(state.position);
    if (ch === 91) {
      terminator = 93;
      isMapping = false;
      _result = [];
    } else if (ch === 123) {
      terminator = 125;
      isMapping = true;
      _result = {};
    } else {
      return false;
    }
    if (state.anchor !== null) {
      storeAnchor(state, state.anchor, _result);
    }
    ch = state.input.charCodeAt(++state.position);
    while (ch !== 0) {
      skipSeparationSpace(state, true, nodeIndent);
      ch = state.input.charCodeAt(state.position);
      if (ch === terminator) {
        state.position++;
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = isMapping ? "mapping" : "sequence";
        state.result = _result;
        return true;
      } else if (!readNext) {
        throwError(state, "missed comma between flow collection entries");
      } else if (ch === 44) {
        throwError(state, "expected the node content, but found ','");
      }
      keyTag = keyNode = valueNode = null;
      isPair = isExplicitPair = false;
      if (ch === 63) {
        const following = state.input.charCodeAt(state.position + 1);
        if (isWsOrEol(following)) {
          isPair = isExplicitPair = true;
          state.position++;
          skipSeparationSpace(state, true, nodeIndent);
        }
      }
      _line = state.line;
      _lineStart = state.lineStart;
      _pos = state.position;
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      keyTag = state.tag;
      keyNode = state.result;
      skipSeparationSpace(state, true, nodeIndent);
      ch = state.input.charCodeAt(state.position);
      if ((isExplicitPair || state.line === _line) && ch === 58) {
        isPair = true;
        ch = state.input.charCodeAt(++state.position);
        skipSeparationSpace(state, true, nodeIndent);
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        valueNode = state.result;
      }
      if (isMapping) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
      } else if (isPair) {
        _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
      } else {
        _result.push(keyNode);
      }
      skipSeparationSpace(state, true, nodeIndent);
      ch = state.input.charCodeAt(state.position);
      if (ch === 44) {
        readNext = true;
        ch = state.input.charCodeAt(++state.position);
      } else {
        readNext = false;
      }
    }
    throwError(state, "unexpected end of the stream within a flow collection");
  }
  function readBlockScalar(state, nodeIndent) {
    let folding;
    let chomping = CHOMPING_CLIP;
    let didReadContent = false;
    let detectedIndent = false;
    let textIndent = nodeIndent;
    let emptyLines = 0;
    let atMoreIndented = false;
    let tmp;
    let ch = state.input.charCodeAt(state.position);
    if (ch === 124) {
      folding = false;
    } else if (ch === 62) {
      folding = true;
    } else {
      return false;
    }
    state.kind = "scalar";
    state.result = "";
    while (ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
      if (ch === 43 || ch === 45) {
        if (CHOMPING_CLIP === chomping) {
          chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
        } else {
          throwError(state, "repeat of a chomping mode identifier");
        }
      } else if ((tmp = fromDecimalCode(ch)) >= 0) {
        if (tmp === 0) {
          throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
        } else if (!detectedIndent) {
          textIndent = nodeIndent + tmp - 1;
          detectedIndent = true;
        } else {
          throwError(state, "repeat of an indentation width identifier");
        }
      } else {
        break;
      }
    }
    if (isWhiteSpace(ch)) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (isWhiteSpace(ch));
      if (ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (!isEol(ch) && ch !== 0);
      }
    }
    while (ch !== 0) {
      readLineBreak(state);
      state.lineIndent = 0;
      ch = state.input.charCodeAt(state.position);
      while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
      if (!detectedIndent && state.lineIndent > textIndent) {
        textIndent = state.lineIndent;
      }
      if (isEol(ch)) {
        emptyLines++;
        continue;
      }
      if (!detectedIndent && textIndent === 0) {
        throwError(state, "missing indentation for block scalar");
      }
      if (state.lineIndent < textIndent) {
        if (chomping === CHOMPING_KEEP) {
          state.result += common2.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        } else if (chomping === CHOMPING_CLIP) {
          if (didReadContent) {
            state.result += "\n";
          }
        }
        break;
      }
      if (folding) {
        if (isWhiteSpace(ch)) {
          atMoreIndented = true;
          state.result += common2.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        } else if (atMoreIndented) {
          atMoreIndented = false;
          state.result += common2.repeat("\n", emptyLines + 1);
        } else if (emptyLines === 0) {
          if (didReadContent) {
            state.result += " ";
          }
        } else {
          state.result += common2.repeat("\n", emptyLines);
        }
      } else {
        state.result += common2.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      }
      didReadContent = true;
      detectedIndent = true;
      emptyLines = 0;
      const captureStart = state.position;
      while (!isEol(ch) && ch !== 0) {
        ch = state.input.charCodeAt(++state.position);
      }
      captureSegment(state, captureStart, state.position, false);
    }
    return true;
  }
  function readBlockSequence(state, nodeIndent) {
    const _tag = state.tag;
    const _anchor = state.anchor;
    const _result = [];
    let detected = false;
    if (state.firstTabInLine !== -1) return false;
    if (state.anchor !== null) {
      storeAnchor(state, state.anchor, _result);
    }
    let ch = state.input.charCodeAt(state.position);
    while (ch !== 0) {
      if (state.firstTabInLine !== -1) {
        state.position = state.firstTabInLine;
        throwError(state, "tab characters must not be used in indentation");
      }
      if (ch !== 45) {
        break;
      }
      const following = state.input.charCodeAt(state.position + 1);
      if (!isWsOrEol(following)) {
        break;
      }
      detected = true;
      state.position++;
      if (skipSeparationSpace(state, true, -1)) {
        if (state.lineIndent <= nodeIndent) {
          _result.push(null);
          ch = state.input.charCodeAt(state.position);
          continue;
        }
      }
      const _line = state.line;
      composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
      _result.push(state.result);
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
      if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
        throwError(state, "bad indentation of a sequence entry");
      } else if (state.lineIndent < nodeIndent) {
        break;
      }
    }
    if (detected) {
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = "sequence";
      state.result = _result;
      return true;
    }
    return false;
  }
  function readBlockMapping(state, nodeIndent, flowIndent) {
    let allowCompact;
    let _keyLine;
    let _keyLineStart;
    let _keyPos;
    const _tag = state.tag;
    const _anchor = state.anchor;
    const _result = {};
    const overridableKeys = /* @__PURE__ */ Object.create(null);
    let keyTag = null;
    let keyNode = null;
    let valueNode = null;
    let atExplicitKey = false;
    let detected = false;
    if (state.firstTabInLine !== -1) return false;
    if (state.anchor !== null) {
      storeAnchor(state, state.anchor, _result);
    }
    let ch = state.input.charCodeAt(state.position);
    while (ch !== 0) {
      if (!atExplicitKey && state.firstTabInLine !== -1) {
        state.position = state.firstTabInLine;
        throwError(state, "tab characters must not be used in indentation");
      }
      const following = state.input.charCodeAt(state.position + 1);
      const _line = state.line;
      if ((ch === 63 || ch === 58) && isWsOrEol(following)) {
        if (ch === 63) {
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = true;
          allowCompact = true;
        } else if (atExplicitKey) {
          atExplicitKey = false;
          allowCompact = true;
        } else {
          throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
        }
        state.position += 1;
        ch = following;
      } else {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
        if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          break;
        }
        if (state.line === _line) {
          ch = state.input.charCodeAt(state.position);
          while (isWhiteSpace(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (ch === 58) {
            ch = state.input.charCodeAt(++state.position);
            if (!isWsOrEol(ch)) {
              throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
            }
            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = false;
            allowCompact = false;
            keyTag = state.tag;
            keyNode = state.result;
          } else if (detected) {
            throwError(state, "can not read an implicit mapping pair; a colon is missed");
          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true;
          }
        } else if (detected) {
          throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true;
        }
      }
      if (state.line === _line || state.lineIndent > nodeIndent) {
        if (atExplicitKey) {
          _keyLine = state.line;
          _keyLineStart = state.lineStart;
          _keyPos = state.position;
        }
        if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
          if (atExplicitKey) {
            keyNode = state.result;
          } else {
            valueNode = state.result;
          }
        }
        if (!atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
      }
      if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
        throwError(state, "bad indentation of a mapping entry");
      } else if (state.lineIndent < nodeIndent) {
        break;
      }
    }
    if (atExplicitKey) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
    }
    if (detected) {
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = "mapping";
      state.result = _result;
    }
    return detected;
  }
  function readTagProperty(state) {
    let isVerbatim = false;
    let isNamed = false;
    let tagHandle;
    let tagName;
    let ch = state.input.charCodeAt(state.position);
    if (ch !== 33) return false;
    if (state.tag !== null) {
      throwError(state, "duplication of a tag property");
    }
    ch = state.input.charCodeAt(++state.position);
    if (ch === 60) {
      isVerbatim = true;
      ch = state.input.charCodeAt(++state.position);
    } else if (ch === 33) {
      isNamed = true;
      tagHandle = "!!";
      ch = state.input.charCodeAt(++state.position);
    } else {
      tagHandle = "!";
    }
    let _position = state.position;
    if (isVerbatim) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 0 && ch !== 62);
      if (state.position < state.length) {
        tagName = state.input.slice(_position, state.position);
        ch = state.input.charCodeAt(++state.position);
      } else {
        throwError(state, "unexpected end of the stream within a verbatim tag");
      }
    } else {
      while (ch !== 0 && !isWsOrEol(ch)) {
        if (ch === 33) {
          if (!isNamed) {
            tagHandle = state.input.slice(_position - 1, state.position + 1);
            if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
              throwError(state, "named tag handle cannot contain such characters");
            }
            isNamed = true;
            _position = state.position + 1;
          } else {
            throwError(state, "tag suffix cannot contain exclamation marks");
          }
        }
        ch = state.input.charCodeAt(++state.position);
      }
      tagName = state.input.slice(_position, state.position);
      if (PATTERN_FLOW_INDICATORS.test(tagName)) {
        throwError(state, "tag suffix cannot contain flow indicator characters");
      }
    }
    if (tagName && !PATTERN_TAG_URI.test(tagName)) {
      throwError(state, "tag name cannot contain such characters: " + tagName);
    }
    try {
      tagName = decodeURIComponent(tagName);
    } catch (err) {
      throwError(state, "tag name is malformed: " + tagName);
    }
    if (isVerbatim) {
      state.tag = tagName;
    } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
      state.tag = state.tagMap[tagHandle] + tagName;
    } else if (tagHandle === "!") {
      state.tag = "!" + tagName;
    } else if (tagHandle === "!!") {
      state.tag = "tag:yaml.org,2002:" + tagName;
    } else {
      throwError(state, 'undeclared tag handle "' + tagHandle + '"');
    }
    return true;
  }
  function readAnchorProperty(state) {
    let ch = state.input.charCodeAt(state.position);
    if (ch !== 38) return false;
    if (state.anchor !== null) {
      throwError(state, "duplication of an anchor property");
    }
    ch = state.input.charCodeAt(++state.position);
    const _position = state.position;
    while (ch !== 0 && !isWsOrEol(ch) && !isFlowIndicator(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
      throwError(state, "name of an anchor node must contain at least one character");
    }
    state.anchor = state.input.slice(_position, state.position);
    return true;
  }
  function readAlias(state) {
    let ch = state.input.charCodeAt(state.position);
    if (ch !== 42) return false;
    ch = state.input.charCodeAt(++state.position);
    const _position = state.position;
    while (ch !== 0 && !isWsOrEol(ch) && !isFlowIndicator(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
      throwError(state, "name of an alias node must contain at least one character");
    }
    const alias = state.input.slice(_position, state.position);
    if (!_hasOwnProperty.call(state.anchorMap, alias)) {
      throwError(state, 'unidentified alias "' + alias + '"');
    }
    state.result = state.anchorMap[alias];
    skipSeparationSpace(state, true, -1);
    return true;
  }
  function tryReadBlockMappingFromProperty(state, propertyStart, nodeIndent, flowIndent) {
    const fallbackState = snapshotState(state);
    beginAnchorTransaction(state);
    restoreState(state, propertyStart);
    state.tag = null;
    state.anchor = null;
    state.kind = null;
    state.result = null;
    if (readBlockMapping(state, nodeIndent, flowIndent) && state.kind === "mapping") {
      commitAnchorTransaction(state);
      return true;
    }
    rollbackAnchorTransaction(state);
    restoreState(state, fallbackState);
    return false;
  }
  function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
    let allowBlockScalars;
    let allowBlockCollections;
    let indentStatus = 1;
    let atNewLine = false;
    let hasContent = false;
    let propertyStart = null;
    let type2;
    let flowIndent;
    let blockIndent;
    if (state.depth >= state.maxDepth) {
      throwError(state, "nesting exceeded maxDepth (" + state.maxDepth + ")");
    }
    state.depth += 1;
    if (state.listener !== null) {
      state.listener("open", state);
    }
    state.tag = null;
    state.anchor = null;
    state.kind = null;
    state.result = null;
    const allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
    if (allowToSeek) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      }
    }
    if (indentStatus === 1) {
      while (true) {
        const ch = state.input.charCodeAt(state.position);
        const propertyState = snapshotState(state);
        if (atNewLine && (ch === 33 && state.tag !== null || ch === 38 && state.anchor !== null)) {
          break;
        }
        if (!readTagProperty(state) && !readAnchorProperty(state)) {
          break;
        }
        if (propertyStart === null) {
          propertyStart = propertyState;
        }
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          allowBlockCollections = allowBlockStyles;
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        } else {
          allowBlockCollections = false;
        }
      }
    }
    if (allowBlockCollections) {
      allowBlockCollections = atNewLine || allowCompact;
    }
    if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
      if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
        flowIndent = parentIndent;
      } else {
        flowIndent = parentIndent + 1;
      }
      blockIndent = state.position - state.lineStart;
      if (indentStatus === 1) {
        if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
          hasContent = true;
        } else {
          const ch = state.input.charCodeAt(state.position);
          if (propertyStart !== null && allowBlockStyles && !allowBlockCollections && ch !== 124 && ch !== 62 && tryReadBlockMappingFromProperty(
            state,
            propertyStart,
            propertyStart.position - propertyStart.lineStart,
            flowIndent
          )) {
            hasContent = true;
          } else if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
            hasContent = true;
          } else if (readAlias(state)) {
            hasContent = true;
            if (state.tag !== null || state.anchor !== null) {
              throwError(state, "alias node should not have any properties");
            }
          } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
            hasContent = true;
            if (state.tag === null) {
              state.tag = "?";
            }
          }
          if (state.anchor !== null) {
            storeAnchor(state, state.anchor, state.result);
          }
        }
      } else if (indentStatus === 0) {
        hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
      }
    }
    if (state.tag === null) {
      if (state.anchor !== null) {
        storeAnchor(state, state.anchor, state.result);
      }
    } else if (state.tag === "?") {
      if (state.result !== null && state.kind !== "scalar") {
        throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
      }
      for (let typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
        type2 = state.implicitTypes[typeIndex];
        if (type2.resolve(state.result)) {
          state.result = type2.construct(state.result);
          state.tag = type2.tag;
          if (state.anchor !== null) {
            storeAnchor(state, state.anchor, state.result);
          }
          break;
        }
      }
    } else if (state.tag !== "!") {
      if (_hasOwnProperty.call(state.typeMap[state.kind || "fallback"], state.tag)) {
        type2 = state.typeMap[state.kind || "fallback"][state.tag];
      } else {
        type2 = null;
        const typeList = state.typeMap.multi[state.kind || "fallback"];
        for (let typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
          if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
            type2 = typeList[typeIndex];
            break;
          }
        }
      }
      if (!type2) {
        throwError(state, "unknown tag !<" + state.tag + ">");
      }
      if (state.result !== null && type2.kind !== state.kind) {
        throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
      }
      if (!type2.resolve(state.result, state.tag)) {
        throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
      } else {
        state.result = type2.construct(state.result, state.tag);
        if (state.anchor !== null) {
          storeAnchor(state, state.anchor, state.result);
        }
      }
    }
    if (state.listener !== null) {
      state.listener("close", state);
    }
    state.depth -= 1;
    return state.tag !== null || state.anchor !== null || hasContent;
  }
  function readDocument(state) {
    const documentStart = state.position;
    let hasDirectives = false;
    let ch;
    state.version = null;
    state.checkLineBreaks = state.legacy;
    state.tagMap = /* @__PURE__ */ Object.create(null);
    state.anchorMap = /* @__PURE__ */ Object.create(null);
    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
      if (state.lineIndent > 0 || ch !== 37) {
        break;
      }
      hasDirectives = true;
      ch = state.input.charCodeAt(++state.position);
      let _position = state.position;
      while (ch !== 0 && !isWsOrEol(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      const directiveName = state.input.slice(_position, state.position);
      const directiveArgs = [];
      if (directiveName.length < 1) {
        throwError(state, "directive name must not be less than one character in length");
      }
      while (ch !== 0) {
        while (isWhiteSpace(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 0 && !isEol(ch));
          break;
        }
        if (isEol(ch)) break;
        _position = state.position;
        while (ch !== 0 && !isWsOrEol(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        directiveArgs.push(state.input.slice(_position, state.position));
      }
      if (ch !== 0) readLineBreak(state);
      if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
        directiveHandlers[directiveName](state, directiveName, directiveArgs);
      } else {
        throwWarning(state, 'unknown document directive "' + directiveName + '"');
      }
    }
    skipSeparationSpace(state, true, -1);
    if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    } else if (hasDirectives) {
      throwError(state, "directives end mark is expected");
    }
    composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
    skipSeparationSpace(state, true, -1);
    if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
      throwWarning(state, "non-ASCII line breaks are interpreted as content");
    }
    state.documents.push(state.result);
    if (state.position === state.lineStart && testDocumentSeparator(state)) {
      if (state.input.charCodeAt(state.position) === 46) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      }
      return;
    }
    if (state.position < state.length - 1) {
      throwError(state, "end of the stream or a document separator is expected");
    }
  }
  function loadDocuments(input, options) {
    input = String(input);
    options = options || {};
    if (input.length !== 0) {
      if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
        input += "\n";
      }
      if (input.charCodeAt(0) === 65279) {
        input = input.slice(1);
      }
    }
    const state = new State(input, options);
    const nullpos = input.indexOf("\0");
    if (nullpos !== -1) {
      state.position = nullpos;
      throwError(state, "null byte is not allowed in input");
    }
    state.input += "\0";
    while (state.input.charCodeAt(state.position) === 32) {
      state.lineIndent += 1;
      state.position += 1;
    }
    while (state.position < state.length - 1) {
      readDocument(state);
    }
    return state.documents;
  }
  function loadAll2(input, iterator, options) {
    if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
      options = iterator;
      iterator = null;
    }
    const documents = loadDocuments(input, options);
    if (typeof iterator !== "function") {
      return documents;
    }
    for (let index = 0, length = documents.length; index < length; index += 1) {
      iterator(documents[index]);
    }
  }
  function load2(input, options) {
    const documents = loadDocuments(input, options);
    if (documents.length === 0) {
      return void 0;
    } else if (documents.length === 1) {
      return documents[0];
    }
    throw new YAMLException2("expected a single document in the stream, but found more");
  }
  loader.loadAll = loadAll2;
  loader.load = load2;
  return loader;
}
var dumper = {};
var hasRequiredDumper;
function requireDumper() {
  if (hasRequiredDumper) return dumper;
  hasRequiredDumper = 1;
  const common2 = requireCommon();
  const YAMLException2 = requireException();
  const DEFAULT_SCHEMA2 = require_default();
  const _toString = Object.prototype.toString;
  const _hasOwnProperty = Object.prototype.hasOwnProperty;
  const CHAR_BOM = 65279;
  const CHAR_TAB = 9;
  const CHAR_LINE_FEED = 10;
  const CHAR_CARRIAGE_RETURN = 13;
  const CHAR_SPACE = 32;
  const CHAR_EXCLAMATION = 33;
  const CHAR_DOUBLE_QUOTE = 34;
  const CHAR_SHARP = 35;
  const CHAR_PERCENT = 37;
  const CHAR_AMPERSAND = 38;
  const CHAR_SINGLE_QUOTE = 39;
  const CHAR_ASTERISK = 42;
  const CHAR_COMMA = 44;
  const CHAR_MINUS = 45;
  const CHAR_COLON = 58;
  const CHAR_EQUALS = 61;
  const CHAR_GREATER_THAN = 62;
  const CHAR_QUESTION = 63;
  const CHAR_COMMERCIAL_AT = 64;
  const CHAR_LEFT_SQUARE_BRACKET = 91;
  const CHAR_RIGHT_SQUARE_BRACKET = 93;
  const CHAR_GRAVE_ACCENT = 96;
  const CHAR_LEFT_CURLY_BRACKET = 123;
  const CHAR_VERTICAL_LINE = 124;
  const CHAR_RIGHT_CURLY_BRACKET = 125;
  const ESCAPE_SEQUENCES = {};
  ESCAPE_SEQUENCES[0] = "\\0";
  ESCAPE_SEQUENCES[7] = "\\a";
  ESCAPE_SEQUENCES[8] = "\\b";
  ESCAPE_SEQUENCES[9] = "\\t";
  ESCAPE_SEQUENCES[10] = "\\n";
  ESCAPE_SEQUENCES[11] = "\\v";
  ESCAPE_SEQUENCES[12] = "\\f";
  ESCAPE_SEQUENCES[13] = "\\r";
  ESCAPE_SEQUENCES[27] = "\\e";
  ESCAPE_SEQUENCES[34] = '\\"';
  ESCAPE_SEQUENCES[92] = "\\\\";
  ESCAPE_SEQUENCES[133] = "\\N";
  ESCAPE_SEQUENCES[160] = "\\_";
  ESCAPE_SEQUENCES[8232] = "\\L";
  ESCAPE_SEQUENCES[8233] = "\\P";
  const DEPRECATED_BOOLEANS_SYNTAX = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
  ];
  const DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function compileStyleMap(schema2, map2) {
    if (map2 === null) return {};
    const result = {};
    const keys = Object.keys(map2);
    for (let index = 0, length = keys.length; index < length; index += 1) {
      let tag = keys[index];
      let style = String(map2[tag]);
      if (tag.slice(0, 2) === "!!") {
        tag = "tag:yaml.org,2002:" + tag.slice(2);
      }
      const type2 = schema2.compiledTypeMap["fallback"][tag];
      if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
        style = type2.styleAliases[style];
      }
      result[tag] = style;
    }
    return result;
  }
  function encodeHex(character) {
    let handle;
    let length;
    const string = character.toString(16).toUpperCase();
    if (character <= 255) {
      handle = "x";
      length = 2;
    } else if (character <= 65535) {
      handle = "u";
      length = 4;
    } else if (character <= 4294967295) {
      handle = "U";
      length = 8;
    } else {
      throw new YAMLException2("code point within a string may not be greater than 0xFFFFFFFF");
    }
    return "\\" + handle + common2.repeat("0", length - string.length) + string;
  }
  const QUOTING_TYPE_SINGLE = 1;
  const QUOTING_TYPE_DOUBLE = 2;
  function State(options) {
    this.schema = options["schema"] || DEFAULT_SCHEMA2;
    this.indent = Math.max(1, options["indent"] || 2);
    this.noArrayIndent = options["noArrayIndent"] || false;
    this.skipInvalid = options["skipInvalid"] || false;
    this.flowLevel = common2.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
    this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
    this.sortKeys = options["sortKeys"] || false;
    this.lineWidth = options["lineWidth"] || 80;
    this.noRefs = options["noRefs"] || false;
    this.noCompatMode = options["noCompatMode"] || false;
    this.condenseFlow = options["condenseFlow"] || false;
    this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
    this.forceQuotes = options["forceQuotes"] || false;
    this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.explicitTypes = this.schema.compiledExplicit;
    this.tag = null;
    this.result = "";
    this.duplicates = [];
    this.usedDuplicates = null;
  }
  function indentString(string, spaces) {
    const ind = common2.repeat(" ", spaces);
    let position = 0;
    let result = "";
    const length = string.length;
    while (position < length) {
      let line;
      const next = string.indexOf("\n", position);
      if (next === -1) {
        line = string.slice(position);
        position = length;
      } else {
        line = string.slice(position, next + 1);
        position = next + 1;
      }
      if (line.length && line !== "\n") result += ind;
      result += line;
    }
    return result;
  }
  function generateNextLine(state, level) {
    return "\n" + common2.repeat(" ", state.indent * level);
  }
  function testImplicitResolving(state, str2) {
    for (let index = 0, length = state.implicitTypes.length; index < length; index += 1) {
      const type2 = state.implicitTypes[index];
      if (type2.resolve(str2)) {
        return true;
      }
    }
    return false;
  }
  function isWhitespace(c) {
    return c === CHAR_SPACE || c === CHAR_TAB;
  }
  function isPrintable(c) {
    return c >= 32 && c <= 126 || c >= 161 && c <= 55295 && c !== 8232 && c !== 8233 || c >= 57344 && c <= 65533 && c !== CHAR_BOM || c >= 65536 && c <= 1114111;
  }
  function isNsCharOrWhitespace(c) {
    return isPrintable(c) && c !== CHAR_BOM && // - b-char
    c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
  }
  function isPlainSafe(c, prev, inblock) {
    const cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
    const cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
    return (
      // ns-plain-safe
      (inblock ? cIsNsCharOrWhitespace : cIsNsCharOrWhitespace && // - c-flow-indicator
      c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && // ns-plain-char
      c !== CHAR_SHARP && // false on '#'
      !(prev === CHAR_COLON && !cIsNsChar) || // false on ': '
      isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || // change to true on '[^ ]#'
      prev === CHAR_COLON && cIsNsChar
    );
  }
  function isPlainSafeFirst(c) {
    return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && // - s-white
    // - (c-indicator ::=
    // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
    c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
    c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && // | “%” | “@” | “`”)
    c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
  }
  function isPlainSafeLast(c) {
    return !isWhitespace(c) && c !== CHAR_COLON;
  }
  function codePointAt(string, pos) {
    const first = string.charCodeAt(pos);
    let second;
    if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
      second = string.charCodeAt(pos + 1);
      if (second >= 56320 && second <= 57343) {
        return (first - 55296) * 1024 + second - 56320 + 65536;
      }
    }
    return first;
  }
  function needIndentIndicator(string) {
    const leadingSpaceRe = /^\n* /;
    return leadingSpaceRe.test(string);
  }
  const STYLE_PLAIN = 1;
  const STYLE_SINGLE = 2;
  const STYLE_LITERAL = 3;
  const STYLE_FOLDED = 4;
  const STYLE_DOUBLE = 5;
  function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
    let i;
    let char = 0;
    let prevChar = null;
    let hasLineBreak = false;
    let hasFoldableLine = false;
    const shouldTrackWidth = lineWidth !== -1;
    let previousLineBreak = -1;
    let plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
    if (singleLineOnly || forceQuotes) {
      for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
        char = codePointAt(string, i);
        if (!isPrintable(char)) {
          return STYLE_DOUBLE;
        }
        plain = plain && isPlainSafe(char, prevChar, inblock);
        prevChar = char;
      }
    } else {
      for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
        char = codePointAt(string, i);
        if (char === CHAR_LINE_FEED) {
          hasLineBreak = true;
          if (shouldTrackWidth) {
            hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
            i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
            previousLineBreak = i;
          }
        } else if (!isPrintable(char)) {
          return STYLE_DOUBLE;
        }
        plain = plain && isPlainSafe(char, prevChar, inblock);
        prevChar = char;
      }
      hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
    }
    if (!hasLineBreak && !hasFoldableLine) {
      if (plain && !forceQuotes && !testAmbiguousType(string)) {
        return STYLE_PLAIN;
      }
      return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
    }
    if (indentPerLevel > 9 && needIndentIndicator(string)) {
      return STYLE_DOUBLE;
    }
    if (!forceQuotes) {
      return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  function writeScalar(state, string, level, iskey, inblock) {
    state.dump = (function() {
      if (string.length === 0) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
      }
      if (!state.noCompatMode) {
        if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
          return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
        }
      }
      const indent = state.indent * Math.max(1, level);
      const lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
      const singleLineOnly = iskey || // No block styles in flow mode.
      state.flowLevel > -1 && level >= state.flowLevel;
      function testAmbiguity(string2) {
        return testImplicitResolving(state, string2);
      }
      switch (chooseScalarStyle(
        string,
        singleLineOnly,
        state.indent,
        lineWidth,
        testAmbiguity,
        state.quotingType,
        state.forceQuotes && !iskey,
        inblock
      )) {
        case STYLE_PLAIN:
          return string;
        case STYLE_SINGLE:
          return "'" + string.replace(/'/g, "''") + "'";
        case STYLE_LITERAL:
          return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
        case STYLE_FOLDED:
          return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
        case STYLE_DOUBLE:
          return '"' + escapeString(string) + '"';
        default:
          throw new YAMLException2("impossible error: invalid scalar style");
      }
    })();
  }
  function blockHeader(string, indentPerLevel) {
    const indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
    const clip = string[string.length - 1] === "\n";
    const keep = clip && (string[string.length - 2] === "\n" || string === "\n");
    const chomp = keep ? "+" : clip ? "" : "-";
    return indentIndicator + chomp + "\n";
  }
  function dropEndingNewline(string) {
    return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
  }
  function foldString(string, width) {
    const lineRe = /(\n+)([^\n]*)/g;
    let result = (function() {
      let nextLF = string.indexOf("\n");
      nextLF = nextLF !== -1 ? nextLF : string.length;
      lineRe.lastIndex = nextLF;
      return foldLine(string.slice(0, nextLF), width);
    })();
    let prevMoreIndented = string[0] === "\n" || string[0] === " ";
    let moreIndented;
    let match;
    while (match = lineRe.exec(string)) {
      const prefix = match[1];
      const line = match[2];
      moreIndented = line[0] === " ";
      result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
      prevMoreIndented = moreIndented;
    }
    return result;
  }
  function foldLine(line, width) {
    if (line === "" || line[0] === " ") return line;
    const breakRe = / [^ ]/g;
    let match;
    let start = 0;
    let end;
    let curr = 0;
    let next = 0;
    let result = "";
    while (match = breakRe.exec(line)) {
      next = match.index;
      if (next - start > width) {
        end = curr > start ? curr : next;
        result += "\n" + line.slice(start, end);
        start = end + 1;
      }
      curr = next;
    }
    result += "\n";
    if (line.length - start > width && curr > start) {
      result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
    } else {
      result += line.slice(start);
    }
    return result.slice(1);
  }
  function escapeString(string) {
    let result = "";
    let char = 0;
    for (let i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      const escapeSeq = ESCAPE_SEQUENCES[char];
      if (!escapeSeq && isPrintable(char)) {
        result += string[i];
        if (char >= 65536) result += string[i + 1];
      } else {
        result += escapeSeq || encodeHex(char);
      }
    }
    return result;
  }
  function writeFlowSequence(state, level, object) {
    let _result = "";
    const _tag = state.tag;
    for (let index = 0, length = object.length; index < length; index += 1) {
      let value = object[index];
      if (state.replacer) {
        value = state.replacer.call(object, String(index), value);
      }
      if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
        if (_result !== "") _result += "," + (!state.condenseFlow ? " " : "");
        _result += state.dump;
      }
    }
    state.tag = _tag;
    state.dump = "[" + _result + "]";
  }
  function writeBlockSequence(state, level, object, compact) {
    let _result = "";
    const _tag = state.tag;
    for (let index = 0, length = object.length; index < length; index += 1) {
      let value = object[index];
      if (state.replacer) {
        value = state.replacer.call(object, String(index), value);
      }
      if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
        if (!compact || _result !== "") {
          _result += generateNextLine(state, level);
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          _result += "-";
        } else {
          _result += "- ";
        }
        _result += state.dump;
      }
    }
    state.tag = _tag;
    state.dump = _result || "[]";
  }
  function writeFlowMapping(state, level, object) {
    let _result = "";
    const _tag = state.tag;
    const objectKeyList = Object.keys(object);
    for (let index = 0, length = objectKeyList.length; index < length; index += 1) {
      let pairBuffer = "";
      if (_result !== "") pairBuffer += ", ";
      if (state.condenseFlow) pairBuffer += '"';
      const objectKey = objectKeyList[index];
      let objectValue = object[objectKey];
      if (state.replacer) {
        objectValue = state.replacer.call(object, objectKey, objectValue);
      }
      if (!writeNode(state, level, objectKey, false, false)) {
        continue;
      }
      if (state.dump.length > 1024) pairBuffer += "? ";
      pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
      if (!writeNode(state, level, objectValue, false, false)) {
        continue;
      }
      pairBuffer += state.dump;
      _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = "{" + _result + "}";
  }
  function writeBlockMapping(state, level, object, compact) {
    let _result = "";
    const _tag = state.tag;
    const objectKeyList = Object.keys(object);
    if (state.sortKeys === true) {
      objectKeyList.sort();
    } else if (typeof state.sortKeys === "function") {
      objectKeyList.sort(state.sortKeys);
    } else if (state.sortKeys) {
      throw new YAMLException2("sortKeys must be a boolean or a function");
    }
    for (let index = 0, length = objectKeyList.length; index < length; index += 1) {
      let pairBuffer = "";
      if (!compact || _result !== "") {
        pairBuffer += generateNextLine(state, level);
      }
      const objectKey = objectKeyList[index];
      let objectValue = object[objectKey];
      if (state.replacer) {
        objectValue = state.replacer.call(object, objectKey, objectValue);
      }
      if (!writeNode(state, level + 1, objectKey, true, true, true)) {
        continue;
      }
      const explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
      if (explicitPair) {
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += "?";
        } else {
          pairBuffer += "? ";
        }
      }
      pairBuffer += state.dump;
      if (explicitPair) {
        pairBuffer += generateNextLine(state, level);
      }
      if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
        continue;
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += ":";
      } else {
        pairBuffer += ": ";
      }
      pairBuffer += state.dump;
      _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = _result || "{}";
  }
  function detectType(state, object, explicit) {
    const typeList = explicit ? state.explicitTypes : state.implicitTypes;
    for (let index = 0, length = typeList.length; index < length; index += 1) {
      const type2 = typeList[index];
      if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
        if (explicit) {
          if (type2.multi && type2.representName) {
            state.tag = type2.representName(object);
          } else {
            state.tag = type2.tag;
          }
        } else {
          state.tag = "?";
        }
        if (type2.represent) {
          const style = state.styleMap[type2.tag] || type2.defaultStyle;
          let _result;
          if (_toString.call(type2.represent) === "[object Function]") {
            _result = type2.represent(object, style);
          } else if (_hasOwnProperty.call(type2.represent, style)) {
            _result = type2.represent[style](object, style);
          } else {
            throw new YAMLException2("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
          }
          state.dump = _result;
        }
        return true;
      }
    }
    return false;
  }
  function writeNode(state, level, object, block, compact, iskey, isblockseq) {
    state.tag = null;
    state.dump = object;
    if (!detectType(state, object, false)) {
      detectType(state, object, true);
    }
    const type2 = _toString.call(state.dump);
    const inblock = block;
    if (block) {
      block = state.flowLevel < 0 || state.flowLevel > level;
    }
    const objectOrArray = type2 === "[object Object]" || type2 === "[object Array]";
    let duplicateIndex;
    let duplicate;
    if (objectOrArray) {
      duplicateIndex = state.duplicates.indexOf(object);
      duplicate = duplicateIndex !== -1;
    }
    if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
      compact = false;
    }
    if (duplicate && state.usedDuplicates[duplicateIndex]) {
      state.dump = "*ref_" + duplicateIndex;
    } else {
      if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
        state.usedDuplicates[duplicateIndex] = true;
      }
      if (type2 === "[object Object]") {
        if (block && Object.keys(state.dump).length !== 0) {
          writeBlockMapping(state, level, state.dump, compact);
          if (duplicate) {
            state.dump = "&ref_" + duplicateIndex + state.dump;
          }
        } else {
          writeFlowMapping(state, level, state.dump);
          if (duplicate) {
            state.dump = "&ref_" + duplicateIndex + " " + state.dump;
          }
        }
      } else if (type2 === "[object Array]") {
        if (block && state.dump.length !== 0) {
          if (state.noArrayIndent && !isblockseq && level > 0) {
            writeBlockSequence(state, level - 1, state.dump, compact);
          } else {
            writeBlockSequence(state, level, state.dump, compact);
          }
          if (duplicate) {
            state.dump = "&ref_" + duplicateIndex + state.dump;
          }
        } else {
          writeFlowSequence(state, level, state.dump);
          if (duplicate) {
            state.dump = "&ref_" + duplicateIndex + " " + state.dump;
          }
        }
      } else if (type2 === "[object String]") {
        if (state.tag !== "?") {
          writeScalar(state, state.dump, level, iskey, inblock);
        }
      } else if (type2 === "[object Undefined]") {
        return false;
      } else {
        if (state.skipInvalid) return false;
        throw new YAMLException2("unacceptable kind of an object to dump " + type2);
      }
      if (state.tag !== null && state.tag !== "?") {
        let tagStr = encodeURI(
          state.tag[0] === "!" ? state.tag.slice(1) : state.tag
        ).replace(/!/g, "%21");
        if (state.tag[0] === "!") {
          tagStr = "!" + tagStr;
        } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
          tagStr = "!!" + tagStr.slice(18);
        } else {
          tagStr = "!<" + tagStr + ">";
        }
        state.dump = tagStr + " " + state.dump;
      }
    }
    return true;
  }
  function getDuplicateReferences(object, state) {
    const objects = [];
    const duplicatesIndexes = [];
    inspectNode(object, objects, duplicatesIndexes);
    const length = duplicatesIndexes.length;
    for (let index = 0; index < length; index += 1) {
      state.duplicates.push(objects[duplicatesIndexes[index]]);
    }
    state.usedDuplicates = new Array(length);
  }
  function inspectNode(object, objects, duplicatesIndexes) {
    if (object !== null && typeof object === "object") {
      const index = objects.indexOf(object);
      if (index !== -1) {
        if (duplicatesIndexes.indexOf(index) === -1) {
          duplicatesIndexes.push(index);
        }
      } else {
        objects.push(object);
        if (Array.isArray(object)) {
          for (let i = 0, length = object.length; i < length; i += 1) {
            inspectNode(object[i], objects, duplicatesIndexes);
          }
        } else {
          const objectKeyList = Object.keys(object);
          for (let i = 0, length = objectKeyList.length; i < length; i += 1) {
            inspectNode(object[objectKeyList[i]], objects, duplicatesIndexes);
          }
        }
      }
    }
  }
  function dump2(input, options) {
    options = options || {};
    const state = new State(options);
    if (!state.noRefs) getDuplicateReferences(input, state);
    let value = input;
    if (state.replacer) {
      value = state.replacer.call({ "": value }, "", value);
    }
    if (writeNode(state, 0, value, true, true)) return state.dump + "\n";
    return "";
  }
  dumper.dump = dump2;
  return dumper;
}
var hasRequiredJsYaml;
function requireJsYaml() {
  if (hasRequiredJsYaml) return jsYaml;
  hasRequiredJsYaml = 1;
  const loader2 = requireLoader();
  const dumper2 = requireDumper();
  function renamed(from, to) {
    return function() {
      throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
    };
  }
  jsYaml.Type = requireType();
  jsYaml.Schema = requireSchema();
  jsYaml.FAILSAFE_SCHEMA = requireFailsafe();
  jsYaml.JSON_SCHEMA = requireJson();
  jsYaml.CORE_SCHEMA = requireCore();
  jsYaml.DEFAULT_SCHEMA = require_default();
  jsYaml.load = loader2.load;
  jsYaml.loadAll = loader2.loadAll;
  jsYaml.dump = dumper2.dump;
  jsYaml.YAMLException = requireException();
  jsYaml.types = {
    binary: requireBinary(),
    float: requireFloat(),
    map: requireMap(),
    null: require_null(),
    pairs: requirePairs(),
    set: requireSet(),
    timestamp: requireTimestamp(),
    bool: requireBool(),
    int: requireInt(),
    merge: requireMerge(),
    omap: requireOmap(),
    seq: requireSeq(),
    str: requireStr()
  };
  jsYaml.safeLoad = renamed("safeLoad", "load");
  jsYaml.safeLoadAll = renamed("safeLoadAll", "loadAll");
  jsYaml.safeDump = renamed("safeDump", "dump");
  return jsYaml;
}
var jsYamlExports = requireJsYaml();
var yaml = /* @__PURE__ */ getDefaultExportFromCjs(jsYamlExports);
var {
  Type,
  Schema,
  FAILSAFE_SCHEMA,
  JSON_SCHEMA,
  CORE_SCHEMA,
  DEFAULT_SCHEMA,
  load,
  loadAll,
  dump,
  YAMLException,
  types,
  safeLoad,
  safeLoadAll,
  safeDump
} = yaml;

// node_modules/smol-toml/dist/error.js
function getLineColFromPtr(string, ptr) {
  let lines = string.slice(0, ptr).split(/\r?\n/);
  return [lines.length, lines.pop().length + 1];
}
function makeCodeBlock(string, line, column) {
  let lines = string.split(/\r?\n/);
  let codeblock = "";
  let numberLen = (Math.log10(line + 1) | 0) + 1;
  for (let i = line - 1; i <= line + 1; i++) {
    let l = lines[i - 1];
    if (!l)
      continue;
    codeblock += i.toString().padEnd(numberLen, " ");
    codeblock += ":  ";
    codeblock += l;
    codeblock += "\n";
    if (i === line) {
      codeblock += " ".repeat(numberLen + column + 2);
      codeblock += "^\n";
    }
  }
  return codeblock;
}
var TomlError = class _TomlError extends Error {
  line;
  column;
  codeblock;
  constructor(message, options) {
    const [line, column] = getLineColFromPtr(options.toml, options.ptr);
    const codeblock = makeCodeBlock(options.toml, line, column);
    super(`Invalid TOML document: ${message}

${codeblock}`, options);
    this.line = line;
    this.column = column;
    this.codeblock = codeblock;
  }
  /** @internal */
  static x(message, ctx, ptr) {
    throw new _TomlError(message, { toml: ctx.s, ptr: ptr ?? ctx.p });
  }
};

// node_modules/smol-toml/dist/primitive.js
function parseString(ctx) {
  let startPtr = ctx.p;
  let c = ctx.s.charCodeAt(ctx.p++);
  let first = c;
  let isLiteral = c === 39;
  let isMultiline = c === ctx.s.charCodeAt(ctx.p) && c === ctx.s.charCodeAt(ctx.p + 1);
  if (isMultiline) {
    if ((c = ctx.s.charCodeAt(ctx.p += 2)) === 10)
      ctx.p++;
    else if (c === 13 && ctx.s.charCodeAt(ctx.p + 1) === 10)
      ctx.p += 2;
  }
  let parsed = "";
  let sliceStart = ctx.p;
  let state = 0;
  for (; ctx.p < ctx.s.length; ctx.p++) {
    c = ctx.s.charCodeAt(ctx.p);
    if (isMultiline && (c === 10 || c === 13 && ctx.s.charCodeAt(ctx.p + 1) === 10)) {
      state = state && 3;
    } else if (c < 32 && c !== 9 || c === 127) {
      TomlError.x("control characters are not allowed in strings", ctx);
    } else if ((!state || state === 3) && c === first && (!isMultiline || ctx.s.charCodeAt(ctx.p + 1) === first && ctx.s.charCodeAt(ctx.p + 2) === first)) {
      if (isMultiline) {
        if (ctx.s.charCodeAt(ctx.p + 3) === first)
          ctx.p++;
        if (ctx.s.charCodeAt(ctx.p + 3) === first)
          ctx.p++;
      }
      if (!state) {
        let s = ctx.s.slice(sliceStart, ctx.p);
        parsed = parsed ? parsed + s : s;
      }
      ctx.p += isMultiline ? 3 : 1;
      return parsed;
    } else if (!state) {
      if (!isLiteral && c === 92) {
        parsed += ctx.s.slice(sliceStart, sliceStart = ctx.p);
        state = 1;
      }
    } else if (state === 1) {
      if (c === 120 || c === 117 || c === 85) {
        let errPtr = ctx.p++ - 1;
        let value = 0;
        let len = c === 120 ? 2 : c === 117 ? 4 : 8;
        for (let j = 0; j < len; j++, ctx.p++) {
          let hex = ctx.s.charCodeAt(ctx.p);
          let digit = (
            /* 0-9 */
            hex >= 48 && hex <= 57 ? hex - 48 : (
              /* A-F */
              hex >= 65 && hex <= 70 ? hex - 65 + 10 : (
                /* a-f */
                hex >= 97 && hex <= 102 ? hex - 97 + 10 : -1
              )
            )
          );
          if (digit < 0)
            TomlError.x("invalid non-hex character in unicode escape", ctx);
          value = value << 4 | digit;
        }
        if (value < 0 || value > 1114111 || value >= 55296 && value <= 57343) {
          TomlError.x("invalid unicode escape", ctx, errPtr);
        }
        parsed += String.fromCodePoint(value);
        sliceStart = ctx.p--;
        state = 0;
      } else if (isMultiline && (c === 32 || c === 9)) {
        state = 2;
      } else {
        if (c === 98)
          parsed += "\b";
        else if (c === 116)
          parsed += "	";
        else if (c === 110)
          parsed += "\n";
        else if (c === 102)
          parsed += "\f";
        else if (c === 114)
          parsed += "\r";
        else if (c === 101)
          parsed += "\x1B";
        else if (c === 34)
          parsed += '"';
        else if (c === 92)
          parsed += "\\";
        else
          TomlError.x("unrecognised escape sequence", ctx);
        sliceStart = ctx.p + 1;
        state = 0;
      }
    } else if (c !== 32 && c !== 9) {
      if (state === 2)
        TomlError.x("invalid escape: only line-ending whitespace may be escaped", ctx, sliceStart);
      state = !isLiteral && c === 92 ? 1 : 0;
      sliceStart = ctx.p;
    }
  }
  TomlError.x("unfinished string", ctx, startPtr);
}

// node_modules/smol-toml/dist/date.js
var DATE_TIME_RE = /^(\d{4}-\d{2}-\d{2})?[Tt ]?(?:(\d{2}):\d{2}(?::\d{2}(?:\.\d+)?)?)?(Z|z|[-+]\d{2}:\d{2})?$/i;
var TomlDate = class _TomlDate extends Date {
  #hasDate = false;
  #hasTime = false;
  #offset = null;
  constructor(date, fasttype, unsafeDelim) {
    let hasDate = true;
    let hasTime = true;
    let offset = "Z";
    let c;
    if (typeof date === "string") {
      if (fasttype)
        prep: {
          if (fasttype < 3) {
            if (+date.slice(11, 13) > 23) {
              date = "";
              break prep;
            }
            if (fasttype === 2) {
              offset = null;
              date += "Z";
            } else if ((c = date.charCodeAt(date.length - 1)) !== 90 && c !== 122) {
              offset = date.slice(date.length - 6);
            }
            if (unsafeDelim)
              date = date.slice(0, 10) + "T" + date.slice(11);
          } else if (fasttype === 4) {
            date = +date.slice(0, 2) > 23 ? "" : `0000-01-01T${date}Z`;
          }
          hasDate = fasttype !== 4;
          hasTime = fasttype !== 3;
        }
      else {
        let match = date.match(DATE_TIME_RE);
        if (match) {
          if (!match[1]) {
            hasDate = false;
            date = `0000-01-01T${date}`;
          }
          hasTime = !!match[2];
          hasTime && date[10] === " " && (date = date.replace(" ", "T"));
          if (match[2] && +match[2] > 23) {
            date = "";
          } else {
            offset = match[3] || null;
            if (!offset && hasTime)
              date += "Z";
          }
        } else {
          date = "";
        }
      }
    }
    super(date);
    if (!isNaN(this.getTime())) {
      this.#hasDate = hasDate;
      this.#hasTime = hasTime;
      this.#offset = offset;
    }
  }
  isDateTime() {
    return this.#hasDate && this.#hasTime;
  }
  isLocal() {
    return !this.#hasDate || !this.#hasTime || !this.#offset;
  }
  isDate() {
    return this.#hasDate && !this.#hasTime;
  }
  isTime() {
    return this.#hasTime && !this.#hasDate;
  }
  isValid() {
    return this.#hasDate || this.#hasTime;
  }
  toISOString() {
    let iso = super.toISOString();
    if (this.isDate())
      return iso.slice(0, 10);
    if (this.isTime())
      return iso.slice(11, 23);
    if (this.#offset === null)
      return iso.slice(0, -1);
    if (this.#offset === "Z" || this.#offset === "z")
      return iso;
    let offset = +this.#offset.slice(1, 3) * 60 + +this.#offset.slice(4, 6);
    offset = this.#offset[0] === "-" ? offset : -offset;
    let offsetDate = new Date(this.getTime() - offset * 6e4);
    return offsetDate.toISOString().slice(0, -1) + this.#offset;
  }
  static wrapAsOffsetDateTime(jsDate, offset = "Z") {
    let date = new _TomlDate(jsDate);
    date.#offset = offset;
    return date;
  }
  static wrapAsLocalDateTime(jsDate) {
    let date = new _TomlDate(jsDate);
    date.#offset = null;
    return date;
  }
  static wrapAsLocalDate(jsDate) {
    let date = new _TomlDate(jsDate);
    date.#hasTime = false;
    date.#offset = null;
    return date;
  }
  static wrapAsLocalTime(jsDate) {
    let date = new _TomlDate(jsDate);
    date.#hasDate = false;
    date.#offset = null;
    return date;
  }
};

// node_modules/smol-toml/dist/extract.js
function isDigit(char, base = 10) {
  return base === 16 ? char > 47 && char < 58 || char > 64 && char < 71 || char > 96 && char < 103 : char > 47 && char < 48 + base;
}
function isEndOfValue(char, delim) {
  return char === 32 || char === 9 || char === 10 || char === 13 || // Structure end or next value delimiter
  delim && (char === delim || char === 44) || // Comment
  char === 35;
}
function extractValue(ctx, end) {
  let errPtr = ctx.p;
  let c = ctx.s.charCodeAt(ctx.p);
  if (c === 91 || c === 123) {
    ctx.d-- || TomlError.x("document contains excessively nested structures. aborting.", ctx);
    let value = c === 91 ? parseArray(ctx) : parseInlineTable(ctx);
    ctx.d++;
    return value;
  }
  if (c === 34 || c === 39) {
    return parseString(ctx);
  }
  if (c === 116) {
    if (ctx.s.charCodeAt(++ctx.p) !== 114 || ctx.s.charCodeAt(++ctx.p) !== 117 || ctx.s.charCodeAt(++ctx.p) !== 101)
      TomlError.x("invalid value", ctx, errPtr);
    return ctx.p++, true;
  }
  if (c === 102) {
    if (ctx.s.charCodeAt(++ctx.p) !== 97 || ctx.s.charCodeAt(++ctx.p) !== 108 || ctx.s.charCodeAt(++ctx.p) !== 115 || ctx.s.charCodeAt(++ctx.p) !== 101)
      TomlError.x("invalid value", ctx, errPtr);
    return ctx.p++, false;
  }
  if (c === 43 || c === 45) {
    return parseNumber(ctx, ctx.p, ctx.s.charCodeAt(++ctx.p), 44 - c, end);
  }
  if (ctx.s.charCodeAt(ctx.p + 4) === 45 && ctx.s.charCodeAt(ctx.p + 7) === 45) {
    return parseDate(ctx, c, end);
  }
  if (ctx.s.charCodeAt(ctx.p + 2) === 58) {
    return parseTime(ctx, c, end);
  }
  return parseNumber(ctx, ctx.p, c, 0, end);
}
function parseNumber(ctx, startPtr, startChr, sign, endChr) {
  let c = startChr;
  let state = 0;
  let hasUnderscores = false;
  if (c === 105) {
    if (ctx.s.charCodeAt(++ctx.p) !== 110 || ctx.s.charCodeAt(++ctx.p) !== 102)
      TomlError.x("invalid value", ctx, startPtr);
    return ctx.p++, (sign || 1) / 0;
  }
  if (c === 110) {
    if (ctx.s.charCodeAt(++ctx.p) !== 97 || ctx.s.charCodeAt(++ctx.p) !== 110)
      TomlError.x("invalid value", ctx, startPtr);
    return ctx.p++, NaN;
  }
  if (c === 48) {
    if (++ctx.p >= ctx.s.length || isEndOfValue(c = ctx.s.charCodeAt(ctx.p), endChr))
      return ctx.bi === true ? 0n : 0;
    if (!sign) {
      if (c === 120)
        return parseIntegerBaseN(ctx, startPtr, 16, endChr);
      else if (c === 98)
        return parseIntegerBaseN(ctx, startPtr, 2, endChr);
      else if (c === 111)
        return parseIntegerBaseN(ctx, startPtr, 8, endChr);
    }
    if (c === 46)
      state = 2;
    else if (c === 101 || c === 69)
      state = 4;
    else
      TomlError.x("illegal leading zero", ctx, startPtr);
  } else if (!isDigit(c))
    TomlError.x("invalid value", ctx, startPtr);
  while (++ctx.p < ctx.s.length && (c = ctx.s.charCodeAt(ctx.p), !isEndOfValue(c, endChr))) {
    if (!state)
      state = 1;
    if (c === 95) {
      if (!(state & 1))
        TomlError.x("illegal underscore", ctx);
      state += 11;
      hasUnderscores = true;
    } else if (state === 1 && c === 46)
      state = 2;
    else if ((state === 1 || state === 3) && (c === 101 || c === 69))
      state = 4;
    else if (state === 4 && (c === 43 || c === 45)) {
    } else if (!isDigit(c))
      TomlError.x(`illegal character in numeric literal`, ctx);
    else if (state > 9)
      state -= 11;
    else if (!(state & 1))
      state++;
  }
  if (!state) {
    let val = (startChr - 48) * (sign || 1);
    return ctx.bi === true ? BigInt(val) : val;
  }
  if (!(state & 1))
    TomlError.x("unfinished numeric value", ctx, startPtr);
  let str2 = ctx.s.slice(startPtr, ctx.p);
  if (hasUnderscores)
    str2 = str2.replaceAll("_", "");
  return state > 1 ? parseFloat(str2) : parseInteger(ctx, str2, 10, startPtr);
}
function parseIntegerBaseN(ctx, startPtr, base, endChr) {
  let c, underscore = 1;
  while (++ctx.p < ctx.s.length && (c = ctx.s.charCodeAt(ctx.p), !isEndOfValue(c, endChr))) {
    if (c === 95) {
      if (underscore & 1)
        TomlError.x("illegal underscore", ctx);
      underscore = 3;
    } else if (!isDigit(c, base))
      TomlError.x(`illegal character in numeric literal`, ctx);
    else if (underscore & 1)
      underscore--;
  }
  if (underscore & 1)
    TomlError.x("unfinished numeric value", ctx);
  let str2 = ctx.s.slice(startPtr + 2, ctx.p);
  if (underscore)
    str2 = str2.replaceAll("_", "");
  return parseInteger(ctx, str2, base, startPtr);
}
function parseInteger(ctx, str2, base, startPtr) {
  if (ctx.bi !== true)
    int: {
      let val = parseInt(str2, base);
      if (!Number.isSafeInteger(val)) {
        if (ctx.bi)
          break int;
        TomlError.x("integer value cannot be represented losslessly", ctx, startPtr);
      }
      return val;
    }
  return base === 10 ? BigInt(str2) : BigInt((base === 2 ? "0b" : base === 8 ? "0o" : "0x") + str2);
}
function parseDate(ctx, c, endChr) {
  let startPtr = ctx.p++, unsafeSeparator;
  if (!isDigit(c) || !isDigit(ctx.s.charCodeAt(ctx.p++)) || !isDigit(ctx.s.charCodeAt(ctx.p++)) || !isDigit(ctx.s.charCodeAt(ctx.p++))) {
    return parseNumber(ctx, ctx.p = startPtr, c, 0, endChr);
  }
  ctx.p += 5;
  if (!isDigit(ctx.s.charCodeAt(ctx.p++)))
    TomlError.x("invalid date-time: date part is malformed", ctx, startPtr);
  if (ctx.p >= ctx.s.length || ((c = ctx.s.charCodeAt(ctx.p)) !== 32 || (unsafeSeparator = true, !isDigit(ctx.s.charCodeAt(ctx.p + 1)))) && c !== 84 && c !== 116) {
    let t2 = ctx.s.slice(startPtr, ctx.p);
    return readDate(ctx, t2, 3, false, startPtr);
  }
  if (ctx.s.charCodeAt(ctx.p += 3) !== 58)
    TomlError.x("invalid date-time: time part is malformed", ctx, startPtr);
  if (ctx.s.charCodeAt(ctx.p += 3) === 58)
    ctx.p += 3;
  if (ctx.s.charCodeAt(ctx.p) === 46)
    while (isDigit(ctx.s.charCodeAt(++ctx.p)))
      ;
  if (c = ctx.s.charCodeAt(ctx.p)) {
    if (c === 90 || c === 122) {
      let t2 = ctx.s.slice(startPtr, ++ctx.p);
      return readDate(ctx, t2, 1, unsafeSeparator, startPtr, "[+00:00]");
    }
    if (c === 43 || c === 45) {
      let t2 = ctx.s.slice(startPtr, ctx.p += 6);
      return readDate(ctx, t2, 1, unsafeSeparator, startPtr, !ctx.ld && "[" + ctx.s.slice(ctx.p - 6, ctx.p) + "]");
    }
  }
  let t = ctx.s.slice(startPtr, ctx.p);
  return readDate(ctx, t, 2, unsafeSeparator, startPtr);
}
function parseTime(ctx, c, endChr) {
  let start = ctx.p;
  if (!isDigit(c) || !isDigit(ctx.s.charCodeAt(++ctx.p))) {
    return parseNumber(ctx, --ctx.p, c, 0, endChr);
  }
  if (ctx.s.charCodeAt(ctx.p += 4) === 58)
    ctx.p += 3;
  if (ctx.s.charCodeAt(ctx.p) === 46)
    while (isDigit(ctx.s.charCodeAt(++ctx.p)))
      ;
  let t = ctx.s.slice(start, ctx.p);
  return readDate(ctx, t, 4, false, start);
}
function readDate(ctx, str2, type2, unsafeDelim, errPtr, temporalSuffix) {
  if (ctx.ld) {
    let date = new TomlDate(str2, type2, unsafeDelim);
    if (!date.isValid())
      TomlError.x("invalid date", ctx, errPtr);
    return date;
  }
  try {
    if (temporalSuffix)
      str2 += temporalSuffix;
    switch (type2) {
      case 1:
        return Temporal.ZonedDateTime.from(str2);
      case 2:
        return Temporal.PlainDateTime.from(str2);
      case 3:
        return Temporal.PlainDate.from(str2);
      case 4:
        return Temporal.PlainTime.from(str2);
    }
  } catch (e) {
    TomlError.x(e instanceof Error ? e.message : "" + e, ctx, errPtr);
  }
}

// node_modules/smol-toml/dist/util.js
function skipComment(ctx) {
  for (; ctx.p < ctx.s.length; ctx.p++) {
    let c = ctx.s.charCodeAt(ctx.p);
    if (c === 10)
      break;
    if (c === 13 && ctx.s.charCodeAt(ctx.p + 1) === 10) {
      ctx.p++;
      break;
    }
    if (c < 32 && c !== 9 || c === 127) {
      TomlError.x("control characters are not allowed in comments", ctx);
    }
  }
}
function skipVoid(ctx, banNewLines, banComments) {
  let c;
  while (ctx.p < ctx.s.length) {
    while (ctx.p < ctx.s.length && ((c = ctx.s.charCodeAt(ctx.p)) === 32 || c === 9 || !banNewLines && (c === 10 || c === 13 && ctx.s.charCodeAt(ctx.p + 1) === 10)))
      ctx.p++;
    if (banComments || c !== 35)
      break;
    skipComment(ctx);
  }
}

// node_modules/smol-toml/dist/struct.js
function parseKey(ctx, end = 61) {
  let startPtr;
  let state = 0;
  let parsed = [];
  let sliceStart;
  let c = ctx.s.charCodeAt(startPtr = ctx.p);
  do {
    if (c === end) {
      if (!state)
        TomlError.x("unexpected end of key", ctx);
      if (state === 1)
        parsed.push(ctx.s.slice(sliceStart, ctx.p));
      return ctx.p++, parsed;
    } else if (c === 46) {
      if (!state)
        TomlError.x("illegal empty bare key", ctx);
      if (state === 1)
        parsed.push(ctx.s.slice(sliceStart, ctx.p));
      state = 0;
    } else if (!state && (c === 34 || c === 39)) {
      if (c === ctx.s.charCodeAt(ctx.p + 1) && c === ctx.s.charCodeAt(ctx.p + 2))
        TomlError.x("illegal quoted key: multiline strings are not allowed", ctx);
      parsed.push(parseString(ctx));
      state = 2;
      ctx.p--;
    } else if (c === 32 || c === 9) {
      if (state === 1) {
        parsed.push(ctx.s.slice(sliceStart, ctx.p));
        state = 2;
      }
    } else if (state === 2 || c < 48 && c !== 45 || c > 57 && c < 65 || c > 90 && c < 97 && c !== 95 || c > 122) {
      TomlError.x("illegal character in key", ctx);
    } else if (!state) {
      state = 1;
      sliceStart = ctx.p;
    }
  } while (c = ctx.s.charCodeAt(++ctx.p));
  TomlError.x("incomplete key-value: cannot find end of key", ctx, startPtr);
}
function parseInlineTable(ctx) {
  let startPtr = ctx.p++;
  let res = /* @__PURE__ */ Object.create(null);
  let seen = /* @__PURE__ */ new Set();
  let c;
  while (ctx.p < ctx.s.length) {
    skipVoid(ctx);
    if ((c = ctx.s.charCodeAt(ctx.p)) === 125) {
      ctx.p++;
      return res;
    }
    let k;
    let t = res;
    let hasOwn = false;
    let errPtr = ctx.p;
    let key = parseKey(ctx);
    for (let i = 0; i < key.length; i++) {
      if (i)
        t = hasOwn ? t[k] : t[k] = /* @__PURE__ */ Object.create(null);
      k = key[i];
      if ((hasOwn = Object.hasOwn(t, k)) && (typeof t[k] !== "object" || seen.has(t[k]))) {
        TomlError.x("trying to redefine an already defined value", ctx, errPtr);
      }
      let unsafe = k === "__proto__";
      if (ctx.uk && (unsafe || k === "constructor")) {
        t = ctx.uk !== 1 && TomlError.x("document contains an unsafe property", ctx, errPtr);
        break;
      }
      if (!hasOwn && unsafe) {
        Object.defineProperty(t, k, { enumerable: true, configurable: true, writable: true });
      }
    }
    if (hasOwn) {
      TomlError.x("trying to redefine an already defined value", ctx, errPtr);
    }
    skipVoid(ctx, true, true);
    let value = extractValue(
      ctx,
      125
      /* } */
    );
    if (t && typeof (t[k] = value) === "object")
      seen.add(value);
    skipVoid(ctx);
    if ((c = ctx.s.charCodeAt(ctx.p++)) === 125) {
      return res;
    }
    if (c !== 44)
      TomlError.x("expected comma or end of structure", ctx, ctx.p - 1);
  }
  TomlError.x("unfinished table", ctx, startPtr);
}
function parseArray(ctx) {
  let startPtr = ctx.p++;
  let res = [];
  let c;
  while (ctx.p < ctx.s.length) {
    skipVoid(ctx);
    if ((c = ctx.s.charCodeAt(ctx.p)) === 93) {
      ctx.p++;
      return res;
    }
    res.push(extractValue(
      ctx,
      93
      /* ] */
    ));
    skipVoid(ctx);
    if ((c = ctx.s.charCodeAt(ctx.p++)) === 93) {
      return res;
    }
    if (c !== 44)
      TomlError.x("expected comma or end of structure", ctx, ctx.p - 1);
  }
  TomlError.x("unfinished array", ctx, startPtr);
}

// node_modules/smol-toml/dist/parse.js
function peekTable(ctx, key, table, meta, type2) {
  let t = table;
  let m = meta;
  let k;
  let hasOwn = false;
  let state;
  for (let i = 0; i < key.length; i++) {
    if (i) {
      t = hasOwn ? t[k] : t[k] = /* @__PURE__ */ Object.create(null);
      m = (state = m[k]).c;
      if (type2 === 0 && (state.t === 1 || state.t === 2)) {
        return null;
      }
      if (state.t === 2) {
        let l = t.length - 1;
        t = t[l];
        m = m[l].c;
      }
    }
    k = key[i];
    if ((hasOwn = Object.hasOwn(t, k)) && m[k]?.t === 0 && m[k]?.d) {
      return null;
    }
    if (!hasOwn) {
      let unsafe = k === "__proto__";
      if (ctx.uk && (unsafe || k === "constructor"))
        return false;
      if (unsafe) {
        Object.defineProperty(t, k, { enumerable: true, configurable: true, writable: true });
        Object.defineProperty(m, k, { enumerable: true, configurable: true, writable: true });
      }
      m[k] = {
        t: i < key.length - 1 && type2 === 2 ? 3 : type2,
        d: false,
        i: 0,
        c: /* @__PURE__ */ Object.create(null)
      };
    }
  }
  state = m[k];
  if (state.t !== type2 && !(type2 === 1 && state.t === 3)) {
    return null;
  }
  if (type2 === 2) {
    if (!state.d) {
      state.d = true;
      t[k] = [];
    }
    t[k].push(t = /* @__PURE__ */ Object.create(null));
    state.c[state.i++] = state = { t: 1, d: false, i: 0, c: /* @__PURE__ */ Object.create(null) };
  }
  if (state.d) {
    return null;
  }
  state.d = true;
  if (type2 === 1) {
    t = hasOwn ? t[k] : t[k] = /* @__PURE__ */ Object.create(null);
  } else if (type2 === 0 && hasOwn) {
    return null;
  }
  return [k, t, state.c];
}
function validateTablePeek(ctx, peek, ptr) {
  if (peek === null || ctx.uk === 2)
    TomlError.x(peek === null ? "trying to redefine an already defined table or value" : "document contains an unsafe property", ctx, ptr);
}
function parse(toml, options = {}) {
  let ctx = {
    s: toml,
    p: 0,
    d: options.maxDepth ?? 1e3,
    bi: options.integersAsBigInt ?? false,
    ld: options.useLegacyDate ?? true,
    uk: options.unsafeKeyBehaviour === "throw" ? 2 : options.unsafeKeyBehaviour === "drop" ? 1 : 0
  };
  let res = /* @__PURE__ */ Object.create(null);
  let meta = /* @__PURE__ */ Object.create(null);
  let tmp;
  let skipping = false;
  let tbl = res;
  let m = meta;
  if (toml.charCodeAt(0) === 65279)
    ctx.p++;
  skipVoid(ctx);
  while (ctx.p < toml.length) {
    if (toml.charCodeAt(ctx.p) === 91) {
      let isTableArray = toml.charCodeAt(++ctx.p) === 91;
      tmp = ctx.p += +isTableArray;
      skipping = false;
      let k = parseKey(
        ctx,
        93
        /* ] */
      );
      if (isTableArray) {
        if (toml.charCodeAt(ctx.p) !== 93) {
          TomlError.x("expected end of table array declaration", ctx);
        }
        ctx.p++;
      }
      let p = peekTable(
        ctx,
        k,
        res,
        meta,
        isTableArray ? 2 : 1
        /* Type.EXPLICIT */
      );
      if (!p) {
        validateTablePeek(ctx, p, tmp);
        skipping = true;
      } else {
        m = p[2];
        tbl = p[1];
      }
    } else {
      tmp = ctx.p;
      let k = parseKey(ctx);
      let p = peekTable(
        ctx,
        k,
        tbl,
        m,
        0
        /* Type.DOTTED */
      );
      if (!p && !skipping)
        validateTablePeek(ctx, p, tmp);
      skipVoid(ctx, true, true);
      let v = extractValue(ctx, void 0);
      if (p && !skipping)
        p[1][p[0]] = v;
    }
    skipVoid(ctx, true);
    if (ctx.p < toml.length && (tmp = toml.charCodeAt(ctx.p)) !== 10 && (tmp !== 13 || toml.charCodeAt(ctx.p + 1) !== 10)) {
      TomlError.x("each key-value declaration must be followed by an end-of-line", ctx);
    }
    skipVoid(ctx);
  }
  return res;
}

// node_modules/smol-toml/dist/stringify.js
var BARE_KEY = /^[a-z0-9-_]+$/i;
var HAS_WELLFORMED = !!"".isWellFormed;
function extendedTypeOf(obj) {
  let type2 = typeof obj;
  if (type2 === "object") {
    if (Array.isArray(obj))
      return "array";
    if (typeof obj.getUTCDate === "function" && obj instanceof Date)
      return "date";
    if (globalThis.Temporal) {
      if (obj.until) {
        if (obj instanceof Temporal.ZonedDateTime)
          return "temporal/tz+uc";
        if (obj instanceof Temporal.PlainDateTime || obj instanceof Temporal.PlainDate)
          return "temporal/uc";
        if (obj instanceof Temporal.PlainTime || obj instanceof Temporal.Instant)
          return "temporal";
        if (obj instanceof Temporal.PlainYearMonth)
          return "temporal/x";
      } else if (obj.toPlainDate && obj instanceof Temporal.PlainMonthDay || obj.negated && obj instanceof Temporal.Duration) {
        return "temporal/x";
      }
    }
  }
  return type2;
}
function isArrayOfTables(obj) {
  for (let i = 0; i < obj.length; i++) {
    if (extendedTypeOf(obj[i]) !== "object")
      return false;
  }
  return obj.length != 0;
}
function formatWellFormedStringUnchecked(s) {
  return JSON.stringify(s).replaceAll("\x7F", "\\u007f");
}
function formatString(s) {
  return formatWellFormedStringUnchecked(HAS_WELLFORMED ? s.toWellFormed() : s);
}
function formatKey(s) {
  if (BARE_KEY.test(s))
    return s;
  if (HAS_WELLFORMED && !s.isWellFormed())
    throw new RangeError("key contains illegal lone surrogates");
  return formatWellFormedStringUnchecked(s);
}
function stringifyValue(val, type2, depth, numberAsFloat, strictTemporal) {
  if (depth === 0) {
    throw new Error("Could not stringify the object: maximum object depth exceeded");
  }
  switch (type2) {
    // @ts-expect-error -- intentional fallthrough case
    case "number":
      if (isNaN(val))
        return "nan";
      if (val === Infinity)
        return "inf";
      if (val === -Infinity)
        return "-inf";
      if (Number.isInteger(val) && (numberAsFloat || !Number.isSafeInteger(val)))
        return val.toFixed(1);
    case "bigint":
    case "boolean":
    case "temporal":
      return val.toString();
    case "string":
      return formatString(val);
    case "date":
      if (isNaN(val.getTime()))
        throw new TypeError("cannot serialize invalid date");
      return val.toISOString();
    case "object":
      return stringifyInlineTable(val, depth, numberAsFloat, strictTemporal);
    case "array":
      return stringifyArray(val, depth, numberAsFloat, strictTemporal);
    // @ts-expect-error -- intentional fallthrough case
    case "temporal/tz+uc":
      if (strictTemporal) {
        let tz = val.timeZoneId;
        let tzc = tz.charCodeAt(0);
        if (
          // ОСЬ БЛ"ДЬ ЦІКАВО...ТИ РЕАЛЬНО ОСЬ ЦЮ ХУЙНЮ ЧИТАЄШ, ЧИ МОЖЕ ДОСІ МЕНІ КОМЕНТИ НА АНГЛ ХУ"РИТИ ?
          tzc !== 43 && tzc !== 45 && // Fast pre-check pass; see below for the actually accepted values
          (tzc !== 85 && tzc !== 71 && tzc !== 90 && tzc !== 69 || // UTC and its aliases; Temporal implementations don't all canonicalise unfortunately
          tz !== "UTC" && tz !== "UCT" && tz !== "Universal" && tz !== "Zulu" && // GMT is a TZ but it's for all intents and purposes equivalent to UTC. Safe to downgrade.
          !tz.startsWith("GMT") && tz !== "Greenwich" && // Etc/* are all safe to downgrade to offset (either UTC, GMT, or offset)
          !tz.startsWith("Etc/"))
        ) {
          throw new TypeError("Temporal objects with an IANA timezone are not allowed in Temporal strict mode");
        }
      }
    case "temporal/uc":
      if (strictTemporal && val.calendarId !== "iso8601")
        throw new TypeError("Temporal objects with a non-default calendar are not allowed in Temporal strict mode");
      return val.toString({
        calendarName: "never",
        timeZoneName: "never"
      });
    case "temporal/x":
      throw new TypeError("Unsupported " + val[Symbol.toStringTag]);
  }
}
function stringifyInlineTable(obj, depth, numberAsFloat, strictTemporal) {
  let keys = Object.keys(obj);
  if (keys.length === 0)
    return "{}";
  let res = "{ ";
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i];
    if (i)
      res += ", ";
    res += formatKey(k) + " = " + stringifyValue(obj[k], extendedTypeOf(obj[k]), depth - 1, numberAsFloat, strictTemporal);
  }
  return res + " }";
}
function stringifyArray(array, depth, numberAsFloat, strictTemporal) {
  if (array.length === 0)
    return "[]";
  let res = "[ ";
  for (let i = 0; i < array.length; i++) {
    if (i)
      res += ", ";
    if (array[i] === null || array[i] === void 0) {
      throw new TypeError("arrays cannot contain null or undefined values");
    }
    res += stringifyValue(array[i], extendedTypeOf(array[i]), depth - 1, numberAsFloat, strictTemporal);
  }
  return res + " ]";
}
function stringifyArrayTable(array, key, depth, numberAsFloat, strictTemporal) {
  if (depth === 0) {
    throw new Error("Could not stringify the object: maximum object depth exceeded");
  }
  let res = "";
  for (let i = 0; i < array.length; i++) {
    res += `${res && "\n"}[[${key}]]
`;
    res += stringifyTable(0, array[i], key, depth, numberAsFloat, strictTemporal);
  }
  return res;
}
function stringifyTable(tableKey, obj, prefix, depth, numberAsFloat, strictTemporal) {
  if (depth === 0) {
    throw new Error("Could not stringify the object: maximum object depth exceeded");
  }
  let preamble = "";
  let tables = "";
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i];
    if (obj[k] !== null && obj[k] !== void 0) {
      let type2 = extendedTypeOf(obj[k]);
      if (type2 === "symbol" || type2 === "function") {
        throw new TypeError(`cannot serialize values of type '${type2}'`);
      }
      let key = formatKey(k);
      if (type2 === "array" && isArrayOfTables(obj[k])) {
        tables += (tables && "\n") + stringifyArrayTable(obj[k], prefix ? `${prefix}.${key}` : key, depth - 1, numberAsFloat, strictTemporal);
      } else if (type2 === "object") {
        let tblKey = prefix ? `${prefix}.${key}` : key;
        tables += (tables && "\n") + stringifyTable(tblKey, obj[k], tblKey, depth - 1, numberAsFloat, strictTemporal);
      } else {
        preamble += key;
        preamble += " = ";
        preamble += stringifyValue(obj[k], type2, depth, numberAsFloat, strictTemporal);
        preamble += "\n";
      }
    }
  }
  if (tableKey && (preamble || !tables))
    preamble = preamble ? `[${tableKey}]
${preamble}` : `[${tableKey}]`;
  return preamble && tables ? `${preamble}
${tables}` : preamble || tables;
}
function stringify(obj, { maxDepth = 1e3, numbersAsFloat = false, strictTemporal = false } = {}) {
  if (extendedTypeOf(obj) !== "object") {
    throw new TypeError("stringify can only be called with an object");
  }
  let str2 = stringifyTable(0, obj, "", maxDepth, numbersAsFloat, strictTemporal);
  if (str2[str2.length - 1] !== "\n")
    return str2 + "\n";
  return str2;
}

// node_modules/smol-toml/dist/index.js
var dist_default = { parse, stringify, TomlDate, TomlError };

// src/utils/formatters.ts
function stripJsonComments(jsonStr) {
  return jsonStr.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m);
}
function parseProperties(content) {
  const result = {};
  const lines = content.split(/\r?\n/);
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith("#") || line.startsWith("!")) continue;
    const delimIdx = line.search(/[=:]/);
    if (delimIdx === -1) {
      result[line.trim()] = "";
    } else {
      const key = line.slice(0, delimIdx).trim();
      let val = line.slice(delimIdx + 1).trim();
      val = val.replace(
        /\\u([0-9a-fA-F]{4})/g,
        (_, hex) => String.fromCharCode(parseInt(hex, 16))
      );
      result[key] = val;
    }
  }
  return result;
}
function serializeProperties(parsed) {
  const lines = [];
  for (const [k, v] of Object.entries(parsed)) {
    lines.push(`${k}=${String(v).replace(/\r?\n/g, "\\n")}`);
  }
  return lines.join("\n") + "\n";
}
function extractPoString(raw) {
  const trimmed = raw.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, "\n");
    }
  }
  return trimmed;
}
function parsePo(content) {
  const result = {};
  const lines = content.split(/\r?\n/);
  let currentMsgId = null;
  let currentMsgStr = null;
  let state = "none";
  function flush() {
    if (currentMsgId !== null && currentMsgStr !== null && currentMsgId !== "") {
      result[currentMsgId] = currentMsgStr;
    }
    currentMsgId = null;
    currentMsgStr = null;
    state = "none";
  }
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith("#")) continue;
    if (line.startsWith("msgid ")) {
      flush();
      currentMsgId = extractPoString(line.slice(6));
      state = "msgid";
    } else if (line.startsWith("msgstr ")) {
      currentMsgStr = extractPoString(line.slice(7));
      state = "msgstr";
    } else if (line.startsWith('"') && line.endsWith('"')) {
      const str2 = extractPoString(line);
      if (state === "msgid" && currentMsgId !== null) {
        currentMsgId += str2;
      } else if (state === "msgstr" && currentMsgStr !== null) {
        currentMsgStr += str2;
      }
    } else if (!line) {
      flush();
    }
  }
  flush();
  return result;
}
function serializePo(existingContent, newTranslations) {
  let content = existingContent;
  const remaining = { ...newTranslations };
  for (const [key, value] of Object.entries(newTranslations)) {
    const escapedKey = key.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    const escapedVal = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
    const regex = new RegExp(`(msgid\\s+"${escapedKey.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}"\\s*\\r?\\n\\s*msgstr\\s+)"(?:[^"\\\\]|\\\\.)*"`, "g");
    if (regex.test(content)) {
      content = content.replace(regex, `$1"${escapedVal}"`);
      delete remaining[key];
    }
  }
  const appended = [];
  for (const [k, v] of Object.entries(remaining)) {
    const escapedKey = k.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    const escapedVal = v.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
    appended.push(`
msgid "${escapedKey}"
msgstr "${escapedVal}"`);
  }
  return content.trimEnd() + (appended.length ? "\n" + appended.join("\n") : "") + "\n";
}
function parseToml(content) {
  return dist_default.parse(content);
}
function serializeToml(obj) {
  return dist_default.stringify(obj);
}

// src/utils/locales.ts
var IGNORE_DIRS = /* @__PURE__ */ new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  "target",
  ".cache",
  ".next",
  ".nuxt",
  ".output",
  "vendor",
  "out",
  ".turbo",
  ".vscode",
  ".idea"
]);
var IGNORED_FILES = /* @__PURE__ */ new Set([
  "package.json",
  "package-lock.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "docker-compose.yaml",
  "docker-compose.yml",
  "tsconfig.json",
  "jsconfig.json",
  "settings.json",
  "tasks.json",
  "keymap.json",
  "cargo.toml",
  "Cargo.toml",
  "extension.toml",
  "pyproject.toml"
]);
var SUPPORTED_EXTS = /* @__PURE__ */ new Set([
  "json",
  "jsonc",
  "json5",
  "yaml",
  "yml",
  "toml",
  "properties",
  "po",
  "arb"
]);
var LOCALE_REGEX = /^([a-zA-Z0-9_-]+?[_.-])?([a-z]{2,3}(?:[-_][a-zA-Z0-9]{2,4})?|lolcat)\.(json|jsonc|json5|ya?ml|toml|properties|po|arb)$/i;
var KNOWN_LANGS = /* @__PURE__ */ new Set([
  "uk",
  "en",
  "pl",
  "de",
  "fr",
  "es",
  "it",
  "pt",
  "nl",
  "sv",
  "da",
  "fi",
  "cs",
  "sk",
  "ro",
  "hu",
  "bg",
  "el",
  "hr",
  "sr",
  "sl",
  "zh",
  "ja",
  "ko",
  "ar",
  "he",
  "hi",
  "tr",
  "ru",
  "be",
  "lolcat"
]);
function parseLocaleFilename(filename) {
  if (IGNORED_FILES.has(filename)) return null;
  const parts = filename.split(".");
  if (parts.length < 2) return null;
  const ext = parts.pop().toLowerCase();
  if (!SUPPORTED_EXTS.has(ext)) return null;
  const name = parts.join(".");
  const sepIdx = Math.max(name.lastIndexOf("_"), name.lastIndexOf("-"));
  if (sepIdx > 0) {
    const after = name.slice(sepIdx + 1);
    const before = name.slice(0, sepIdx);
    if (KNOWN_LANGS.has(after.toLowerCase()) || /^[a-z]{2,3}$/i.test(after)) {
      if (KNOWN_LANGS.has(name.toLowerCase()) || KNOWN_LANGS.has(name.toLowerCase().replace("_", "-")) || /^[a-z]{2,3}[-_][a-zA-Z0-9]{2,4}$/i.test(name)) {
        if (!["messages", "app", "strings", "intl", "i18n", "lang", "locale"].includes(before.toLowerCase())) {
          return { locale: name, ext };
        }
      }
      return { prefix: before, locale: after, ext };
    }
  }
  if (/^([a-z]{2,3}([-_][a-zA-Z0-9]{2,4})?|lolcat)$/i.test(name)) {
    return { locale: name, ext };
  }
  const match = filename.match(LOCALE_REGEX);
  if (match) {
    return {
      prefix: match[1] ? match[1].replace(/[_.-]$/, "") : void 0,
      locale: match[2],
      ext: match[3].toLowerCase()
    };
  }
  return null;
}
function parseFile(filePath) {
  const content = import_fs.default.readFileSync(filePath, "utf-8");
  const ext = import_path.default.extname(filePath).toLowerCase();
  if (ext === ".json" || ext === ".arb") {
    return JSON.parse(content);
  } else if (ext === ".jsonc" || ext === ".json5") {
    return JSON.parse(stripJsonComments(content));
  } else if (ext === ".yaml" || ext === ".yml") {
    return yaml.load(content) || {};
  } else if (ext === ".toml") {
    return parseToml(content);
  } else if (ext === ".properties") {
    return parseProperties(content);
  } else if (ext === ".po") {
    return parsePo(content);
  }
  return {};
}
function flattenKeys(obj, prefix = "") {
  const result = {};
  if (!obj || typeof obj !== "object") return result;
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("@")) continue;
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenKeys(value, fullKey));
    } else {
      result[fullKey] = String(value);
    }
  }
  return result;
}
function setDeep(obj, pathStr, value) {
  const parts = pathStr.split(".");
  let curr = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!curr[part] || typeof curr[part] !== "object") {
      curr[part] = {};
    }
    curr = curr[part];
  }
  curr[parts[parts.length - 1]] = value;
}
function writeTranslationsToFile(locFile, translatedMap) {
  const ext = import_path.default.extname(locFile).toLowerCase();
  if (ext === ".po") {
    let existing = "";
    if (import_fs.default.existsSync(locFile)) {
      try {
        existing = import_fs.default.readFileSync(locFile, "utf-8");
      } catch {
      }
    }
    const updated = serializePo(existing, translatedMap);
    import_fs.default.writeFileSync(locFile, updated, "utf-8");
    return;
  }
  let parsed = {};
  if (import_fs.default.existsSync(locFile)) {
    try {
      parsed = parseFile(locFile);
    } catch {
      parsed = {};
    }
  }
  const hasDotKeys = Object.keys(parsed).some((k) => k.includes("."));
  for (const [keyPath, value] of Object.entries(translatedMap)) {
    if (ext === ".properties") {
      parsed[keyPath] = value;
    } else if (hasDotKeys || !keyPath.includes(".")) {
      parsed[keyPath] = value;
    } else {
      setDeep(parsed, keyPath, value);
    }
  }
  if (ext === ".json" || ext === ".jsonc" || ext === ".json5" || ext === ".arb") {
    import_fs.default.writeFileSync(locFile, JSON.stringify(parsed, null, 2) + "\n", "utf-8");
  } else if (ext === ".yaml" || ext === ".yml") {
    import_fs.default.writeFileSync(locFile, yaml.dump(parsed, { indent: 2, lineWidth: -1 }), "utf-8");
  } else if (ext === ".toml") {
    import_fs.default.writeFileSync(locFile, serializeToml(parsed), "utf-8");
  } else if (ext === ".properties") {
    import_fs.default.writeFileSync(locFile, serializeProperties(parsed), "utf-8");
  }
}
function makeProgressBar(pct) {
  const num = Number(pct);
  const filled = Math.min(10, Math.max(0, Math.round(num / 10)));
  const empty = 10 - filled;
  const bar = "\u2588".repeat(filled) + "\u2591".repeat(empty);
  const color = num >= 95 ? "\x1B[32m" : num >= 70 ? "\x1B[33m" : "\x1B[31m";
  return `${color}${bar}\x1B[0m`;
}
function findAllLocalesDirs(rootDir, requestedDir2) {
  if (requestedDir2) {
    const direct = import_path.default.resolve(rootDir, requestedDir2);
    if (import_fs.default.existsSync(direct)) return [direct];
  }
  const results = [];
  function scan(dir, depth = 0) {
    if (depth > 5) return;
    let entries;
    try {
      entries = import_fs.default.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    const files = [];
    const subdirs = [];
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!IGNORE_DIRS.has(entry.name) && !entry.name.startsWith(".")) {
          subdirs.push(entry.name);
        }
      } else if (entry.isFile()) {
        if (!IGNORED_FILES.has(entry.name) && parseLocaleFilename(entry.name) !== null) {
          files.push(entry.name);
        }
      }
    }
    const dirName = import_path.default.basename(dir).toLowerCase();
    const isLocaleNamed = ["locales", "i18n", "lang", "locale", "messages", "translations"].includes(dirName);
    if (isLocaleNamed && files.length >= 1 || depth > 0 && files.length >= 2) {
      results.push(dir);
      return;
    }
    for (const sub of subdirs) {
      scan(import_path.default.join(dir, sub), depth + 1);
    }
  }
  scan(rootDir);
  return results;
}
function collectModulesData(localesDirs, cwd2, requestedBase2, fileSnapshots2) {
  const modules = [];
  for (const dir of localesDirs) {
    const relDir = import_path.default.relative(cwd2, dir) || dir;
    let allFiles = [];
    try {
      allFiles = import_fs.default.readdirSync(dir).filter((f) => parseLocaleFilename(f) !== null);
    } catch {
      continue;
    }
    if (allFiles.length === 0) continue;
    const extCounts = {};
    for (const f of allFiles) {
      const parsedInfo = parseLocaleFilename(f);
      if (parsedInfo) {
        const ext = `.${parsedInfo.ext}`;
        extCounts[ext] = (extCounts[ext] || 0) + 1;
      }
    }
    const preferredExt = Object.entries(extCounts).sort((a, b) => b[1] - a[1])[0][0];
    const files = allFiles.filter((f) => f.toLowerCase().endsWith(preferredExt));
    let baseLocale = requestedBase2;
    let baseFileName = "";
    if (!baseLocale) {
      for (const cand of ["en", "en-US", "en_US", "uk", "uk-UA", "de", "fr", "zh-CN"]) {
        const found = files.find((f) => {
          const info = parseLocaleFilename(f);
          return info && info.locale.toLowerCase() === cand.toLowerCase();
        });
        if (found) {
          const info = parseLocaleFilename(found);
          baseLocale = info.locale;
          baseFileName = found;
          break;
        }
      }
      if (!baseLocale && files.length > 0) {
        const info = parseLocaleFilename(files[0]);
        baseLocale = info.locale;
        baseFileName = files[0];
      }
    } else {
      const found = files.find((f) => {
        const info = parseLocaleFilename(f);
        return info && info.locale.toLowerCase() === baseLocale.toLowerCase();
      });
      if (found) {
        baseFileName = found;
      }
    }
    if (!baseLocale || !baseFileName) continue;
    const baseFile = import_path.default.join(dir, baseFileName);
    if (!import_fs.default.existsSync(baseFile)) continue;
    let baseContent;
    try {
      baseContent = parseFile(baseFile);
    } catch (e) {
      console.log(`\x1B[31mFailed to parse base locale ${baseFile}: ${e.message}\x1B[0m`);
      continue;
    }
    const baseFlat = flattenKeys(baseContent);
    const baseKeys = Object.keys(baseFlat);
    const total = baseKeys.length;
    if (fileSnapshots2) {
      fileSnapshots2.set(baseFile, {
        isBase: true,
        locale: baseLocale,
        keys: new Set(baseKeys),
        total,
        dir
      });
    }
    const otherFiles = files.filter((f) => f !== baseFileName);
    const locales = [];
    for (const f of otherFiles) {
      const info = parseLocaleFilename(f);
      if (!info) continue;
      const loc = info.locale;
      const locFile = import_path.default.join(dir, f);
      let locContent;
      try {
        locContent = parseFile(locFile);
      } catch {
        continue;
      }
      const locFlat = flattenKeys(locContent);
      const locKeys = new Set(Object.keys(locFlat));
      const translated = baseKeys.filter((k) => locKeys.has(k)).length;
      const missing = baseKeys.filter((k) => !locKeys.has(k));
      const pct = total > 0 ? (translated / total * 100).toFixed(1) : "100.0";
      if (fileSnapshots2) {
        fileSnapshots2.set(locFile, {
          locale: loc,
          keys: locKeys,
          total,
          translated,
          pct,
          preferredExt,
          dir,
          baseKeys
        });
      }
      locales.push({
        loc,
        locFile,
        flag: getFlag(loc),
        name: getLangName(loc),
        translated,
        missing,
        pct
      });
    }
    modules.push({
      dir,
      relDir,
      preferredExt,
      baseLocale,
      baseFlat,
      baseKeys,
      total,
      locales
    });
  }
  return modules;
}
function getLanguagesWithMissing(modules, includeAll = false) {
  const map2 = /* @__PURE__ */ new Map();
  for (const mod of modules) {
    for (const item of mod.locales) {
      if (includeAll || item.missing.length > 0) {
        if (!map2.has(item.loc)) {
          map2.set(item.loc, {
            loc: item.loc,
            flag: item.flag,
            name: item.name,
            totalMissing: 0,
            totalTranslated: 0,
            totalKeys: 0,
            pct: "0.0",
            modules: []
          });
        }
        const entry = map2.get(item.loc);
        entry.totalMissing += item.missing.length;
        entry.totalTranslated += item.translated;
        entry.totalKeys += mod.total;
        entry.modules.push({
          dir: mod.dir,
          relDir: mod.relDir,
          preferredExt: mod.preferredExt,
          baseLocale: mod.baseLocale,
          baseFlat: mod.baseFlat,
          missing: item.missing,
          translated: item.translated,
          total: mod.total,
          pct: item.pct
        });
      }
    }
  }
  const result = Array.from(map2.values());
  for (const entry of result) {
    entry.pct = entry.totalKeys > 0 ? (entry.totalTranslated / entry.totalKeys * 100).toFixed(1) : "100.0";
  }
  return result.sort((a, b) => a.totalMissing - b.totalMissing);
}

// src/utils/translator.ts
function toGoogleLangCode(code) {
  const norm = code.toLowerCase().replace("_", "-");
  if (norm === "zh-cn" || norm === "zh-hans") return "zh-CN";
  if (norm === "zh-tw" || norm === "zh-hant" || norm === "zh-hk") return "zh-TW";
  if (norm.startsWith("pt-br")) return "pt";
  if (norm.startsWith("es-")) return "es";
  if (norm.startsWith("en-")) return "en";
  if (norm.startsWith("de-")) return "de";
  if (norm.startsWith("fr-")) return "fr";
  if (norm.startsWith("it-")) return "it";
  if (norm.startsWith("ja-")) return "ja";
  if (norm.startsWith("ko-")) return "ko";
  if (norm === "lolcat") return null;
  return norm.split("-")[0];
}
async function translateBatch(texts, targetLang, sourceLang = "en") {
  if (texts.length === 0) return [];
  const gLang = toGoogleLangCode(targetLang);
  if (!gLang) return texts;
  const results = [];
  const CHUNK_SIZE = 25;
  for (let i = 0; i < texts.length; i += CHUNK_SIZE) {
    const chunk = texts.slice(i, i + CHUNK_SIZE);
    const joined = chunk.join("\n");
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${gLang}&dt=t&q=${encodeURIComponent(joined)}`;
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      const translatedFull = data[0].map((x) => x[0]).join("");
      const splitLines = translatedFull.split("\n");
      for (let j = 0; j < chunk.length; j++) {
        results.push(
          splitLines[j] !== void 0 && splitLines[j].trim() !== "" ? splitLines[j].trim() : chunk[j]
        );
      }
    } catch {
      for (const text of chunk) {
        results.push(text);
      }
    }
    if (i + CHUNK_SIZE < texts.length) {
      await new Promise((r) => setTimeout(r, 200));
    }
  }
  return results;
}

// src/utils/menu.ts
var import_readline = __toESM(require("readline"));
function selectMenu(title, options, initialIndex = 0, clearOnSelect = true) {
  return new Promise((resolve) => {
    if (!process.stdin.isTTY) {
      resolve(options[0] ? options[0].value : null);
      return;
    }
    let selectedIndex = initialIndex;
    import_readline.default.emitKeypressEvents(process.stdin);
    try {
      process.stdin.setRawMode(true);
    } catch {
    }
    process.stdout.write("\x1B[?25l");
    const PAGE_SIZE = 12;
    let printedLinesCount = 0;
    function render(firstTime = false) {
      if (!firstTime && printedLinesCount > 0) {
        process.stdout.write(`\x1B[${printedLinesCount}A\r\x1B[0J`);
      }
      let output = "";
      output += `\x1B[1m\x1B[36m${title}\x1B[0m
`;
      output += `\x1B[90m(Use \u2191 / \u2193 arrow keys to move, Enter to select, 'q' / Esc to exit)\x1B[0m

`;
      let startIdx = Math.max(0, selectedIndex - Math.floor(PAGE_SIZE / 2));
      let endIdx = Math.min(options.length, startIdx + PAGE_SIZE);
      if (endIdx - startIdx < PAGE_SIZE) {
        startIdx = Math.max(0, endIdx - PAGE_SIZE);
      }
      if (startIdx > 0) {
        output += `  \x1B[90m\u25B2 ... and ${startIdx} more above\x1B[0m
`;
      }
      for (let i = startIdx; i < endIdx; i++) {
        const opt = options[i];
        if (i === selectedIndex) {
          output += `  \x1B[36m\u276F \x1B[1m${opt.label}\x1B[0m
`;
        } else {
          output += `    ${opt.label}\x1B[0m
`;
        }
      }
      if (endIdx < options.length) {
        output += `  \x1B[90m\u25BC ... and ${options.length - endIdx} more below\x1B[0m
`;
      }
      process.stdout.write(output);
      printedLinesCount = output.split("\n").length - 1;
    }
    render(true);
    function onKeypress(_str, key) {
      if (!key) return;
      if (key.ctrl && key.name === "c") {
        cleanup();
        process.exit(0);
      }
      if (key.name === "q" || key.name === "escape") {
        cleanup();
        resolve(null);
        return;
      }
      if (key.name === "up") {
        selectedIndex = (selectedIndex - 1 + options.length) % options.length;
        render(false);
      } else if (key.name === "down") {
        selectedIndex = (selectedIndex + 1) % options.length;
        render(false);
      } else if (key.name === "return" || key.name === "enter" || key.name === "space") {
        cleanup();
        resolve(options[selectedIndex] ? options[selectedIndex].value : null);
      }
    }
    function cleanup() {
      process.stdin.removeListener("keypress", onKeypress);
      try {
        process.stdin.setRawMode(false);
      } catch {
      }
      if (clearOnSelect && printedLinesCount > 0) {
        process.stdout.write(`\x1B[${printedLinesCount}A\r\x1B[0J`);
      }
      process.stdout.write("\x1B[?25h");
    }
    process.stdin.on("keypress", onKeypress);
  });
}

// src/cli.ts
var args = process.argv.slice(2);
var isWatch = false;
var isInteractive = false;
var showMissing = false;
var showAll = false;
var asJsonTemplate = false;
var autoTranslate = false;
var saveToFile = false;
var limit = 30;
var targetLocale = "all";
var requestedDir = null;
var requestedBase = null;
var showHelp = false;
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === "--watch" || arg === "-w") {
    isWatch = true;
  } else if (arg === "--interactive" || arg === "-i") {
    isInteractive = true;
  } else if (arg === "--translate" || arg === "-t") {
    autoTranslate = true;
    showMissing = true;
  } else if (arg === "--save" || arg === "-s") {
    saveToFile = true;
  } else if (arg === "--missing" || arg === "-m") {
    showMissing = true;
  } else if (arg === "--all" || arg === "-a" || arg === "--all-keys") {
    showAll = true;
  } else if (arg === "--json" || arg === "--template") {
    asJsonTemplate = true;
    showMissing = true;
  } else if (arg === "--help" || arg === "-h") {
    showHelp = true;
  } else if (arg === "--limit" || arg === "-l") {
    if (args[i + 1] && !args[i + 1].startsWith("-")) {
      limit = parseInt(args[++i], 10) || 30;
    }
  } else if (arg.startsWith("--limit=")) {
    limit = parseInt(arg.split("=")[1], 10) || 30;
  } else if (arg === "--base" || arg === "-b") {
    if (args[i + 1] && !args[i + 1].startsWith("-")) {
      requestedBase = args[++i];
    }
  } else if (arg.startsWith("--base=")) {
    requestedBase = arg.split("=")[1];
  } else if (arg === "--dir" || arg === "-d") {
    if (args[i + 1] && !args[i + 1].startsWith("-")) {
      requestedDir = args[++i];
    }
  } else if (arg.startsWith("--dir=")) {
    requestedDir = arg.split("=")[1];
  } else if (!requestedDir && (arg.includes("/") || arg.includes("\\") || import_fs2.default.existsSync(import_path2.default.resolve(process.cwd(), arg)))) {
    requestedDir = arg;
  } else if (!arg.startsWith("-")) {
    if (targetLocale === "all") {
      targetLocale = arg;
      showMissing = true;
    } else if (!requestedBase) {
      requestedBase = arg;
    }
  }
}
if (showHelp) {
  console.log(`
\x1B[1m\x1B[36m==============================================================\x1B[0m
  \u{1F310} \x1B[1mi18n-zed CLI \u2014 Universal Translation Manager for Zed\x1B[0m
\x1B[1m\x1B[36m==============================================================\x1B[0m

\x1B[1mUSAGE:\x1B[0m
  node cli.js [locale] [options]

\x1B[1mOPTIONS:\x1B[0m
  \x1B[33m--interactive, -i\x1B[0m    Interactive menu with arrow keys (\u2191/\u2193 + Enter, no typing!)
  \x1B[33m--translate, -t\x1B[0m      Auto-translate missing keys with Google Translate (free)
  \x1B[33m--save, -s\x1B[0m           Save auto-translated keys directly into locale file(s)
  \x1B[33m--missing, -m\x1B[0m        Show untranslated keys for all (or specified) languages
  \x1B[33m--all, -a\x1B[0m            Display all missing keys without truncation limit
  \x1B[33m--limit <n>, -l <n>\x1B[0m  Max missing keys to display per language (default: 30)
  \x1B[33m--template, --json\x1B[0m   Export missing keys as a JSON template ready for translation
  \x1B[33m--watch, -w\x1B[0m          Live watch mode (recalculates coverage on save)
  \x1B[33m--dir <path>, -d\x1B[0m     Scan specific locales directory instead of auto-detecting
  \x1B[33m--base <lang>, -b\x1B[0m    Specify base reference language (default: auto-detected / en)
  \x1B[33m--help, -h\x1B[0m           Show this help message

\x1B[1mEXAMPLES:\x1B[0m
  node cli.js                  \x1B[90m# Show translation status for all languages\x1B[0m
  node cli.js -i               \x1B[90m# Interactive menu: navigate with arrow keys \u2191/\u2193\x1B[0m
  node cli.js uk               \x1B[90m# Show missing keys for Ukrainian\x1B[0m
  node cli.js uk --translate   \x1B[90m# Auto-translate missing keys for uk (free preview)\x1B[0m
  node cli.js uk -t -s         \x1B[90m# Auto-translate and save directly into uk locale file\x1B[0m
  node cli.js --watch          \x1B[90m# Auto-update status when translation files are saved\x1B[0m
`);
  process.exit(0);
}
var cwd = process.cwd();
var fileSnapshots = /* @__PURE__ */ new Map();
function displayMissingForLang(langEntry, showAllKeys = false, jsonExport = false) {
  console.log(`
\x1B[1m\x1B[36m==============================================================\x1B[0m`);
  console.log(`  ${langEntry.flag} \x1B[1mTranslation Status: [${langEntry.loc}] (${langEntry.name}) \u2014 Total Missing: ${langEntry.totalMissing}\x1B[0m`);
  console.log(`\x1B[1m\x1B[36m==============================================================\x1B[0m`);
  if (langEntry.totalMissing === 0) {
    console.log(`
\x1B[32m\u{1F389} Congratulations! [${langEntry.loc}] is 100% translated across all checked folders.\x1B[0m
`);
    return;
  }
  for (const mod of langEntry.modules) {
    console.log(`
\u{1F4C1} \x1B[1m\x1B[33m${mod.relDir}/\x1B[0m (${mod.missing.length} missing, ${mod.translated}/${mod.total} translated - ${mod.pct}%):`);
    if (jsonExport) {
      const template = {};
      const keysToExport = showAllKeys ? mod.missing : mod.missing.slice(0, limit);
      for (const k of keysToExport) {
        template[k] = mod.baseFlat[k] || "";
      }
      console.log(JSON.stringify(template, null, 2));
      if (!showAllKeys && mod.missing.length > limit) {
        console.log(`  \x1B[90m// ... and ${mod.missing.length - limit} more keys. Use 'a' to show all.\x1B[0m`);
      }
    } else {
      const displayed = showAllKeys ? mod.missing : mod.missing.slice(0, limit);
      for (const k of displayed) {
        const rawVal = mod.baseFlat[k];
        let valPreview = "";
        if (rawVal !== void 0 && rawVal !== null) {
          const cleanVal = String(rawVal).replace(/\r?\n/g, " ").trim();
          valPreview = cleanVal.length > 50 ? ` \x1B[90m(${mod.baseLocale}: "${cleanVal.slice(0, 47)}...")\x1B[0m` : ` \x1B[90m(${mod.baseLocale}: "${cleanVal}")\x1B[0m`;
        }
        console.log(`    \x1B[31m\u2717\x1B[0m ${k}${valPreview}`);
      }
      if (!showAllKeys && mod.missing.length > limit) {
        console.log(`    \x1B[90m... and ${mod.missing.length - limit} more keys (enter 'a' to show all)\x1B[0m`);
      }
    }
  }
  console.log("");
}
function exportMissingKeysToFile(langEntry) {
  console.log(`
\x1B[1m\x1B[36m==============================================================\x1B[0m`);
  console.log(`  \u{1F4BE} Exporting JSON Template: ${langEntry.flag} [${langEntry.loc}] (${langEntry.name})`);
  console.log(`\x1B[1m\x1B[36m==============================================================\x1B[0m`);
  for (const mod of langEntry.modules) {
    const template = {};
    for (const k of mod.missing) {
      template[k] = mod.baseFlat[k] || "";
    }
    const fileName = `missing-${langEntry.loc}.json`;
    const targetPath = import_path2.default.join(mod.dir, fileName);
    const relPath = import_path2.default.relative(cwd, targetPath) || fileName;
    try {
      import_fs2.default.writeFileSync(targetPath, JSON.stringify(template, null, 2) + "\n", "utf8");
      console.log(`
\x1B[32m\u2705 Successfully exported ${mod.missing.length} missing key(s)!\x1B[0m`);
      console.log(`   \u{1F4C4} File path: \x1B[1m\x1B[33m${targetPath}\x1B[0m`);
      console.log(`   \u{1F4C1} Relative:  \x1B[1m\x1B[36m${relPath}\x1B[0m
`);
    } catch (err) {
      console.error(`\x1B[31m\u274C Failed to export to ${targetPath}: ${err.message}\x1B[0m
`);
    }
  }
}
async function autoTranslateLanguage(langEntry, saveToFiles = false) {
  console.log(`
\x1B[1m\x1B[36m==============================================================\x1B[0m`);
  console.log(`  \u{1F916} \x1B[1mAuto-Translating missing keys for ${langEntry.flag} [${langEntry.loc}] (${langEntry.name})\x1B[0m`);
  console.log(`\x1B[1m\x1B[36m==============================================================\x1B[0m
`);
  let totalTranslatedCount = 0;
  for (const mod of langEntry.modules) {
    if (mod.missing.length === 0) continue;
    console.log(`\u{1F4C1} Module: \x1B[33m${mod.relDir}/\x1B[0m \u2014 Translating ${mod.missing.length} keys from '${mod.baseLocale}' to '${langEntry.loc}'...`);
    const sourceTexts = mod.missing.map((k) => mod.baseFlat[k] || k);
    const translatedTexts = await translateBatch(sourceTexts, langEntry.loc, mod.baseLocale);
    const translatedMap = {};
    for (let i = 0; i < mod.missing.length; i++) {
      const key = mod.missing[i];
      const translated = translatedTexts[i];
      translatedMap[key] = translated;
      const preview = String(translated).replace(/\r?\n/g, " ");
      console.log(`  \x1B[32m\u2705\x1B[0m \x1B[1m${key}\x1B[0m \u2192 \x1B[36m"${preview}"\x1B[0m`);
    }
    if (saveToFiles) {
      const targetDir = mod.dir || import_path2.default.join(cwd, mod.relDir);
      const targetFilePath = import_path2.default.join(targetDir, `${langEntry.loc}${mod.preferredExt}`);
      writeTranslationsToFile(targetFilePath, translatedMap);
      console.log(`  \x1B[1m\x1B[32m\u{1F4BE} Saved ${mod.missing.length} translated keys to ${targetFilePath}\x1B[0m
`);
    }
    totalTranslatedCount += mod.missing.length;
  }
  if (saveToFiles) {
    console.log(`\x1B[1m\x1B[32m\u{1F389} Successfully auto-translated and saved ${totalTranslatedCount} keys for [${langEntry.loc}]!\x1B[0m
`);
  } else {
    console.log(`\x1B[1m\x1B[33m\u2139\uFE0F  Preview complete (${totalTranslatedCount} keys). Select 'Save to file' in the menu to persist.\x1B[0m
`);
  }
}
async function promptFolderSelection(allModules, selectedModule) {
  const options = [
    {
      label: `\u{1F4C2} [All Folders] \u2014 Combined view of all ${allModules.length} locales folders`,
      value: null
    },
    ...allModules.map((m) => ({
      label: `\u{1F4C1} ${m.relDir}/ (${m.locales.length} languages, format: ${m.preferredExt}, base: ${m.baseLocale})`,
      value: m
    })),
    {
      label: `\u{1F519} Cancel`,
      value: "CANCEL"
    }
  ];
  const chosen = await selectMenu("\u{1F4C2} Select Locales Folder to Inspect:", options);
  if (chosen === "CANCEL") return selectedModule;
  return chosen ?? null;
}
async function runInteractivePicker(allModules, _initialLangList, preselected = null) {
  let selectedModule = null;
  let currentLang = preselected;
  let showCompleted = false;
  while (true) {
    if (process.stdout.isTTY) {
      process.stdout.write("\x1B[2J\x1B[0;0H");
    }
    const activeModules = selectedModule ? [selectedModule] : allModules;
    const currentLangList = getLanguagesWithMissing(activeModules, showCompleted);
    if (!currentLang) {
      if (currentLangList.length === 0) {
        const folderName = selectedModule ? `folder '${selectedModule.relDir}/'` : "this project";
        console.log(`
\x1B[1m\x1B[32m\u{1F389} All languages in ${folderName} are 100% translated! No missing keys found.\x1B[0m
`);
        const options = [];
        if (!showCompleted) {
          options.push({ label: `\u{1F441}\uFE0F  Show all languages (including 100% translated)`, value: "toggle_completed" });
        }
        if (allModules.length > 1) {
          options.push({ label: `\u{1F4C2} Switch to another folder / All folders`, value: "switch_folder" });
        }
        options.push({ label: `\u274C Exit`, value: "exit" });
        const switchOption = await selectMenu("Options:", options);
        if (switchOption === "toggle_completed") {
          showCompleted = true;
          continue;
        }
        if (switchOption === "switch_folder") {
          selectedModule = await promptFolderSelection(allModules, selectedModule);
          continue;
        }
        break;
      }
      const langOptions = [];
      if (allModules.length > 1) {
        const folderLabel = selectedModule ? `\u{1F4C1} ${selectedModule.relDir}/` : `\u{1F4C2} All Folders (${allModules.length})`;
        langOptions.push({
          label: `\u{1F504} Switch Locales Folder [Active: ${folderLabel}]`,
          value: "switch_folder"
        });
      }
      langOptions.push({
        label: `\u{1F441}\uFE0F  Filter: [${showCompleted ? "Showing ALL Languages" : "Showing Missing Only"}] (press Enter to toggle)`,
        value: "toggle_completed"
      });
      langOptions.push(
        ...currentLangList.map((item) => {
          const bar = makeProgressBar(item.pct);
          const count = item.totalMissing > 0 ? `\x1B[31m${item.totalMissing} missing\x1B[0m` : `\x1B[32m100% complete\x1B[0m`;
          const locStr = `${item.flag} [${item.loc.padEnd(6)}]`;
          return {
            label: `${locStr}  ${bar} ${item.pct.padStart(5)}%  (${item.totalTranslated}/${item.totalKeys})  ${count}`,
            value: item
          };
        })
      );
      langOptions.push({
        label: `\u{1F310} [All Languages] \u2014 View untranslated keys report for all languages`,
        value: "all"
      });
      langOptions.push({
        label: `\u274C [Exit]`,
        value: "exit"
      });
      const menuTitle = selectedModule ? `\u{1F310} Translation Dashboard [Folder: ${selectedModule.relDir}/]:` : `\u{1F310} Translation Dashboard [All Folders (${allModules.length})]:`;
      const selected = await selectMenu(menuTitle, langOptions);
      if (!selected || selected === "exit") {
        console.log("\u{1F44B} Done.");
        break;
      }
      if (selected === "switch_folder") {
        selectedModule = await promptFolderSelection(allModules, selectedModule);
        continue;
      }
      if (selected === "toggle_completed") {
        showCompleted = !showCompleted;
        continue;
      }
      if (selected === "all") {
        for (const item of currentLangList) {
          displayMissingForLang(item, showAll, asJsonTemplate);
        }
        continue;
      }
      currentLang = selected;
    }
    displayMissingForLang(currentLang, false, false);
    let actionOptions;
    if (currentLang.totalMissing === 0) {
      actionOptions = [
        {
          label: `\u{1F389} Language is 100% translated (${currentLang.totalKeys}/${currentLang.totalKeys} keys)`,
          value: "none"
        }
      ];
    } else {
      actionOptions = [
        {
          label: `\u{1F916} Auto-translate missing keys with Google Translate (preview)`,
          value: "translate_preview"
        },
        {
          label: `\u270D\uFE0F  Auto-translate and save directly into locale file(s)`,
          value: "translate_save"
        },
        {
          label: `\u{1F4BE} Export missing keys to file (missing-${currentLang.loc}.json)`,
          value: "export_json"
        },
        {
          label: `\u{1F4CB} Show all ${currentLang.totalMissing} missing keys without limit`,
          value: "show_all"
        }
      ];
    }
    if (allModules.length > 1) {
      const folderShort = selectedModule ? `${selectedModule.relDir}/` : "All Folders";
      actionOptions.push({
        label: `\u{1F504} Switch Locales Folder (currently: ${folderShort})`,
        value: "switch_folder_in_lang"
      });
    }
    actionOptions.push(
      {
        label: `\u{1F519} Back to language list`,
        value: "back"
      },
      {
        label: `\u274C Exit`,
        value: "exit"
      }
    );
    const action = await selectMenu(`Actions for ${currentLang.flag} [${currentLang.loc}] (${currentLang.name}):`, actionOptions);
    if (!action || action === "exit") {
      console.log("\u{1F44B} Done.");
      break;
    }
    if (action === "switch_folder_in_lang") {
      selectedModule = await promptFolderSelection(allModules, selectedModule);
      const newActiveMods = selectedModule ? [selectedModule] : allModules;
      const newLangList = getLanguagesWithMissing(newActiveMods);
      const matched = newLangList.find((l) => l.loc.toLowerCase() === currentLang.loc.toLowerCase());
      if (matched) {
        currentLang = matched;
      } else {
        console.log(`
\x1B[32m\u2728 [${currentLang.loc}] is 100% translated in the selected folder!\x1B[0m
`);
        currentLang = null;
      }
      continue;
    }
    if (action === "back") {
      currentLang = null;
      continue;
    }
    if (action === "show_all") {
      displayMissingForLang(currentLang, true, false);
      continue;
    }
    if (action === "export_json") {
      exportMissingKeysToFile(currentLang);
      continue;
    }
    if (action === "translate_preview") {
      await autoTranslateLanguage(currentLang, false);
      const confirmSave = await selectMenu("Would you like to save these translations?", [
        { label: `\u270D\uFE0F  Yes, save to locale file(s)`, value: "yes" },
        { label: `\u{1F519} Return to menu`, value: "no" }
      ]);
      if (confirmSave === "yes") {
        await autoTranslateLanguage(currentLang, true);
      }
      continue;
    }
    if (action === "translate_save") {
      await autoTranslateLanguage(currentLang, true);
      continue;
    }
  }
}
function renderOverview(modules) {
  for (const mod of modules) {
    console.log(`\u{1F4C1} Module / Directory: \x1B[1m\x1B[33m${mod.relDir}/\x1B[0m  (format: ${mod.preferredExt})`);
    console.log(`\u{1F3E0} Base language:     \x1B[32m${mod.baseLocale}\x1B[0m (${mod.total} keys)`);
    console.log(`--------------------------------------------------------------`);
    for (const item of mod.locales) {
      const bar = makeProgressBar(item.pct);
      console.log(`  ${item.flag} [${item.loc.padEnd(6)}]  ${bar} ${item.pct.padStart(5)}%  (${item.translated}/${mod.total} translated, \x1B[31m${item.missing.length} missing\x1B[0m)`);
    }
    console.log("");
  }
}
var activeWatchers = [];
var watchDebounceTimers = /* @__PURE__ */ new Map();
var currentWatchKeyHandler = null;
async function promptWatchFolderSelection(modules, currentSelected) {
  const options = [
    {
      label: `\u{1F4C2} [All Folders] \u2014 Watch all ${modules.length} locales folders simultaneously`,
      value: null
    },
    ...modules.map((m) => ({
      label: `\u{1F4C1} ${m.relDir}/ (${m.locales.length} languages, format: ${m.preferredExt}, base: ${m.baseLocale})`,
      value: m
    }))
  ];
  const initialIndex = currentSelected ? modules.indexOf(currentSelected) + 1 : 0;
  const chosen = await selectMenu("\u{1F4C2} Select Locales Folder to Watch:", options, Math.max(0, initialIndex));
  return chosen ?? null;
}
function handleFileChange(filePath, dir, _filename) {
  if (!import_fs2.default.existsSync(filePath)) return;
  const oldSnap = fileSnapshots.get(filePath);
  let newContent;
  try {
    newContent = parseFile(filePath);
  } catch {
    return;
  }
  const newFlat = flattenKeys(newContent);
  const newKeys = new Set(Object.keys(newFlat));
  const now = (/* @__PURE__ */ new Date()).toLocaleTimeString();
  const relPath = import_path2.default.relative(cwd, filePath);
  if (!oldSnap) {
    console.log(`
\x1B[1m\x1B[32m[${now}] \u2728 New file detected or reloaded: ${relPath}\x1B[0m`);
    const updated = collectModulesData([dir], cwd, requestedBase, fileSnapshots);
    renderOverview(updated);
    return;
  }
  if (oldSnap.isBase) {
    console.log(`
\x1B[1m\x1B[36m\u{1F3E0} [${now}] Base locale updated: ${relPath}\x1B[0m (Total keys: ${newKeys.size})`);
    const updated = collectModulesData([dir], cwd, requestedBase, fileSnapshots);
    renderOverview(updated);
    return;
  }
  const added = [];
  const removed = [];
  for (const k of newKeys) {
    if (!oldSnap.keys.has(k)) added.push(k);
  }
  for (const k of oldSnap.keys) {
    if (!newKeys.has(k)) removed.push(k);
  }
  if (added.length === 0 && removed.length === 0) {
    console.log(`\x1B[90m[${now}] \u{1F4DD} ${relPath} saved (values updated, total keys unchanged: ${newKeys.size})\x1B[0m`);
    return;
  }
  const baseKeys = oldSnap.baseKeys || [];
  const total = oldSnap.total;
  const newTranslated = baseKeys.filter((k) => newKeys.has(k)).length;
  const newPct = total > 0 ? (newTranslated / total * 100).toFixed(1) : "100.0";
  const bar = makeProgressBar(newPct);
  const flag = getFlag(oldSnap.locale);
  console.log(`
\x1B[1m\x1B[36m\u{1F504} [${now}] ${relPath} updated:\x1B[0m`);
  if (added.length > 0) {
    const preview = added.slice(0, 5).map((k) => `'${k}'`).join(", ");
    const extra = added.length > 5 ? ` (+${added.length - 5} more)` : "";
    console.log(`\x1B[32m  \u2705 +${added.length} key(s) translated: ${preview}${extra}\x1B[0m`);
  }
  if (removed.length > 0) {
    const preview = removed.slice(0, 5).map((k) => `'${k}'`).join(", ");
    const extra = removed.length > 5 ? ` (+${removed.length - 5} more)` : "";
    console.log(`\x1B[31m  \u26A0\uFE0F  -${removed.length} key(s) removed: ${preview}${extra}\x1B[0m`);
  }
  const changeStr = newTranslated > (oldSnap.translated ?? 0) ? `\x1B[32m(+${newTranslated - (oldSnap.translated ?? 0)} key translated!)\x1B[0m` : newTranslated < (oldSnap.translated ?? 0) ? `\x1B[31m(-${(oldSnap.translated ?? 0) - newTranslated} key removed)\x1B[0m` : "";
  console.log(`  ${flag} [${oldSnap.locale}] ${bar} \x1B[1m${newPct}%\x1B[0m (${newTranslated}/${total} translated) ${changeStr}
`);
  fileSnapshots.set(filePath, {
    ...oldSnap,
    keys: newKeys,
    translated: newTranslated,
    pct: newPct
  });
}
function setupWatchLoop(modules, selectedModule) {
  for (const w of activeWatchers) {
    try {
      w.close();
    } catch {
    }
  }
  activeWatchers = [];
  watchDebounceTimers.clear();
  if (currentWatchKeyHandler) {
    process.stdin.removeListener("keypress", currentWatchKeyHandler);
    currentWatchKeyHandler = null;
  }
  const targetDirs = selectedModule ? [selectedModule.dir] : modules.map((m) => m.dir);
  if (process.stdout.isTTY) {
    process.stdout.write("\x1B[2J\x1B[0;0H");
  }
  console.log("\x1B[1m\x1B[35m==============================================================\x1B[0m");
  console.log("  \u{1F440} \x1B[1mi18n Live Watch Mode \u2014 Active\x1B[0m");
  console.log("\x1B[1m\x1B[35m==============================================================\x1B[0m");
  const targetModules = selectedModule ? [selectedModule] : modules;
  console.log(`
\x1B[1m\x1B[36m\u{1F4CA} Current Translation Status \u2014 \x1B[33m${selectedModule ? selectedModule.relDir + "/" : "All Folders (" + modules.length + ")"}\x1B[0m
`);
  renderOverview(targetModules);
  console.log(`\x1B[90m\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\x1B[0m`);
  console.log(`\x1B[90m\u{1F4A1} Live Watch Mode active! Edit and save any locale file to see live diffs.\x1B[0m`);
  if (modules.length > 1 && process.stdin.isTTY) {
    console.log(`\x1B[36m\u{1F449} Press [s] or [Enter] to switch watched folder | [q] or Ctrl+C to exit\x1B[0m
`);
  } else {
    console.log(`\x1B[90m(Press Ctrl+C to stop watching)\x1B[0m
`);
  }
  for (const dir of targetDirs) {
    try {
      const watcher = import_fs2.default.watch(dir, { persistent: true }, (_eventType, filename) => {
        if (!filename || parseLocaleFilename(filename) === null) return;
        const filePath = import_path2.default.join(dir, filename);
        if (watchDebounceTimers.has(filePath)) {
          clearTimeout(watchDebounceTimers.get(filePath));
        }
        watchDebounceTimers.set(filePath, setTimeout(() => {
          watchDebounceTimers.delete(filePath);
          handleFileChange(filePath, dir, filename);
        }, 250));
      });
      activeWatchers.push(watcher);
    } catch (e) {
      console.log(`\x1B[31mFailed to watch ${dir}: ${e.message}\x1B[0m`);
    }
  }
  if (modules.length > 1 && process.stdin.isTTY) {
    import_readline2.default.emitKeypressEvents(process.stdin);
    try {
      process.stdin.setRawMode(true);
    } catch {
    }
    currentWatchKeyHandler = function(_str, key) {
      if (!key) return;
      if (key.ctrl && key.name === "c" || key.name === "q" || key.name === "escape") {
        for (const w of activeWatchers) {
          try {
            w.close();
          } catch {
          }
        }
        if (currentWatchKeyHandler) {
          process.stdin.removeListener("keypress", currentWatchKeyHandler);
        }
        try {
          process.stdin.setRawMode(false);
        } catch {
        }
        console.log("\n\u{1F44B} Watch Mode stopped.");
        process.exit(0);
      }
      if (key.name === "s" || key.name === "m" || key.name === "return" || key.name === "enter") {
        if (currentWatchKeyHandler) {
          process.stdin.removeListener("keypress", currentWatchKeyHandler);
          currentWatchKeyHandler = null;
        }
        try {
          process.stdin.setRawMode(false);
        } catch {
        }
        if (process.stdout.isTTY) {
          process.stdout.write("\x1B[2J\x1B[0;0H");
        }
        promptWatchFolderSelection(modules, selectedModule).then((newChosen) => {
          setupWatchLoop(modules, newChosen);
        });
      }
    };
    process.stdin.on("keypress", currentWatchKeyHandler);
  }
}
async function startWatchMode(localesDirs, modules) {
  let selectedModule = null;
  if (modules.length > 1 && process.stdin.isTTY && !requestedDir) {
    const chosen = await promptWatchFolderSelection(modules, selectedModule);
    selectedModule = chosen;
  }
  setupWatchLoop(modules, selectedModule);
}
async function main() {
  const localesDirs = findAllLocalesDirs(cwd, requestedDir);
  if (localesDirs.length === 0) {
    console.error(`\x1B[31m\u274C Error: No translation directory found in '${cwd}'\x1B[0m`);
    console.log(`Looked for files like: en.json, en.yaml, uk.json, uk.yaml, lolcat.yaml, etc.`);
    process.exit(1);
  }
  const modules = collectModulesData(localesDirs, cwd, requestedBase, fileSnapshots);
  const langList = getLanguagesWithMissing(modules);
  if (!isNaN(parseInt(targetLocale, 10)) && langList.length > 0) {
    const num = parseInt(targetLocale, 10);
    if (num >= 1 && num <= langList.length) {
      targetLocale = langList[num - 1].loc;
    }
  }
  if (isWatch) {
    await startWatchMode(localesDirs, modules);
    return;
  }
  if (isInteractive || process.stdin.isTTY && targetLocale === "all" && !showMissing && !asJsonTemplate) {
    await runInteractivePicker(modules, langList);
    return;
  }
  if (targetLocale !== "all") {
    const targetEntry = langList.find((l) => l.loc.toLowerCase() === targetLocale.toLowerCase());
    if (targetEntry) {
      if (autoTranslate) {
        await autoTranslateLanguage(targetEntry, saveToFile);
      } else if (asJsonTemplate && saveToFile) {
        exportMissingKeysToFile(targetEntry);
      } else {
        displayMissingForLang(targetEntry, showAll, asJsonTemplate);
      }
      return;
    }
    let foundInModules = false;
    for (const mod of modules) {
      const locItem = mod.locales.find((l) => l.loc.toLowerCase() === targetLocale.toLowerCase());
      if (locItem) {
        foundInModules = true;
        console.log(`\u{1F4C1} Module: \x1B[1m${mod.relDir}/\x1B[0m`);
        console.log(`  ${locItem.flag} [${locItem.loc}] (${locItem.name}): \x1B[32m100% translated (${locItem.translated}/${mod.total})\x1B[0m. No missing keys!
`);
      }
    }
    if (!foundInModules) {
      console.log(`\x1B[33m\u26A0\uFE0F  Locale '${targetLocale}' not found in this project.\x1B[0m`);
      const allLocs = /* @__PURE__ */ new Set();
      modules.forEach((m) => m.locales.forEach((l) => allLocs.add(l.loc)));
      console.log(`Available locales: ${Array.from(allLocs).join(", ") || "none"}
`);
    }
    return;
  }
  if (showMissing) {
    if (langList.length === 0) {
      console.log(`
\x1B[1m\x1B[32m\u{1F389} All languages in this project are 100% translated! No missing keys found.\x1B[0m
`);
      return;
    }
    for (const item of langList) {
      displayMissingForLang(item, showAll, asJsonTemplate);
    }
    return;
  }
  console.log("\n\x1B[1m\x1B[36m==============================================================\x1B[0m");
  console.log("  \u{1F310} i18n Translation Status Report                           ");
  console.log("\x1B[1m\x1B[36m==============================================================\x1B[0m");
  console.log(`Locales directories found: \x1B[32m${modules.length}\x1B[0m
`);
  renderOverview(modules);
  if (langList.length > 0) {
    console.log(`\x1B[90m\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\x1B[0m`);
    console.log(`\u{1F50D} \x1B[1mLanguages with untranslated keys in this workspace:\x1B[0m
`);
    langList.forEach((item, idx) => {
      const num = `[${idx + 1}]`.padStart(4);
      const locStr = `${item.flag} ${item.loc.padEnd(7)} (${item.name})`;
      const countStr = `\x1B[31m${item.totalMissing} missing\x1B[0m`;
      console.log(`  \x1B[33m${num}\x1B[0m  ${locStr.padEnd(38)} ${countStr}`);
    });
    console.log(`
\u{1F4A1} \x1B[1mHow to inspect untranslated keys:\x1B[0m`);
    console.log(`   \u2022 In Zed: Open Command Palette (Ctrl+Shift+P) \u2192 task: spawn \u2192 i18n: Inspect Missing Keys \u{1F50D}`);
    console.log(`   \u2022 Arrow Menu: node E:/github/zed-i18n/lsp/cli.js -i (navigate with \u2191/\u2193 + Enter)`);
    console.log(`   \u2022 Auto-Translate: node E:/github/zed-i18n/lsp/cli.js uk -t (free Google Translate)`);
    console.log(`\x1B[90m\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\x1B[0m
`);
  }
}
main().catch((err) => {
  console.error(`\x1B[31mError: ${err.message}\x1B[0m`);
  process.exit(1);
});
/*! Bundled license information:

smol-toml/dist/error.js:
smol-toml/dist/primitive.js:
smol-toml/dist/date.js:
smol-toml/dist/extract.js:
smol-toml/dist/util.js:
smol-toml/dist/struct.js:
smol-toml/dist/parse.js:
smol-toml/dist/stringify.js:
smol-toml/dist/index.js:
  (*!
   * Copyright (c) Squirrel Chat et al., All rights reserved.
   * SPDX-License-Identifier: BSD-3-Clause
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *
   * 1. Redistributions of source code must retain the above copyright notice, this
   *    list of conditions and the following disclaimer.
   * 2. Redistributions in binary form must reproduce the above copyright notice,
   *    this list of conditions and the following disclaimer in the
   *    documentation and/or other materials provided with the distribution.
   * 3. Neither the name of the copyright holder nor the names of its contributors
   *    may be used to endorse or promote products derived from this software without
   *    specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
   * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
   * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
   * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
   * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
   * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
   * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
   * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   *)
*/
//# sourceMappingURL=cli.js.map
