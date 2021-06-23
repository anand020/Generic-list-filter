# GenericListFilter

The simplest solution to club multiple filter's at one place in Angular.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.6.

# Quick Start

```
npm install generic-list-filter --save

```

## Angular Version

This library is built to work with **Angular 10+**.


## Simple Example

```TypeScript
//app.module.ts
import { GenericListFilterModule } from 'generic-list-filter';// <-- import the module

@NgModule({
    imports: [BrowserModule, GenericListFilterModule], // <-- include it in your app module
    declarations: [MyComponent],
    bootstrap: [MyComponent]
})


export class MyAppModule {}
```
```TypeScript
//my.component.ts

import {Component} from '@angular/core';
@Component({
    selector: 'my-component',
    template: `
     <app-filter
        [list]="filterList" 
        (onFilterChange)="filterChange($event)" >
     </app-filter>
    `
})
export class MyComponent {
    filterList = {
        country : ['India', 'USA', 'Japan', 'Australia'],
        sector: ['IT', 'Agriculture', 'Medical']
        //here you can add as many filters as you want.
        };  

//put this function in your ts file.
   filterChange(appliedfilters) {
         console.log(appliedfilters);
         /*let you have selected India as country and IT sector.

         you will get an object here i.e.

        { appliedFilterValues: {country: "India",sector: "IT"}
        isFilter: true
        }
         */
         
         //now do your awesome filtering work here.
   }

}

```

To place this filter in your HTML put this code into your html file.

```HTML
     <app-filter
        [list]="filterList" 
        (onFilterChange)="filterChange($event)" >
     </app-filter>
```


* **`list`** [`Object`] it is an object in which we will pass our filters list.
* **`onFilterChange`** [`event handler`] The expression specified will be invoked whenever the filter will be applied via a click on [`Apply` button in interface].

```TypeScript
@Input() list;
@Output() onFilterChange = new EventEmitter();
```

To fix the button styling put this app-btn class into your styles.scss file.

you can modify this button styling as per your project requirement.

```CSS
.app-btn {
    height: 32px;
    width: 110px;
    background: #f28100; 
    border: none;
    color: #fff;
    outline: none;
    cursor: pointer;
    border-radius: 2px;
  }
```

If you are facing list related alignment or hover UI issues please make sure you have this line into your styles.scss.

```CSS
* {
  box-sizing: border-box;
}
```

If you don't have font-awesome into your project don't forget to add.

To add font-awesome please paste below line into your index.html file.

```HTML
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
```
for cross-icon please download below image and name it as crossIcon.png and paste it at your assets/images location.
![crossIcon](https://user-images.githubusercontent.com/67621602/123040311-2ed25180-d411-11eb-9dd9-85d4a102a9de.png)


See Here a Final Demo What you will get.


![generic-demo3](https://user-images.githubusercontent.com/67621602/123042615-b53c6280-d414-11eb-91fd-b73b39de0eaf.gif)







## Code scaffolding

Run `ng generate component component-name --project generic-list-filter` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project generic-list-filter`.
> Note: Don't forget to add `--project generic-list-filter` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build generic-list-filter` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build generic-list-filter`, go to the dist folder `cd dist/generic-list-filter` and run `npm publish`.

## Running unit tests

Run `ng test generic-list-filter` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
