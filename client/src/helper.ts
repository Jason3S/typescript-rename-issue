import type { Command, Diagnostic } from 'vscode';
import { CodeAction, CodeActionKind, Position, Range } from 'vscode';
import type { Command as LanguageClientCommand } from 'vscode-languageclient/node';
import {
    CodeAction as LsCodeAction,
    Diagnostic as LcDiagnostic,
    Position as LcPosition,
    Range as LcRange,
} from 'vscode-languageclient/node';

import { diagSeverityMap } from './MapDiagnosticSeverity';
import type { RangeLike } from './models';

export function isLcCodeAction(c: LanguageClientCommand | LsCodeAction): c is LsCodeAction {
    return LsCodeAction.is(c);
}

export function mapLcCodeAction(c: LsCodeAction): CodeAction {
    const kind = (c.kind !== undefined && CodeActionKind.Empty.append(c.kind)) || undefined;
    const action = new CodeAction(c.title, kind);
    action.command = c.command && mapLcCommand(c.command);
    return action;
}

function mapLcCommand(c: LanguageClientCommand): Command {
    return c;
}

export function mapDiagnosticToLc(d: Diagnostic): LcDiagnostic {
    const diag = LcDiagnostic.create(mapRangeToLc(d.range), d.message, diagSeverityMap[d.severity], undefined, d.source);
    return diag;
}

export function mapRangeToLc(r: Range): LcRange {
    const { start, end } = r;
    return LcRange.create(mapPositionToLangClient(start), mapPositionToLangClient(end));
}

export function mapPositionToLangClient(p: Position): LcPosition {
    const { line, character } = p;
    return LcPosition.create(line, character);
}

export function toPosition(p: Position | LcPosition): Position {
    if (p instanceof Position) return p;
    return new Position(p.line, p.character);
}

export function toRange(r: RangeLike): Range {
    if (r instanceof Range) return r;
    if (Array.isArray(r)) {
        return new Range(toPosition(r[0]), toPosition(r[1]));
    }
    return new Range(toPosition(r.start), toPosition(r.end));
}
