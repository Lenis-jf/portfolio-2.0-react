import React, { useState, useEffect } from "react";

function CustomVideoPlayer() {

	const [videoCurrentTime, updateVideoCurrentTime] = useState(0);
	const [videoDuration, updateVideoDuration] = useState(0);
	const [screenMode, setScreenMode] = useState("small");

	function formatTime(time) {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	}

	useEffect(() => {
		const videoContainer = document.querySelector('div.video-container');
		const video = document.querySelector('video');
		const videoScreenControls = document.querySelectorAll('div.screen-controls');

		if (video) {
			video.addEventListener("timeupdate", updateTime);
		}

		function updateTime() {
			updateVideoCurrentTime(video.currentTime);
			updateVideoDuration(video.duration);

			const durationCounter = document.querySelector('div.video-bottom div.time');
			if (durationCounter) {
				durationCounter.textContent = `${formatTime(videoCurrentTime)}/${formatTime(videoDuration)}`;
			};
		}

		function handleScreenMode(event) {
			const targetScreenControl = event.target.closest('.screen-controls');	

			if(targetScreenControl)
				if(targetScreenControl.classList.contains("maximize")) {
					setScreenMode("full-screen");
					targetScreenControl.classList.remove("maximize");
					targetScreenControl.classList.add("minimize");
					// const mainContent = document.querySelector('.main-content');
					// mainContent.classList.add('blurry-effect');
				} else if(targetScreenControl.classList.contains("minimize")) {
					setScreenMode("small");
					targetScreenControl.classList.remove("minimize");
					targetScreenControl.classList.add("maximize");
				} else if(targetScreenControl.classList.contains("max-width")) {
					setScreenMode("max-width")
				} else if(targetScreenControl.classList.contains("min-width")) {
					setScreenMode("min-width")
				}
		}
		
		videoScreenControls.forEach(screenControl => {
			screenControl.addEventListener('click', handleScreenMode);
		});

		return () => {
			if (video) {
				video.removeEventListener('timeupdate', updateTime);
			}
			if(videoScreenControls)
				videoScreenControls.forEach(screenControl => {
					screenControl.removeEventListener('click', handleScreenMode);
				});
		}
	}, [videoCurrentTime, videoDuration, screenMode]);

	const progressBarWidth = videoDuration ? (videoCurrentTime / videoDuration) * 100 : 0;

	useEffect(() => {

		const videoPlayControl = document.querySelector('div.video-container div.controls');
		const videoPlayControlSmall = document.querySelector('div.smallerControls');
		const videoScreenControls = document.querySelectorAll('div.screen-controls');
		const video = document.querySelector('video');

		if (video) {
			videoPlayControl.addEventListener('click', playManager);
			videoPlayControlSmall.addEventListener("click", playManager);
			video.addEventListener("click", showControls);
		}

		function showControls() {
			videoPlayControl.classList.add('show');

			videoScreenControls.forEach(
				screenControl => {
					screenControl.classList.add('show');
				}
			);

			setTimeout(() => { 
				videoPlayControl.classList.remove('show')
				
				videoScreenControls.forEach(
					screenControl => {
						screenControl.classList.remove('show');
					}
				);
			}, 1000);
		}

		function playManager() {
			if (video.paused) {
				videoPlayControl.classList.toggle('paused');
				videoPlayControl.classList.toggle('playing');
				videoPlayControlSmall.classList.toggle('playing');
				videoPlayControlSmall.classList.toggle('paused');

				videoScreenControls.forEach(screenControl => {
					screenControl.classList.toggle('paused');
					screenControl.classList.toggle('playing');
				});

				video.play();
			} else if (videoPlayControl.classList.contains('playing')) {
				video.pause();
				videoPlayControl.classList.toggle('playing');
				videoPlayControl.classList.toggle('paused');
				videoPlayControlSmall.classList.toggle('playing');
				videoPlayControlSmall.classList.toggle('paused');
				
				videoScreenControls.forEach(screenControl => {
					screenControl.classList.toggle('playing');
					screenControl.classList.toggle('paused');
				});				
			}
		}

		return () => {
			if (video)
				video.removeEventListener('click', showControls);
			if (videoPlayControl)
				videoPlayControl.removeEventListener('click', playManager)
			if (videoPlayControlSmall)
				videoPlayControlSmall.removeEventListener('click', playManager);
		}

	}, []);

	return (
			<div className={`video-container ${screenMode}`}>
				<div className="controls paused"></div>
				<video
					className={`video-container ${screenMode}`}
					src={`${process.env.PUBLIC_URL}/assets/videos/dronesim.mp4`}
					controls={false} 
				/>
				<div className="screen-controls maximize paused"></div>
				<div className="screen-controls max-width paused"></div>
				<div className="video-bottom">
					<div className="smallerControls paused"></div>
					<div className="video-duration-bar">
						<div className="video-progress-bar" style={{ width: `${progressBarWidth}%` }}></div>
					</div>
					<div className="time">{formatTime(videoCurrentTime)}/{formatTime(videoDuration)}</div>
				</div>
			</div>
	);

}

export default CustomVideoPlayer;