import { Rule } from '@angular-devkit/schematics';
/** When users run the `ng g ds-schematics:component` command, the Angular CLI will execute this `component` function.
 * Generates a standalone component or a component that is part of an ngNodule.
 * Option `project` determines the default path for the component.
 * For example, if the `project` is set to `my-lib`, the default path will be `projects/my-lib/src/lib`.
*/
export declare function component(options: any): Rule;
