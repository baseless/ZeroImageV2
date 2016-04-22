System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AppValidators;
    return {
        setters:[],
        execute: function() {
            AppValidators = (function () {
                function AppValidators() {
                }
                AppValidators.validateUserName = function (c) {
                    return c.value.match("^[a-f]+$") ? null : { validateUserName: { valid: false } };
                };
                AppValidators.validatePassword = function (c) {
                    return c.value.match("^[a-zA-Z]\w{8,60}$") ? null : { validatePassword: { valid: false } };
                };
                return AppValidators;
            }());
            exports_1("AppValidators", AppValidators);
        }
    }
});
//# sourceMappingURL=app-validators.js.map