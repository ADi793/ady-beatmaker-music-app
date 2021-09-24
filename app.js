class Drumkit {
  constructor() {
    this.playButton = document.querySelector(".play");
    this.bpm = 60;
    this.isPlaying = null;
    this.index = 0;
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-audio");
    this.snareAudio = document.querySelector(".snare-audio");
    this.hihatAudio = document.querySelector(".hihat-audio");
    this.selects = document.querySelectorAll("select");
    this.muteButtons = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector("#tempo-slider");
  }

  active() {
    this.classList.toggle("active");
  }

  repeat() {
    console.log("repeat some functionality...");
    const step = this.index % 8;

    // take pads
    const activePads = document.querySelectorAll(`.b${step}`);
    activePads.forEach((pad) => {
      pad.style.animation = "playTrack 0.3s alternate ease-in-out 2";

      if (pad.classList.contains("active")) {
        if (pad.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (pad.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (pad.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;

    if (!this.isPlaying) {
      console.log("Drumkit starts...");
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      console.log("Drumkit stops...");
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  updateButton() {
    if (this.isPlaying) {
      this.playButton.innerText = "Stop";
      this.playButton.classList.add("active");
    } else {
      this.playButton.innerText = "Play";
      this.playButton.classList.remove("active");
    }
  }

  changeSound(e) {
    console.log(e);
    const selectName = e.target.name;
    const selectValue = e.target.value;

    if (selectName === "kick-select") this.kickAudio.src = selectValue;
    if (selectName === "snare-select") this.snareAudio.src = selectValue;
    if (selectName === "hihat-select") this.hihatAudio.src = selectValue;
  }

  mute(e) {
    const clickedButton = e.target;
    clickedButton.classList.toggle("active");

    if (clickedButton.classList.contains("active")) {
      if (clickedButton.classList.contains("kick-volume"))
        this.kickAudio.volume = 0;
      if (clickedButton.classList.contains("snare-volume"))
        this.snareAudio.volume = 0;
      if (clickedButton.classList.contains("hihat-volume"))
        this.hihatAudio.volume = 0;
    } else {
      if (clickedButton.classList.contains("kick-volume"))
        this.kickAudio.volume = 1;
      if (clickedButton.classList.contains("snare-volume"))
        this.snareAudio.volume = 1;
      if (clickedButton.classList.contains("hihat-volume"))
        this.hihatAudio.volume = 1;
    }
  }

  updateTempo(e) {
    const tempoNumber = document.querySelector(".tempo-no");

    tempoNumber.innerText = e.target.value;
  }

  changeSpeed(e) {
    this.bpm = e.target.value;

    if (this.playButton.classList.contains("active")) {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.start();
    }
  }
}

const drumkit = new Drumkit();

drumkit.playButton.addEventListener("click", function () {
  drumkit.start();
  drumkit.updateButton();
});

drumkit.pads.forEach((pad) => {
  pad.addEventListener("click", drumkit.active);
  pad.addEventListener("animationend", function (e) {
    this.style.animation = "";
  });
});

drumkit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumkit.changeSound(e);
  });
});

drumkit.muteButtons.forEach((muteButton) => {
  muteButton.addEventListener("click", function (e) {
    drumkit.mute(e);
  });
});

drumkit.tempoSlider.addEventListener("input", function (e) {
  drumkit.updateTempo(e);
});

drumkit.tempoSlider.addEventListener("change", function (e) {
  drumkit.changeSpeed(e);
});
