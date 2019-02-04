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
                <ul className="timeline timeline-center">
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
                </ul>
            </>
        );
    }
}

export default Timeline;
