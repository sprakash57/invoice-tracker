import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { storeVotes, storeNews } from '../store/actions/index';

const DesktopLayout = ({ storeVotes, state }) => {
    const [hits, setHits] = useState([]);
    const [votes, setVotes] = useState([]);
    const [displayNews, setDisplayNews] = useState([]);

    const handleVotes = index => () => {
        const newVotes = [...votes];
        newVotes[index] += 1;
        setVotes(newVotes);
        if (window.localStorage) {
            localStorage.setItem('votes', JSON.stringify(newVotes));
        }
        storeVotes(newVotes);
    }

    const hideNews = index => () => {
        let modifiedList = [...displayNews];
        modifiedList[index] = false;
        setDisplayNews(modifiedList);
        if (window.localStorage) {
            localStorage.setItem('news', JSON.stringify(modifiedList));
        }
        storeNews(modifiedList);
    }

    const newsDetails = (news, index) => {
        const result = news._highlightResult;
        const story = news.title || (result.title && result.title.value) || '';
        const url = news.url || (result.url && result.url.value) || '';
        const author = news.author ? news.author : result.author ? result.author.value : '';
        const time = moment(news.created_at).fromNow() || '';

        return (
            <section>
                <span className='story'>{story}</span>
                <span className='url'> (<a href={url} target="_blank" rel='noreferrer noopener'>{url}</a>) </span>
                <span>by</span>
                <span className='author'>{author}</span>
                <span className='time mr-2'>{time}</span>
                [<span onClick={hideNews(index)} className='hide'>hide</span>]
            </section>
        )
    }

    useEffect(() => {
        setHits(state.stories.hits);
        if (window.localStorage) {
            const prevVotes = JSON.parse(localStorage.getItem('votes'));
            const prevDisplay = JSON.parse(localStorage.getItem('news'));
            if (!prevVotes) setVotes(Array(20).fill(0));
            else setVotes(prevVotes);
            if (!prevDisplay) setDisplayNews(Array(20).fill(true));
            else setDisplayNews(prevDisplay);
        }
    }, [state.stories])

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr className='table-header'>
                        <th scope="col">Comments</th>
                        <th scope="col">Vote Count</th>
                        <th scope="col">UpVotes</th>
                        <th scope="col">News Details</th>
                    </tr>
                </thead>
                <tbody>
                    {hits.map((hit, i) => {
                        if (displayNews[i]) {
                            return (
                                <tr key={i}>
                                    <th scope="row">{hit.num_comments || 0}</th>
                                    <td>{votes[i]}</td>
                                    <td><div className='arrow-up' onClick={handleVotes(i)}></div></td>
                                    <td>{newsDetails(hit, i)}</td>
                                </tr>
                            )
                        }
                        return null;
                    })}
                </tbody>
            </table>
        </div>
    )
}

const mapState = state => ({
    state: state.storyReducer
})

const mapDispatch = dispatch => bindActionCreators({ storeVotes, storeNews }, dispatch)

export default connect(mapState, mapDispatch)(DesktopLayout);