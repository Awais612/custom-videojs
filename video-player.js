const player = videojs("my-video");

player.on("userinactive", () => {
  player.addClass("vjs-hide-controls");
});

player.on("useractive", () => {
  player.removeClass("vjs-hide-controls");
});

const player1 = videojs("my-video", {
  controls: true,
  autoplay: false,
  preload: "auto",
  controlBar: {
    children: {
      pictureInPictureToggle: false,
    },
  },
});

player1.ready(function () {
  // Replace volume button's icon with custom SVG
  const volumeControl = player1.controlBar.volumePanel;
  if (volumeControl) {
    const volumeButton = volumeControl.el().querySelector(".vjs-mute-control");
    if (volumeButton) {
      volumeButton.innerHTML = `
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.7479 0.999927C20.1652 2.97016 21 5.38756 21 7.99993C21 10.6123 20.1652 13.0297 18.7479 14.9999M14.7453 3.99993C15.5362 5.13376 16 6.51268 16 7.99993C16 9.48717 15.5362 10.8661 14.7453 11.9999M8.63432 1.36561L5.46863 4.5313C5.29568 4.70425 5.2092 4.79073 5.10828 4.85257C5.01881 4.9074 4.92127 4.9478 4.81923 4.9723C4.70414 4.99993 4.58185 4.99993 4.33726 4.99993H2.6C2.03995 4.99993 1.75992 4.99993 1.54601 5.10892C1.35785 5.20479 1.20487 5.35777 1.10899 5.54594C1 5.75985 1 6.03987 1 6.59993V9.39993C1 9.95998 1 10.24 1.10899 10.4539C1.20487 10.6421 1.35785 10.7951 1.54601 10.8909C1.75992 10.9999 2.03995 10.9999 2.6 10.9999H4.33726C4.58185 10.9999 4.70414 10.9999 4.81923 11.0276C4.92127 11.0521 5.01881 11.0925 5.10828 11.1473C5.2092 11.2091 5.29568 11.2956 5.46863 11.4686L8.63431 14.6342C9.06269 15.0626 9.27688 15.2768 9.46077 15.2913C9.62033 15.3038 9.77626 15.2392 9.8802 15.1175C10 14.9773 10 14.6744 10 14.0686V1.9313C10 1.32548 10 1.02257 9.8802 0.88231C9.77626 0.760605 9.62033 0.696018 9.46077 0.708575C9.27688 0.723048 9.06269 0.937236 8.63432 1.36561Z"
            stroke="white"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      `;
    }
  }

  // Custom Fullscreen Button Component
  const FullscreenButton = videojs.getComponent("Button");

  class CustomFullscreenButton extends FullscreenButton {
    constructor(player, options) {
      super(player, options);
      this.controlText("Fullscreen"); // Set accessible control text
    }

    createEl() {
      const el = super.createEl("button", {
        className: "vjs-custom-fullscreen-control vjs-control",
      });

      // Add the custom SVG icon
      el.innerHTML = `
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 9L4 4M4 4V8M4 4H8"
            stroke="white"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 9L20 4M20 4V8M20 4H16"
            stroke="white"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 15L4 20M4 20V16M4 20H8"
            stroke="white"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 15L20 20M20 20V16M20 20H16"
            stroke="white"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      `;
      return el;
    }

    handleClick() {
      // Toggle fullscreen
      if (this.player_.isFullscreen()) {
        this.player_.exitFullscreen();
      } else {
        this.player_.requestFullscreen();
      }
    }
  }

  // Register and add the custom fullscreen button
  videojs.registerComponent("CustomFullscreenButton", CustomFullscreenButton);
  player1.controlBar.fullscreenToggle.hide(); // Hide default fullscreen button
  player1.controlBar.addChild("CustomFullscreenButton", {}); // Add custom fullscreen button

  // Move volume and fullscreen buttons to the right
  const controlBar = player1.controlBar.el();
  const volumeButtonEl = player1.controlBar.volumePanel.el();
  const fullscreenButtonEl = player1.controlBar
    .getChild("CustomFullscreenButton")
    .el();

  controlBar.appendChild(volumeButtonEl); // Move volume button to the end
  controlBar.appendChild(fullscreenButtonEl); // Move fullscreen button to the end
});
