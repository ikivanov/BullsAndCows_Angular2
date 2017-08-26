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
var NumberSelectorComponent = (function () {
    function NumberSelectorComponent() {
        this.number1 = 1;
        this.number2 = 2;
        this.number3 = 3;
        this.number4 = 4;
        this.disabled = false;
        this.isValidInput = true;
        this.guess = new core_1.EventEmitter();
    }
    NumberSelectorComponent.prototype.onGuessBtnClicked = function () {
        var number = [this.number1, this.number2, this.number3, this.number4];
        this.guess.emit(number);
    };
    NumberSelectorComponent.prototype.onNumberChanged = function () {
        this.isValidInput = this.isValidNumber();
    };
    NumberSelectorComponent.prototype.isValidNumber = function () {
        if (this.number1 === 0) {
            return false;
        }
        var nums = [this.number1, this.number2, this.number3, this.number4];
        //are numbers different from each other?
        for (var i = 0; i < nums.length; i++) {
            for (var j = nums.length - 1; j > i; j--) {
                if (nums[i] == nums[j])
                    return false;
            }
        }
        return true;
    };
    return NumberSelectorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], NumberSelectorComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], NumberSelectorComponent.prototype, "guess", void 0);
NumberSelectorComponent = __decorate([
    core_1.Component({
        selector: 'number-selector',
        templateUrl: './number-selector.component.html',
    })
], NumberSelectorComponent);
exports.NumberSelectorComponent = NumberSelectorComponent;
//# sourceMappingURL=number-selector.component.js.map