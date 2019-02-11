import React, {Component} from 'react';

class Timeline extends Component {
    _compareVersions(a, b) {
        if (a.version < b.version)
            return 1;
        if (a.version > b.version)
            return -1;
        return 0;
    }

    render() {
        let updates = this.props.data;

        updates.sort(this._compareVersions);

        return (
            <>
                {/* <ul className="timeline timeline-center">
                    {updates.map(({ version, major, features }, updatesIndex) => (
                        <li key={updatesIndex} className="timeline-item">
                            {features.map((featProp, featuresIndex) => (
                                <div key={featuresIndex} className="panel panel-secondary">
                                    <a aria-expanded="true" className="panel-header panel-header-link" data-toggle="collapse" href={featProp.url} id="headingTimelineCenter0" role="tab">
                                        <span className="panel-title">{featProp.title}</span>
                                        <div className="timeline-increment">
                                            <svg aria-hidden="true" className={`lexicon-icon lexicon-icon-${featProp.icon}`}>
                                                <use xlinkHref={`/images/icons/icons.svg#${featProp.icon}`}></use>
                                            </svg>
                                        </div>
                                        <div className="timeline-item-label">
                                            {featuresIndex > 0 ? '' :  major?(<h2> { version } </h2>) : <p>{version}</p>}
                                        </div>
                                    </a>
                                    <div aria-labelledby="headingTimelineCenter0" className="panel-collapse collapse show" role="tabpanel">
                                        <div className="panel-body">
                                            {featProp.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </li>
                    ))}
                </ul> */}

                {updates.map(({ version, major, features }, updatesIndex) => (
                    <div key={updatesIndex} className={major ? 'col-12 update-container' : 'col-12 update-container update-minor'}>
                        <div class="update-version position-relative bg-white border border-primary rounded-circle mx-auto d-flex justify-content-center align-items-center mb-0">
                            <span>{version}</span>
                        </div>

                        {features.map((featProp, featuresIndex) => (
                            <a href={featProp.url} key={featuresIndex} target="_blank" className="update-item position-relative d-flex flex-column flex-md-row align-items-center py-4 py-md-0 text-dark">
                                <div class="update-icon position-relative rounded-circle flex-shrink-0 p-3 d-flex justify-content-center align-items-center">
                                    <svg class="lexicon-icon m-0">
                                        <use href={"/images/icons/icons.svg#"+featProp.icon} />
                                    </svg>
                                </div>

                                <div class="update-content bg-white rounded px-4 pt-3 py-md-4">
                                    <h3>{featProp.title}</h3>

                                    <p className="text-secondary mb-0">{featProp.description}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                ))}
                <div className="col-12 update-container">
                    <div class="update-version position-relative bg-white border border-primary rounded-circle mx-auto d-flex justify-content-center align-items-center mb-0">
                        <span>1.0.0</span>
                    </div>
                </div>
            </>
        );
    }
}

export default Timeline;
