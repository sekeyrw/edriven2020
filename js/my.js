
const iitem1 = document.getElementById("iitem1")
const iitem2 = document.getElementById("iitem2")
const iitem3 = document.getElementById("iitem3")
const iitem4 = document.getElementById("iitem4")

const subtototal = {
	subtototal1: document.querySelector("#subtotal1"),
	subtototal2: document.querySelector("#subtotal2"),
	subtototal3: document.querySelector("#subtotal3"),
	subtototal4: document.querySelector("#subtotal4"),
};

let foods = [];
let foodimg = [];
let storageData = [];
const request = "https://www.themealdb.com/api/json/v1/1/filter.php?a=American";

function populateSel1() {
	for (food of foods) {
		let option = document.createElement('option')
		option.value = food
		option.innerHTML = food
		iitem1.appendChild(option)
	}
}
function populateSel2() {
	for (food of foods) {
		let option = document.createElement('option')
		option.value = food
		option.innerHTML = food
		iitem2.appendChild(option)
	}
}
function populateSel3() {
	for (food of foods) {
		let option = document.createElement('option')
		option.value = food
		option.innerHTML = food
		iitem3.appendChild(option)
	}
}
function populateSel4() {
	for (food of foods) {
		let option = document.createElement('option')
		option.value = food
		option.innerHTML = food
		iitem4.appendChild(option)
	}
}

const getData = async () => {
	const response = await fetch(request);
	const jsondata = response.json();
	return jsondata;
};
getData()
	.then((value) => {
		let arrfoods = value.meals;
		for (food of arrfoods) {
			foods.push(food.strMeal);
			foodimg.push(food.strMealThumb);
		}
		populateSel1()
		populateSel2()
		populateSel3()
		populateSel4()
	})
	.catch((err) => {
		console.log(err);
		window.location.reload();
	});

class Data {
	constructor(elements) {
		this.elements = elements;

		this.data =
			localStorage.getItem("order") != null
				? JSON.parse(localStorage.getItem("order")) : {
					data: [],
				};
		if(this.data == null){
			this.data = {
				data : []
			}
		}

		console.log(this.data)
	}

	createData(user, id) {
		const items = this.getAllItems();
		const username = user == null ? null : user.toString();
		const orderNumber = id;
		const total = this.getTotal(items);

		const currentOrder = {
			fullname: username,
			ornumber: orderNumber,
			total: total,
			items: items,
		};

		this.data.data.push(currentOrder);

		return this.data;
	}

	getTotal = (items) => {
		let total = 0;
		for (let k = 0; k < items.length; k++) {
			total += parseFloat(items[k].iprice) * parseFloat(items[k].iqty);
		}
		return total;
	};

	getAllItems = () => {
		let allItems = [];
		for (let i = 0; i < this.elements.length; i++) {
			const currentElement = this.elements[i];
			let itemInfo = {};
			const keys = ["iprice", "iname", "iqty"];
			for (let j = 0; j < currentElement.length; j++) {
				const value = currentElement[j].value.toString()
				itemInfo[keys[j]] = value;

				if (j === 1) {
					const index = foods.findIndex((item) => item === value);
					itemInfo.iimg = foodimg[index];
				}
			}
			allItems.push(itemInfo);
		}

		return allItems;
	};
}

const costs = document.querySelectorAll(".cost");
const qty = document.querySelectorAll(".qty");

const createId = (id) => {
	let findId = id.toString().split(" ")[0];
	findId = findId.toString().slice(findId.length - 1, findId.length);
	return findId;
};

window.onload = () => {
	costs.forEach((cost) => {
		cost.addEventListener("change", (event) => {
			const qtyElement = document.getElementById(`qty${createId(cost.id)}`);
			const price = parseFloat(cost.value) * parseFloat(qtyElement.value);
			const subTotalItem = subtototal[`subtototal${createId(cost.id)}`];

			subTotalItem.value = price.toString();
		});
	});

	qty.forEach((iqty) => {
		iqty.addEventListener("change", (event) => {
			const priceElement = document.getElementById(`price${createId(iqty.id)}`);
			const price = parseFloat(iqty.value) * parseFloat(priceElement.value);
			const subTotalItem = subtototal[`subtototal${createId(iqty.id)}`];

			subTotalItem.value = price.toString();
		});
	});
};

const createEnteredIndexes = (data) => {
	const arr = [];
	const keys = Object.keys(data);
	for (let i = 0; i < keys.length; i++) {
		const currentSubTotal = data[keys[i]];
		if (currentSubTotal.value.toString() != "") {
			arr.push(i + 1);
		}
	}
	return arr;
};

const searchByIndex = (index) => {
	const keys = ["price", "iitem", "qty"];
	const elements = [];
	for (let j = 0; j < keys.length; j++) {
		const currentKey = keys[j];
		elements.push(document.getElementById(`${currentKey}${index}`));
	}

	return elements;
};

const newOrderModal = document.getElementById("myModal");

function closeModal() {
	newOrderModal.style.display = "none";
}
function showModal() {
	newOrderModal.style.display = "block";
}

const saveData = () => {
	const id = document.querySelector("#orNum").value;
	const username = document.querySelector("#cName");

	const user = username.value == "" ? null : username.value;
	const enteredIndexes = createEnteredIndexes(subtototal);

	let searchElements = [];
	for (let i = 0; i < enteredIndexes.length; i++) {
		searchElements.push(searchByIndex(enteredIndexes[i]));
	}
	const data = new Data(searchElements).createData(user, id);
	localStorage.setItem("order", JSON.stringify(data));

	reloadTable();
	closeModal();

    window.location.reload()
};

