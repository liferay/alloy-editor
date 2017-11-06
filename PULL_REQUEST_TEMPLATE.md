Please employ to following template as the base structure of Pull Requests for **Alloy-Editor** project. Pull Requests not incorporating the sections below will be reqarded as unsatisfying and rejected. 

## Prelude
Preliminary history of the issue related this very Pull Request. Share any information that could ease the understanding of why this issue exists and what measures have been administered to address it.

## Issue
Link the issue from the issues list with any complementary explanation that is required to have a solid understanding of it.

## Solution
Line up the major changes that have been applied. 

## Test
Append a comprehensive list of devices against which the implementation was tested. This is relevant only if the issue described incorporates various behaviours on different devices.

If possible attach an animated GIF of the major scenarios that have been affected by the change, so that non-techincal participants can also have a better undertanding of the subject matter. 



# Example

## Prelude
Empty `<p>` elements are regarded empty content that causes the editor to show the placeholder message (`data-placeholder="Write some content here..."`). During certain scenarios the placeholder message fail to appear. 

## Issue
#768.

## Solution
- Extended the list of expected empty values in the `ae-placeholder` plugin. 

## Test

#### Tested on
- macOS Sierra 10.12.6
- iPhone 6 iOS 8.1

![ezgif com-video-to-gif 4](https://user-images.githubusercontent.com/6104164/32446294-b7857c5a-c308-11e7-9cc4-6edbe7e1d876.gif)
