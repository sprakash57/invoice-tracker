/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStories } from './store/actions/index';
import MobileLayout from './components/MobileLayout';
import DesktopLayout from './components/DesktopLayout';

const App = ({ fetchStories, state }) => {
  const [mobile, setMobile] = useState(window.innerWidth <= 760);
  const [page, setPage] = useState(1);

  const handleResize = () => {
    let currentSize = window.innerWidth <= 760;
    if (currentSize !== mobile) {
      setMobile(currentSize);
    }
  }

  const handleNavigation = navigation => () => {
    let currentPage = page;
    if (navigation === 'next') currentPage++;
    else currentPage--;
    setPage(currentPage);
    fetchStories(currentPage);
  }

  useEffect(() => {
    fetchStories(page);
    window.addEventListener('resize', handleResize);
  }, [])

  return (
    <main className="container-fluid">
      {mobile ? <MobileLayout /> : <DesktopLayout />}
      <section><span hidden={page < 2} onClick={handleNavigation('prev')}>Previous</span>|<span onClick={handleNavigation('next')}>Next</span></section>
    </main>
  )
}

const mapState = state => ({
  state: state.storyReducer
})

const mapDispatch = dispatch => bindActionCreators({ fetchStories }, dispatch)

export default connect(mapState, mapDispatch)(App);
