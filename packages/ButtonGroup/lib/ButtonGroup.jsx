import React from 'react';
import PropTypes from 'prop-types';
// import BaseButton from 'BaseButton';
import BaseButton from 'PillButton';
// np
const ButtonGroup = (props) => {
    const { data } = props;
    return (
        <BaseButton data={data} />
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
