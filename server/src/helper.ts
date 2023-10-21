import type { Command as LanguageClientCommand } from 'vscode-languageserver/node.js';
import { CodeAction, Position, Range } from 'vscode-languageserver/node.js';

export function isLcCodeAction(c: LanguageClientCommand | CodeAction): c is CodeAction {
    return CodeAction.is(c);
}

export function toPosition(p: PositionLike): Position {
    if (Position.is(p)) return p;
    return Position.create(p[0], p[1]);
}

export function toRange(r: RangeLike): Range {
    if (Range.is(r)) return r;
    return Range.create(toPosition(r[0]), toPosition(r[1]));
}

type PositionLike = Position | [number, number];

type RangeLike = Range | [PositionLike, PositionLike];
