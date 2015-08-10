0.4.0
All AlloyEditor plugins are renamed and they are now prefixed with "ae_". Example: previously "addimages",
now "ae_addimages". The goal of this change is to isolate as much as possible AlloyEditor's plugins
from these of CKEDitor and prevent possibilities for clashing.

0.3.0
Issue #219 removes the event 'imageDrop' when user D&D image inside the editor. Instead, an event 'imageAdd'
will be fired.