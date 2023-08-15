import { Tree } from "@angular-devkit/schematics";
/** Returns the project object from the angular.json file based on project name
 * @param tree - The virtual file system tree
 * @param projectName - The name of the project
 * @returns The project object from angular.json
 */
export declare function getProject(tree: Tree, projectName: string): any;
/** Returns the default source root for the project
 * @param project - The project object from angular.json
 * @returns The default source root for the project
*/
export declare function getDefaultSourceRoot(project: any): string;
