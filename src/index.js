import * as changeCase from "change-case";
import replace from "replace-in-file";
import shell from "shelljs";

const fromStr = "old-name";
const toStr = "new-name";

const pathToProject = `/path/to/folder/with/project`;

const RegExpStr = `'s/(\\b${fromStr}\\b)(?!.*\\1)/${toStr}/g'`;

const files = [
  `${pathToProject}${fromStr}/*`,
  `${pathToProject}${fromStr}/args/*`,
  `${pathToProject}${fromStr}/dto/*`,
  `${pathToProject}${fromStr}/input/*`,
];

const  cases = {
  camel: {
    from: new RegExp(changeCase.camelCase(fromStr), "g"),
    to: changeCase.camelCase(toStr),
  },

  snake: {
    from: new RegExp(changeCase.snakeCase(fromStr), "g"),
    to: changeCase.snakeCase(toStr),
  },

  param: {
    from: new RegExp(changeCase.paramCase(fromStr), "g"),
    to: changeCase.paramCase(toStr),
  },

  pascal: {
    from: new RegExp(changeCase.pascalCase(fromStr), "g"),
    to: changeCase.pascalCase(toStr),
  },

  constant: {
    from: new RegExp(changeCase.constantCase(fromStr), "g"),
    to: changeCase.constantCase(toStr),
  }
};

console.log("____________________________________________________");
console.log("files:     ", files);
console.log("____________________________________________________");
console.log("from/to:  ", fromStr, toStr);
console.log("____________________________________________________");

const { camel, snake, param, pascal, constant } = cases;

const options = {
  files,
  from: [
    camel.from,
    snake.from,
    param.from,
    pascal.from,
    constant.from,
  ],
  to: [
    camel.to,
    snake.to,
    param.to,
    pascal.to,
    constant.to,
  ],
  countMatches: true
};

try {
  const results = replace.sync(options);
  console.log("Replacement results:", results);
  shell.exec(`find ${pathToProject} -print0 | xargs -0 -n 1 | tac | rename ${RegExpStr}`, {silent:true});
}
catch (error) {
  console.error("Error occurred:", error);
}

console.log("____________________________________________________");
console.log("Done!");
