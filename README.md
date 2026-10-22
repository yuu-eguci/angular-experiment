angular-experiment
===

Want to practice angular-cli + SPA + MPA + i18n + import different external css files in each component.

GitHub page is served from https://yuu-eguci.github.io/angular-experiment/

## Facts

| Item | Value |
| --- | --- |
| Node.js | 24.22.1 LTS (`volta` pins it, `engines` requires `^24.22.1`, `.npmrc` enforces it) |
| Angular | 22 |
| Unit test | Vitest via `ng test` |
| Locales | en (default), ja, ro |
| CI | GitHub Actions (`.github/workflows/ci.yml`) |
| Deploy | Not provided (`gh-pages` branch still holds the 2020 Angular 8 build) |
| ! Docker | Not provided |

## Quickstart

```bash
npm ci
# Serve English version on http://localhost:4200/
npm start
# Serve Japanese / Romanian version
npm start -- --configuration=ja
npm start -- --configuration=ro
# Unit tests and Node version / dependency checks
npm test -- --watch=false
npm run test:node
# Build en into dist/angular-experiment/browser/ and ja / ro into its subdirectories
npm run build
```
