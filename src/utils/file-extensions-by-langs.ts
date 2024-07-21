/**
 * Mapping of programming language names to their corresponding file extensions.
 */
export const fileExtensionsByLangs: { [key: string]: string[] } = {
  accesslog: ["log"],
  apache: ["apache"],
  arduino: ["ino"],
  bash: ["sh"],
  basic: ["bas"],
  c: ["c"],
  coffeescript: ["coffee"],
  cos: ["cos"],
  cpp: ["cpp"],
  crmsh: ["crmsh"],
  csharp: ["cs"],
  css: ["css"],
  d: ["d"],
  dart: ["dart"],
  delphi: ["pas"],
  diff: ["diff"],
  dns: ["zone"],
  dockerfile: ["dockerfile"],
  elixir: ["ex"],
  erlang: ["erl"],
  fsharp: ["fs"],
  gcode: ["gcode"],
  gherkin: ["feature"],
  glsl: ["glsl"],
  gml: ["gml"],
  go: ["go"],
  golo: ["golo"],
  gradle: ["gradle"],
  haml: ["haml"],
  handlebars: ["handlebars"],
  haskell: ["hs"],
  html: ["html"],
  haxe: ["hx"],
  hsp: ["hsp"],
  ini: ["ini"],
  irpf90: ["irpf90"],
  isbl: ["isbl"],
  java: ["java"],
  javascript: ["js", "jsx"],
  json: ["json"],
  kotlin: ["kt"],
  lua: ["lua"],
  markdown: ["md"],
  perl: ["pl"],
  pgsql: ["sql"],
  php: ["php"],
  plaintext: ["txt"],
  powershell: ["ps1"],
  python: ["py"],
  ruby: ["rb"],
  scss: ["scss"],
  shell: ["sh"],
  sql: ["sql"],
  swift: ["swift"],
  typescript: ["ts", "tsx"],
  vim: ["vim"],
  xml: ["xml"],
  yaml: ["yaml"],
};

/**
 * Retrieves the file extension from a given filename.
 * @param filename - The name of the file.
 * @returns The file extension or null if the filename doesn't have an extension.
 */
export const getFileExtension = (filename: string): string | null => {
  const ext = filename.split(".").pop();
  if (ext === undefined) {
    return null;
  }
  return ext;
};

/**
 * Retrieves the programming language based on the file extension.
 * @param filename - The name of the file.
 * @returns The programming language associated with the file extension, or "Dil Bilinmiyor" if the language is unknown.
 */
export const getLangFromFileExtension = (filename: string): string => {
  const ext = getFileExtension(filename);
  if (!ext) {
    return "plaintext";
  }
  for (const lang in fileExtensionsByLangs) {
    if (fileExtensionsByLangs[lang].includes(ext)) {
      return lang;
    }
  }
  return "plaintext";
};
