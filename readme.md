# @appdirect/sfb-toolkit
Storefront Toolkit CLI to power up building your custom theme for AppDirect's Marketplace.

Theming a template leverages [Nunjucks Template System](https://mozilla.github.io/nunjucks/) to keep Server Side Rendering.
It can be easily mixed with eg. HTML, CSS, JavaScript, jQuery, SASS.

### Requirements
* Node 10.x or 12.x for versions 1.x.x to 3.0.6
* Node 16.x for versions 4.x.x

### Release Notes:
**4.0.4**
- Update `@appdirect/sfb-theme-plaza` to version 0.0.64 ([sfb-theme-mp2@0.0.64](https://www.npmjs.com/package/@appdirect/sfb-theme-plaza/v/0.0.64))
- Update `sfb-theme-components` library to version [0.0.321](https://www.npmjs.com/package/@appdirect/sfb-theme-components/v/0.0.321)

**4.0.2**
- `sfb-components` bundles are split by storefront page to improve LCP performance.
- Bug fix: Fix custom components with sfb-toolkit@4 on Windows.
- Bug fix: Fix favicon not showing in the Plaza theme.
- Update `@appdirect/sfb-theme-plaza` to version 0.0.59 ([sfb-theme-mp2@0.0.59](https://www.npmjs.com/package/@appdirect/sfb-theme-plaza/v/0.0.59))
- Update `sfb-theme-components` library to version [0.0.315](https://www.npmjs.com/package/@appdirect/sfb-theme-components/v/0.0.315)

**4.0.1**
- Toolkit is now able to work on Node 16.
- Remove deprecated `node-sass` to compile SASS files in favour of `sass` aka Dart Sass.
- Update `sfb-theme-components` library to version [0.0.293](https://www.npmjs.com/package/@appdirect/sfb-theme-components/v/0.0.293)
- Update `@appdirect/sfb-theme-plaza` to version 0.0.57 ([sfb-theme-mp2@0.0.57](https://www.npmjs.com/package/@appdirect/sfb-theme-plaza/v/0.0.57))
- Update `@appdirect/sfb-theme-classic` to version 0.0.26 ([sfb-theme-classic@0.0.26](https://www.npmjs.com/package/@appdirect/sfb-theme-classic/v/0.0.26))

**3.0.6**
- Update `sfb-theme-components` library to version [0.0.282](https://www.npmjs.com/package/@appdirect/sfb-theme-components/v/0.0.282)
- Update `@appdirect/sfb-theme-plaza` to version 0.0.55 ([sfb-theme-mp2@0.0.55](https://www.npmjs.com/package/@appdirect/sfb-theme-plaza/v/0.0.55))
- Update `@appdirect/sfb-theme-classic` to version 0.0.24 ([sfb-theme-classic@0.0.24](https://www.npmjs.com/package/@appdirect/sfb-theme-classic/v/0.0.24))

**3.0.5**
- Update `sfb-theme-components` library to version [0.0.272](https://www.npmjs.com/package/@appdirect/sfb-theme-components/v/0.0.272)
- Update `@appdirect/sfb-theme-plaza` to version 0.0.53 ([sfb-theme-mp2@0.0.53](https://www.npmjs.com/package/@appdirect/sfb-theme-plaza/v/0.0.53))

**3.0.4**
- Update `sfb-theme-components` library to version [0.0.262](https://www.npmjs.com/package/@appdirect/sfb-theme-components/v/0.0.262)
  - Update custom components section in the Storybook documentation
- Update `@appdirect/sfb-theme-plaza` to version 0.0.50 ([sfb-theme-mp2@0.0.47](https://www.npmjs.com/package/@appdirect/sfb-theme-plaza/v/0.0.50))

**3.0.3**
- Bug fix: Fix `PRODUCTS_LIST` schema type not working on a custom page
- Update `sfb-toolkit package` command to minify `sfb-components.js` bundle
- Update `sfb-theme-components` library to version [0.0.245](https://www.npmjs.com/package/@appdirect/sfb-theme-components/v/0.0.245)
  - Update custom components section in the Storybook documentation
- Update `@appdirect/sfb-theme-plaza` to version 0.0.47 ([sfb-theme-mp2@0.0.47](https://www.npmjs.com/package/@appdirect/sfb-theme-plaza/v/0.0.47))
  - Add product variants template
  - Add `enableProductVariant` theme setting

**3.0.0**
- Add new storefront Header & Footer components
- Add new menu manager in the Visual Editor
- Update `sfb-theme-components` library to version [0.0.237](https://www.npmjs.com/package/@appdirect/sfb-theme-components/v/0.0.237) and the Plaza theme to meet WCAG 2.1 level AA for accessibility
- Update `@appdirect/sfb-theme-plaza` to version 0.0.45 ([sfb-theme-mp2@0.0.45](https://www.npmjs.com/package/@appdirect/sfb-theme-plaza/v/0.0.45))

**2.0.15**
- Add new domain cross-selling page in Plaza theme. ([See Documentation](https://help.appdirect.com/products/Default.htm#StorefrontBuilder/sfb-configure-domain-x-sell.htm))
- Read `crossSellingEnabled` setting from theme to optionally disable cross-selling
- Update `@appdirect/sfb-theme-plaza` to version 0.0.44 ([sfb-theme-mp2@0.0.44](https://www.npmjs.com/package/@appdirect/sfb-theme-plaza/v/0.0.44))

**2.0.14**
- Fix npm security vulnerabilities when running `sfb-toolkit storybook` and `sfb-toolkit components` commands

**2.0.13**
- Customize CTA labels and `i18n` object in the theme ([See Documentation](https://help.appdirect.com/platform/Default.htm#StorefrontBuilder/sfb-override-labels.htm%3FTocPath%3DCustomize%2520the%2520storefront%7CWork%2520with%2520the%2520Storefront%2520Toolkit%7C_____10))

**2.0.10**
- Bug fix: `sfb-toolkit storybook` command throws an error

**2.0.9**
- Update storefront-utils library

**2.0.8**
- Improve the toolbar header view:
  - to preview the header as a regular user or a marketplace manager without a user token
  - to preview the header in the admin portal
- The theme header-footer section can use assets (images, fonts) in the theme assets folder

**2.0.7**
- Bug fix: Default props should be passed properly to custom components
- Bug fix: Custom components do not work in Classic theme
- Bug fix: Removing a null file when `customComponents` folder is created

**2.0.6**
- Updating Classic and Plaza theme

**2.0.5**
- Add new toolkit commands: `storybook` and `components` to build new custom components in your Plaza theme
- Update `setup` and `create` commands to choose between a `Classic` or a `Plaza` theme

**2.0.4**
- Update Classic theme, small fix in leads form
- Update Plaza theme with product domains and bundles page

**2.0.3** 
- Add pricing content to add to cart mock
- Add Support for Storefront Builder Components rendering
- Bug fix: Fix Microsoft subscription upgraded rendering

**2.0.2**
- Added Support for both SASS and SCSS styling file compilation
- Bug fix: Hanging prompt on setup command on Windows

**2.0.1**
- Documentation links updated
- Bug fix: Footer custom JS script parsing

**2.0.0**
 - Classic Theme with new Checkout and Cart integration is now available ([See Documentation](https://help.appdirect.com/platform/Default.htm#StorefrontBuilder/sfb-checkout-intro.htm))
 - Added Product Configuration page
 - Added Cart Preview
 - Added window function to add to cart `AD_addToCart()`
 - Standalone Domains now supports new Checkout
 - Bug fix: Windows CRLF now supported

**1.1.0**
- Dynamic SASS compilation to work with Node 12

**1.1.0**
- Toolkit is now ready and able to work on Node 12

**1.0.0** 
- Initial release

### How to use
The idea behind Toolkit CLI is similar to how `git` CLI has been made.
Developers can have multiple themes in a single environment.

|Command|Description|
|---|---|
|`sfb-toolkit setup`|Creates a new project/environment where Developer can store themes|
|`sfb-toolkit create [name]`|Creates a new theme|
|`sfb-toolkit checkout [name]`|Changes context to the theme [name]|
|`sfb-toolkit about`|Lists existing themes|
|`sfb-toolkit status`|Gives information about current configuration|
|`sfb-toolkit update`|Update current theme's configuration|
|`sfb-toolkit start`|Starts local server with current theme on `https://localhost:3555/en-US/home`|
|`sfb-toolkit package`|Creates a .zip file with current theme files|
|`sfb-toolkit storybook`|Start storybook for the currently selected theme
|`sfb-toolkit install [module]`|Installs npm module in the currently selected theme
|`sfb-toolkit components`|Setup custom components
|`sfb-toolkit version`|Shows version of sfb-toolkit|


### Other Resources
- [Official Documentation](https://help.appdirect.com/platform/Default.htm#StorefrontBuilder/sfb-install-dev-tool.htm)
- [Checkout Integration](https://help.appdirect.com/platform/Default.htm#StorefrontBuilder/sfb-checkout-intro.htm)
- [Video Tutorials](https://help.appdirect.com/platform/Default.htm#StorefrontBuilder/sfb-toolkit-intro.htm)
- [Nunjucks Template System Documentation](https://mozilla.github.io/nunjucks/)
- [Contact Support](mailto:storefrontbuilder@appdirect.com)


This Repository is owned and maintained by Storefront Builder Team @ AppDirect Inc.
