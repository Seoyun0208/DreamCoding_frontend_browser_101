const vertical = document.querySelector(".vertical");
const horizon = document.querySelector(".horizon");
const target = document.querySelector(".target");
const coordinates = document.querySelector(".coordinates");

document.addEventListener("mousemove", function (e) {
	const x = e.clientX;
	const y = e.clientY;

	// 좌표에 따라 line 움직이기
	horizon.style.top = `${y}px`;
	vertical.style.left = `${x}px`;

	// 좌표에 따라 target 움직이기
	target.style.top = `${y}px`;
	target.style.left = `${x}px`;

	// 좌표에 따라 coordinates 움직이기 & coordinates 내용 변경하기
	coordinates.style.top = `${y}px`;
	coordinates.style.left = `${x}px`;
	coordinates.style.color = "red";
	coordinates.innerHTML = `${x}px, ${y}px`;
	console.log(`${x}, ${y}`);
});
