# cookie-policy-banner

[![npm](https://img.shields.io/npm/v/@edx/cookie-policy-banner.svg)](https://www.npmjs.com/package/@edx/cookie-policy-banner)
[![npm](https://img.shields.io/npm/dt/@edx/cookie-policy-banner.svg)](https://www.npmjs.com/package/@edx/cookie-policy-banner)

## Introduction

edX cookie policy banner React component

## Installation

```bash
npm i --save @edx/cookie-policy-banner
```

## Usage

```jsx
import CookiePolicyBanner from '@edx/cookie-policy-banner';

// Can import sass file this way
// Or as an import in one of your sass files with other third party sass files
import '@edx/cookie-policy-banner/build/cookie-policy-banner.scss';

const SomeWrappingComponent = () => (
  <div>
    <span>Blahblablah</span>
    <CookiePolicyBanner />
  </div>
);
```

### Styling

As noted in a comment in the previous code example, you can import the styles associated with the `CookiePolicyBanner` component directly (if this is supported by your `webpack` config) or by importing the sass file as part of one of your existing sass files (probably where your other third-party sass files are imported).

```sass
// base.scss
@import 'thirdPartySass';
@import 'anotherThirdPartySass';
@import '@edx/cookie-policy-banner/build/cookie-policy-banner';
```

## Storybook

![storybook](https://imgur.com/mZct2v5.png)

[`Storybook`](https://github.com/storybooks/storybook) is a useful tool for showcasing the expected and potential usage of components.

Executing

```bash
npm run start
```

locally builds the Storybook for the `CookiePolicyBanner` component on port `3003`.
