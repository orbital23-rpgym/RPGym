# RPGym

<img src="docs/images/icon.png" width="100" />

RPGym is a gamified workout tracker app developed for NUS School of Computing Orbital (Summer 2023).

## Installation

- **iOS/Android (recommended):** RPGym can be run with the Expo Go app using the QR code/link on the [Expo update page](https://expo.dev/%40xenosf/rpgym?serviceType=eas&distribution=expo-go&scheme=exp%2Brpgym&channel=preview&sdkVersion=48.0.0).
- **Web:** RPGym can be run through a web browser using the [web application link](https://rpgym-ddbd4.web.app/).
  - Caveat: Some features (e.g. icons) may not work as well on web.

For development, see the ["Getting Started" section of the developer guide](/docs/dev.md#getting-started).

## Technical Information

### Tech Stack

Front end:

- React Native (Expo) - UI

Back end:

- Firebase Authentication - User authentication
- Firebase Cloud Firestore - Data storage

Other tools:

- Husky - Pre-commit hooks
- Jest - Testing
- ESLint/TypeScript - Static analysis
- Commitlint - Commit message standardization
- Prettier - Code formatting
- GitHub Actions - CI/CD

### Software Design

See the [software design documentation](/docs/design.md).

## Contributing

See the [developer guide](/docs/dev.md).