document.querySelector("#save").addEventListener("click", saveData);

const viewOrderModal = document.getElementById('viewModal');
const viewOrderModalBody = document.getElementById('viewModalBody');
const viewOrderModalClose = document.getElementById('viewModalClose');

viewOrderModalClose.addEventListener('click', () => {
	viewOrderModal.style.display = "none";
});
window.addEventListener('click', (event) => {
	if (event.target == viewOrderModal) {
		viewOrderModal.style.display = "none";
	}
});

function createBreakpoint() {
	return document.createElement('br');
}

function createReadonlyInput(value) {
	const input = document.createElement('input');

	input.value = value;
	input.setAttribute('type', 'text');
	input.setAttribute('disabled', true);
	input.setAttribute('readonly', true);

	return input;
}

function createViewOrderHeader(record) {
	viewOrderModalBody.appendChild(createReadonlyInput(record.ornumber));
	viewOrderModalBody.appendChild(createBreakpoint());
    if (record.fullname == null){
        record.fullname = "Not Specified"
    }else{
        record.fullname = record.fullname
    }
	viewOrderModalBody.appendChild(createReadonlyInput(record.fullname));
	viewOrderModalBody.appendChild(createBreakpoint());
}

function createViewOrderItemsHeader() {
	const h2 = document.createElement('h2');
	h2.innerHTML = 'Items';
	viewOrderModalBody.appendChild(h2);
}

function createViewOrderItemsContentItemThumbnail(src) {
	const img = document.createElement('img');
	img.setAttribute('src', src);
	return img;
}

function createViewOrderItemsContentItemName(value) {
	const h4 = document.createElement('h5');
	h4.innerHTML = value;
	return h4;
}

function createViewOrderItemsContentItemDetail(label, value) {
	const h5 = document.createElement('h5');
	h5.innerHTML = `${label}: ${value}`;
	return h5;
}

function createViewOrderItemsContentItem(data) {
	const td = document.createElement('td');

	td.appendChild(createViewOrderItemsContentItemThumbnail(data.iimg));
	td.appendChild(createViewOrderItemsContentItemName(data.iname));
	td.appendChild(createViewOrderItemsContentItemDetail('Price', data.iprice));
	td.appendChild(createViewOrderItemsContentItemDetail('Quantity', data.iqty));

	return td;
}

function createViewOrderEmptyContent() {
	const h3 = document.createElement('h3');
	h3.innerHTML = 'No Items';
	viewOrderModalBody.appendChild(h3);
}

function createViewOrderItemsContent(items) {
	createViewOrderItemsHeader();

	if (items && items.length) {
		const table = document.createElement('table');
		const tr = document.createElement('tr');

		items.forEach((item) => {
			tr.appendChild(createViewOrderItemsContentItem(item))
		});
		table.appendChild(tr);
		viewOrderModalBody.appendChild(table);
	} else {
		createViewOrderEmptyContent();
	}
}

function viewOrder(index) {
	viewOrderModalBody.innerHTML = '';

	const records = JSON.parse(localStorage.getItem('order'));

	const record = records.data[index];

	createViewOrderHeader(record);
	createViewOrderItemsContent(record.items);

	viewOrderModal.style.display = "block";
}

function createOrderViewButton(index) {
	const button = document.createElement('button');

	button.innerHTML = 'View';
  button.setAttribute("id","viewButton")

	button.addEventListener('click', () => {
		viewOrder(index);
	});

	return button;
}

function createOrderCell(data) {
	const td = document.createElement('td');
	if(data == null){
		data = userNameData(data)
		td.classList.add('red')
	}
	td.innerHTML = data;
	return td;
}

const userNameData = (data) => {
	if(data == null){
		return "Not Specified"
	} else {
		return data
	}
}

function createOrderRow(order, index) {
	const tr = document.createElement('tr');
	tr.appendChild(createOrderCell(index + 1));
	tr.appendChild(createOrderCell(order.ornumber));
	tr.appendChild(createOrderCell(order.fullname));
	tr.appendChild(createOrderCell("₱" + order.total + ".00"));

	
	tr.appendChild(createOrderViewButton(index));
	return tr;
}

function createOrderHeadCell(data) {
	const th = document.createElement('th');
	th.innerHTML = data;
	return th;
}

function createOrderHeader() {
	const tr = document.createElement('tr');
	tr.appendChild(createOrderHeadCell('#'));
	tr.appendChild(createOrderHeadCell('Order'));
	tr.appendChild(createOrderHeadCell('Customer Name'));
	tr.appendChild(createOrderHeadCell('Total'));
	tr.appendChild(createOrderHeadCell('Actions'));
	return tr;
}

function createEmptyOrder() {
	const tr = document.createElement('tr');

	const td = createOrderCell('no records');

	td.setAttribute('colspan', '6');
	td.setAttribute('align', 'center');

	tr.appendChild(td);
	return tr;
}

function reloadTable() {
	const table = document.getElementById('myTable');

	table.innerHTML = '';

	table.appendChild(createOrderHeader());

	const records = JSON.parse(localStorage.getItem('order'));

	if (records && records.data.length) {
		records.data.forEach((order, index) => {
			table.appendChild(createOrderRow(order, index));
		});
	} else {
		table.appendChild(createEmptyOrder());
	}
}

reloadTable()
