const items = document.querySelector("#items");
const input = document.querySelector("#footer__input");
const addBtn = document.querySelector(".footer__add");

// input 에 작성한 내용을 가지고 리스트를 만들어주는 함수
// 삭제 버튼을 눌렀을 때 삭제 버튼에 있는 id 와 동일한 id 를 가진 item 을 찾아 삭제할 수 있도록, 삭제 버튼과 item 버튼에 동일한 id 를 부여함
// 현업에서는 UUID 등을 이용하여 고유한 키를 만드는 것이 좋음!

let id = 0;

function createItem(text) {
	const itemRow = document.createElement("ul");
	itemRow.setAttribute("class", "item__row");

	itemRow.innerHTML = `
	<li class="item" data-id=${id}>
		<label class="item__name">
			<input class="item__checkbox" type="checkbox"/>
			<span class="item__text">${text}</span>
		</label>
		<button class="item__delete" data-id=${id}>
			<i class="fas fa-eraser"></i>
		</button>
		<div class="item__line"></div>
	</li>
	`;

	id++;

	return itemRow;
}

// 사용자가 input 에 입력한 값을 받아와서 새로운 item 을 만들어 items 안에 추가하는 함수
// 세부 1. input 에 입력된 값이 없으면 focus 만 유지
// 세부 2. items 에 스크롤이 생기는 경우, 새 item 추가 시 해당 item 으로 스크롤되도록 해줌
// 세부 3. item 이 추가되고 나서는 input 의 내용을 지우고 focus 유지

function onAdd() {
	const text = input.value;

	if (text === "") {
		input.focus();
		return;
	}

	const newItem = createItem(text);

	items.appendChild(newItem);

	newItem.scrollIntoView({ block: "center" });

	input.value = "";
	input.focus();
}

// addBtn 클릭 혹은 키보드의 엔터를 누를 경우, input 내용을 items 에 추가하는 onAdd() 실행하기
addBtn.addEventListener("click", () => {
	onAdd();
});

input.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		onAdd();
	}
});

// input 을 클릭하면 "내용을 입력하세요." 문구 없애기
input.addEventListener("click", () => {
	input.setAttribute("placeholder", "");
});

// 특정 item 의 삭제 버튼을 누르면 해당 item 삭제하기
items.addEventListener("click", (e) => {
	let targetId = 0;

	if (e.target.nodeName === "I") {
		targetId = e.target.parentNode.dataset.id;
	} else if (e.target.nodeName === "BUTTON") {
		targetId = e.target.dataset.id;
	}

	if (targetId) {
		const toBeDeleted = document.querySelector(
			`.item[data-id="${targetId}"]`
		);
		toBeDeleted.remove();
	}
});
