import dom from 'metal-dom';
import Tabs from 'metal-tabs';

class CodeTabs {
	constructor() {
		let className = 'code-container';

		let tabGroupsData = [];
		let elements = Array.prototype.slice.call(document.querySelectorAll(`.${className}`));
		elements.forEach(element => {
			tabGroupsData.push({
				label: this._getTabLabelFromElement(element),
				element: element,
			});

			if (!element.nextElementSibling || !dom.hasClass(element.nextElementSibling, className)) {
				if (tabGroupsData.length > 1) {
					this._renderTabs(tabGroupsData);
				}
				tabGroupsData = [];
			}
		});
	}

	_getTabLabelFromElement(element) {
		return element.getAttribute('data-label');
	}

	_hide(element) {
		dom.addClasses(element, 'hide');
	}

	_hideAll(tabs) {
		tabs.forEach((tab) => {
			this._hide(tab.element);
		});
	}

	_renderTabs(data) {
		let container = dom.buildFragment('<div class="tabContainer"></div>');
		let tabsComponent = new Tabs({
			elementClasses: 'nav-code-tabs',
			tabs: data,
		}, container);

		tabsComponent.on('changeRequest', event => {
			let currentTab = event.state.tab;
			this._hideAll(tabsComponent.tabs);
			this._show(tabsComponent.tabs[currentTab].element);
		});

		this._hideAll(tabsComponent.tabs);
		this._show(tabsComponent.tabs[0].element);

		data[0].element.parentNode.insertBefore(container, data[0].element);
	}

	_show(element) {
		dom.removeClasses(element, 'hide');
	}
}

export default CodeTabs;
