import React from 'react';
import { version } from 'd3';

const DataGraph = () => {
    React.useEffect(() => {
       console.log('version', version); // eslint-disable-line
    }, []);

    return (
        <div>
            d3 here
        </div>
    );
};

export default DataGraph;
