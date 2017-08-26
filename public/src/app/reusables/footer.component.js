"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var FooterComponent = (function () {
    function FooterComponent() {
    }
    return FooterComponent;
}());
FooterComponent = __decorate([
    core_1.Component({
        selector: 'footer',
        template: "\n\t\t\t<div>\n\t\t\t\t<h5 class=\"footer\">\n\t\t\t\t\tImplemented by <a href=\"mailto:ikivanov@gmail.com\">Ivan Ivanov</a>\n\t\t\t\t</h5>\n\t\t\t\t<h5 class=\"footer2\">\n\t\t\t\t\tPhone: +359 888 959 386\n\t\t\t\t</h5>\n\t\t\t</div>\n\t",
    })
], FooterComponent);
exports.FooterComponent = FooterComponent;
//# sourceMappingURL=footer.component.js.map