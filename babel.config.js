module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module:react-native-dotenv',
            {
                moduleName: "@env",
                path: ".env",
            }
        ],
        [
            'module-resolver',
            {
                root: ['./src'],
                extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
            },
        ],
        'react-native-reanimated/plugin'
    ]
};
