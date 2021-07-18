module.exports = {
  preset: 'react-native',
  setupFiles: [
    './jest/setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!react-native|react-native-vector-icons|@react-native-community|@react-navigation)/',
  ],
}
