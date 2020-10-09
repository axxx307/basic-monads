"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Lint = require("tslint");
var ts = require("typescript");
var tsutils = require("tsutils");
function isUndefinedNode(node) {
    return node.kind === ts.SyntaxKind.Identifier && node.getText() === 'undefined';
}
function isOptionalParameter(node) {
    var isQuestion = node.kind === ts.SyntaxKind.QuestionToken;
    var parent = node.parent;
    if (!isQuestion || !parent)
        return false;
    var children = parent.getChildren();
    if (children.length === 0)
        return false;
    var colon = children.find(function (child) { return child.kind === ts.SyntaxKind.ColonToken; });
    return !!colon;
}
// A class name with Rule must be exported by Rule files, and it must extend `Lint.Rules.AbstractRule`.
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // This is the method every Rule must implement.
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new ClassNamePascalCaseWalker(sourceFile, Rule.metadata.ruleName, void this.getOptions()));
    };
    // This provides configuration and information about what the Rule does and the settings to expect.
    Rule.metadata = {
        // The name of the Rule in kebab-case, this is what users will provided in tslint.json at the "rules" section to add this Rule to the project.
        ruleName: "no-undefined-or-null",
        // Describes what the Rule does.
        description: "Enforces Null or Undefined types to be of type Option.",
        optionsDescription: "Not configurable.",
        options: null,
        type: "style",
        typescriptOnly: true
    };
    // This provides the text description to be displayed when the lint Rule is failed by the class.
    Rule.FAILURE_STRING = "Types Null, Undefined must be of type Option";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ClassNamePascalCaseWalker = /** @class */ (function (_super) {
    __extends(ClassNamePascalCaseWalker, _super);
    function ClassNamePascalCaseWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClassNamePascalCaseWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            if (tsutils.isNullLiteral(node) || isUndefinedNode(node) || isOptionalParameter(node)) {
                _this.addFailureAtNode(node, Rule.FAILURE_STRING);
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    return ClassNamePascalCaseWalker;
}(Lint.AbstractWalker));
