# TypeScript Rename Issue

This repo demonstrates a TypeScript rename import issue.

Things that seem to be important:

1. It is using NPM Workspaces
1. `node_modules` is not in the workspace directories.
1. Renaming an import that was already named using `as`.

Setup:
1. `npm i`
2. `npm run build`

Steps:
1. Open `clinet/src/helper.ts`
2. Rename `LcCodeAction` to `LsCodeAction`
   <img width="708" alt="image" src="https://github.com/Jason3S/typescript-rename-issue/assets/3740137/a0c41a50-d86c-4b01-a718-550e02c6a8e6">

Result:
- Notice the errors in `client/src/helper.ts:
   <img width="876" alt="image" src="https://github.com/Jason3S/typescript-rename-issue/assets/3740137/a9de1236-1e34-44cf-8123-ea263183aa6b">
- Notice that `server/src/helper.ts` was also incorrectly changed
  <img width="1211" alt="image" src="https://github.com/Jason3S/typescript-rename-issue/assets/3740137/dac48132-5722-49fd-84fc-e57e353d3e47">
- Notice that `node_modules/vscode-languageserver-types/lib/umd/main.d.ts` was also changed.
  <img width="690" alt="image" src="https://github.com/Jason3S/typescript-rename-issue/assets/3740137/3cef38a8-8b01-48c7-acc9-803de68513c8">
