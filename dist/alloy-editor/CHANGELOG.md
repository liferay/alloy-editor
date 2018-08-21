# Change Log

## [1.5.0](https://github.com/liferay/alloy-editor/tree/1.5.0) (2017-11-16)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/1.4.1...1.5.0)

**Implemented enhancements:**

- Pasting links into content area fails [\#761](https://github.com/liferay/alloy-editor/issues/761)
- Alloy Editor crashes on React 16 [\#770](https://github.com/liferay/alloy-editor/issues/770)

**Fixed bugs:**

- Pasting links into content area fails [\#761](https://github.com/liferay/alloy-editor/issues/761)
- Toolbar doesn't appear when selection is inside a widget [\#752](https://github.com/liferay/alloy-editor/issues/752)
- Alloy Editor crashes on React 16 [\#770](https://github.com/liferay/alloy-editor/issues/770)
- Colorbutton Plugin: Unable to scroll after changing color of text [\#749](https://github.com/liferay/alloy-editor/issues/749)

**Closed issues:**

- Add Issue template to the repository [\#793](https://github.com/liferay/alloy-editor/issues/793)
- Add Pull Request template to Repository [\#790](https://github.com/liferay/alloy-editor/issues/790)
- Build problem [\#773](https://github.com/liferay/alloy-editor/issues/773)
- Broken links in README [\#769](https://github.com/liferay/alloy-editor/issues/769)
- Website gives 404 [\#764](https://github.com/liferay/alloy-editor/issues/764)
- Partial Read Only Mode \(for certain parts of the content\) [\#757](https://github.com/liferay/alloy-editor/issues/757)
- Resize arrows still appearing after disabling the drag resize on Firefox [\#755](https://github.com/liferay/alloy-editor/issues/755)
- Links does not recognise on page bookmarks [\#785](https://github.com/liferay/alloy-editor/issues/785)

**Merged pull requests:**

- add ISSUE\_TEMPLATE for contributers on GitHub [\#794](https://github.com/liferay/alloy-editor/pull/794) ([vbence86](https://github.com/vbence86))
- add PULL\_REQUEST\_TEMPLATE file to the project [\#791](https://github.com/liferay/alloy-editor/pull/791) ([vbence86](https://github.com/vbence86))
- fix for Image Center Aligment issue [\#788](https://github.com/liferay/alloy-editor/pull/788) ([vbence86](https://github.com/vbence86))
- Adds karma-saucelabs and fixes typo [\#787](https://github.com/liferay/alloy-editor/pull/787) ([jbalsas](https://github.com/jbalsas))
- Adding on page bookmark support to links [\#786](https://github.com/liferay/alloy-editor/pull/786) ([balazssk](https://github.com/balazssk))
- remove undefined variables [\#782](https://github.com/liferay/alloy-editor/pull/782) ([jbalsas](https://github.com/jbalsas))
- remove 3rd party react components [\#780](https://github.com/liferay/alloy-editor/pull/780) ([jbalsas](https://github.com/jbalsas))

## [1.4.1](https://github.com/liferay/alloy-editor/tree/1.4.1) (2017-05-18)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/1.4.0...1.4.1)

**Implemented enhancements:**

- Extraplugins should have uibridge plugins into default value [\#731](https://github.com/liferay/alloy-editor/issues/731)

**Fixed bugs:**

- ColorButton with Alloy Editor: Cannot read property 'focus' of undefined [\#737](https://github.com/liferay/alloy-editor/issues/737)

**Closed issues:**

- Warning: ButtonBold:React.createClass is deprecated and will be removed in version 16. Use plain JavaScript classes instead. If you're not yet ready to migrate, create-react-class is available on npm as a drop-in replacement. [\#742](https://github.com/liferay/alloy-editor/issues/742)
- Reply button in comments not working on certain browsers [\#738](https://github.com/liferay/alloy-editor/issues/738)
- Strange symbols on toolbar buttons [\#735](https://github.com/liferay/alloy-editor/issues/735)
- Colorbutton plugin does not work correctly [\#744](https://github.com/liferay/alloy-editor/issues/744)
- Plugin ae\_dragresize leaks global listeners [\#740](https://github.com/liferay/alloy-editor/issues/740)
- Cannot read property 'replace' of undefined when Language is en-gb [\#733](https://github.com/liferay/alloy-editor/issues/733)

**Merged pull requests:**

- Move registerBridgeButton to ae\_uibridge after calling to add the button bridge. [\#746](https://github.com/liferay/alloy-editor/pull/746) ([antoniopol06](https://github.com/antoniopol06))
- Adding uibridges to extraPlugins as default value. [\#741](https://github.com/liferay/alloy-editor/pull/741) ([antoniopol06](https://github.com/antoniopol06))

## [1.4.0](https://github.com/liferay/alloy-editor/tree/1.4.0) (2017-04-26)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v1.3.1...1.4.0)

**Implemented enhancements:**

- Sync Lexicon Icons [\#700](https://github.com/liferay/alloy-editor/issues/700)
- Update Edge configuration on SauceLabs [\#692](https://github.com/liferay/alloy-editor/issues/692)
- ButtonLinkTargetEdit has not test [\#688](https://github.com/liferay/alloy-editor/issues/688)
- ButtonTargetList has not test [\#686](https://github.com/liferay/alloy-editor/issues/686)
- Twitter button has not tests [\#684](https://github.com/liferay/alloy-editor/issues/684)

**Fixed bugs:**

- Race condition in initialization [\#724](https://github.com/liferay/alloy-editor/issues/724)
- Resize images on IE 11 does not work  [\#716](https://github.com/liferay/alloy-editor/issues/716)
- Drag and Drop files that are not images [\#714](https://github.com/liferay/alloy-editor/issues/714)
- Append protocol is not added to URL by default when link is edited. [\#711](https://github.com/liferay/alloy-editor/issues/711)
- Placeholder appears when the content is image or table [\#708](https://github.com/liferay/alloy-editor/issues/708)
- Alloy Editor option not get enabled [\#680](https://github.com/liferay/alloy-editor/issues/680)

**Closed issues:**

- Http protocol is appended to the links even if "appendProtocol" is false in the config [\#710](https://github.com/liferay/alloy-editor/issues/710)
- AlloyEditor Internationalization structure [\#702](https://github.com/liferay/alloy-editor/issues/702)
- IE10: Cannot enter URL text for Link option [\#691](https://github.com/liferay/alloy-editor/issues/691)
- contextmenu for spell check [\#681](https://github.com/liferay/alloy-editor/issues/681)
- Some tests fail assert.oneOf [\#679](https://github.com/liferay/alloy-editor/issues/679)
- Spell check enable/disable at initialization of Alloy editor [\#672](https://github.com/liferay/alloy-editor/issues/672)
- Allow discovery of plugin buttons via `ae\_uibridge` [\#667](https://github.com/liferay/alloy-editor/issues/667)

**Merged pull requests:**

- Updates test message and adds default case [\#728](https://github.com/liferay/alloy-editor/pull/728) ([jbalsas](https://github.com/jbalsas))
- Sets editor property before potentially start the render phase [\#725](https://github.com/liferay/alloy-editor/pull/725) ([jbalsas](https://github.com/jbalsas))
- Addimages plugin allows only images. [\#715](https://github.com/liferay/alloy-editor/pull/715) ([antoniopol06](https://github.com/antoniopol06))
- Hash autogenerated by build-languages task [\#703](https://github.com/liferay/alloy-editor/pull/703) ([antoniopol06](https://github.com/antoniopol06))
- Test buttonTwitter [\#685](https://github.com/liferay/alloy-editor/pull/685) ([antoniopol06](https://github.com/antoniopol06))

## [v1.3.1](https://github.com/liferay/alloy-editor/tree/v1.3.1) (2017-01-19)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v1.3.0...v1.3.1)

**Implemented enhancements:**

- Upgrade and lock packages [\#675](https://github.com/liferay/alloy-editor/issues/675)

**Fixed bugs:**

- assert.oneOf is not a function when running tests [\#678](https://github.com/liferay/alloy-editor/issues/678)
- Typo in getToolbarButtons method [\#663](https://github.com/liferay/alloy-editor/issues/663)
- IE11: Cannot enter URL text for Link option [\#660](https://github.com/liferay/alloy-editor/issues/660)
- Get rid of frame box around pasted link [\#659](https://github.com/liferay/alloy-editor/issues/659)
- autolinkAdd doesn't work on urls that contain - in the domain name [\#657](https://github.com/liferay/alloy-editor/issues/657)
- Keyup events slow with large documents [\#654](https://github.com/liferay/alloy-editor/issues/654)
- Wrong link for How to build it [\#646](https://github.com/liferay/alloy-editor/issues/646)

**Closed issues:**

- When I made paragraph bold, it works fine. When I am trying to make font regular - first letter stays bold [\#677](https://github.com/liferay/alloy-editor/issues/677)
- Button to clear URL in link button edit is clickable when input is empty [\#673](https://github.com/liferay/alloy-editor/issues/673)
- Some test fail [\#669](https://github.com/liferay/alloy-editor/issues/669)
- Placeholder CSS [\#655](https://github.com/liferay/alloy-editor/issues/655)
- Firefox: JavaScript when creating a link with the whole paragraph [\#645](https://github.com/liferay/alloy-editor/issues/645)
- Table borders are not visible on copy + paste text from excel [\#635](https://github.com/liferay/alloy-editor/issues/635)

**Merged pull requests:**

- Button to clear URL is not rendered when input is empty [\#674](https://github.com/liferay/alloy-editor/pull/674) ([antoniopol06](https://github.com/antoniopol06))
- Insert placeholder prop into input when browser is not IE [\#671](https://github.com/liferay/alloy-editor/pull/671) ([antoniopol06](https://github.com/antoniopol06))
- Get rid of frame box around pasted link [\#668](https://github.com/liferay/alloy-editor/pull/668) ([antoniopol06](https://github.com/antoniopol06))
- Cover test typing urls with - character [\#658](https://github.com/liferay/alloy-editor/pull/658) ([antoniopol06](https://github.com/antoniopol06))

## [v1.3.0](https://github.com/liferay/alloy-editor/tree/v1.3.0) (2016-12-05)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v1.2.5...v1.3.0)

**Implemented enhancements:**

- Update to CKEditor 4.6 [\#631](https://github.com/liferay/alloy-editor/issues/631)
- Add Support for Edge [\#617](https://github.com/liferay/alloy-editor/issues/617)
- Support maven releases [\#473](https://github.com/liferay/alloy-editor/issues/473)

**Fixed bugs:**

- When editor is empty and use setData to add content, the placeholder value is overlaped to the new content [\#647](https://github.com/liferay/alloy-editor/issues/647)
- Edit url fails in firefox when editing the very last content [\#620](https://github.com/liferay/alloy-editor/issues/620)
- Translation in the table creation popup [\#619](https://github.com/liferay/alloy-editor/issues/619)
- IE 11 image not resize [\#596](https://github.com/liferay/alloy-editor/issues/596)
- can't add new line after inserting embed link [\#561](https://github.com/liferay/alloy-editor/issues/561)

**Closed issues:**

- Release 1.3.0 [\#649](https://github.com/liferay/alloy-editor/issues/649)
- \[Question\] Does destroying editor instance clear event listeners? [\#629](https://github.com/liferay/alloy-editor/issues/629)
- alloy-editor-no-react-min.js:860 Uncaught TypeError: Cannot read property 'PropTypes' of undefined [\#621](https://github.com/liferay/alloy-editor/issues/621)
- Allow open target of hyperlink in editor - something lik Ctrl-Click in Word [\#509](https://github.com/liferay/alloy-editor/issues/509)

**Merged pull requests:**

- Adds MenuButton Bridge Tests [\#643](https://github.com/liferay/alloy-editor/pull/643) ([jbalsas](https://github.com/jbalsas))
- Update lang files [\#633](https://github.com/liferay/alloy-editor/pull/633) ([antoniopol06](https://github.com/antoniopol06))
- Add Support for Edge [\#624](https://github.com/liferay/alloy-editor/pull/624) ([julien](https://github.com/julien))

## [v1.2.5](https://github.com/liferay/alloy-editor/tree/v1.2.5) (2016-11-03)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v1.2.4...v1.2.5)

**Implemented enhancements:**

- Add VS Code and Yarn files to .gitignore [\#605](https://github.com/liferay/alloy-editor/issues/605)

**Fixed bugs:**

- Placeholder plugin appears when there is data in the editable area [\#603](https://github.com/liferay/alloy-editor/issues/603)

**Closed issues:**

- Release v1.2.5 [\#616](https://github.com/liferay/alloy-editor/issues/616)
- Allow Alloy Editor to set one dimension when resizing an image [\#601](https://github.com/liferay/alloy-editor/issues/601)

**Merged pull requests:**

- Test edit button [\#609](https://github.com/liferay/alloy-editor/pull/609) ([antoniopol06](https://github.com/antoniopol06))

## [v1.2.4](https://github.com/liferay/alloy-editor/tree/v1.2.4) (2016-10-07)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v1.2.3...v1.2.4)

**Implemented enhancements:**

- Fix button-styles documentation [\#585](https://github.com/liferay/alloy-editor/issues/585)
- Add .eslintrc file [\#574](https://github.com/liferay/alloy-editor/issues/574)
- Link target select truncating in Webkit [\#570](https://github.com/liferay/alloy-editor/issues/570)

**Fixed bugs:**

- Problem with resizing images in Firefox [\#582](https://github.com/liferay/alloy-editor/issues/582)
- Allowed link targets button config not being passed to ButtonTargetList [\#571](https://github.com/liferay/alloy-editor/issues/571)
- Alloy Editor Unmount issue in react [\#552](https://github.com/liferay/alloy-editor/issues/552)
- Toolbar renders away from div having CSS property overflow set to auto. [\#549](https://github.com/liferay/alloy-editor/issues/549)

**Closed issues:**

- Target selector on button edit should be customizable [\#608](https://github.com/liferay/alloy-editor/issues/608)
- Release v1.2.4 [\#600](https://github.com/liferay/alloy-editor/issues/600)
- Dynamic change of CKEditor config params [\#599](https://github.com/liferay/alloy-editor/issues/599)
- Html content is changed after blur when input is empty. [\#589](https://github.com/liferay/alloy-editor/issues/589)
- File upload in link dialog [\#588](https://github.com/liferay/alloy-editor/issues/588)
- save data [\#581](https://github.com/liferay/alloy-editor/issues/581)
- Combobox dropdown goes under other toolbar buttons [\#579](https://github.com/liferay/alloy-editor/issues/579)
- Access CKEditor document model [\#577](https://github.com/liferay/alloy-editor/issues/577)
- Quotes: allow to reply inline [\#568](https://github.com/liferay/alloy-editor/issues/568)
- Chrome+Bootstrap tabs : U, I & B toolbar actions not working [\#567](https://github.com/liferay/alloy-editor/issues/567)
- The latest version v1.5.3 or v1.2.3? [\#559](https://github.com/liferay/alloy-editor/issues/559)
- Refactor button style list  [\#557](https://github.com/liferay/alloy-editor/issues/557)

**Merged pull requests:**

- Y position of toolbar to render it, now we consider if the content has overflow customization to calculate the proper Y value [\#595](https://github.com/liferay/alloy-editor/pull/595) ([antoniopol06](https://github.com/antoniopol06))
- Fixes \#571 [\#572](https://github.com/liferay/alloy-editor/pull/572) ([mattleff](https://github.com/mattleff))
- Buttons that use richcombo update correctly values when it is rendered for the first time. [\#566](https://github.com/liferay/alloy-editor/pull/566) ([antoniopol06](https://github.com/antoniopol06))
- Refactor button styles list, Now it uses dropdown button. [\#564](https://github.com/liferay/alloy-editor/pull/564) ([antoniopol06](https://github.com/antoniopol06))

## [v1.2.3](https://github.com/liferay/alloy-editor/tree/v1.2.3) (2016-06-29)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v1.2.2...v1.2.3)

**Implemented enhancements:**

- Test to readOnly behavior [\#538](https://github.com/liferay/alloy-editor/issues/538)
- beforeImageAdd event is needed, when a single image is uploaded by the image button [\#534](https://github.com/liferay/alloy-editor/issues/534)
- Testing embed buttons [\#528](https://github.com/liferay/alloy-editor/issues/528)

**Fixed bugs:**

- multiple instance destroy II [\#556](https://github.com/liferay/alloy-editor/issues/556)
- can't remove the marker [\#532](https://github.com/liferay/alloy-editor/issues/532)

**Closed issues:**

- Release v1.2.3 [\#558](https://github.com/liferay/alloy-editor/issues/558)
- cant load alloy editor [\#551](https://github.com/liferay/alloy-editor/issues/551)
- Refused to execute script from [\#539](https://github.com/liferay/alloy-editor/issues/539)
- Selection menu doesn't display when selecting ends outside editable [\#529](https://github.com/liferay/alloy-editor/issues/529)

**Merged pull requests:**

- ReadOnly feature tests \(\#538\) [\#542](https://github.com/liferay/alloy-editor/pull/542) ([jbalsas](https://github.com/jbalsas))
- Support style string definition \(Fixes \#533\) [\#541](https://github.com/liferay/alloy-editor/pull/541) ([jbalsas](https://github.com/jbalsas))

## [v1.2.2](https://github.com/liferay/alloy-editor/tree/v1.2.2) (2016-05-25)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v1.2.1...v1.2.2)

**Fixed bugs:**

- Edit embedded link is broken - popup displays above wrong element [\#526](https://github.com/liferay/alloy-editor/issues/526)

**Closed issues:**

- Release v1.2.2 [\#527](https://github.com/liferay/alloy-editor/issues/527)

## [v1.2.1](https://github.com/liferay/alloy-editor/tree/v1.2.1) (2016-05-24)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v1.2.0...v1.2.1)

**Implemented enhancements:**

- Convert email addresses into mailto: links [\#522](https://github.com/liferay/alloy-editor/issues/522)
- Active controls don't adjust when resizing window [\#513](https://github.com/liferay/alloy-editor/issues/513)

**Fixed bugs:**

- Cannot Remove Embed Link from Editor [\#517](https://github.com/liferay/alloy-editor/issues/517)
- In case of Multiple divs Alloy Editor  doesn't focus on currently selected div in case of Dropdown [\#515](https://github.com/liferay/alloy-editor/issues/515)
- Active controls don't adjust when resizing window [\#513](https://github.com/liferay/alloy-editor/issues/513)

**Closed issues:**

- Release v1.2.1 [\#525](https://github.com/liferay/alloy-editor/issues/525)

## [v1.2.0](https://github.com/liferay/alloy-editor/tree/v1.2.0) (2016-04-30)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v1.1.0...v1.2.0)

**Implemented enhancements:**

- Support keyboard navigation into autocomplete [\#510](https://github.com/liferay/alloy-editor/issues/510)
- UX: Table delete icon confusing [\#496](https://github.com/liferay/alloy-editor/issues/496)

**Closed issues:**

- Release v1.2.0 [\#514](https://github.com/liferay/alloy-editor/issues/514)
- Plugin autolist to create OL and UL [\#504](https://github.com/liferay/alloy-editor/issues/504)
- Create indent and outdent buttons [\#482](https://github.com/liferay/alloy-editor/issues/482)

**Merged pull requests:**

- Change button table remove icon to bin SVG [\#506](https://github.com/liferay/alloy-editor/pull/506) ([antoniopol06](https://github.com/antoniopol06))
- Lang autogenerated [\#502](https://github.com/liferay/alloy-editor/pull/502) ([antoniopol06](https://github.com/antoniopol06))

## [v1.1.0](https://github.com/liferay/alloy-editor/tree/v1.1.0) (2016-04-17)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v1.0.1...v1.1.0)

**Fixed bugs:**

- Issue with clicking in a dropdown when there is overflow [\#491](https://github.com/liferay/alloy-editor/issues/491)
- Firefox throws "e.data.$.clipboardData.items" error when you paste some text into editable content. [\#485](https://github.com/liferay/alloy-editor/issues/485)

**Closed issues:**

- Release v1.1.0 [\#500](https://github.com/liferay/alloy-editor/issues/500)
- Can not use with meteor 1.3 + react + npm [\#494](https://github.com/liferay/alloy-editor/issues/494)
- Pass button specific configuration outside of Selections [\#492](https://github.com/liferay/alloy-editor/issues/492)
- Getting an existing instance of editor to destroy it [\#490](https://github.com/liferay/alloy-editor/issues/490)
- Add autocomplete to links [\#120](https://github.com/liferay/alloy-editor/issues/120)

**Merged pull requests:**

- Fix typo [\#498](https://github.com/liferay/alloy-editor/pull/498) ([dustinryerson](https://github.com/dustinryerson))
- Test \_onPaste from ae\_addimages plugin [\#495](https://github.com/liferay/alloy-editor/pull/495) ([antoniopol06](https://github.com/antoniopol06))

## [v1.0.1](https://github.com/liferay/alloy-editor/tree/v1.0.1) (2016-03-08)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v1.0.0...v1.0.1)

**Fixed bugs:**

- Pasting content containing links is broken [\#478](https://github.com/liferay/alloy-editor/issues/478)

**Closed issues:**

- Release v1.0.1 [\#481](https://github.com/liferay/alloy-editor/issues/481)

## [v1.0.0](https://github.com/liferay/alloy-editor/tree/v1.0.0) (2016-02-27)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.7.5...v1.0.0)

**Implemented enhancements:**

- Release v1.0.0 [\#475](https://github.com/liferay/alloy-editor/issues/475)
- The input element in button-image.jsx should only accept image type files. [\#463](https://github.com/liferay/alloy-editor/issues/463)
- link protocol should be customize default protocol [\#462](https://github.com/liferay/alloy-editor/issues/462)
- Use a fixed version of bourbon [\#444](https://github.com/liferay/alloy-editor/issues/444)
- Chrome deprecated MediaStream.stop\(\) method [\#443](https://github.com/liferay/alloy-editor/issues/443)
- Camera button does not work on insecure origins in Chrome [\#421](https://github.com/liferay/alloy-editor/issues/421)
- ReactUI keyboard shortcuts won't refresh UI [\#141](https://github.com/liferay/alloy-editor/issues/141)

**Fixed bugs:**

- Allow changing button props from user's configuration [\#469](https://github.com/liferay/alloy-editor/issues/469)
- Toolbar add exclusive does not show \(sometimes\) when table button is clicked [\#466](https://github.com/liferay/alloy-editor/issues/466)
- Toolbar add does not appear when editable content is empty and you click it. [\#450](https://github.com/liferay/alloy-editor/issues/450)
- React component guide link in AlloyEditor 0.7.3 release notes points to localhost [\#442](https://github.com/liferay/alloy-editor/issues/442)
- Widget interaction point mixin is not tested [\#439](https://github.com/liferay/alloy-editor/issues/439)
- Changing target when creating link steal focus [\#434](https://github.com/liferay/alloy-editor/issues/434)
- On inserting images, the original file object might be lost [\#433](https://github.com/liferay/alloy-editor/issues/433)
- Plugin ae\_uibridge does not check if it has been registered [\#429](https://github.com/liferay/alloy-editor/issues/429)
- alloyeditor-ocean.svg doesn't exist [\#428](https://github.com/liferay/alloy-editor/issues/428)
- Toolbar is not shown by IE in the correct position [\#425](https://github.com/liferay/alloy-editor/issues/425)
- SCRIPT5022: TypeMismatchError When inserting an image [\#424](https://github.com/liferay/alloy-editor/issues/424)
- Camera button throws an exception in Chrome after capturing the image [\#420](https://github.com/liferay/alloy-editor/issues/420)
- Text alignment + headings issue [\#386](https://github.com/liferay/alloy-editor/issues/386)
- After resizing an image, if you change its align it returns to the original dimensions [\#206](https://github.com/liferay/alloy-editor/issues/206)

**Closed issues:**

- Having trouble getting the widget to show up, even though the content is editable [\#457](https://github.com/liferay/alloy-editor/issues/457)
- Problem with setting basepath [\#456](https://github.com/liferay/alloy-editor/issues/456)
- A bug [\#452](https://github.com/liferay/alloy-editor/issues/452)
- Live demo and 0.7.5 currently broken [\#447](https://github.com/liferay/alloy-editor/issues/447)
- Align text right with big toolbar [\#437](https://github.com/liferay/alloy-editor/issues/437)
- Max value for table`s rows and cols inputs. [\#432](https://github.com/liferay/alloy-editor/issues/432)
- Prompt Link creation on Cmd-L keystroke [\#422](https://github.com/liferay/alloy-editor/issues/422)
- Cmd-L to open Link Dialog [\#417](https://github.com/liferay/alloy-editor/issues/417)
- Troubles using React and webpack [\#416](https://github.com/liferay/alloy-editor/issues/416)
- Getting the text value in React [\#414](https://github.com/liferay/alloy-editor/issues/414)
- Implement embedding Twitter posts [\#234](https://github.com/liferay/alloy-editor/issues/234)
- Implement embedding YouTube videos [\#233](https://github.com/liferay/alloy-editor/issues/233)
- Creating a link which, crosses element boundaries, causes JS errors and a buggy toolbar. [\#40](https://github.com/liferay/alloy-editor/issues/40)

**Merged pull requests:**

- Link default behavior in readonly mode and it can be customizable. [\#449](https://github.com/liferay/alloy-editor/pull/449) ([antoniopol06](https://github.com/antoniopol06))
- Allow configuring the default link target value [\#446](https://github.com/liferay/alloy-editor/pull/446) ([jbalsas](https://github.com/jbalsas))
- Font autogenerated [\#445](https://github.com/liferay/alloy-editor/pull/445) ([antoniopol06](https://github.com/antoniopol06))
- when stream.stop doesnt exist, using stream.getVideoTracks and it stop all of them. [\#438](https://github.com/liferay/alloy-editor/pull/438) ([antoniopol06](https://github.com/antoniopol06))
- Fix alignment issues \(\#206, \#386\) [\#419](https://github.com/liferay/alloy-editor/pull/419) ([jbalsas](https://github.com/jbalsas))
- ButtonKeystroke \(\#417, \#141\) [\#418](https://github.com/liferay/alloy-editor/pull/418) ([jbalsas](https://github.com/jbalsas))

## [v0.7.5](https://github.com/liferay/alloy-editor/tree/v0.7.5) (2015-12-26)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.7.4...v0.7.5)

**Closed issues:**

- Release v0.7.5 [\#413](https://github.com/liferay/alloy-editor/issues/413)

## [v0.7.4](https://github.com/liferay/alloy-editor/tree/v0.7.4) (2015-12-26)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.7.3...v0.7.4)

**Fixed bugs:**

- incorrect lang  [\#410](https://github.com/liferay/alloy-editor/issues/410)

**Closed issues:**

- Release v0.7.4 [\#412](https://github.com/liferay/alloy-editor/issues/412)
- Replace minify-css with cssnano [\#411](https://github.com/liferay/alloy-editor/issues/411)
- Alloy with Webpack and React [\#389](https://github.com/liferay/alloy-editor/issues/389)

## [v0.7.3](https://github.com/liferay/alloy-editor/tree/v0.7.3) (2015-12-25)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.7.2...v0.7.3)

**Fixed bugs:**

- Change main script to be `alloy-editor-no-react.js` [\#408](https://github.com/liferay/alloy-editor/issues/408)

**Closed issues:**

- Release v0.7.3 [\#409](https://github.com/liferay/alloy-editor/issues/409)

## [v0.7.2](https://github.com/liferay/alloy-editor/tree/v0.7.2) (2015-12-24)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.7.1...v0.7.2)

**Fixed bugs:**

- Does not try to require React if there is require function defined [\#406](https://github.com/liferay/alloy-editor/issues/406)

**Closed issues:**

- Release v0.7.2 [\#407](https://github.com/liferay/alloy-editor/issues/407)
- Getting the Content , Events ? [\#403](https://github.com/liferay/alloy-editor/issues/403)
- Widget interaction and native selections [\#355](https://github.com/liferay/alloy-editor/issues/355)

## [v0.7.1](https://github.com/liferay/alloy-editor/tree/v0.7.1) (2015-12-19)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.7.0...v0.7.1)

**Implemented enhancements:**

- Remove YUI UI [\#247](https://github.com/liferay/alloy-editor/issues/247)
- React UI Edit Link should move cursor after link creation [\#128](https://github.com/liferay/alloy-editor/issues/128)

**Fixed bugs:**

- ERR\_INVALID\_URL when moving an image in the content [\#381](https://github.com/liferay/alloy-editor/issues/381)
- Plugins 'ae\_' are not initialized if ckeditor own plugins are present [\#379](https://github.com/liferay/alloy-editor/issues/379)
- Bug: calling editor.destroy\(\) throws javascript error [\#375](https://github.com/liferay/alloy-editor/issues/375)
- Bug: custom styles in portal are not rendered properly [\#241](https://github.com/liferay/alloy-editor/issues/241)
- Bug: dropdown list with overflow scroll does not work properly [\#239](https://github.com/liferay/alloy-editor/issues/239)

**Closed issues:**

- Release v0.7.1 [\#401](https://github.com/liferay/alloy-editor/issues/401)
- Upgrade packages to their latest versions [\#398](https://github.com/liferay/alloy-editor/issues/398)
- How to disable image resizing [\#395](https://github.com/liferay/alloy-editor/issues/395)
- Alloy can't find relative paths [\#390](https://github.com/liferay/alloy-editor/issues/390)
- Fire event for automatically-created links. [\#388](https://github.com/liferay/alloy-editor/issues/388)
- rails integration [\#377](https://github.com/liferay/alloy-editor/issues/377)
- When clicking a link, possible to show a navigate/change/remove bubble? [\#376](https://github.com/liferay/alloy-editor/issues/376)
- Target blank [\#344](https://github.com/liferay/alloy-editor/issues/344)
- Can't use with requirejs [\#240](https://github.com/liferay/alloy-editor/issues/240)

**Merged pull requests:**

- Advance cursor after link on link changes [\#397](https://github.com/liferay/alloy-editor/pull/397) ([jbalsas](https://github.com/jbalsas))
- Update lang files [\#382](https://github.com/liferay/alloy-editor/pull/382) ([jbalsas](https://github.com/jbalsas))
- Do not prevent plugin from being created if original CKEditor one exists [\#380](https://github.com/liferay/alloy-editor/pull/380) ([jbalsas](https://github.com/jbalsas))
- Allow listening for automatically-created links. [\#378](https://github.com/liferay/alloy-editor/pull/378) ([kushal](https://github.com/kushal))

## [v0.7.0](https://github.com/liferay/alloy-editor/tree/v0.7.0) (2015-11-07)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.6.0...v0.7.0)

**Fixed bugs:**

- toolbar does not disappear [\#371](https://github.com/liferay/alloy-editor/issues/371)
- Fails to load in Electron [\#350](https://github.com/liferay/alloy-editor/issues/350)
- npm package is broken. \[EDIT: Does not work with browserify\] [\#338](https://github.com/liferay/alloy-editor/issues/338)
- Image Selection Toolbar in React UI is not always centerd on the image [\#181](https://github.com/liferay/alloy-editor/issues/181)

**Closed issues:**

- Release v0.7.0 [\#374](https://github.com/liferay/alloy-editor/issues/374)
- Notify of UI state changes [\#366](https://github.com/liferay/alloy-editor/issues/366)
- React 0.14 [\#365](https://github.com/liferay/alloy-editor/issues/365)
- Is it possible to remove AlloyEditor after it is initialized? [\#362](https://github.com/liferay/alloy-editor/issues/362)
- Add target to links [\#119](https://github.com/liferay/alloy-editor/issues/119)

**Merged pull requests:**

- Use focus event instead of contentDOM to make sure initialization always runs [\#373](https://github.com/liferay/alloy-editor/pull/373) ([jbalsas](https://github.com/jbalsas))
- Use centering setPositionFn for image selection by default [\#372](https://github.com/liferay/alloy-editor/pull/372) ([jbalsas](https://github.com/jbalsas))
- Fire editorUpdate event when UI state is updated [\#368](https://github.com/liferay/alloy-editor/pull/368) ([jbalsas](https://github.com/jbalsas))

## [v0.6.0](https://github.com/liferay/alloy-editor/tree/v0.6.0) (2015-10-17)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.5.2...v0.6.0)

**Closed issues:**

- Release v0.6.0 [\#360](https://github.com/liferay/alloy-editor/issues/360)
- Cannot read property 'scrollIntoView' of undefined [\#358](https://github.com/liferay/alloy-editor/issues/358)
- Is there a way to work with angularjs?  [\#357](https://github.com/liferay/alloy-editor/issues/357)
- The editor should keep the toolbar in the view [\#349](https://github.com/liferay/alloy-editor/issues/349)
- linkEdit [\#348](https://github.com/liferay/alloy-editor/issues/348)
- Alloy Editor without toolbar \(selection and "add"-toolbar\) [\#346](https://github.com/liferay/alloy-editor/issues/346)
- Can't use http://ckeditor.com/addon/uicolor plugin.  [\#343](https://github.com/liferay/alloy-editor/issues/343)
- Download URI is broken! [\#337](https://github.com/liferay/alloy-editor/issues/337)
- Add an option to not include ButtonStylesListItemRemove in the list generated by ButtonStylesList [\#336](https://github.com/liferay/alloy-editor/issues/336)
- Font Color and Size feature [\#335](https://github.com/liferay/alloy-editor/issues/335)

**Merged pull requests:**

- Add `showRemoveStylesItem` prop to control if the item shows in the list. [\#347](https://github.com/liferay/alloy-editor/pull/347) ([jbalsas](https://github.com/jbalsas))

## [v0.5.2](https://github.com/liferay/alloy-editor/tree/v0.5.2) (2015-08-29)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.5.1...v0.5.2)

**Implemented enhancements:**

- Document skin structure and workflow [\#292](https://github.com/liferay/alloy-editor/issues/292)

**Fixed bugs:**

- React variable is always undefined [\#333](https://github.com/liferay/alloy-editor/issues/333)

**Closed issues:**

- Release v0.5.2 [\#334](https://github.com/liferay/alloy-editor/issues/334)

## [v0.5.1](https://github.com/liferay/alloy-editor/tree/v0.5.1) (2015-08-24)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.5.0...v0.5.1)

**Fixed bugs:**

- regexBasePath is not properly documented [\#331](https://github.com/liferay/alloy-editor/issues/331)
- The main file and the UI part don't have minimized versions [\#329](https://github.com/liferay/alloy-editor/issues/329)
- Skin font is not regenerated when changing the font templates [\#308](https://github.com/liferay/alloy-editor/issues/308)

**Closed issues:**

- Release v0.5.1 [\#330](https://github.com/liferay/alloy-editor/issues/330)

## [v0.5.0](https://github.com/liferay/alloy-editor/tree/v0.5.0) (2015-08-21)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.5.0-alpha...v0.5.0)

**Fixed bugs:**

- JavaScript error when clicking on a button in non editable area if the editor does not have the focus [\#325](https://github.com/liferay/alloy-editor/issues/325)

**Closed issues:**

- Release 0.5.0 [\#327](https://github.com/liferay/alloy-editor/issues/327)
- Selection with CKEditor 'widget' plugin  [\#326](https://github.com/liferay/alloy-editor/issues/326)
- Alloyeditor and global namespace [\#315](https://github.com/liferay/alloy-editor/issues/315)

## [v0.5.0-alpha](https://github.com/liferay/alloy-editor/tree/v0.5.0-alpha) (2015-08-19)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.4.2...v0.5.0-alpha)

**Closed issues:**

- Release v0.5.0-alpha [\#324](https://github.com/liferay/alloy-editor/issues/324)
- CONTRIBUTING.md [\#323](https://github.com/liferay/alloy-editor/issues/323)
- Publish on NPM/Bower? [\#217](https://github.com/liferay/alloy-editor/issues/217)

## [v0.4.2](https://github.com/liferay/alloy-editor/tree/v0.4.2) (2015-08-12)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.4.1...v0.4.2)

**Fixed bugs:**

- Remove dist from .gitignore [\#320](https://github.com/liferay/alloy-editor/issues/320)

**Closed issues:**

- Release v0.4.2 [\#319](https://github.com/liferay/alloy-editor/issues/319)

## [v0.4.1](https://github.com/liferay/alloy-editor/tree/v0.4.1) (2015-08-11)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.4.0...v0.4.1)

**Fixed bugs:**

- Add main section to package.json [\#317](https://github.com/liferay/alloy-editor/issues/317)

**Closed issues:**

- Release v0.4.1 [\#318](https://github.com/liferay/alloy-editor/issues/318)

## [v0.4.0](https://github.com/liferay/alloy-editor/tree/v0.4.0) (2015-08-10)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.4.0-alpha.1...v0.4.0)

**Closed issues:**

- Release v0.4.0 [\#316](https://github.com/liferay/alloy-editor/issues/316)
- Adding new selection [\#300](https://github.com/liferay/alloy-editor/issues/300)

## [v0.4.0-alpha.1](https://github.com/liferay/alloy-editor/tree/v0.4.0-alpha.1) (2015-07-31)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.4.0-alpha...v0.4.0-alpha.1)

**Closed issues:**

- Release v0.4.0-alpha.1 [\#314](https://github.com/liferay/alloy-editor/issues/314)

## [v0.4.0-alpha](https://github.com/liferay/alloy-editor/tree/v0.4.0-alpha) (2015-07-31)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.3.7...v0.4.0-alpha)

**Implemented enhancements:**

- Update dependencies [\#298](https://github.com/liferay/alloy-editor/issues/298)
- Migrate to the new Travis infrastructure [\#297](https://github.com/liferay/alloy-editor/issues/297)
- Font icons should be generated per-skin [\#285](https://github.com/liferay/alloy-editor/issues/285)
- Extend attribute syntax to support instructions [\#282](https://github.com/liferay/alloy-editor/issues/282)
- Update CKEditor to 4.5.1 version [\#281](https://github.com/liferay/alloy-editor/issues/281)
- Copy license and readme files to the root folder [\#277](https://github.com/liferay/alloy-editor/issues/277)
- Font icons can't be safely used inside CSS [\#145](https://github.com/liferay/alloy-editor/issues/145)
- New addClass implementation no longer supports list of classes in browsers with classList [\#283](https://github.com/liferay/alloy-editor/pull/283) ([jbalsas](https://github.com/jbalsas))

**Fixed bugs:**

- Improve the minimized version of React [\#311](https://github.com/liferay/alloy-editor/issues/311)
- Atlas skin issues [\#310](https://github.com/liferay/alloy-editor/issues/310)
- Ocean skin issues [\#309](https://github.com/liferay/alloy-editor/issues/309)
- AlloyEditor should load language keys even when CKEditor is loaded separately [\#306](https://github.com/liferay/alloy-editor/issues/306)
- Uncaught TypeError: Cannot read property 'createRange' of null [\#302](https://github.com/liferay/alloy-editor/issues/302)
- Difficulties modifying style dropdown due to use of AlloyEditor.Strings [\#301](https://github.com/liferay/alloy-editor/issues/301)
- Impossible to set the value of a writeOnce attribute with a default value [\#294](https://github.com/liferay/alloy-editor/issues/294)
- JavaScript error when clicking on a non editable Node [\#293](https://github.com/liferay/alloy-editor/issues/293)
- Keep the contenteditable attribute value [\#290](https://github.com/liferay/alloy-editor/issues/290)
- Create a solid skin infrastructure [\#288](https://github.com/liferay/alloy-editor/issues/288)
- Impossible to run the gulp tasks after installing with bower [\#275](https://github.com/liferay/alloy-editor/issues/275)

**Closed issues:**

- Release v0.4.0-alpha [\#313](https://github.com/liferay/alloy-editor/issues/313)
- AlloyEditor does not work in CommonJS and AMD environments [\#304](https://github.com/liferay/alloy-editor/issues/304)
- Adding iframe [\#299](https://github.com/liferay/alloy-editor/issues/299)
- Missing API to add custom CKEditor plugins through AlloyEditor [\#296](https://github.com/liferay/alloy-editor/issues/296)
- Replace image URL [\#289](https://github.com/liferay/alloy-editor/issues/289)
- Using CKEDITOR Plugins with Alloyeditor [\#280](https://github.com/liferay/alloy-editor/issues/280)
- Remove test folder from bower ignore [\#278](https://github.com/liferay/alloy-editor/issues/278)
- Using alloy editor in modals [\#276](https://github.com/liferay/alloy-editor/issues/276)
- Create new 'atlas' skin [\#266](https://github.com/liferay/alloy-editor/issues/266)

**Merged pull requests:**

- Make sure a config value can override the default value of a writeOnce attribute [\#295](https://github.com/liferay/alloy-editor/pull/295) ([dpobel](https://github.com/dpobel))
- Allow to prevent AlloyEditor from setting contenteditable to true on its srcNode [\#291](https://github.com/liferay/alloy-editor/pull/291) ([dpobel](https://github.com/dpobel))

## [v0.3.7](https://github.com/liferay/alloy-editor/tree/v0.3.7) (2015-07-01)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.3.6...v0.3.7)

**Fixed bugs:**

- Insert Image widget [\#270](https://github.com/liferay/alloy-editor/issues/270)

**Closed issues:**

- Release v0.3.7 [\#274](https://github.com/liferay/alloy-editor/issues/274)

## [v0.3.6](https://github.com/liferay/alloy-editor/tree/v0.3.6) (2015-06-30)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.3.5...v0.3.6)

**Implemented enhancements:**

- Replace "alloy-editor" prefix with "ae" in the styles [\#271](https://github.com/liferay/alloy-editor/issues/271)

**Closed issues:**

- Release v0.3.6 [\#272](https://github.com/liferay/alloy-editor/issues/272)

## [v0.3.5](https://github.com/liferay/alloy-editor/tree/v0.3.5) (2015-06-30)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.3.4...v0.3.5)

**Implemented enhancements:**

- Add the version of the editor in the dist file [\#265](https://github.com/liferay/alloy-editor/issues/265)
- Remove alloy-editor prefix from the styles [\#264](https://github.com/liferay/alloy-editor/issues/264)

**Fixed bugs:**

- Widget won't open selections [\#263](https://github.com/liferay/alloy-editor/issues/263)

**Closed issues:**

- Release v0.3.5 [\#269](https://github.com/liferay/alloy-editor/issues/269)
- React UI TableHeading button [\#259](https://github.com/liferay/alloy-editor/issues/259)
- Cannot update generated strings [\#258](https://github.com/liferay/alloy-editor/issues/258)

## [v0.3.4](https://github.com/liferay/alloy-editor/tree/v0.3.4) (2015-06-24)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.3.3...v0.3.4)

**Closed issues:**

- Bump version to 0.3.4 [\#257](https://github.com/liferay/alloy-editor/issues/257)

## [v0.3.3](https://github.com/liferay/alloy-editor/tree/v0.3.3) (2015-06-24)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.3.2...v0.3.3)

**Implemented enhancements:**

- Improve test infrastructure [\#254](https://github.com/liferay/alloy-editor/issues/254)
- Modify jshintrc to accept more global variables and ES6 syntax [\#253](https://github.com/liferay/alloy-editor/issues/253)
- Since react-tools is being deprecated, we have to switch to Babel [\#252](https://github.com/liferay/alloy-editor/issues/252)
- Core Table entity is not tested [\#250](https://github.com/liferay/alloy-editor/issues/250)
- Core tests are inside React UI folder [\#246](https://github.com/liferay/alloy-editor/issues/246)

**Closed issues:**

- Release v0.3.3 [\#256](https://github.com/liferay/alloy-editor/issues/256)
- Tools test 'should merge objects and ignore inherited properties' is wrong [\#248](https://github.com/liferay/alloy-editor/issues/248)
- Table headings support [\#245](https://github.com/liferay/alloy-editor/issues/245)

**Merged pull requests:**

- Add support for table heading [\#260](https://github.com/liferay/alloy-editor/pull/260) ([jbalsas](https://github.com/jbalsas))
- Separate core and ui tests [\#249](https://github.com/liferay/alloy-editor/pull/249) ([jbalsas](https://github.com/jbalsas))

## [v0.3.2](https://github.com/liferay/alloy-editor/tree/v0.3.2) (2015-06-13)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.3.1...v0.3.2)

**Implemented enhancements:**

- Update package.json with latest deps [\#242](https://github.com/liferay/alloy-editor/issues/242)
- Move the colors and font definitions in variables and in a different file [\#237](https://github.com/liferay/alloy-editor/issues/237)
- Add breaking changes file [\#232](https://github.com/liferay/alloy-editor/issues/232)

**Fixed bugs:**

- Font is being generated incorrectly [\#243](https://github.com/liferay/alloy-editor/issues/243)
- AlloyEditor does not support HTML Nodes as stated in the docs [\#238](https://github.com/liferay/alloy-editor/issues/238)
- AlloyEditor changes the browser selection color for the whole page [\#235](https://github.com/liferay/alloy-editor/issues/235)
- React UI does not hide toolbars on ESC or ClickOutside [\#129](https://github.com/liferay/alloy-editor/issues/129)

**Closed issues:**

- Release v0.3.2 [\#244](https://github.com/liferay/alloy-editor/issues/244)
- Update README with the features list [\#231](https://github.com/liferay/alloy-editor/issues/231)
- Proofread the text in the editor demo  [\#224](https://github.com/liferay/alloy-editor/issues/224)
- Table column sizes jump around while typing text [\#223](https://github.com/liferay/alloy-editor/issues/223)
- Hide the toolbar when loosing focus [\#218](https://github.com/liferay/alloy-editor/issues/218)
- React UI strings are not translatable [\#147](https://github.com/liferay/alloy-editor/issues/147)
- Project Site: And a note and link above each pages' Disqus comments, to submit bug reports and improvements to Github Issues. [\#44](https://github.com/liferay/alloy-editor/issues/44)
- Project Site: Add inline working editor demos, of code used in tutorials. [\#38](https://github.com/liferay/alloy-editor/issues/38)
- Project Site: Expand "Get stated" with additional code example. [\#35](https://github.com/liferay/alloy-editor/issues/35)

## [v0.3.1](https://github.com/liferay/alloy-editor/tree/v0.3.1) (2015-05-31)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.3.0...v0.3.1)

## [v0.3.0](https://github.com/liferay/alloy-editor/tree/v0.3.0) (2015-05-31)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.2.9...v0.3.0)

**Implemented enhancements:**

- Simplify the dist folder structure [\#221](https://github.com/liferay/alloy-editor/issues/221)
- Change Chrome and Firefox browsers to run on Windows on SauceLabs [\#220](https://github.com/liferay/alloy-editor/issues/220)

**Closed issues:**

- Release v0.3.0 [\#222](https://github.com/liferay/alloy-editor/issues/222)
- Paste images [\#219](https://github.com/liferay/alloy-editor/issues/219)

## [v0.2.9](https://github.com/liferay/alloy-editor/tree/v0.2.9) (2015-05-27)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.2.8...v0.2.9)

**Fixed bugs:**

- Editor does not set contenteditable="true" to the element automatically [\#216](https://github.com/liferay/alloy-editor/issues/216)

## [v0.2.8](https://github.com/liferay/alloy-editor/tree/v0.2.8) (2015-05-27)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.2.7...v0.2.8)

**Implemented enhancements:**

- Make CKEditor submodule [\#205](https://github.com/liferay/alloy-editor/issues/205)

**Fixed bugs:**

- Initialization occurred too late [\#214](https://github.com/liferay/alloy-editor/issues/214)
- In ReactUI, focusing on a dropdown item causes undesired scrolls [\#211](https://github.com/liferay/alloy-editor/issues/211)
- Dropdowns aria markup breaks ChromeVox [\#210](https://github.com/liferay/alloy-editor/issues/210)
- Missing classes in API docs [\#208](https://github.com/liferay/alloy-editor/issues/208)
- Image add and image remove events are not consistent [\#207](https://github.com/liferay/alloy-editor/issues/207)
- Implement i18 and ARIA support [\#203](https://github.com/liferay/alloy-editor/issues/203)
- React UI toolbars are not announced to screen readers [\#202](https://github.com/liferay/alloy-editor/issues/202)
- Placeholder is broken with CKEditor 4.4.7 [\#180](https://github.com/liferay/alloy-editor/issues/180)

**Merged pull requests:**

- Initialize 'headline' editor [\#213](https://github.com/liferay/alloy-editor/pull/213) ([ambrinchaudhary](https://github.com/ambrinchaudhary))
- Clear dropdownTrigger state when receiving props [\#212](https://github.com/liferay/alloy-editor/pull/212) ([jbalsas](https://github.com/jbalsas))
- Update API docs \(Autogenerated\) [\#209](https://github.com/liferay/alloy-editor/pull/209) ([jbalsas](https://github.com/jbalsas))

## [v0.2.7](https://github.com/liferay/alloy-editor/tree/v0.2.7) (2015-05-08)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.2.6...v0.2.7)

**Implemented enhancements:**

- Update package.json [\#200](https://github.com/liferay/alloy-editor/issues/200)
- Travis does not connect to SauceLabs [\#199](https://github.com/liferay/alloy-editor/issues/199)

**Fixed bugs:**

- Toolbar is misaligned [\#201](https://github.com/liferay/alloy-editor/issues/201)

## [v0.2.6](https://github.com/liferay/alloy-editor/tree/v0.2.6) (2015-05-08)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.2.5...v0.2.6)

**Implemented enhancements:**

- Change AlloyEditor entry point [\#172](https://github.com/liferay/alloy-editor/issues/172)
- Create release task [\#169](https://github.com/liferay/alloy-editor/issues/169)
- Add SauceLabs badge [\#168](https://github.com/liferay/alloy-editor/issues/168)
- ReactUI styling for toolbar dropdowns is not reusable [\#140](https://github.com/liferay/alloy-editor/issues/140)
- Change the default skin from dark to ocean [\#98](https://github.com/liferay/alloy-editor/issues/98)
- Replace rimraf with del in gulp [\#95](https://github.com/liferay/alloy-editor/issues/95)

**Fixed bugs:**

- Test coverage is being added to the tests when running in debug more [\#177](https://github.com/liferay/alloy-editor/issues/177)
- Attribute leaks value among instances of same class [\#173](https://github.com/liferay/alloy-editor/issues/173)
- In YUI UI styles toolbar might be misaligned when link is being edited [\#166](https://github.com/liferay/alloy-editor/issues/166)
- Editor does not render properly in modal dialogs [\#165](https://github.com/liferay/alloy-editor/issues/165)
- Buttons like add image don't cancel properly the execlusive rendering [\#163](https://github.com/liferay/alloy-editor/issues/163)
- Editor does not hide its UI on clicking outside or on navigating via the tab outside [\#161](https://github.com/liferay/alloy-editor/issues/161)
- WidgetClickOutside subscribes to two events instead to just one [\#160](https://github.com/liferay/alloy-editor/issues/160)
- Add test infrastructure to the Rect UI [\#148](https://github.com/liferay/alloy-editor/issues/148)
- ReactUI action mixins don't have comprehensive method names [\#131](https://github.com/liferay/alloy-editor/issues/131)
- There is an exception when ToolbarAdd is trying to position in case of empty line [\#126](https://github.com/liferay/alloy-editor/issues/126)
- Editor does not compile with Node 0.12 [\#110](https://github.com/liferay/alloy-editor/issues/110)
- Make tests working on IE8 [\#99](https://github.com/liferay/alloy-editor/issues/99)
- \[UX\] The icon X on link view is misleading [\#88](https://github.com/liferay/alloy-editor/issues/88)

**Closed issues:**

- Autolink plugin triggers error in Portal when used in more than one editor [\#197](https://github.com/liferay/alloy-editor/issues/197)
- Autolink plugin triggers error in Portal when using it with the autocomplete plugin  [\#195](https://github.com/liferay/alloy-editor/issues/195)
- Autolink: must also recognize ftp:// and other protocols [\#193](https://github.com/liferay/alloy-editor/issues/193)
- Links: should automatically add "http://" to the URI if no protocol is present [\#192](https://github.com/liferay/alloy-editor/issues/192)
- Some listeners are attached before dom is ready [\#190](https://github.com/liferay/alloy-editor/issues/190)
- Cannot load autolink plugin at first position [\#188](https://github.com/liferay/alloy-editor/issues/188)
- ToolbarStyles in React UI is not easily configurable via JSON config [\#186](https://github.com/liferay/alloy-editor/issues/186)
- API docs are not built on release [\#184](https://github.com/liferay/alloy-editor/issues/184)
- DragResize css is not always loaded [\#183](https://github.com/liferay/alloy-editor/issues/183)
- Autolink plugin throws exception when the content is empty [\#178](https://github.com/liferay/alloy-editor/issues/178)
- Bundled tabletools plugin is incompatible with other CKEDITORs [\#175](https://github.com/liferay/alloy-editor/issues/175)
- ReactUI placeholder does not show [\#174](https://github.com/liferay/alloy-editor/issues/174)
- AlloyUI and Liferay Portal CSS leaks into ReactUI [\#170](https://github.com/liferay/alloy-editor/issues/170)
- Add D&D resize to images [\#167](https://github.com/liferay/alloy-editor/issues/167)
- Command mixin does not allow passing additional data to the engine's execCommand [\#164](https://github.com/liferay/alloy-editor/issues/164)
- Toolbar may appear out of the viewport [\#158](https://github.com/liferay/alloy-editor/issues/158)
- Remove the dark skin [\#157](https://github.com/liferay/alloy-editor/issues/157)
- Add tests to SelectionRegion [\#155](https://github.com/liferay/alloy-editor/issues/155)
- Add tests for tools [\#154](https://github.com/liferay/alloy-editor/issues/154)
- Add tests for Link util [\#153](https://github.com/liferay/alloy-editor/issues/153)
- Add tests for OOP in React UI [\#152](https://github.com/liferay/alloy-editor/issues/152)
- Add tests fo Lang in React UI [\#151](https://github.com/liferay/alloy-editor/issues/151)
- Add tests for debounce function [\#150](https://github.com/liferay/alloy-editor/issues/150)
- React UI Camera Button lacks icon [\#146](https://github.com/liferay/alloy-editor/issues/146)
- React UI Edit link scrolls page after focus [\#142](https://github.com/liferay/alloy-editor/issues/142)
- Implement add image button [\#138](https://github.com/liferay/alloy-editor/issues/138)
- React UI Styles button lacks a normal text style [\#136](https://github.com/liferay/alloy-editor/issues/136)
- UI icon contribution flow is not defined [\#134](https://github.com/liferay/alloy-editor/issues/134)
- Automatically generate links when user types text which looks like URL [\#132](https://github.com/liferay/alloy-editor/issues/132)
- React UI buttons don't accept configuration [\#125](https://github.com/liferay/alloy-editor/issues/125)
- Implement paragraph buttons \(align left, align right, center\) [\#123](https://github.com/liferay/alloy-editor/issues/123)
- Add picture from camera [\#122](https://github.com/liferay/alloy-editor/issues/122)
- Add remove format button [\#121](https://github.com/liferay/alloy-editor/issues/121)
- Add styles to the editor [\#117](https://github.com/liferay/alloy-editor/issues/117)
- Implement tables [\#116](https://github.com/liferay/alloy-editor/issues/116)
- ReactUI is missing focusManager [\#113](https://github.com/liferay/alloy-editor/issues/113)
- Add test skeleton gulp task for ReactUI [\#112](https://github.com/liferay/alloy-editor/issues/112)
- Make React UI default one [\#111](https://github.com/liferay/alloy-editor/issues/111)
- TwitterQuote button in React UI [\#109](https://github.com/liferay/alloy-editor/issues/109)
- Link button behaviour in React UI [\#108](https://github.com/liferay/alloy-editor/issues/108)
- React UI is missing buttons [\#107](https://github.com/liferay/alloy-editor/issues/107)
- Add Toolbar in React UI is not positioned properly [\#106](https://github.com/liferay/alloy-editor/issues/106)
- Remove Bootstrap dependency from React UI [\#104](https://github.com/liferay/alloy-editor/issues/104)
- CSS gulp task in react ui interrupts build on error [\#103](https://github.com/liferay/alloy-editor/issues/103)
- Creat UI using React [\#101](https://github.com/liferay/alloy-editor/issues/101)
- Add gulp watch task [\#97](https://github.com/liferay/alloy-editor/issues/97)
- Update AlloyEditor skin [\#91](https://github.com/liferay/alloy-editor/issues/91)
- Integrate AlloyEditor with Travis [\#90](https://github.com/liferay/alloy-editor/issues/90)
- Allow tests to be run using SauceLabs or locally [\#89](https://github.com/liferay/alloy-editor/issues/89)
- Button tests are not complete. We need to check if button removes selection style [\#87](https://github.com/liferay/alloy-editor/issues/87)
- Tests not working on Firefox  [\#86](https://github.com/liferay/alloy-editor/issues/86)
- IE browsers are not included in test process [\#85](https://github.com/liferay/alloy-editor/issues/85)
- When 'twitter' button is pressed on toolbar, 'link' button should be disabled, and viceversa [\#84](https://github.com/liferay/alloy-editor/issues/84)
- Editor looses focus when selecting text inside a link [\#83](https://github.com/liferay/alloy-editor/issues/83)
- Twitter link icon is not keyboard-editable [\#82](https://github.com/liferay/alloy-editor/issues/82)
- Link tooltips are no longer visible in dark skin [\#81](https://github.com/liferay/alloy-editor/issues/81)
- Toolbar animation is clunky [\#80](https://github.com/liferay/alloy-editor/issues/80)
- Remove link: should remove the entire \<a\> tag instead of just the current selection [\#79](https://github.com/liferay/alloy-editor/issues/79)
- Bug links: when closing linkView, "bold" button appear as pressed [\#78](https://github.com/liferay/alloy-editor/issues/78)
- Bug: when a link is selected and its linkView is openned, pressing on "X" button must remove the link [\#77](https://github.com/liferay/alloy-editor/issues/77)
- On click, Twitter button should create a link so the user will be able to tweet directly [\#76](https://github.com/liferay/alloy-editor/issues/76)
- Bug: "execCommand" returns focus to editor [\#75](https://github.com/liferay/alloy-editor/issues/75)
- Code button [\#74](https://github.com/liferay/alloy-editor/issues/74)
- Quote button [\#73](https://github.com/liferay/alloy-editor/issues/73)
- Create test infrastructure [\#68](https://github.com/liferay/alloy-editor/issues/68)
- Support additional toolbar context decision flow [\#64](https://github.com/liferay/alloy-editor/issues/64)
- Project Site: Using the Get started code, I'm unable to get a working demo [\#36](https://github.com/liferay/alloy-editor/issues/36)
- Create UI using Bootstrap & jQuery [\#7](https://github.com/liferay/alloy-editor/issues/7)
- Create vanilla UI [\#6](https://github.com/liferay/alloy-editor/issues/6)

**Merged pull requests:**

- Get current "editor" from the event. [\#198](https://github.com/liferay/alloy-editor/pull/198) ([ambrinchaudhary](https://github.com/ambrinchaudhary))
- Ignore SPACES when pressing ENTER key [\#196](https://github.com/liferay/alloy-editor/pull/196) ([ambrinchaudhary](https://github.com/ambrinchaudhary))
- Add tests [\#194](https://github.com/liferay/alloy-editor/pull/194) ([ambrinchaudhary](https://github.com/ambrinchaudhary))
- Wait until dom is ready to attach listeners that depends on the editable\(\) node [\#191](https://github.com/liferay/alloy-editor/pull/191) ([ambrinchaudhary](https://github.com/ambrinchaudhary))
- Wait until contentDom is ready to get the editable node [\#189](https://github.com/liferay/alloy-editor/pull/189) ([ambrinchaudhary](https://github.com/ambrinchaudhary))
- Generate docs [\#185](https://github.com/liferay/alloy-editor/pull/185) ([jbalsas](https://github.com/jbalsas))
- Add CSS before onload, in case inline instances are created [\#182](https://github.com/liferay/alloy-editor/pull/182) ([jbalsas](https://github.com/jbalsas))
- Cache range next nodes before modifying the range [\#179](https://github.com/liferay/alloy-editor/pull/179) ([jbalsas](https://github.com/jbalsas))
- Dont add the plugin if it already exists [\#176](https://github.com/liferay/alloy-editor/pull/176) ([jbalsas](https://github.com/jbalsas))
- Extra reset rules to protect from external stylesheets [\#171](https://github.com/liferay/alloy-editor/pull/171) ([jbalsas](https://github.com/jbalsas))
- Remove singleRun config from karma.js [\#149](https://github.com/liferay/alloy-editor/pull/149) ([jbalsas](https://github.com/jbalsas))
- SF [\#143](https://github.com/liferay/alloy-editor/pull/143) ([jbalsas](https://github.com/jbalsas))
- Include Illustrator source for icons and instructions [\#135](https://github.com/liferay/alloy-editor/pull/135) ([jbalsas](https://github.com/jbalsas))
- SF [\#133](https://github.com/liferay/alloy-editor/pull/133) ([jbalsas](https://github.com/jbalsas))
- React UI update \(\#103, \#104, \#106, \#107\) [\#105](https://github.com/liferay/alloy-editor/pull/105) ([jbalsas](https://github.com/jbalsas))
- Update bourbon dev dependency to use latest bourbon from master instead of node-bourbon [\#102](https://github.com/liferay/alloy-editor/pull/102) ([jbalsas](https://github.com/jbalsas))

## [v0.2.5](https://github.com/liferay/alloy-editor/tree/v0.2.5) (2014-11-14)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.2.4...v0.2.5)

**Closed issues:**

- Double pasting [\#72](https://github.com/liferay/alloy-editor/issues/72)

## [v0.2.4](https://github.com/liferay/alloy-editor/tree/v0.2.4) (2014-11-14)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.2.3...v0.2.4)

**Closed issues:**

- Add more icons to the font [\#71](https://github.com/liferay/alloy-editor/issues/71)
- Add configuration file for IcoMoon [\#70](https://github.com/liferay/alloy-editor/issues/70)
- Update CKEditor core to version 4.4.5 [\#69](https://github.com/liferay/alloy-editor/issues/69)
- Basic styling buttons should use CKEditor logic [\#67](https://github.com/liferay/alloy-editor/issues/67)
- Horizontal Rule button [\#66](https://github.com/liferay/alloy-editor/issues/66)
- When alloyeditor is destroyed, the debounce tasks must be cancelled [\#65](https://github.com/liferay/alloy-editor/issues/65)
- AlloyEditor should respect Word style by default [\#63](https://github.com/liferay/alloy-editor/issues/63)
- When adding images, we should also return the file element  [\#62](https://github.com/liferay/alloy-editor/issues/62)
- It is not possible to create release with non-minimized files [\#61](https://github.com/liferay/alloy-editor/issues/61)
- \[Project Site\] Make navigation menu responsive [\#60](https://github.com/liferay/alloy-editor/issues/60)
- \[Project Site\] Update to Bootstrap 3 [\#59](https://github.com/liferay/alloy-editor/issues/59)
- Project Site: Consolidate content on the Github project page to this Project site [\#52](https://github.com/liferay/alloy-editor/issues/52)
- Project Site: AlloyEditor branding is inconsistent  [\#51](https://github.com/liferay/alloy-editor/issues/51)
- Project Site: Consolidate the content about the custom UI feature into one page. [\#50](https://github.com/liferay/alloy-editor/issues/50)
- Project Site: Move the page Architecture to a main navigation item. [\#49](https://github.com/liferay/alloy-editor/issues/49)
- Project Site: Expand Contributing content [\#48](https://github.com/liferay/alloy-editor/issues/48)
- Project Site: Page "Create entirely new UI" mentions `gulp ui jquery` which doesn't exist in gulpfile [\#47](https://github.com/liferay/alloy-editor/issues/47)
- Project Site: Update site and release ZIPs to 0.2.2 [\#46](https://github.com/liferay/alloy-editor/issues/46)
- IE7 errors when viewing the live demo [\#43](https://github.com/liferay/alloy-editor/issues/43)
- Add functionality to create OL & UL lists. [\#41](https://github.com/liferay/alloy-editor/issues/41)
- Project Site: The API Docs links, at the bottom of pages, do not work. [\#39](https://github.com/liferay/alloy-editor/issues/39)
- Project Site: Following the tutorials as-is, I could not get a working demo. I needed to use the included demo in the ZIP as a guide. [\#37](https://github.com/liferay/alloy-editor/issues/37)
- Project Site: Rename main navigation item, "Example". [\#34](https://github.com/liferay/alloy-editor/issues/34)

## [v0.2.3](https://github.com/liferay/alloy-editor/tree/v0.2.3) (2014-10-30)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.2.2...v0.2.3)

**Implemented enhancements:**

- Update the site to match the new design of AlloyUI [\#21](https://github.com/liferay/alloy-editor/issues/21)

**Fixed bugs:**

- WidgetAutohide and manually checking for ESC key are clashing each other [\#56](https://github.com/liferay/alloy-editor/issues/56)
- Make Toolbars keyboard accessible [\#17](https://github.com/liferay/alloy-editor/issues/17)

**Closed issues:**

- Improve WAI-ARIA accessibility  [\#58](https://github.com/liferay/alloy-editor/issues/58)
- Button A is not accesible by keyboard [\#57](https://github.com/liferay/alloy-editor/issues/57)
- Buttons should update their UI when toolbars move only [\#55](https://github.com/liferay/alloy-editor/issues/55)
- Content editable, Marco Polo [\#45](https://github.com/liferay/alloy-editor/issues/45)
- When there are more than one alloy editor in a page and I click another editor, the button with the options is still displayed in the old editor [\#30](https://github.com/liferay/alloy-editor/issues/30)

## [v0.2.2](https://github.com/liferay/alloy-editor/tree/v0.2.2) (2014-09-16)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.2.1...v0.2.2)

**Implemented enhancements:**

- Twitter button should add the link to the current site [\#18](https://github.com/liferay/alloy-editor/issues/18)

**Fixed bugs:**

- Editor requires a server in order to run in dev mode. [\#23](https://github.com/liferay/alloy-editor/issues/23)
- Update CKEditor base path in release mode [\#19](https://github.com/liferay/alloy-editor/issues/19)

**Closed issues:**

- ToolbarAdd should slide to the right on empty lines [\#33](https://github.com/liferay/alloy-editor/issues/33)
- ToolbarAdd showAtPoint API is inconsistent [\#32](https://github.com/liferay/alloy-editor/issues/32)
- Toolbar config buttons does not accept button configuration. [\#31](https://github.com/liferay/alloy-editor/issues/31)
- Define add toolbar expected functionality [\#29](https://github.com/liferay/alloy-editor/issues/29)
- Modify toolbar add behavior [\#28](https://github.com/liferay/alloy-editor/issues/28)
- Extract toolbar position logic [\#27](https://github.com/liferay/alloy-editor/issues/27)
- Add support for multiple skins [\#26](https://github.com/liferay/alloy-editor/issues/26)
- Implement ocean skin [\#25](https://github.com/liferay/alloy-editor/issues/25)
- Implement dark skin and make it default one [\#24](https://github.com/liferay/alloy-editor/issues/24)
- Implement light skin [\#20](https://github.com/liferay/alloy-editor/issues/20)

## [v0.2.1](https://github.com/liferay/alloy-editor/tree/v0.2.1) (2014-08-07)
[Full Changelog](https://github.com/liferay/alloy-editor/compare/v0.2...v0.2.1)

**Implemented enhancements:**

- Change license to LGPL [\#16](https://github.com/liferay/alloy-editor/issues/16)

**Fixed bugs:**

- Implement UndoRedo [\#15](https://github.com/liferay/alloy-editor/issues/15)

**Closed issues:**

- Change the license to LGPL [\#14](https://github.com/liferay/alloy-editor/issues/14)

## [v0.2](https://github.com/liferay/alloy-editor/tree/v0.2) (2014-08-04)
**Implemented enhancements:**

- Duplicate project description in the README and project description  [\#13](https://github.com/liferay/alloy-editor/issues/13)
- There is no need to use custom function to retrieve document scroll position [\#11](https://github.com/liferay/alloy-editor/issues/11)
- Move documentation from docs to api folder [\#8](https://github.com/liferay/alloy-editor/issues/8)

**Fixed bugs:**

- Button add is missing btn class [\#10](https://github.com/liferay/alloy-editor/issues/10)
- Cannot toggle strong elements in editor area [\#9](https://github.com/liferay/alloy-editor/issues/9)
- Fix the example of embedding the editor to a page [\#5](https://github.com/liferay/alloy-editor/issues/5)
- Link Tooltip is not being destroyed on CKEditor destroying [\#4](https://github.com/liferay/alloy-editor/issues/4)
- Describe how to create an entirely new UI [\#3](https://github.com/liferay/alloy-editor/issues/3)
- Add documentation how to create a new button [\#2](https://github.com/liferay/alloy-editor/issues/2)
- Buttons don't have btn-default class name [\#1](https://github.com/liferay/alloy-editor/issues/1)



\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*