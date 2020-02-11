module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "standard",
    "plugins": [
        "standard"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
    },
    "overrides": [
        {
            "files": ["**/*.ts", "**/*.tsx"],
            "rules": {
                "no-unused-vars": ["off"],
                "no-undef": ["off"]
            }
        }
    ],
};
