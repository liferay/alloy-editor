const path = require('path');

const rootDir = path.join(__dirname, '..', '..', '..');

const assetsDir = path.join(rootDir, 'src', 'assets');
const langDir = path.join(assetsDir, 'lang');
const ckeditorLangKeys = path.join(langDir, 'vendor', 'ckeditor.json');
const ckeditorLangContent = require(ckeditorLangKeys);
const distFolder = path.join(rootDir, 'dist');
const editorDistFolder = path.join(distFolder, 'alloy-editor');
const srcLangDir = path.join(rootDir, 'src', '__generated__', 'lang');

module.exports = {
	rootDir,
	assetsDir,
	ckeditorLangKeys,
	ckeditorLangContent,
	distFolder,
	editorDistFolder,
	langDir,
	srcLangDir,
};
