"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ServerOutputComponent = (function () {
    function ServerOutputComponent() {
    }
    return ServerOutputComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ServerOutputComponent.prototype, "output", void 0);
ServerOutputComponent = __decorate([
    core_1.Component({
        selector: 'server-output',
        template: "\n\t\t\t<select class=\"server-output\" multiple size=\"12\">\n\t\t\t\t<option *ngFor=\"let o of output\">\n\t\t\t\t\t{{o}}\n\t\t\t\t</option>\n\t\t\t</select>\n  \t\t"
    })
], ServerOutputComponent);
exports.ServerOutputComponent = ServerOutputComponent;
//# sourceMappingURL=server-output.component.js.map