import {Link, StaticQuery, graphql} from 'gatsby';
import React from 'react';

export default props => (
	<StaticQuery
		query={graphql`
			query {
				allMdx(
					filter: {
						fields: {
							slug: {
								regex: "/^onboarding/i"
								ne: "onboarding/index.html"
							}
						}
					}
					sort: {order: ASC, fields: frontmatter___stepNumber}
				) {
					edges {
						node {
							fields {
								slug
								stepNumber
							}
						}
					}
				}
			}
		`}
		render={({allMdx: {edges}}) => {
			const fieldsFn = ({node: {fields}}) => fields;

			const steps = edges.map(fieldsFn);

			const activeStepNumber = props.stepNumber;

			return (
				<>
					<div className="container-fluid">
						<div className="sheet">
							<ol className="multi-step-nav multi-step-nav-collapse-sm multi-step-indicator-label-top">
								{steps.map(({slug, stepNumber}, index) => (
									<li
										key={index}
										className={`${handleActiveOrCompletedClasses_(
											stepNumber,
											activeStepNumber
										)} multi-step-item multi-step-item-expand`}>
										{steps[index + 1] && (
											<div className="multi-step-divider" />
										)}
										<div className="multi-step-indicator">
											<div className="multi-step-indicator-label">
												{handleSuccessPage_(
													slug,
													stepNumber
												)}
											</div>
											<Link
												className="multi-step-icon"
												data-multi-step-icon={`${stepNumber}`}
												to={slug}
											/>
										</div>
									</li>
								))}
							</ol>
						</div>
					</div>
				</>
			);
		}}
	/>
);

const handleSuccessPage_ = (slug, stepNumber) => {
	if (slug.endsWith('success.html')) {
		return 'Success Page';
	}
	return `Step ${stepNumber}`;
};

const handleActiveOrCompletedClasses_ = (stepNumber, activeStepNumber) => {
	if (activeStepNumber === stepNumber) {
		return 'active';
	}

	if (activeStepNumber < stepNumber) {
		return '';
	}

	if (activeStepNumber >= stepNumber) {
		return 'complete';
	}
};
