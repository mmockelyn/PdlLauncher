const builder = require('electron-builder')
const Platform = builder.Platform

function getCurrentPlatform(){
    switch(process.platform){
        case 'win32':
            return Platform.WINDOWS
        case 'darwin':
            return Platform.MAC
        case 'linux':
            return Platform.linux
        default:
            console.error('Cannot resolve current platform!')
            return undefined
    }
}

builder.build({
    publish: [
        {
            "provider": "github",
            "owner": "mmockelyn",
            "repo": "https://github.com/mmockelyn/PdlLauncher.git",
            "token": "339e81bac700803d010b57f8c5b10c189aa229e5"
        }
    ],
    targets: (process.argv[2] != null && Platform[process.argv[2]] != null ? Platform[process.argv[2]] : getCurrentPlatform()).createTarget(),
    config: {
        appId: 'eu.trainznation.pdllauncher',
        productName: 'Pays de la Loire launcher',
        artifactName: '${productName}.${ext}',
        copyright: 'Copyright © 2020 Trainznation',
        directories: {
            buildResources: 'build',
            output: 'dist'
        },
        win: {
            target: [
                {
                    target: 'nsis',
                    arch: 'x64'
                }
            ]
        },
        nsis: {
            oneClick: false,
            perMachine: false,
            allowElevation: true,
            allowToChangeInstallationDirectory: true
        },
        mac: {
            target: 'dmg',
            category: 'public.app-category.games'
        },
        linux: {
            target: 'AppImage',
            maintainer: 'Trainznation',
            vendor: 'Trainznation',
            synopsis: 'Pays de la Loire Launcher',
            description: 'Launcher du site de Trainznation pour Trainz Railroad Simulator 2019',
            category: 'Game'
        },
        compression: 'maximum',
        files: [
            '!{dist,.gitignore,.vscode,docs,dev-app-update.yml,.travis.yml,.nvmrc,.eslintrc.json,build.js}'
        ],
        extraResources: [
            'libraries'
        ],
        asar: true
    }
}).then(() => {
    console.log('Build complete!')
}).catch(err => {
    console.error('Error during build!', err)
})