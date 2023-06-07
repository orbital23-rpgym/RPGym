# Development Guide

This document is intended as a comprehensive guide for anyone working on the codebase of RPGym.

## Getting Started

### Installation

Install prerequisites:

- [Expo requirements](https://docs.expo.dev/get-started/installation/#requirements) (including Yarn)

Clone repository:

```sh
git clone https://github.com/orbital23-rpgym/RPGym.git
```

Install project dependencies:

```sh
yarn
```

### Running RPGym Locally

Start local server:

```sh
yarn run start
```

Follow the instructions that appear to test the app on web/iOS/Android.

Notes:

- `localhost` links only work on the same computer the server is running on.
- The phone scanning the QR code must be on the same local network (e.g. both connected to home WiFi).
- Android phones must first download the Expo app from the Play Store.

## Directory structure

Major subfolders and their purposes are outlined in the [file structure documentation](/docs/directory.md).

Generally, only screen view components should be exported as the default value of a file, to avoid issues with expo-router's file-based routing.

## Workflow

### Branches

This project's workflow is based on [GitLab Flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html#production-branch-with-gitlab-flow).

#### Permanent Branches

- `main`: Main development branch.
  - Should only contain fully working and tested code that is ready for deployment.
- `production`: Deployment branch.
  - Only merge into this branch from `main`.
  - Pushes to this branch will be automatically deployed (see [Deployment](#deployment)).

#### Temporary Branches

- When developing a new feature or fixing something, create a new branch and work on that branch.
- Once work on the branch is completed, create a pull request into `main`, and delete the branch once merged.
- These short-lived branches should follow the naming convention below:
  - `feature/short-description`: Adding, refactoring or removing a feature (e.g. `feature/avatar-customisation`)
  - `fix/short-description`: Bugfixes (e.g. `fix/profile-alignment`)
  - `type/short-description`: Other types as needed (e.g. `docs`, `chore`)

### Code Style

- Code should conform to the [project style guide](/docs/style.md).

### Organization

Logic/business code should be kept separate from view/UI code, following the Model-View-Controller design pattern.

Code should be split up into discrete files where possible to facilitate testing. In particular, each React component must have its own file.

### Documentation

Comments should be added if parts are not clear. If suppressing a linter rule, comment the reason why.

Where possible, document functions using [JSDoc comments](https://jsdoc.app/about-getting-started.html#adding-documentation-comments-to-your-code).

### Commits

- Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) naming convention.
  - General format: `type: description`
    - Type should be lowercase. Types:
      - `build`: Related to build/deploy
      - `chore`: Tools, config
      - `ci`: Setup related to continuous integration
      - `docs`: Documentation-only changes
      - `feat`: Code that adds or changes features (including their corresponding tests)
      - `fix`: Code that fixes bugs
      - `perf`: Code that improves performance
      - `refactor`: Code that neither adds a new feature or fixes bugs
      - `revert`: Revert changes
      - `style`: Changes that do not alter code's meaning, but only style (e.g. whitespace)
      - `test`: Add or fix tests
    - Description should be short, informative, and start with a verb in the simple present tense.
  - e.g. `feat: add avatar to profile page`
- Commits should be atomic; this makes it easier to track and revert changes as needed.
  - Commit often and break down commits into the smallest possible parts. For example, if working on 2 screens, commit each screen's changes separately.
- Rebase carefully. Avoid rebasing commits that have already been pushed to remote.

#### Pre-Commit Hooks

- Pre-commit hooks have been set up. These run automatically when you try to commit and help ensure commits follow our standards.
- Our pre-commit hooks:
  - Fix code formatting
  - Lint code for mistakes
  - Check that the commit name follows conventions
  - Run unit tests
- Committing will be blocked if the above actions fail.

## Integration

- Once work on a feature/fix branch is completed, create a pull request into `main` to integrate it into the main codebase.
- Test before creating a pull request.
- Merge only after code review & checks.
- When merging a pull request, use the default `Merge pull request` option. Change the merge message to be more descriptive (follow the [commit naming convention](#commits)).

### Code Review

- Pull requests are to be manually reviewed by a person before merging.
- Code will be automatically linted/tested.
- Only accept pull requests that pass all automatic & manual checks.

## Deployment

- When ready to deploy, merge changes from `main` into `production`.

- Code on `production` will be automatically deployed to Firebase Hosting, as well as an Expo Application Services update.
