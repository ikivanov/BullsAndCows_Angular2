"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var TitleComponent = (function () {
    function TitleComponent() {
    }
    return TitleComponent;
}());
TitleComponent = __decorate([
    core_1.Component({
        selector: 'game-title',
        template: "\n\t\t\t<h1 class=\"welcome-title\">\n\t\t\t\t<div>Welcome to</div>\n\t\t\t\t<div>Bulls and Cows!</div>\n\t\t\t</h1>\n\t"
    })
], TitleComponent);
exports.TitleComponent = TitleComponent;
//# sourceMappingURL=title.component.js.map