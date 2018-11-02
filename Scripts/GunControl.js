#pragma strict

var player : GameObject;
var gun : GameObject;
var bullet : GameObject;
var timeBetweenShots : float;
var shotCounter : float;

function Update () {
	if (Input.GetKey("up")){
		transform.SetPositionAndRotation(new Vector3(player.transform.position.x,player.transform.position.y + 1.9,0), new Quaternion(0,0,0,0));
		Fire();
	}
	else if (Input.GetKey("left")){
		transform.SetPositionAndRotation(new Vector3(player.transform.position.x - 1.9,player.transform.position.y,0), new Quaternion(0,0,0,0));
		transform.Rotate(0,0,90);
		Fire();
	}
	else if (Input.GetKey("right")){
		transform.SetPositionAndRotation(new Vector3(player.transform.position.x + 1.9,player.transform.position.y,0), new Quaternion(0,0,0,0));
		transform.Rotate(0,0,270);
		Fire();
	}
	else if (Input.GetKey("down")){
		transform.SetPositionAndRotation(new Vector3(player.transform.position.x,player.transform.position.y - 1.9,0), new Quaternion(0,0,0,0));
		transform.Rotate(0,0,180);
		Fire();
	}
}

function Fire(){
	shotCounter -= Time.deltaTime;
	if (shotCounter <= 0){
		shotCounter = timeBetweenShots;
		Instantiate(bullet,gun.transform.position,gun.transform.rotation);
	}
}