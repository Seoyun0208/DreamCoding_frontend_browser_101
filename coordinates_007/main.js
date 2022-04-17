const vertical = document.querySelector(".vertical");
const horizon = document.querySelector(".horizon");
const target = document.querySelector(".target");
const coordinates = document.querySelector(".coordinates");

// load 가 다 되기 전에 getBoundinClientRect() 를 사용하는 경우, target 이미지가 원하는 위치에 정상적으로 나오지 않을 수 있으므로, 이 때는 addEventListener 의 load 이벤트를 활용할 것!

// top, left 와 같은 속성을 계속해서 변경하면 layout - painting - composite 과정이 다시 발생하므로, translate 를 이용하여 composite 과정만 다시 발생하도록 만드는 것이 더 효율적!

addEventListener("load", () => {
	const targetRect = target.getBoundingClientRect();
	const targetHalfWidth = targetRect.width / 2;
	const targetHalfHeight = targetRect.height / 2;

	document.addEventListener("mousemove", function (e) {
		const x = e.clientX;
		const y = e.clientY;

		// 좌표에 따라 line 움직이기
		horizon.style.transform = `translateY(${y}px)`;
		vertical.style.transform = `translateX(${x}px)`;

		// 좌표에 따라 target 움직이기
		target.style.transform = `translate(${x - targetHalfWidth}px, ${
			y - targetHalfHeight
		}px)`;

		// 좌표에 따라 coordinates 움직이기 & coordinates 내용 변경하기
		coordinates.style.transform = `translate(${x}px, ${y}px)`;
		coordinates.style.color = "red";
		coordinates.innerHTML = `${x}px, ${y}px`;
	});
});
