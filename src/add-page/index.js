"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPage = void 0;
const core_1 = require("@angular-devkit/core");
function addPage(options) {
    return (tree, context) => {
        const componentPath = `src/app/${core_1.strings.dasherize(options.path)}/${core_1.strings.dasherize(options.name)}`;
        const componentFileName = `${core_1.strings.dasherize(options.name)}.component`;
        const componentContent = `import { Component, OnInit, OnDestroy } from '@angular/core';
    
import { Subscription } from 'rxjs';

@Component({
  selector: '${options.name}-selector',
  templateUrl: './${core_1.strings.dasherize(options.name)}.component.html',
  styleUrls: ['./${core_1.strings.dasherize(options.name)}.component.scss']
})
export class ${core_1.strings.classify(options.name)}Component implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  
  constructor() {
    console.log('${options.name}Component constructor called');
  }

  ngOnInit(): void {
    console.log('${options.name}Component ngOnInit called');
  }

  ngOnDestroy(): void {
    console.log('${options.name}Component ngOnDestroy called');
    if (this.subscriptions && this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
    `;
        const componentHtmlContent = `<p>${options.name} works!</p>`;
        const componentScssContent = `/* Add your styles here */`;
        const moduleRoutingFileName = `${core_1.strings.dasherize(options.name)}-routing.module`;
        const moduleRoutingContent = `import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ${core_1.strings.classify(options.name)}Component } from './${componentFileName}';

const routes: Routes = [
  {
    path: '',
    component: ${core_1.strings.classify(options.name)}Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ${core_1.strings.classify(options.name)}RoutingModule { }
    `;
        const moduleFileName = `${core_1.strings.dasherize(options.name)}.module`;
        const moduleContent = `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ${core_1.strings.classify(options.name)}RoutingModule } from './${moduleRoutingFileName}';
import { ${core_1.strings.classify(options.name)}Component } from './${componentFileName}';

@NgModule({
  declarations: [
    ${core_1.strings.classify(options.name)}Component
  ],
  imports: [
    CommonModule,
    ${core_1.strings.classify(options.name)}RoutingModule,
  ]
})
export class ${core_1.strings.classify(options.name)}Module { }
    `;
        tree.create(`${componentPath}/${componentFileName}.ts`, componentContent);
        tree.create(`${componentPath}/${core_1.strings.dasherize(options.name)}.component.html`, componentHtmlContent);
        tree.create(`${componentPath}/${core_1.strings.dasherize(options.name)}.component.scss`, componentScssContent);
        tree.create(`${componentPath}/${moduleRoutingFileName}.ts`, moduleRoutingContent);
        tree.create(`${componentPath}/${moduleFileName}.ts`, moduleContent);
        context.logger.log('info', `✅️ Created ${componentFileName}`);
        context.logger.log('info', `✅️ Created ${core_1.strings.dasherize(options.name)}.component.html`);
        context.logger.log('info', `✅️ Created ${core_1.strings.dasherize(options.name)}.component.scss`);
        context.logger.log('info', `✅️ Created ${moduleRoutingFileName}`);
        context.logger.log('info', `✅️ Created ${moduleFileName}`);
        return tree;
    };
}
exports.addPage = addPage;
//# sourceMappingURL=index.js.map