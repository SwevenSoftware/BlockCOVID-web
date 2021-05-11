![Build status](https://github.com/SwevenSoftware/BlockCOVID-web/actions/workflows/build-bundle.yml/badge.svg)
# BlockCOVID-web
## Description
Web module for the project BlockCOVID.
This module provides a web interface for the administrator of a running instnace of the [**server**](https://github.com/SwevenSoftware/BlockCOVID-server) module.

## Usage
### Prerequisites
This module requires an instance of the server module running. By default the client tries to redirect all api requests to `localhost:8091`, if you have an instance of the server module running somewhere else you should change the default proxy behaviour in `nginx.conf`, for example
```conf
location /api/ {
    proxy_pass http://my.api.server:8091;
}
```
redirects all api requests to `my.api.server:8091`

The latest version of npm is also necessary in order to test, build and run the server, a detailed guide on how to install it can be found [here](https://www.npmjs.com/get-npm).

### Building
```shell
npm install
npm run build
```
A dist folder will be created with the bundled app in it, configured for a production environment

#### Dev
```shell
npm run dev
```
Builds the bundled application for a development environment

### Running
#### Deploy
```shell
docker-compose up --build -d
```
builds the container and starts it as a daemon, logs can be found in the `logs` folder (if not present it should be created). 
#### Development environment
```shell
npm start
```
Starts a `serve` server to test the application. 

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
