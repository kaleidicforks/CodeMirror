// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("../../addon/mode/simple"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "../../addon/mode/simple"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineSimpleMode("sil",{
  start: [
    // string and byte string
    {regex: /b?"/, token: "string", next: "string"},
    // raw string and raw byte string
    {regex: /b?r"/, token: "string", next: "string_raw"},
    {regex: /b?r#+"/, token: "string", next: "string_raw_hash"},
    // character
    {regex: /'(?:[^'\\]|\\(?:[nrt0'"]|x[\da-fA-F]{2}|u\{[\da-fA-F]{6}\}))'/, token: "string-2"},
    // byte
    {regex: /b'(?:[^']|\\(?:['\\nrt0]|x[\da-fA-F]{2}))'/, token: "string-2"},

    {regex: /(?:(?:[0-9][0-9_]*)(?:(?:[Ee][+-]?[0-9_]+)|\.[0-9_]+(?:[Ee][+-]?[0-9_]+)?)(?:f32|f64)?)|(?:0(?:b[01_]+|(?:o[0-7_]+)|(?:x[0-9a-fA-F_]+))|(?:[0-9][0-9_]*))(?:u8|u16|u32|u64|i8|i16|i32|i64|isize|usize)?/,
     token: "number"},
    {regex: /(let(?:\s+mut)?|fn|enum|mod|struct|type)(\s+)([a-zA-Z_][a-zA-Z0-9_]*)/, token: ["keyword", null, "def"]},
    {regex: /(?:private|public|if|then|else|local|in||enum|import|from|pure|switch|case)\b/, token: "keyword"},
    {regex: /(?:makeTable|addEntry|removeEntry|replaceEntry|hasEntry|len|keys|values|get|hasValue|value|valueOr|appendOne|appendSeq|DivResult|integerDiv|clock|sizeOf|doGC|exit|showProfile|resetProfile|enforce|exec|lastErrorTrace|env|valueOf|typeOf|setDoc|getDoc|printDoc|inspectFrame|inspectFunction|true|false)\b/, token: "builtin"},
    {regex: /\b(?:char|string|integer|number|rangeOf)\b/, token: "atom"},
    {regex: /\b(fn)(\s+)([a-zA-Z_][a-zA-Z0-9_]*)/,
     token: ["keyword", null ,"def"]},
    {regex: /#!?\[.*\]/, token: "meta"},
    {regex: /\/\/.*/, token: "comment"},
    {regex: /\/\*/, token: "comment", next: "comment"},
    {regex: /[-+\/*=<>!]+/, token: "operator"},
    {regex: /[a-zA-Z_]\w*!/,token: "variable-3"},
    {regex: /[a-zA-Z_]\w*/, token: "variable"},
    {regex: /[\{\[\(]/, indent: true},
    {regex: /[\}\]\)]/, dedent: true}
  ],
  string: [
    {regex: /"/, token: "string", next: "start"},
    {regex: /(?:[^\\"]|\\(?:.|$))*/, token: "string"}
  ],
  string_raw: [
    {regex: /"/, token: "string", next: "start"},
    {regex: /[^"]*/, token: "string"}
  ],
  string_raw_hash: [
    {regex: /"#+/, token: "string", next: "start"},
    {regex: /(?:[^"]|"(?!#))*/, token: "string"}
  ],
  comment: [
    {regex: /.*?\*\//, token: "comment", next: "start"},
    {regex: /.*/, token: "comment"}
  ],
  meta: {
    dontIndentStates: ["comment"],
    electricInput: /^\s*\}$/,
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    lineComment: "//",
    fold: "brace"
  }
});


CodeMirror.defineMIME("text/x-silsrc", "sil");
CodeMirror.defineMIME("text/sil", "sil");
});
