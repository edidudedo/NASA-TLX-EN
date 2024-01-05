// Create a set of parallel arrays for each of the scales
var scale      = new Array();
var left       = new Array();
var right      = new Array();
var def        = new Array();
var NUM_SCALES = 6;

scale[0]  = "Mental Demand"; 
left[0]   = "Low";
right[0]  = "High";
def[0]    = "<p>How much mental and perceptual activity was required (e.g. thinking, deciding, calculating, remembering, looking, searching, etc)?<br>Was the task easy or demanding, simple or complex, exacting or forgiving?</p>";

scale[1]  = "Physical Demand"; 
left[1]   = "Low";
right[1]  = "High";
def[1]    = "<p>How much physical activity was required (e.g. pushing, pulling, turning, controlling, activating, etc)?<br>Was the task easy or demanding, slow or brisk, slack or strenuous, restful or laborious?</p>";

scale[2]  = "Temporal Demand"; 
left[2]   = "Low";
right[2]  = "High";
def[2]    = "<p>How much time pressure did you feel due to the rate of pace at which the tasks or task elements occurred? <br>Was the pace slow and leisurely or rapid and frantic?</p>";

scale[3]  = "Performance"; 
left[3]   = "Good";
right[3]  = "Bad";
def[3]    = "<p>How successful do you think you were in accomplishing the goals of the task set by the experimenter (or yourself)?<br>How satisfied were you with your performance in accomplishing these goals?</p>";

scale[4]  = "Effort"; 
left[4]   = "Low";
right[4]  = "High";
def[4]    = "<p>How hard did you have to work (mentally and physically) to accomplish your level of performance?</p>";

scale[5]  = "Frustration"; 
left[5]   = "Low";
right[5]  = "High";
def[5]    = "<p>How insecure, discouraged, irritated, stressed and annoyed versus secure, gratified, content, relaxed and complacent did you feel during the task?</p>";

window.addEventListener('load', OnLoad);
function OnLoad() {}

// Pairs of factors in order in the original instructions, numbers
// refer to the index in the scale, left, right, def arrays.
let pair = new Array();
pair[0]   = "4 3";
pair[1]   = "2 5";
pair[2]   = "2 4";
pair[3]   = "1 5";
pair[4]   = "3 5";
pair[5]   = "1 2";
pair[6]   = "1 3";
pair[7]   = "2 0";
pair[8]   = "5 4";
pair[9]   = "3 0";
pair[10]  = "3 2";
pair[11]  = "0 4";
pair[12]  = "0 1";
pair[13]  = "4 1";
pair[14]  = "5 0";

// Variable where the results end up
let results_rating = new Array();
let results_tally  = new Array();
for (let i = 0; i < NUM_SCALES; i++) results_tally[i] = 0;
let results_weight = new Array();
let results_overall;
let pair_num = 0;



function clicked1() {
	//alert("次に15の質問をします。それぞれで、どちらがより作業負荷に直結した要因か選んでください。");
	results_rating[0] = Math.floor(document.getElementById("mental").value / 5) * 5;
	results_rating[1] = Math.floor(document.getElementById("physical").value / 5) * 5;
	results_rating[2] = Math.floor(document.getElementById("temporal").value / 5) * 5;
	results_rating[3] = Math.floor(document.getElementById("performance").value / 5) * 5;
	results_rating[4] = Math.floor(document.getElementById("effort").value / 5) * 5;
	results_rating[5] = Math.floor(document.getElementById("frustration").value / 5) * 5;
	// let str = `<h3>${results_rating.join(", ")}</h3>`;
	// let element = document.getElementById("div2");
	// element.insertAdjacentHTML("afterbegin", str);

	document.getElementById("div1").style.display = "none";
	document.getElementById("div2").style.display = "";
	setPairLabels();
}

function setPairLabels(){
	var indexes = new Array();
	indexes = pair[pair_num].split(" ");

	var pair1 = scale[indexes[0]];
	var pair2 = scale[indexes[1]];

	document.getElementById('pair1').value = pair1;
	document.getElementById('pair2').value = pair2;

	document.getElementById('pair1_def').innerHTML = def[indexes[0]];
	document.getElementById('pair2_def').innerHTML = def[indexes[1]];
}

// They clicked the top pair button
function buttonPair1()
{
	var indexes = new Array();
	indexes = pair[pair_num].split(" ");
	results_tally[indexes[0]]++;

	nextPair();
	return true;
}

function buttonPair2()
{
	var indexes = new Array();
	indexes = pair[pair_num].split(" ");
	results_tally[indexes[1]]++;	
	nextPair();
	return true;
}

// Move to the next pair
function nextPair()
{
	pair_num++;
	if (pair_num >= 15)
	{
		document.getElementById('div2').style.display = 'none';
		document.getElementById('div3').style.display = '';
		calcResults();
        console.log(getResultsHTML())
        const scoredata = getResultsHTML();
		document.getElementById('score').value=scoredata;
        //const scorearea = document.getElementById('score');
        const button = document.getElementById('copybutton');

        button.addEventListener('click', () => {
          if (!navigator.clipboard) {
            alert("このブラウザは対応していません");
            return;
          }

          navigator.clipboard.writeText(scoredata).then(
            () => {
              alert('The text has been copied');
            },
            () => {
              alert('The text is fail to be copied');
            });
        });
	}
	else
	{
		setPairLabels();
	}
}

// Compute the weights and the final score
function calcResults()
{
	results_overall = 0.0;

	for (var i = 0; i < NUM_SCALES; i++)
	{
		results_weight[i] = results_tally[i] / 15.0;
		results_overall += results_weight[i] * results_rating[i];
	}
}

// Output the table of results
function getResultsHTML()
{
	var result = "";
	for (var i = 0; i < NUM_SCALES; i++)
	{
		result += "\n";
		result += scale[i];
		result += ",";


		result += results_rating[i];
		result += ",";

		result += results_tally[i];
		result += ",";

		result += "";
		result += results_weight[i];
		result += ",";
	}

	result += "\n";
	result += "Overall Score,";
	result += results_overall;
	result += ",";

	return result;
}
