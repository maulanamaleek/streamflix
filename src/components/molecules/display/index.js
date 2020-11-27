import React from 'react';
import PropTypes from 'prop-types';
import { Poster, Title } from '../../atoms';

export default function Display({ src, title }) {
  return (
    <div>
      <Poster src={src} />
      <Title title={title} />
    </div>
  );
}

Display.propTypes = {
  src: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
};
