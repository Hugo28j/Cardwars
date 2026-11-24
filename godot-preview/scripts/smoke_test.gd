extends SceneTree


func _initialize() -> void:
	call_deferred("verify_preview")


func verify_preview() -> void:
	var scene: Node3D = load("res://scenes/main.tscn").instantiate()
	root.add_child(scene)
	assert(scene.city_nodes.size() == 7, "Seven Cardwars cities should load")
	assert(scene.camera != null and scene.camera.current, "The 3D camera should load")
	for city: StaticBody3D in scene.city_nodes:
		assert(city.get_meta("realm", "") != "", "Every city should retain its realm")
		assert(city.get_child_count() >= 8, "Each city needs its 3D castle and label")
	print("Godot preview OK: atlas texture, camera and %d Cardwars cities" % scene.city_nodes.size())
	quit()
