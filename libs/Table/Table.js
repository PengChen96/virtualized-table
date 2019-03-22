
import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

class Table extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="v-table-container">
        {this.props.title}

        table
      </div>
    );

  }

}

Table.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array
};

export default Table;
