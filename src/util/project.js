"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultSourceRoot = exports.getProject = void 0;
const schematics_1 = require("@angular-devkit/schematics");
/** Returns the project object from the angular.json file based on project name
 * @param tree - The virtual file system tree
 * @param projectName - The name of the project
 * @returns The project object from angular.json
 */
function getProject(tree, projectName) {
    if (!projectName) {
        throw new schematics_1.SchematicsException('Option (project) is required.');
    }
    const workspaceConfigBuffer = tree.read('angular.json');
    if (!workspaceConfigBuffer) {
        throw new schematics_1.SchematicsException('Not an Angular CLI workspace');
    }
    const workspaceConfig = JSON.parse(workspaceConfigBuffer.toString());
    const project = workspaceConfig === null || workspaceConfig === void 0 ? void 0 : workspaceConfig.projects[projectName];
    if (!project) {
        throw new schematics_1.SchematicsException('Project is not defined in this workspace');
    }
    return project;
}
exports.getProject = getProject;
/** Returns the default source root for the project
 * @param project - The project object from angular.json
 * @returns The default source root for the project
*/
function getDefaultSourceRoot(project) {
    const sourceRoot = (project === null || project === void 0 ? void 0 : project.sourceRoot) || 'src';
    const prefix = (project === null || project === void 0 ? void 0 : project.prefix) || 'app';
    return `${sourceRoot}/${prefix}`;
}
exports.getDefaultSourceRoot = getDefaultSourceRoot;
//# sourceMappingURL=project.js.map