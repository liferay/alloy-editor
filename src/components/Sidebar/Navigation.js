import React, {Component} from 'react';
import classNames from 'classnames';
import {Link} from 'gatsby';

class Navigation extends Component {
	_handleOnClick(index, depth, section, event) {
		event.stopPropagation();

		const elementRef = this.refs[`navItem${index}${depth}`];

		if (!elementRef.classList.contains('active') || !!section.items) {
			elementRef.classList.toggle('active');
		}
	}

	_isActive(section) {
		const {location} = this.props;

		const sectionLocation = location.pathname.split('.')[0];

		if (section.isFolder) {
			return sectionLocation.includes(section.id);
		}

		return sectionLocation === section.link;
	}

	renderNavigationItems() {
		const {sectionList, location, depth = 0} = this.props;

		return sectionList.map((section, index) => {
			const style = classNames('nav-item', {
				active: this._isActive(section) === true,
			});

			return (
				<li
					key={index}
					ref={`navItem${index}${depth}`}
					className={style}
					onClick={this._handleOnClick.bind(
						this,
						index,
						depth,
						section
					)}>
					<Anchor page={section} />

					{section.items && (
						<Navigation
							sectionList={section.items}
							location={location}
							depth={depth + 1}
						/>
					)}
				</li>
			);
		});
	}

	render() {
		return (
			<ul className="nav flex-column">{this.renderNavigationItems()}</ul>
		);
	}
}

const Anchor = ({page}) => {
	if (page.items) {
		return (
			<a className="nav-link" href="#no">
				<span>{page.title}</span>
				{/* <svg className="collapse-toggle clay-icon icon-monospaced">
                    <use xlinkHref="/images/icons/icons.svg#caret-bottom" />
                </svg> */}
				<svg className="lexicon-icon float-right mt-1">
					<use href="/images/icons/icons.svg#caret-bottom" />
				</svg>
			</a>
		);
	}

	return (
		<Link to={`${page.link}.html`} className="nav-link">
			<span>{page.title}</span>
		</Link>
	);
};

export default Navigation;
