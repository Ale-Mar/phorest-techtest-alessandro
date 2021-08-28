module.exports = {
    modulePaths: ['<rootDir>/node_modules/', '<rootDir>/tests/__mocks__/'],
    unmockedModulePathPatterns: ['/^node_modules/'],
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
        "node_modules/(?!(@react-native|react-native|react-native-vector-icons|react-navigation|@react-navigation/.*))"
    ],
    testEnvironment: "jsdom"

};