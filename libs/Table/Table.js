
import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const columns = [{
  title: '标题列',
  width: '100px'
}, {
  content: '内容列',
  width: '100px'
}];

class Table extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {list} = this.props;
    let columnCount = 2;

    return (
      <div className="v-table-container">
        {this.props.title}
        {
          list.map((item, index) => {
            return <React.Fragment key={index}>
              <div className="v-table-row">
                <div>{item.title}</div>
                <div>{item.content}</div>
              </div>
            </React.Fragment>;
          })
        }
      </div>
    );

  }

}

Table.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.array,
  list: PropTypes.array
};

export default Table;
