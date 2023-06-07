# Project Directory

This file documents important folders and files in this project's source code.

- `.`
  - `docs`: Project documentation files, commonly written in markdown.
  - `assets`: Static assets (e.g. font files, images)
  - `constants`: Importable constants (e.g. theme colors, strings).
  - `library`: Components and/or functions that are used project-wide.
    - `components`: Reusable UI components.
    - `hooks`: React hooks.
  - `app`
    - Used by expo-router to determine routing based on directory structure. (More info: [expo-router docs](https://expo.github.io/router/docs/features/routing))
    - Directories with names in parentheses (e.g. `(auth)`) are treated as groups and will not show up as a segment in URLs/route paths.
    - As the organisation of underlying features may differ from routes, most of the view/model/controller code should be in `src`. View components in `app` should simply import and return the view component from the corresponding file in `src`.
  - `src`
    - Contains the bulk of the source code (models, views, controllers). Grouped by feature.
