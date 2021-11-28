;(function () {
	//alert("H page !");
	// https://www.w3schools.com/howto/howto_js_draggable.asp
   dragElement("h-main", "h-header");
   function dragElement(main_id, header_id) {
			 elmnt = document.getElementById(main_id);
          header = document.getElementById(header_id);
			 var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
			 if (header) {
				// if present, the header is where you move the DIV from:
				header.onmousedown = dragMouseDown;
			 } else {
				// otherwise, move the DIV from anywhere inside the DIV:
				elmnt.onmousedown = dragMouseDown;
			 }

			 function dragMouseDown(e) {
				e = e || window.event;
				e.preventDefault();
				// get the mouse cursor position at startup:
				pos3 = e.clientX;
				pos4 = e.clientY;
				document.onmouseup = closeDragElement;
				// call a function whenever the cursor moves:
				document.onmousemove = elementDrag;
			 }

			 function elementDrag(e) {
				e = e || window.event;
				e.preventDefault();
				// calculate the new cursor position:
				pos1 = pos3 - e.clientX;
				pos2 = pos4 - e.clientY;
				pos3 = e.clientX;
				pos4 = e.clientY;
				// set the element's new position:
				elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
				elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
			 }

			 function closeDragElement() {
				// stop moving when mouse button is released:
				document.onmouseup = null;
				document.onmousemove = null;
			 }
	}

   // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
   const canvas = document.getElementById("h-screen");
		  const context = canvas.getContext("2d");
		  context.globalAlpha = 0.5;

		  const cursor = {
			 x: innerWidth / 2,
			 y: innerHeight / 2,
		  };

		  let particlesArray = [];

		  generateParticles(101);
		  setSize();
		  anim();

		  addEventListener("mousemove", (e) => {
			 cursor.x = e.clientX;
			 cursor.y = e.clientY;
		  });

		  addEventListener(
			 "touchmove",
			 (e) => {
				e.preventDefault();
				cursor.x = e.touches[0].clientX;
				cursor.y = e.touches[0].clientY;
			 },
			 { passive: false }
		  );

		  addEventListener("resize", () => setSize());

		  function generateParticles(amount) {
			 for (let i = 0; i < amount; i++) {
				particlesArray[i] = new Particle(
				  innerWidth / 2,
				  innerHeight / 2,
				  4,
				  generateColor(),
				  0.02
				);
			 }
		  }

		  function generateColor() {
			 let hexSet = "0123456789ABCDEF";
			 let finalHexString = "#";
			 for (let i = 0; i < 6; i++) {
				finalHexString += hexSet[Math.ceil(Math.random() * 15)];
			 }
			 return finalHexString;
		  }

		  function setSize() {
			 canvas.height = innerHeight;
			 canvas.width = innerWidth;
		  }

		  function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed) {
			 this.x = x;
			 this.y = y;
			 this.particleTrailWidth = particleTrailWidth;
			 this.strokeColor = strokeColor;
			 this.theta = Math.random() * Math.PI * 2;
			 this.rotateSpeed = rotateSpeed;
			 this.t = Math.random() * 150;

			 this.rotate = () => {
				const ls = {
				  x: this.x,
				  y: this.y,
				};
				this.theta += this.rotateSpeed;
				this.x = cursor.x + Math.cos(this.theta) * this.t;
				this.y = cursor.y + Math.sin(this.theta) * this.t;
				context.beginPath();
				context.lineWidth = this.particleTrailWidth;
				context.strokeStyle = this.strokeColor;
				context.moveTo(ls.x, ls.y);
				context.lineTo(this.x, this.y);
				context.stroke();
			 };
		  }

		  function anim() {
			 requestAnimationFrame(anim);

			 context.fillStyle = "rgba(0,0,0,0.05)";
			 context.fillRect(0, 0, canvas.width, canvas.height);

			 particlesArray.forEach((particle) => particle.rotate());
		  }

})();
