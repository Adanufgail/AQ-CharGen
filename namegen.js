partcount=2;
const container = document.querySelector("#container");

const btnSubPart = document.querySelector("#btnSubPart");
btnSubPart.addEventListener("click", () => {
	subPartLast();
});

const btnAddPart = document.querySelector("#btnAddPart");
btnAddPart.addEventListener("click", () => {
	addPart();
});

const partArray = new Array();

function addPart()
{
	let newPart = {};
	newPart.position = partArray.length;
	newPart.id = Math.floor(Math.random()*(8999)+1000);
	partArray.push(newPart);
	updateParts();
}

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

function updateParts()
{
	while (container.firstChild) 
	{
		container.removeChild(container.lastChild);
	}
	for(const partThis of partArray)
	{
		buildDiv(partThis)
	}
	jsonSTRING = JSON.stringify(partArray);
}

function buildDiv(partThis)
{
	var partDiv = document.createElement('div');
	partDiv = document.createElement("div");
	partDiv.setAttribute("id","name"+partThis.position);
	partDiv.classList.add("name");
	//partDiv.textContent = generatePart(Type);
	partDiv.textContent = "Test "+partThis.id+" "+partThis.position+'.....';
	var partBtn = document.createElement('button');
	partBtn.innerHTML = 'Remove';
	partBtn.data=partThis.position;
	partBtn.addEventListener("click", () => {
		subPart(partThis.position);
	});
	partDiv.appendChild(partBtn);
	container.appendChild(partDiv);
}

function pullFromList(listName)
{
	/*getJSON(listName&".json", function(json) {
    	console.log(json); // this will show the info it in firebug console
	});*/
	let testVar = "updateParts";
	window[testVar]();
}
pullFromList("list")
updateParts();