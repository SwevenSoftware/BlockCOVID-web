![Build status](https://github.com/SwevenSoftware/BlockCOVID-web/actions/workflows/build-bundle.yml/badge.svg)
# BlockCOVID-web
## Description
Web module for the project BlockCOVID.
This module provides a web interface for the administrator of a running instnace of the [**server**](https://github.com/SwevenSoftware/BlockCOVID-server) module.

## Usage
### Prerequisites
This module requires an instance of the server module running on the same host. The latest version of npm is also necessary in order to test, build and run the server, a detailed guide on how to install it can be found [here](https://www.npmjs.com/get-npm).

### Building
```shell
nom install
npm run build
```
A dist folder will be created with the bundled app in it, configured for a production environment
#### Dev
```shell
npm run dev
```
Builds the bundled application for a development environment

### Running
```shell
npm start
```
this step does not require the application to be built.

## Contributing
We adopt a [Gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).
So in order to contribute to the application the steps are:
- start from `develop` branch
- `git flow feature start [faeture name]` (alternatively `git checkout -b feature/[feature name]`)
- Implement the new feature and the corresponding tests
- commit your changes
- `git flow feature pulish [feature name]` (alternatively `git push -u origin feature/[feature name]`)
- open a pull request describing your changes and addressing issues if necessary
eventually an administrator will review your work and merge it in the develop branch.
### pre-commit hook
Builds will fail if the code is not compiant with the [typescript-formatter](https://www.npmjs.com/package/typescript-formatter) formatting.
Therefore add this hook to git that prevents you from committing anything that is not correctly formatted
```shell
cp pre-commit.sh .git/hooks/pre-commit
```
text can be formatted with
```shell
npm run formatApply
```
