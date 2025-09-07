// class ForestBackground {
//   constructor() {
//     this.layers = document.querySelectorAll('.bg-layer');
//     this.isMoving = false;
//     this.movementSpeed = 0;
//     this.idleSpeed = 0.00;
//     this.movingSpeed = 2;
//     this.currentX = 0;
//     this.targetX = 0;
//     this.animationId = null;

//     this.init();
//   }

//   init() {
//     // Start the animation loop
//     this.animate();

//     // Add keyboard event listeners for character movement
//     this.addMovementListeners();

//     // Add touch/mouse support for mobile
//     this.addTouchSupport();
//   }

//   addMovementListeners() {
//     let isKeyPressed = false;

//     document.addEventListener('keydown', (e) => {
//       if (!isKeyPressed && (e.key === 'ArrowLeft' || e.key === 'ArrowRight' ||
//                            e.key === 'a' || e.key === 'd' ||
//                            e.key === 'A' || e.key === 'D')) {
//         isKeyPressed = true;
//         this.startMoving();
//       }
//     });

//     document.addEventListener('keyup', (e) => {
//       if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' ||
//           e.key === 'a' || e.key === 'd' ||
//           e.key === 'A' || e.key === 'D') {
//         isKeyPressed = false;
//         this.stopMoving();
//       }
//     });
//   }

//   addTouchSupport() {
//     let touchStartX = 0;
//     let isTouching = false;

//     document.addEventListener('touchstart', (e) => {
//       touchStartX = e.touches[0].clientX;
//       isTouching = true;
//       this.startMoving();
//     });

//     document.addEventListener('touchmove', (e) => {
//       if (isTouching) {
//         const touchX = e.touches[0].clientX;
//         const deltaX = touchX - touchStartX;

//         // Determine movement direction based on touch
//         if (Math.abs(deltaX) > 10) {
//           this.targetX += deltaX * 0.01;
//           touchStartX = touchX;
//         }
//       }
//     });

//     document.addEventListener('touchend', () => {
//       isTouching = false;
//       this.stopMoving();
//     });
//   }

//   startMoving() {
//     this.isMoving = true;
//     this.movementSpeed = this.movingSpeed;
//   }

//   stopMoving() {
//     this.isMoving = false;
//     this.movementSpeed = this.idleSpeed;
//   }

//   animate() {
//     // Calculate movement
//     if (this.isMoving) {
//       // When character is moving, no parallax - keep layers static
//       this.targetX = 0;
//     } else {
//       // Idle movement - subtle back and forth with parallax
//       this.targetX += Math.sin(Date.now() * 0.001) * 0.5;
//     }

//     // Smooth interpolation
//     this.currentX += (this.targetX - this.currentX) * 0.1;

//     // Apply parallax effect to each layer only during idle state
//     this.layers.forEach(layer => {
//       const speed = parseFloat(layer.dataset.speed);
//       let x = 0;

//       if (!this.isMoving) {
//         // Only apply parallax during idle state
//         x = this.currentX * speed;

//         // Implement infinite scrolling - reset position when reaching edge
//         const layerWidth = window.innerWidth; // Width of one image
//         if (x > layerWidth) {
//           x = x - layerWidth;
//         } else if (x < -layerWidth) {
//           x = x + layerWidth;
//         }
//       }

//       layer.style.transform = `translateX(${x}px)`;
//     });

//     this.animationId = requestAnimationFrame(() => this.animate());
//   }

//   // Method to manually control background movement (for external use)
//   moveBackground(direction, speed = 1) {
//     this.targetX += direction * speed;
//   }

//   // Method to set idle state
//   setIdle() {
//     this.isMoving = false;
//     this.movementSpeed = this.idleSpeed;
//   }

//   // Method to set moving state
//   setMoving() {
//     this.isMoving = true;
//     this.movementSpeed = this.movingSpeed;
//   }
// }

// // Initialize the forest background when the page loads
// document.addEventListener('DOMContentLoaded', () => {
//   window.forestBackground = new ForestBackground();
// });

// // Export for use in other scripts
// if (typeof module !== 'undefined' && module.exports) {
//   module.exports = ForestBackground;
//

document.getElementsByClassName(
  `start-button pixel-corners--wrapper`
)[0].onclick = function () {
  document.getElementById(`nameInput`).id = `nameInput-after`;
  document.getElementsByClassName(
    `start-button-container`
  )[0].className = `start-button-container-after`;
};

let username;

document.getElementsByClassName(
  "start-button pixel-corners--wrapper"
)[1].onclick = function () {
  username = document.getElementById("name").value;
  document.getElementById("lab").textContent = `Hello ${username}`;
  document.getElementById(`playerName`).textContent = username;
};
