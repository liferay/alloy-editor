/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

const removeImageCommand = {
	exec: editor => {
		const selection = editor.getSelection();

		if (selection) {
			const ranges = selection.getRanges();
			const startContainer = ranges[0].startContainer;

			const nextRange = new CKEDITOR.dom.range(startContainer);
			nextRange.setStart(startContainer, 0);
			nextRange.setEnd(startContainer, 0);

			const selectedElement = selection.getSelectedElement();

			if (selectedElement && selectedElement.getName() === 'img') {
				const native = selection.getNative();
				if (native) {
					native.removeAllRanges();
				}

				selection.selectRanges([nextRange]);

				selectedElement.remove();
			}
		}
	},
};

export default removeImageCommand;
