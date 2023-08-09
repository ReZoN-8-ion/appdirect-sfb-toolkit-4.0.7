import React from 'react';
import PropTypes from 'prop-types';
import './styles/Label.scss';

const Label = ({
	label,
	...otherProps
}) => (
	<span class="myLabel" {...otherProps}>{label}</span>
);

Label.propTypes = {
	label: PropTypes.string
};

Label.defaultProps = {
	label: ''
};

export default Label;
