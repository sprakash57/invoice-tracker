/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStories, storeVotes } from '../store/actions/index';
import DesktopLayout from './DesktopLayout';

const App = ({ fetchStories, storeVotes }) => {
  const [page, setPage] = useState(1);

  const handleNavigation = navigation => () => {
    let currentPage = page;
    if (navigation === 'next') currentPage++;
    else currentPage--;
    setPage(currentPage);
    fetchStories(currentPage);
  }

  useEffect(() => {
    fetchStories(page);
    if (window.localStorage) {
      storeVotes(JSON.parse(localStorage.getItem('votes')));
    }
  }, [])

  return (
    <main className="container-fluid table-container">
      <DesktopLayout />
      <section className='navigation'>
        <span onClick={handleNavigation('next')}>Next</span>
        <span hidden={page < 2} onClick={handleNavigation('prev')}>Previous |</span>
      </section>
    </main>
  )
}

const mapDispatch = dispatch => bindActionCreators({ fetchStories, storeVotes }, dispatch)

export default connect(null, mapDispatch)(App);
