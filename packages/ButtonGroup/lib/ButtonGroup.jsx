import React from 'react';
import PropTypes from 'prop-types';
// import BaseButton from 'BaseButton';
// import PillButton from 'pill-button';
// np
const ButtonGroup = (props) => {
    const { data } = props;
    return (
        <div>sd</div>
    )
};

ButtonGroup.defaultProps = {
    data: []
};

ButtonGroup.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({}))
};

// module.exports = BaseButton
export default ButtonGroup;
