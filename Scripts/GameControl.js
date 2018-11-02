#pragma strict

var deadMessage : GameObject;
var startMessage : GameObject;
var nextMessage : GameObject;
var playerScript : PlayerController;
var messageLength : float;
var waveNo : int = 0;
var waveComplete : boolean = true;
var spawning : boolean = false;
var spawns : GameObject[];
var enemiesLeft : GameObject[];
var saw : GameObject;
var pulse : GameObject;
var dupe : GameObject;

function Start () {
	showMessage(startMessage);
	spawns = GameObject.FindGameObjectsWithTag("Spawns");
}

function Update () {
	if (playerScript.dead === true){
		deadMessage.SetActive(true);
	}
	if (waveComplete === true){
		waveNo ++;
		loadWave(waveNo);
		waveComplete = false;
	}
	nextWave();
}

function showMessage(message : GameObject){
	message.SetActive(true);
	yield WaitForSeconds(messageLength);
	message.SetActive(false);
}

function nextWave(){
	yield WaitForSeconds(5);
	enemiesLeft = GameObject.FindGameObjectsWithTag("Enemy");
	if (enemiesLeft.length == 0 && spawning === false){
		waveComplete = true;
		showMessage(nextMessage);
	}
}

function loadWave(n : int){
	if (n > 1){
		showMessage(nextMessage);
	}
	spawning = true;
	yield WaitForSeconds(3);
	for (var i : int = 0; i < 8 + n; i++){
		var ran : int = Random.Range(0,7);
		var spawnPoint : GameObject = spawns[ran];
		yield WaitForSeconds(0.1);
		Instantiate(saw,spawnPoint.transform.position,Quaternion(0,0,0,0));
	}
	if (n > 2){
		for (var j : int = 0; j < 2 + n; j ++){
			var ranP : int = Random.Range(0,7);
			var PspawnPoint : GameObject = spawns[ranP];
			Instantiate(pulse,PspawnPoint.transform.position,Quaternion(0,0,0,0));
		}
	}
	if (n > 4){
		for (var k : int = 0; k < 1+(n-5)/2; k ++){
			var ranD : int = Random.Range(0,7);
			var DspawnPoint : GameObject = spawns[ranD];
			Instantiate(dupe,DspawnPoint.transform.position,Quaternion(0,0,0,0));		
		}
	}
	spawning = false;
}