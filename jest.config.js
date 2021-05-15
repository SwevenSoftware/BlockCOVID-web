module.exports = {
    transform: { '^.+\\.tsx?$': 'ts-jest' },
    testEnvironment: 'node',
    testRegex: '/src/test/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json', 'node'],
    collectCoverageFrom: [
        "src/**/*.tsx",
        "src/**/*.ts"
    ]
};