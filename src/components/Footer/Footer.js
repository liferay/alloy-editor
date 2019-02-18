import React from 'react';

const Footer = () => {
	return (
		<section className="footer bg-dark text-white">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h2 className="h4 text-center">
							<a
								className="text-decoration-none"
								href="http://liferay.com"
								target="_blank"
								rel="noopener noreferrer">
								Liferay.com
							</a>
						</h2>

						<ul className="nav justify-content-center mt-4">
							<li className="nav-item mx-sm-1">
								<a
									className="nav-link px-2 px-sm-3"
									href="https://www.facebook.com/liferay/"
									target="_blank"
									rel="noopener noreferrer"
									title="facebook">
									<svg className="lexicon-icon">
										<use href="/images/icons/icons.svg#social-facebook" />
									</svg>
								</a>
							</li>
							<li className="nav-item mx-sm-1">
								<a
									className="nav-link px-2 px-sm-3"
									href="https://twitter.com/liferay"
									target="_blank"
									rel="noopener noreferrer"
									title="twitter">
									<svg className="lexicon-icon">
										<use href="/images/icons/icons.svg#twitter" />
									</svg>
								</a>
							</li>
							<li className="nav-item mx-sm-1">
								<a
									className="nav-link px-2 px-sm-3"
									href="https://www.linkedin.com/company/liferay-inc-?trk=NUS_CMPY_TWIT"
									target="_blank"
									rel="noopener noreferrer"
									title="linkedin">
									<svg className="lexicon-icon">
										<use href="/images/icons/icons.svg#social-linkedin" />
									</svg>
								</a>
							</li>
							<li className="nav-item mx-sm-1">
								<a
									className="nav-link px-2 px-sm-3"
									href="https://github.com/liferay/alloy-editor"
									target="_blank"
									rel="noopener noreferrer"
									title="github">
									<img
										src="/images/home/GitHub-Mark-64px.svg"
										alt=""
									/>
								</a>
							</li>
							<li className="nav-item mx-sm-1">
								<a
									className="nav-link px-2 px-sm-3"
									href="https://community.liferay.com/projects"
									target="_blank"
									rel="noopener noreferrer"
									title="projects">
									<svg className="lexicon-icon">
										<use href="/images/icons/icons.svg#grid" />
									</svg>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Footer;
