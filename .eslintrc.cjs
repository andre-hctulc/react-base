// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:storybook/recommended"
    ],
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint", "react-hooks"],
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-unused-vars": "warn",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
