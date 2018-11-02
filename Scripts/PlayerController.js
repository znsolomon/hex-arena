#pragma strict

var speed : float;
static var dead : boolean = false;
var player : GameObject;

function Update () {
	if(Input.GetKey("w")){
		transform.Translate(Vector3.up *Time.deltaTime * speed);
	}
	if (Input.GetKey("a")){
		transform.Translate(Vector3.left * Time.deltaTime * speed);
	}
	if (Input.GetKey("d")){
		transform.Translate(Vector3.right * Time.deltaTime * speed);
	}
	if (Input.GetKey("s")){
		transform.Translate(Vector3.down * Time.deltaTime * speed);
	}
}

function OnTriggerEnter2D(other : Collider2D){
	if (other.gameObject.CompareTag("Enemy")){
		dead = true;
		player.SetActive (false);
	}
}