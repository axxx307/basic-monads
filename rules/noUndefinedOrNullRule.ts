import * as Lint from "tslint"
import * as ts from "typescript"
import * as tsutils from "tsutils"

interface UndefinedLiteral extends ts.PrimaryExpression {
    readonly kind: ts.SyntaxKind.UndefinedKeyword;
}

function isUndefinedNode (node: ts.Node): boolean {
    return node.kind === ts.SyntaxKind.Identifier && node.getText() === 'undefined';
}

function isOptionalParameter (node: ts.Node): boolean {
    const isQuestion = node.kind === ts.SyntaxKind.QuestionToken;
    const parent = node.parent;
    if (!isQuestion || !parent) return false

    const children = parent.getChildren();
    if (children.length === 0) return false;

    const colon = children.find(child => child.kind === ts.SyntaxKind.ColonToken);
    return !!colon;
}

// A class name with Rule must be exported by Rule files, and it must extend `Lint.Rules.AbstractRule`.
export class Rule extends Lint.Rules.AbstractRule {

    // This provides configuration and information about what the Rule does and the settings to expect.
    public static metadata: Lint.IRuleMetadata = {

        // The name of the Rule in kebab-case, this is what users will provided in tslint.json at the "rules" section to add this Rule to the project.
        ruleName: "no-undefined-or-null",

        // Describes what the Rule does.
        description: "Enforces Null or Undefined types to be of type Option.",
        optionsDescription: "Not configurable.",
        options: null,
        type: "style",
        typescriptOnly: true,
    }

    // This provides the text description to be displayed when the lint Rule is failed by the class.
    public static FAILURE_STRING = "Types Null, Undefined must be of type Option";

    // This is the method every Rule must implement.
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new ClassNamePascalCaseWalker(sourceFile, Rule.metadata.ruleName, void this.getOptions()))
    }
}

class ClassNamePascalCaseWalker extends Lint.AbstractWalker {
    public walk(sourceFile: ts.SourceFile) {
        const cb = (node: ts.Node): void => {
            if (tsutils.isNullLiteral(node) || isUndefinedNode(node) || isOptionalParameter(node)) {
                this.addFailureAtNode(node, Rule.FAILURE_STRING);
            }

            return ts.forEachChild(node, cb);
        }

        return ts.forEachChild(sourceFile, cb);
    }
}
