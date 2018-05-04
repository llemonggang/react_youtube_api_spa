import _ from 'lodash'; 
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAhloYEGlp2-BW14Q_hheoIkqnL4VndHPc';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = { 
			videos: [],
			selectVideo: null
			}

		this.videoSearch('surfboards');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			})
		});
	}

	render() {
		const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300)


		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
				onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
				videos={this.state.videos} />
			</div>
		);
	}
};

ReactDOM.render(<App />, document.querySelector('.container'));