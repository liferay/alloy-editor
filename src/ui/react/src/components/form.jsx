(function () {
    'use strict';

    var AForm = React.createClass({
        componentDidMount: function() {
            AlloyEditor.editable('editable');
        },

        render: function() {
            return (
                <form>
                    <div>
                        <label htmlFor="title">Title:</label>

                        <div id="title" placeholder="Title">
                            <input type="text" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="editable">Body:</label>

                        <div id="editable" placeholder="Write here the content">
                            <p>After being sent to the Moon by the Saturn V&#39;s upper stage, the astronauts separated the spacecraft from it and travelled for three days until they entered into lunar orbit. Armstrong and Aldrin then moved into the Lunar Module and landed in the <a href="http://en.wikipedia.org/wiki/Mare_Tranquillitatis">Sea of Tranquility</a>. They stayed a total of about 21 and a half hours on the lunar surface. After lifting off in the upper part of the Lunar Module and rejoining Collins in the Command Module, they returned to Earth and landed in the <a href="http://en.wikipedia.org/wiki/Pacific_Ocean">Pacific Ocean</a> on July 24.</p>
                        </div>
                    </div>

                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            );
        }
    });

    AlloyEditor.AForm = AForm;
}());