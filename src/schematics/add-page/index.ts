import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

export default function addPage(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const componentPath = `src/app/${strings.dasherize(options.path)}/${strings.dasherize(options.name)}`;

    const componentFileName = `${strings.dasherize(options.name)}.component`;
    const componentContent = `import { Component, OnInit, OnDestroy } from '@angular/core';
    
import { Subscription } from 'rxjs';

@Component({
  selector: '${options.name}-selector',
  templateUrl: './${strings.dasherize(options.name)}.component.html',
  styleUrls: ['./${strings.dasherize(options.name)}.component.scss']
})
export class ${strings.classify(options.name)}Component implements OnInit, OnDestroy {

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

    const moduleRoutingFileName = `${strings.dasherize(options.name)}-routing.module`;
    const moduleRoutingContent = `import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ${strings.classify(options.name)}Component } from './${componentFileName}';

const routes: Routes = [
  {
    path: '',
    component: ${strings.classify(options.name)}Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ${strings.classify(options.name)}RoutingModule { }
    `;

    const moduleFileName = `${strings.dasherize(options.name)}.module`;
    const moduleContent = `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ${strings.classify(options.name)}RoutingModule } from './${moduleRoutingFileName}';
import { ${strings.classify(options.name)}Component } from './${componentFileName}';

@NgModule({
  declarations: [
    ${strings.classify(options.name)}Component
  ],
  imports: [
    CommonModule,
    ${strings.classify(options.name)}RoutingModule,
  ]
})
export class ${strings.classify(options.name)}Module { }
    `;

    tree.create(`${componentPath}/${componentFileName}.ts`, componentContent);
    tree.create(`${componentPath}/${strings.dasherize(options.name)}.component.html`, componentHtmlContent);
    tree.create(`${componentPath}/${strings.dasherize(options.name)}.component.scss`, componentScssContent);

    tree.create(`${componentPath}/${moduleRoutingFileName}.ts`, moduleRoutingContent);
    tree.create(`${componentPath}/${moduleFileName}.ts`, moduleContent);

    context.logger.log('info', `✅️ Created ${componentFileName}`);
    context.logger.log('info', `✅️ Created ${strings.dasherize(options.name)}.component.html`);
    context.logger.log('info', `✅️ Created ${strings.dasherize(options.name)}.component.scss`);
    context.logger.log('info', `✅️ Created ${moduleRoutingFileName}`);
    context.logger.log('info', `✅️ Created ${moduleFileName}`);

    return tree;
  };
}
