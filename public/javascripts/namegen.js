/*
 *
 *  SETUP
 *
 */

partcount=2;
const container = document.getElementById("container");
const btnAddPart = document.getElementById("btnAddPart");
const btnSubPart = document.getElementById("btnSubPart");
const partArray = new Array();
var lists = [];

async function main()
{
	// BUILD LISTS 
	var listsBack=getLists().then((result) => {
		result.forEach(function (X)
		{
			lists.push(X);
		})
	});
	const listsDiv = document.getElementById("liststatus");
	listsDiv.innerHTML = "Lists Loaded"+lists;

	// REMOVE/ADD BUTTONS

	btnSubPart.addEventListener("click", () => 
	{
		subPartLast();
	});

	btnAddPart.addEventListener("click", () => 
	{
		addPart();
	});


	for(Z=0;Z<partcount;Z++)
	{
		addPart()
	}


	await sleep(0.1)
	updateParts()

}

main()

function sleep(sec) {
	let ms=sec*1000
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*
 *
 *  LOAD LIST NAMES
 *
 */

async function getLists()
{
	try
	{
		const res = await fetch('http://10.100.100.100:8080/partlist');
		if(!res.ok)
		{
			throw new Error('Failed to fetch lists');
		}
		let lists = await res.json();
		return lists;
	}
	catch(err)
	{
		console.log(err.message);
	}
}

/*
 *
 *  ADD PART
 *
 */

function addPart()
{
	let newPart = {};
	newPart.position = partArray.length;
	newPart.text = Math.floor(Math.random()*(8999)+1000); // TEMP Function
	partArray.push(newPart);
	updateParts();
}

/*
 *
 *  REMOVE PART
 *
 */

function subPartLast()
{
	if(partArray.length>1){partArray.pop();}
	updateParts();
}

function subPart(partIndex)
{
	if(partArray.length>1)
	{
		partArray.splice(partIndex,1);
		Z=0;
		for(const partThis of partArray)
		{
			partThis.position=Z;
			Z++;
		}
	}
	updateParts();
}

/*
 *
 *  UPDATE PART
 *
 */

function updateParts()
{
	while (container.firstChild) 
	{
		container.removeChild(container.lastChild);
	}
	for(var partThis of partArray)
	{
		buildDiv(partThis)
	}
}


function generatePart(partType,partOptions)
{
	//Expected Values
}

/*
 *
 *  MOVE PART
 *
 */

function comparePartPos(a,b)
{
	if(a.position < b.position)
	{
		return -1;
	}
	else if(a.position > b.position)
	{
		return 1;
	}
	else
	{
		return 0;
	}
}

function movePart(partFrom,partTo)
{
	let positionTemp = partFrom.position;
	partFrom.position = partTo.position;
	partTo.position = positionTemp;
	partArray.sort(comparePartPos);
	updateParts();
}

/*
 *
 *  BUILD DIVS
 *
 */

function buildDiv(partThis)
{
	// CREATE DIV
	let partDiv = document.createElement("div");
	partDiv.classList.add("part");

	// DIV ID
	let posDiv = document.createElement("div");
	posDiv.classList.add("pos");
	posDiv.textContent = partThis.position;
	partDiv.appendChild(posDiv);

	// DIV PART TEXT
	let partTextDiv = document.createElement("div");
	partTextDiv.classList.add("text");
	partTextDiv.textContent = partThis.text;
	partDiv.appendChild(partTextDiv);

	// LISTS DROPDOWN

	let listsDiv = document.createElement("div");
	listsDiv.classList.add("selectdiv");
	let listsSelector = document.createElement("select");
	lists.forEach(function (listitem)
	{
		listsSelector.appendChild(new Option(listitem.name,listitem.path));
	});
	listsDiv.appendChild(listsSelector);
	partDiv.appendChild(listsDiv);

	// BUTTON UP

	let partBtnUPDiv = document.createElement("div");
	partBtnUPDiv.classList.add("buttondiv");
	if(partThis.position > 0)
	{
		partBtnUPDiv.classList.add("buttondiv");
		let partBtnUP = document.createElement('button');
		partBtnUP.innerHTML = 'U';
		partBtnUP.classList.add("button");
		partBtnUP.data=partThis.position;
		partBtnUP.addEventListener("click", () => 
		{
			movePart(partThis,partArray[partThis.position-1]);
		});
		partBtnUPDiv.appendChild(partBtnUP);
	}
	else
	{
		partBtnUPDiv.classList.add("dummy");
	}
	partDiv.appendChild(partBtnUPDiv);

	// BUTTON DOWN
	
	let partBtnDNDiv = document.createElement("div");;
	if(partThis.position < partArray.length-1)
	{
		partBtnDNDiv.classList.add("buttondiv");
		let partBtnDN = document.createElement('button');
		partBtnDN.innerHTML = 'D';
		partBtnDN.classList.add("button");
		partBtnDN.data=partThis.position;
		partBtnDN.addEventListener("click", () => 
		{
			movePart(partThis,partArray[partThis.position+1]);
		});
		partBtnDNDiv.appendChild(partBtnDN);
	}
	else
	{
		partBtnDNDiv.classList.add("dummy");
	}
	partDiv.appendChild(partBtnDNDiv);

	//DIV BUTTON REMOVE

	if(partArray.length > 1)
	{
		let partBtnRMDiv = document.createElement("div");;
		partBtnRMDiv.classList.add("buttondiv");
		let partBtnRM = document.createElement('button');
		partBtnRM.innerHTML = 'X';
		partBtnRM.data=partThis.position;
		partBtnRM.classList.add("button");
		partBtnRM.addEventListener("click", () => {
			subPart(partThis.position);
		});
		partBtnRMDiv.appendChild(partBtnRM);
		partDiv.appendChild(partBtnRMDiv);
	}

	container.appendChild(partDiv);
}