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
The following process builds a static version of the server and deploys it through a docker container running a [nginx](https://nginx.org/en/)
web server. Api redirection is handled through nginx, so configure it as described in the previous section. The steps to accomplish in order to 
run the application are
```shell
# Install the dependencies
npm install
# Build the static bundle
npm run build
# build and run the container
docker-compose up --build -d
```
A daemonized container will be created, running the application.

#### Development environment
```shell
npm run dev
```
Builds the bundled application for a development environment, do this instead of `npm run build` in the building process
to run the development environment.

#### Dynamic development
```shell
npm start
```
Starts a `serve` server to test the application, this solution allows a dynamic recompiling of the application after 
every change.  

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
