import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ title }) => <h3>{title}</h3>;

export default Title;

Title.propTypes = {
  title: PropTypes.node.isRequired,
};
