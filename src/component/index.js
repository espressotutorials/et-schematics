"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.component = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const project_1 = require("../util/project");
/** When users run the `ng g ds-schematics:component` command, the Angular CLI will execute this `component` function.
 * Generates a standalone component or a component that is part of an ngNodule.
 * Option `project` determines the default path for the component.
 * For example, if the `project` is set to `my-lib`, the default path will be `projects/my-lib/src/lib`.
*/
function component(options) {
    return (tree, context) => {
        context.logger.info(JSON.stringify(options) + ' params to generate the component');
        const project = (0, project_1.getProject)(tree, options.project);
        const componentTemplates = options.standalone ? 'standalone-component' : 'component';
        if (options.path === undefined) {
            options.path = (0, project_1.getDefaultSourceRoot)(project);
        }
        // Create a template source from the ejs template files in the `files` directory.
        // Pass in the options (such as name) to the template function to replace the placeholders with the values from the options.
        // Pass in the strings utility to the template function to convert strings to formats such as dasherize, classify, etc.
        const templateSource = (0, schematics_1.apply)((0, schematics_1.url)(`./files/${componentTemplates}`), [
            (0, schematics_1.template)(Object.assign(Object.assign({}, core_1.strings), options)),
            // Move the generated files to the designated path when the schematic is applied.
            (0, schematics_1.move)((0, core_1.normalize)(options.path)),
        ]);
        // Chain multiple rules together and execute them one after the other.
        // First the `externalSchematic` method generates a component using the Angular CLI schematic.
        // Then the `mergeWith` method merges the files generated from the templateSource with the files generated from the Angular CLI schematic.
        return (0, schematics_1.chain)([
            (0, schematics_1.externalSchematic)('@schematics/angular', 'component', Object.assign(Object.assign({}, options), { style: 'scss', skipImport: false })),
            (0, schematics_1.mergeWith)(templateSource, schematics_1.MergeStrategy.Overwrite),
        ]);
    };
}
exports.component = component;
//# sourceMappingURL=index.js.map