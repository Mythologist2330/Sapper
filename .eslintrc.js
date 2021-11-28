module.exports = {
    "env": {
        "commonjs": true,
        "browser": true,
        "es2021": true,
        "node": true,
    },
    "extends": ["eslint:recommended", "airbnb", "prettier"],
    "plugins": ["prettier"],
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "rules": {
        "no-plusplus": true
    }
};
