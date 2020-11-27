import React from 'react';
import PropTypes from 'prop-types';

const Poster = ({ src }) => <img src={src} alt={src} />;

export default Poster;

Poster.propTypes = {
  src: PropTypes.node.isRequired,
};
