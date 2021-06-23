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
        "src/**/*.ts",
        "!src/App.tsx",
        "!src/configureStore.ts",
        "!src/DotGrid.tsx",
        "!src/GeneralLayout.tsx",
        "!src/index.tsx",
        "!src/Grid.ts",
        "!src/components/ModifyAccountComponent.tsx",
        "!src/components/ModifyRoomComponent.tsx",
        "!src/components/NewAccountComponent.tsx",
        "!src/components/NewRoomComponent.tsx",
    ],
    moduleNameMapper: {
        "^.+\\.(css|less)$": "<rootDir>/CSSStub.js"
    }
};
