import React, { useState, useEffect, useRef } from "react";

function CustomVideoPlayer(props) {

	const videoContainerRef = useRef(null)
	const videoRef = useRef(null)
	const videoScreenControlsRef = useRef([])
	const videoDurationCounterRef = useRef(null)
	const videoPlayControlRef = useRef(null)
	const videoPlayControlSmallRef = useRef(null)

	const [metadataLoaded, setMetadataLoaded] = useState(false)
	const [videoCurrentTime, updateVideoCurrentTime] = useState(0);
	const [videoDuration, updateVideoDuration] = useState(0);
	const [videoEnded, setVideoEnded] = useState(false);
	const [screenMode, setScreenMode] = useState("small");

	function formatTime(time) {
		if (!metadataLoaded || isNaN(time)) return "0:00";
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	}

	function enterFullScreenHandler() {
		try {
			if (videoContainerRef.current.requestFullscreen) {
				videoContainerRef.current.requestFullscreen();
			} else if (videoContainerRef.current.webkitRequestFullscreen) {
				videoContainerRef.current.webkitRequestFullscreen();
			}
		} catch (error) {
			console.error('Error activating Fullscreen mode:', error);
		}

	}

	function exitFullScreenHandler() {
		try {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		} catch (error) {
			console.error('Error exiting Fullscreen mode:', error);
		}


	}

	useEffect(() => {
		const handleFullscreenChange = () => {
			if (!document.fullscreenElement && !document.webkitIsFullscreen) {
				videoContainerRef.current?.scrollIntoView({
					behavior: "instant",
					block: "center"
				});
			}
		};
	
		document.addEventListener('fullscreenchange', handleFullscreenChange);
		document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
	
		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
			document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
		};
	}, []);

	useEffect(() => {
		const video = videoRef.current

		const handleMetadata = () => {
			updateVideoDuration(video.duration);
			setMetadataLoaded(true);
		};

		const handleEnded = () => {
			setVideoEnded(true);
			videoPlayControlRef.current?.classList.remove('playing');
			videoPlayControlRef.current?.classList.add('paused');
			videoPlayControlSmallRef.current?.classList.remove('playing')
			videoPlayControlSmallRef.current?.classList.add('paused')
			videoScreenControlsRef.current.forEach(control => {
				control?.classList.remove('playing');
				control?.classList.add('paused');
			});

		};

		if (video) {
			video.addEventListener('loadedmetadata', handleMetadata);
			video.addEventListener('ended', handleEnded);
		}

		return () => {
			video.removeEventListener('loadedmetadata', handleMetadata);
			video.removeEventListener('ended', handleEnded)
		}
	}, []);

	useEffect(() => {
		const videoContainer = videoContainerRef.current
		const video = videoRef.current
		const videoScreenControls = videoScreenControlsRef.current.filter(Boolean);
		const durationCounter = videoDurationCounterRef.current;

		if (video) {
			video.addEventListener("timeupdate", updateTime);
		}

		if (durationCounter) {
			updateVideoCurrentTime(video.currentTime);
			updateVideoDuration(video.duration);

			durationCounter.textContent = `${formatTime(videoCurrentTime)}/${formatTime(videoDuration)}`;
		};

		function updateTime() {
			updateVideoCurrentTime(video.currentTime);
			updateVideoDuration(video.duration);

			if (durationCounter) {
				durationCounter.textContent = `${formatTime(videoCurrentTime)}/${formatTime(videoDuration)}`;
			};
		}

		function handleScreenMode(event) {
			const targetScreenControl = event.target.closest('.screen-controls');
			const header = document.querySelector('header');

			if (videoContainer && targetScreenControl && header)
				if (targetScreenControl.classList.contains("maximize")) {
					setScreenMode("fullscreen");

					window.scrollTo({
						top: 0,
						behavior: "instant"
					});

					targetScreenControl.classList.remove("maximize");
					targetScreenControl.classList.add("minimize");

					header.classList.add('hidden');
					document.documentElement.style.overflow = "hidden"

					videoScreenControls.forEach(screenControl => {
						screenControl.style.bottom = "25px";
						screenControl.classList.add("show");

						if (screenControl.classList.contains("minimize"))
							screenControl.style.right = "10px"
						else if (screenControl.classList.contains("max-width"))
							screenControl.style.right = "40px"
					});

					enterFullScreenHandler();
				} else if (targetScreenControl.classList.contains("minimize")) {
					setScreenMode("small");

					document.documentElement.style.overflow = "auto"

					targetScreenControl.classList.remove("minimize");
					header.classList.remove('hidden');

					targetScreenControl.classList.add("maximize");
					videoScreenControls.forEach(screenControl => {
						screenControl.style.bottom = "10px";

						if (!video.paused)
							screenControl.classList.remove("show");

						if (screenControl.classList.contains("maximize"))
							screenControl.style.right = "8px"
						else if (screenControl.classList.contains("max-width"))
							screenControl.style.right = "35px"

					});

					exitFullScreenHandler();
				} else if (targetScreenControl.classList.contains("max-width")) {
					setScreenMode("max-width")

					targetScreenControl.classList.remove("max-width");
					targetScreenControl.classList.add("min-width");
				} else if (targetScreenControl.classList.contains("min-width")) {
					setScreenMode("small")

					targetScreenControl.classList.remove("min-width");
					targetScreenControl.classList.add("max-width");
				}
		}

		videoScreenControls.forEach(screenControl => {
			screenControl.addEventListener('click', handleScreenMode);
		});

		return () => {
			if (video) {
				video.removeEventListener('timeupdate', updateTime);
			}
			if (videoScreenControls)
				videoScreenControls.forEach(screenControl => {
					screenControl.removeEventListener('click', handleScreenMode);
				});
		}
	}, [videoCurrentTime, videoDuration, metadataLoaded, screenMode]);

	const progressBarWidth = videoDuration ? (videoCurrentTime / videoDuration) * 100 : 0;

	useEffect(() => {

		const videoPlayControl = videoPlayControlRef.current;
		const videoPlayControlSmall = videoPlayControlSmallRef.current;
		const videoScreenControls = videoScreenControlsRef.current.filter(Boolean);
		const video = videoRef.current;

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
			} else if (video.ended) {
				setVideoEnded(false)
				video.currentTime = 0;
				video.play();
			}
		}

		if (video.ended) {
			videoPlayControl.classList.toggle('playing');
			videoPlayControl.classList.toggle('paused');
			videoPlayControlSmall.classList.toggle('playing');
			videoPlayControlSmall.classList.toggle('paused');

			videoScreenControls.forEach(screenControl => {
				screenControl.classList.toggle('playing');
				screenControl.classList.toggle('paused');
			});
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
		<div id="fullscreen" className={`video-container ${screenMode}`}
			ref={videoContainerRef}>
			<div className="controls paused" ref={videoPlayControlRef}></div>
			<video
				ref={videoRef}
				playsInline
				webkit-playsinline="true"
				className={`video-container ${screenMode}-video`}
				src={`${process.env.PUBLIC_URL}/assets/videos/${props.video}`}
				controls={false}
				preload="metadata"
				poster={`${process.env.PUBLIC_URL}/assets/imgs/${props.poster}`}
			/>
			<div
				className="screen-controls maximize paused"
				ref={el => (videoScreenControlsRef.current[0] = el)}>
			</div>
			<div
				className="screen-controls max-width paused"
				ref={el => (videoScreenControlsRef.current[1] = el)}>
			</div>
			<div className="video-bottom">
				<div
					className="smallerControls paused"
					ref={videoPlayControlSmallRef}>
				</div>
				<div className="video-duration-bar">
					<div className="video-progress-bar" style={{ width: `${progressBarWidth}%` }}></div>
				</div>
				<div className="time">{formatTime(videoCurrentTime)}/{formatTime(videoDuration)}</div>
			</div>
		</div>
	);

}

export default CustomVideoPlayer;