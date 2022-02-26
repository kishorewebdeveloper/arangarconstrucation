"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var resetpassword_component_1 = require("./resetpassword.component");
describe('ResetpasswordComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.waitForAsync(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [resetpassword_component_1.ResetpasswordComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(resetpassword_component_1.ResetpasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=resetpassword.component.spec.js.map