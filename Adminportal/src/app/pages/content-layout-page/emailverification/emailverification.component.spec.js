"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var emailverification_component_1 = require("./emailverification.component");
describe('EmailverificationComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.waitForAsync(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [emailverification_component_1.EmailverificationComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(emailverification_component_1.EmailverificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=emailverification.component.spec.js.map