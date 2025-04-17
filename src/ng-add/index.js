"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngAdd = ngAdd;
const schematics_1 = require("@angular-devkit/schematics");
function ngAdd(_options) {
    return (0, schematics_1.chain)([
        (0, schematics_1.schematic)('add-page', _options),
    ]);
}
//# sourceMappingURL=index.js.map