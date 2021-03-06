"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./home.component");
var human_vs_computer_component_1 = require("./human-vs-computer.component");
var computer_vs_computer_component_1 = require("./computer-vs-computer.component");
var multiplayer_component_1 = require("./multiplayer.component");
var peer_2_peer_component_1 = require("./peer-2-peer.component");
var routes = [
    { path: '', redirectTo: 'home', pathMatch: "full" },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'humanVsComputer', component: human_vs_computer_component_1.HumanVsComputerComponent },
    { path: 'computerVsComputer', component: computer_vs_computer_component_1.ComputerVsComputerComponent },
    { path: 'multiplayer', component: multiplayer_component_1.MultiplayerComponent },
    { path: 'peer2peer', component: peer_2_peer_component_1.Peer2PeerComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map