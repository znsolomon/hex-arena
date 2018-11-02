#pragma strict

var bullet : GameObject;
var bulletSpeed : int;

function Update () {
	transform.Translate(Vector3.up * bulletSpeed * Time.deltaTime);
}

function OnTriggerEnter2D(other : Collider2D){
	if (other.gameObject.CompareTag("Wall")){
		Destroy(bullet);
	}
}
