git // Function to stop all other audio elements except the specified one
  function stopOtherPlayers(currentPlayerId) {
    const audioPlayers = ['station1', 'station2', 'station3'];

    audioPlayers.forEach(playerId => {
      const player = document.getElementById(playerId);
      if (playerId !== currentPlayerId) {
        player.pause();
        //player.currentTime = 0; live playback issue casue
      }
    });
  }

  // Add click event listeners to each station
  document.getElementById('station1').addEventListener('play', function() {
    stopOtherPlayers('station1');
  });

  document.getElementById('station2').addEventListener('play', function() {
    stopOtherPlayers('station2');
  });

  document.getElementById('station3').addEventListener('play', function() {
    stopOtherPlayers('station3');
  });
