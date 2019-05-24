import React from 'react';
import PropTypes from 'prop-types';
import BaseButton from 'base-button';
// import pill-button from 'pill-button';
// np
const ButtonGroup = (props) => {
    const { data } = props;
    return (
        <div>
            {
                data.map(v => (<BaseButton key={v.label} onClick={v.onClick}>{v.label}</BaseButton>))
            }
        </div>
    )
};

ButtonGroup.defaultProps = {
    data: []
};

ButtonGroup.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({}))
};

// module.exports = base-button
export default ButtonGroup;
