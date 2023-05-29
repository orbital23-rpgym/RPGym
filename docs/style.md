# Style Guide

All code should follow the established style. Much of the formatting rules are checked and enforced automatically, but some things, such as naming conventions, still have to be manually checked.

## Tools

This project uses ESLint and Prettier to enforce code styling rules. If available, installing the corresponding extensions for your code editor will make development easier.

Auto-format all code:

```sh
yarn prettier-format
```

Lint code:

```sh
yarn lint
```

Lint and automatically fix code where possible:

```sh
yarn lint-and-fix
```

Code will also be automatically checked using a pre-commit hook, and after pushing to remote using GitHub Actions.

## Naming Conventions

Use American spelling in code. Names should be concise and descriptive.

### Components

All React components (e.g. screen, button, text field) are to be named using `PascalCase`.

Names of view components representing whole screens are to be suffixed with `Screen` (e.g. `ProfileScreen`).
Controller components' names are to be suffixed with `Controller` (e.g. `EditProfileController`), and model components' names are to be suffixed with `Model` (e.g. `ProfileInfoModel`).

### Classes/Types

Classes and types are to be named using `PascalCase`.

### Functions

Function names are to be named using `camelCase`.

### Variables

Most variable names are to be named using `camelCase`. Constants with literal values are to be named in `SCREAMING_SNAKE_CASE`.

Booleans should be named with a verb that helps describe its purpose (usually "is", "should", "has", "can", "did", "will"; e.g. `isValid`, `hasOngoingQuest`)

## Formatting

Prettier and ESLint have been set up to check and automatically fix formatting. Some of the rules implemented are:

- Tab size: 2 spaces
- Line ending: LF
- Always use double quotes
