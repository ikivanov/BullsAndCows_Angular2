"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var title_component_1 = require("./reusables/title.component");
var header_component_1 = require("./reusables/header.component");
var footer_component_1 = require("./reusables/footer.component");
var number_selector_component_1 = require("./reusables/number-selector.component");
var server_output_component_1 = require("./reusables/server-output.component");
var human_vs_computer_component_1 = require("./human-vs-computer.component");
var computer_vs_computer_component_1 = require("./computer-vs-computer.component");
var app_routing_module_1 = require("./app-routing.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, app_routing_module_1.AppRoutingModule, forms_1.FormsModule],
        declarations: [
            app_component_1.AppComponent,
            title_component_1.TitleComponent,
            header_component_1.HeaderComponent,
            footer_component_1.FooterComponent,
            number_selector_component_1.NumberSelectorComponent,
            server_output_component_1.ServerOutputComponent,
            human_vs_computer_component_1.HumanVsComputerComponent,
            computer_vs_computer_component_1.ComputerVsComputerComponent
        ],
        bootstrap: [computer_vs_computer_component_1.ComputerVsComputerComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map