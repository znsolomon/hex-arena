#pragma strict

var target : Transform;
var eSpeed: float;
var eTransform: Transform;
var inRange : boolean = false;
var wayPoint : int = 1;
var distanceToTarget: float;
static var dupeCount : int;
var attack : boolean = false;
var higherScript : mDupeControl;

function Start () {
	target = GameObject.FindWithTag("Player").transform;
	dupeCount = higherScript.dupeCount;
	transform.Translate(0,0,10);
}

function Update () {
	distanceToTarget = Vector3.Distance(target.position,eTransform.position);
	if (inRange === false){
		target = GameObject.FindWithTag("Player").transform;
		MoveTo(target);
		if (distanceToTarget <= 20 && attack === false){
			inRange = true;
			dupeCount += 1;
			if (target.position.x - this.transform.position.x > 0){
				wayPoint = 4;
			}
		}
	}
	else{
		if (dupeCount >= 5 && attack === false){
			inRange = false;
			eSpeed += 10;
			attack = true;
			target = GameObject.FindWithTag("Player").transform;
		}
		else{
			switch (wayPoint){
				case 1:
					target = GameObject.FindWithTag("Way1").transform;
					if (distanceToTarget < 0.5){
						target = GameObject.FindWithTag("Way2").transform;
						wayPoint = 2;
					}
					else{
						MoveTo(target);
					}
					break;
				case 2:
					if (distanceToTarget < 0.5){
						target = GameObject.FindWithTag("Way3").transform;
						wayPoint = 3;
					}
					else{
						MoveTo(target);
					}
					break;
				case 3:
					if (distanceToTarget < 0.5){
						target = GameObject.FindWithTag("Way4").transform;
						wayPoint = 4;
					}
					else{
						MoveTo(target);
					}
					break;
				case 4:
					target = GameObject.FindWithTag("Way4").transform;
					if (distanceToTarget < 0.5){
						target = GameObject.FindWithTag("Way5").transform;
						wayPoint = 5;
					}
					else{
						MoveTo(target);
					}
					break;
				case 5:
					if (distanceToTarget < 0.5){
						target = GameObject.FindWithTag("Way6").transform;
						wayPoint = 6;
					}
					else{
						MoveTo(target);
					}
					break;
				case 6:
					if (distanceToTarget < 0.5){
						target = GameObject.FindWithTag("Way1").transform;
						wayPoint = 1;
					}
					else{
						MoveTo(target);
					}
					break;
			}
		}
	}
}

function MoveTo(location : Transform){
	var path : Vector2 = new Vector2(location.position.x-eTransform.position.x,location.position.y-eTransform.position.y);
	transform.Translate(path.normalized * eSpeed * Time.deltaTime);
}

function OnTriggerEnter2D(other : Collider2D){
	if (other.gameObject.CompareTag("Bullet")){
		Destroy(other.gameObject);
		if (inRange === true || attack === true){
			dupeCount -= 1;
		}
		Destroy(this.gameObject);
	}
}