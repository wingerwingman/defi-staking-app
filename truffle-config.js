require('babel-register');
require('babel-polyfill');

module.exports = {
    networks:{
        development: {
            host: '172.24.16.1',
            port: '7545',
            network_id: '*'
        },
    },
    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/truffle_abis/',
    compilers: {
        solc: {
            version: '^0.5.0',
            enabled: true,
            runs: 200
        },
    }
}