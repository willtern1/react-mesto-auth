import React from 'react';

const Music = () => {
  React.useEffect(() => {
    const musicButton = document.getElementById('music-btn')
    musicButton.addEventListener('click', () => {
      if (musicButton.classList.contains('body__music-icon_on')) {
        musicOff()
      } else {
        musicOn()
      }
    })
  }, [])
  const musicOn = () => {
    const audio = document.querySelector('audio')
    const musicButton = document.getElementById('music-btn');
    musicButton.classList.add('body__music-icon_on');
    audio.volume = 0.2;
    audio.play().then(() => {}).catch(() => {});
  }
  const musicOff = () => {
    const audio = document.querySelector('audio')
    const musicButton = document.getElementById('music-btn')
    musicButton.classList.remove('body__music-icon_on');
    audio.pause()
  }

  return (
    <div>
      <audio id={'audio'} className="audio" src='./The_Mole_320kbps.mp3' type="audio/mpeg" loop/>
      <button id={'music-btn'} className="body__music-icon " type="button"/>
    </div>
  );
};

export default Music;
