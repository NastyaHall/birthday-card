window.addEventListener('load', function() {
    setTimeout(function() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                var audioContext = new AudioContext();

                var analyser = audioContext.createAnalyser();
                var source = audioContext.createMediaStreamSource(stream);
                analyser.fftSize = 2048;

                source.connect(analyser);

                function getLoudness() {
                    var bufferLength = analyser.frequencyBinCount;
                    var dataArray = new Uint8Array(bufferLength);
                    analyser.getByteTimeDomainData(dataArray);

                    var sum = 0;
                    for (var i = 0; i < bufferLength; i++) {
                        var amplitude = (dataArray[i] - 128) / 128;
                        sum += Math.abs(amplitude);
                    }

                    var averageLoudness = sum / bufferLength;

                    if (averageLoudness > 0.2) { 
                        var audio = new Audio('music.mp3');
                        audio.play();
                        var audio2 = new Audio('yay.mp3');
                        audio2.play();
                        document.querySelectorAll('.fuego').forEach(function (element) {
                            element.style.display = 'none';
                        });
                        confetti().then(() => {
                            var animationDurations = [2, 1.5, 1, 0.5, 0.2];
                            document.querySelectorAll('.fuego').forEach(function (element, index) {
                                element.style.animation = 'fuego ' + animationDurations[index] + 's 0.1s infinite';
                            });
                            document.querySelectorAll('.fuego').forEach(function (element) {
                                element.style.display = 'block';
                            });
                        });
                    }
                }

                setInterval(getLoudness, 80);
            })
            .catch(function (err) {
                console.error('Error accessing microphone:', err);
            });
    }, 3000); 
});
