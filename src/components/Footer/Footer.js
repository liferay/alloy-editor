import React from 'react';

const Footer = () => {
    return (
        <section className="footer bg-dark text-white">
            <div className="container">
                <div className="row">
                    <div className="col-12">

                        <h2 className="h4 text-center">
                            <a className="text-decoration-none" href="http://liferay.com" target="_blank" rel="noopener noreferrer">Liferay.com</a>
                        </h2>

                        <ul className="nav justify-content-center mt-4">
                            <li className="nav-item mx-sm-1">
                                <a className="nav-link" href={process.env.GITHUB_REPO} target="_blank" rel="noopener noreferrer">
                                    <svg className="lexicon-icon">
                                            <use href="/images/icons/icons.svg#social-facebook" />
                                        </svg>
                                    </a>
                            </li>
                            <li className="nav-item mx-sm-1">
                                <a className="nav-link" href={process.env.GITHUB_REPO} target="_blank" rel="noopener noreferrer">
                                    <svg className="lexicon-icon">
                                        <use href="/images/icons/icons.svg#twitter" />
                                    </svg>
                                </a>
                            </li>
                            <li className="nav-item mx-sm-1">
                                <a className="nav-link" href={process.env.GITHUB_REPO} target="_blank" rel="noopener noreferrer">
                                    <svg className="lexicon-icon">
                                        <use href="/images/icons/icons.svg#social-linkedin" />
                                    </svg>
                                </a>
                            </li>
                            <li className="nav-item mx-sm-1">
                                <a className="nav-link" href={process.env.GITHUB_REPO} target="_blank" rel="noopener noreferrer">
                                    <img src="/images/home/GitHub-Mark-64px.svg" alt="" />
                                </a>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;