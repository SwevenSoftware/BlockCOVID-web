module.exports = {
    transform: { '^.+\\.tsx?$': 'ts-jest' },
    testEnvironment: 'node',
    testRegex: 'test/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node'
    ],
    collectCoverageFrom: [
        "src/**/*.tsx",
        "src/**/*.ts"
    ],
    moduleNameMapper: {
        "^.+\\.(css|less)$": "<rootDir>/CSSStub.js"
    }
};
