const items = document.querySelector("#items");
const input = document.querySelector("#footer__input");
const addBtn = document.querySelector(".footer__add");

function createItem(text) {
	// item__row 태그 만들기
	const itemRow = document.createElement("ul");
	itemRow.setAttribute("class", "item__row");

	// item 태그 만들기
	const item = document.createElement("li");
	item.setAttribute("class", "item");

	// item__name 태그 만들기
	const itemName = document.createElement("label");
	itemName.setAttribute("class", "item__name");

	// item__checkbox 태그 만들기
	const itemCheckbox = document.createElement("input");
	itemCheckbox.setAttribute("class", "item__checkbox");
	itemCheckbox.setAttribute("type", "checkbox");

	// item__text 태그 만들기
	const itemText = document.createElement("span");
	itemText.setAttribute("class", "item__text");
	itemText.innerText = text;

	// item__delete 태그 만들기
	const itemDelete = document.createElement("button");
	itemDelete.setAttribute("class", "item__delete");
	itemDelete.innerHTML = '<i class="fas fa-eraser"></i>';

	// 삭제 버튼 클릭시 item 삭제하기
	itemDelete.addEventListener("click", () => {
		items.removeChild(itemRow);
	});

	// item__line 태그 만들기
	const itemLine = document.createElement("div");
	itemLine.setAttribute("class", "item__line");

	// 모든 태그 연결하기
	itemRow.appendChild(item);
	itemRow.appendChild(itemLine);
	item.appendChild(itemName);
	item.appendChild(itemDelete);
	itemName.appendChild(itemCheckbox);
	itemName.appendChild(itemText);
	return itemRow;
}

function onAdd() {
	// 1. 사용자가 입력한 텍스트 받아온다.
	const text = input.value;

	if (text === "") {
		input.focus();
		return;
	}

	// 2. 새로운 item 을 만든다. (체크박스 + 텍스트 + 삭제 버튼 + 구분선)
	const newItem = createItem(text);

	// 3. items 안에 새로 만든 item 을 추가한다.
	items.appendChild(newItem);

	// 4. 새로 추가된 아이템으로 스크롤한다.
	newItem.scrollIntoView({ block: "center" });

	// 5. input 을 초기화한다.
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
