# Espresso Tutorials custom schematics

This repository contains custom schematics for generating Angular components and services for Espresso Tutorials angular projects.

### Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with

```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm run release
```

## Usage

### Installation
```bash
npm install @espressotutorialsgmbh/et-schematics
```

### Generate a page
```bash
ng g @espressotutorialsgmbh/et-schematics:add-page --name={NAME} --path={PATH}
```

#### Attributes
`name` - The name of the page to generate.\
`path` - The path at which to create the page. If not specified, the page will be created at the default path "pages" of the project.
