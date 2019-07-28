import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Strapi';

class FetchData extends Component {
  componentDidMount() {
    // This method is called when the component is first added to the document
    this.ensureDataFetched();
  }

  componentDidUpdate() {
    // This method is called when the route parameters change
    this.ensureDataFetched();
  }

  ensureDataFetched() {
    const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;

    this.props.requestApps(startDateIndex);
  }

  render() {
    return (
      <div>
        <h1>Apps</h1>
        <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        {renderApps(this.props)}
        {/*{renderPagination(this.props)}*/}
      </div>
    );
  }
}

function renderApps(props) {
  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {props.apps.map(app =>
          <tr key={app.id}> 
            <td>{app.Name}</td>
            <img src={"http://localhost:1337"+app.Icon.url} alt="" srcSet=""/>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function renderPagination(props) {
  const prevStartDateIndex = (props.startDateIndex || 0) - 5;
  const nextStartDateIndex = (props.startDateIndex || 0) + 5;

  return <p className='clearfix text-center'>
    <Link className='btn btn-default pull-left' to={`/fetch-data/${prevStartDateIndex}`}>Previous</Link>
    <Link className='btn btn-default pull-right' to={`/fetch-data/${nextStartDateIndex}`}>Next</Link>
    {props.isLoading ? <span>Loading...</span> : []}
  </p>;
}

export default connect(
  state => state.apps,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(FetchData);
