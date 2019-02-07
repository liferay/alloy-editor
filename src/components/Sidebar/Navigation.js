import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from "gatsby"

class Navigation extends Component {
    _handleOnClick(index, depth, section, event) {
        event.stopPropagation();

        const elementRef = this.refs[`navItem${index}${depth}`];

        if (!elementRef.classList.contains('active') || !!section.items) {
            elementRef.classList.toggle('active');
        }
    }

    _isActive(section) {
        const { location } = this.props;
        // this is easy to understand with an example:
        // let's say we have the location.pathname equal to "/docs/Porygon/detail.html"
        // we extract the location path without the ".html" part in order to obtain "/docs/Porygon/detail"
        const sectionLocation = location.pathname.split('.')[0];

        // if there is no section.link it means we are looking at the parent-menu
        if (!section.link) {
            // in the parent-menu we can use the section.id corrisponding to "Porygon" instead of section.link
            // so we ask 'is there a "Porygon" in "/docs/Porygon/detail" ?'
            return sectionLocation.includes(section.id);
        }
        // otherwise we compare the sectionLocation with the section.link
        // in the latest versions of gatsby-boilerplate, the parent link exists and it ends in "/index"
        // we need to remove the "/index" part to avoid the use of "alwaysActive" flag
        return sectionLocation.includes(section.link.split('/index')[0]);
    }

    renderNavigationItems() {
        const { sectionList, location, depth = 0 } = this.props;

        return sectionList.map((section, index) => {
            let style = classNames('nav-item', {
                'active': this._isActive(section) === true,
            });

            return(
                <li key={index} ref={`navItem${index}${depth}`} className={style} onClick={this._handleOnClick.bind(this, index, depth, section)}>
                    <Anchor page={section} />

                    {section.items && (
                        <Navigation sectionList={section.items} location={location} depth={depth + 1} />
                    )}
                </li>
            );
        });
    }

    render() {
        return(
            <ul className="nav flex-column">
                {this.renderNavigationItems()}
            </ul>
        );
    }
}

const Anchor = ({page}) => {
    if (page.items) {
        return(
            <a className="nav-link" href="#no">
                <span>{page.title}</span>
                {/* <svg className="collapse-toggle clay-icon icon-monospaced">
                    <use xlinkHref="/images/icons/icons.svg#caret-bottom" />
                </svg> */}
                <svg class="lexicon-icon float-right mt-1">
                    <use href="/images/icons/icons.svg#caret-bottom" />
                </svg>
            </a>
        );
    }

    return (
        <Link
            to={`${page.link}.html`}
            className="nav-link"
        >
            <span>{page.title}</span>
        </Link>
    );
};

export default Navigation;