extends Node3D

# This preview uses the actual Cardwars atlas and city coordinates. It is a
# standalone Godot scene; the existing browser game's rules remain in the web app.
const MAP_LEFT := 110.0
const MAP_TOP := 155.0
const MAP_WIDTH := 710.0
const MAP_HEIGHT := 440.0
const WORLD_SCALE := 0.1

var camera: Camera3D
var camera_distance := 75.0
var camera_angle := 0.0
var dragging := false
var selected_label: Label
var city_nodes: Array[StaticBody3D] = []


func _ready() -> void:
	make_board()
	make_lighting()
	make_camera()
	make_cities()
	make_interface()
	update_camera()


func make_board() -> void:
	var mesh := PlaneMesh.new()
	mesh.size = Vector2(MAP_WIDTH * WORLD_SCALE, MAP_HEIGHT * WORLD_SCALE)
	var surface := MeshInstance3D.new()
	surface.mesh = mesh
	surface.position.y = -0.17
	var material := StandardMaterial3D.new()
	material.albedo_texture = load("res://assets/atlas.png")
	material.texture_filter = BaseMaterial3D.TEXTURE_FILTER_LINEAR_WITH_MIPMAPS
	material.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	material.roughness = 1.0
	surface.material_override = material
	add_child(surface)
	add_box(self, Vector3(0, -0.55, 0), Vector3(mesh.size.x + 1.0, 0.7, mesh.size.y + 1.0), Color("574638"))


func make_lighting() -> void:
	var sun := DirectionalLight3D.new()
	sun.rotation_degrees = Vector3(-53, -30, 0)
	sun.light_energy = 1.55
	sun.shadow_enabled = true
	add_child(sun)
	var environment := WorldEnvironment.new()
	var sky := Environment.new()
	sky.background_mode = Environment.BG_COLOR
	sky.background_color = Color("1c292b")
	sky.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR
	sky.ambient_light_color = Color("d0d5ca")
	sky.ambient_light_energy = 0.75
	environment.environment = sky
	add_child(environment)


func make_camera() -> void:
	camera = Camera3D.new()
	camera.projection = Camera3D.PROJECTION_ORTHOGONAL
	camera.size = camera_distance
	camera.current = true
	add_child(camera)


func update_camera() -> void:
	if camera == null:
		return
	camera.position = Vector3(sin(camera_angle) * 30, 57, cos(camera_angle) * 30)
	camera.look_at(Vector3.ZERO, Vector3.UP)
	camera.size = camera_distance


func map_position(lon: float, lat: float) -> Vector3:
	var x := (lon + 22.0) * 12.0
	var y := (72.0 - lat) * 15.0
	return Vector3(
		(x - MAP_LEFT - MAP_WIDTH / 2.0) * WORLD_SCALE,
		0.0,
		(y - MAP_TOP - MAP_HEIGHT / 2.0) * WORLD_SCALE
	)


func make_cities() -> void:
	var file := FileAccess.open("res://assets/cities.json", FileAccess.READ)
	if file == null:
		push_error("Cardwars city coordinates not found")
		return
	var parsed: Variant = JSON.parse_string(file.get_as_text())
	if not parsed is Array:
		push_error("Invalid Cardwars city coordinates")
		return
	for entry: Dictionary in parsed:
		var city := StaticBody3D.new()
		city.name = String(entry["name"])
		city.position = map_position(float(entry["lon"]), float(entry["lat"]))
		city.set_meta("realm", entry["realm"])
		add_child(city)
		city_nodes.append(city)
		var stone := Color("d3bb90") if city.name != "Constantinople" else Color("cdb2a0")
		make_castle(city, stone)
		make_banner(city, Color("c85546") if city.name == "Paris" else Color("e0b560"))
		if city.name == "Venice" or city.name == "Lisbon":
			make_ship(city)
		var marker := SphereShape3D.new()
		marker.radius = 1.65
		var collision := CollisionShape3D.new()
		collision.shape = marker
		collision.position.y = 0.9
		city.add_child(collision)
		var title := Label3D.new()
		title.text = city.name
		title.font_size = 42
		title.pixel_size = 0.013
		title.position = Vector3(0, 3.7, 0)
		title.billboard = BaseMaterial3D.BILLBOARD_ENABLED
		title.modulate = Color("f8e9c6")
		title.outline_size = 8
		city.add_child(title)


func make_castle(parent: Node3D, stone: Color) -> void:
	add_cylinder(parent, Vector3(0, 0.09, 0), 1.9, 0.18, Color("4c4235"))
	add_box(parent, Vector3(0, 0.73, 0), Vector3(1.75, 1.4, 1.42), stone)
	add_box(parent, Vector3(0, 1.52, 0), Vector3(1.94, 0.2, 1.6), Color("81705e"))
	for x in [-0.85, 0.85]:
		for z in [-0.68, 0.68]:
			add_cylinder(parent, Vector3(x, 1.07, z), 0.46, 2.1, stone)
			add_cone(parent, Vector3(x, 2.42, z), 0.62, 0.7, Color("774c43"))
	add_box(parent, Vector3(0, 0.4, 0.74), Vector3(0.43, 0.72, 0.12), Color("3c302a"))


func make_banner(parent: Node3D, cloth: Color) -> void:
	add_cylinder(parent, Vector3(0, 2.66, 0), 0.04, 1.6, Color("e3d5ac"))
	add_box(parent, Vector3(0.32, 3.05, 0), Vector3(0.62, 0.37, 0.06), cloth)


func make_ship(parent: Node3D) -> void:
	var ship := Node3D.new()
	ship.position = Vector3(2.2, 0, 1.2)
	parent.add_child(ship)
	add_box(ship, Vector3(0, 0.25, 0), Vector3(1.7, 0.5, 0.55), Color("624332"))
	add_cylinder(ship, Vector3(0, 0.88, 0), 0.04, 1.3, Color("ccb894"))
	add_box(ship, Vector3(0.29, 1.02, 0), Vector3(0.58, 0.75, 0.07), Color("eee1c3"))


func colored_material(color: Color) -> StandardMaterial3D:
	var material := StandardMaterial3D.new()
	material.albedo_color = color
	material.roughness = 0.86
	return material


func add_box(parent: Node3D, location: Vector3, dimensions: Vector3, color: Color) -> void:
	var mesh := BoxMesh.new()
	mesh.size = dimensions
	var instance := MeshInstance3D.new()
	instance.mesh = mesh
	instance.position = location
	instance.material_override = colored_material(color)
	parent.add_child(instance)


func add_cylinder(parent: Node3D, location: Vector3, radius: float, height: float, color: Color) -> void:
	var mesh := CylinderMesh.new()
	mesh.top_radius = radius
	mesh.bottom_radius = radius
	mesh.height = height
	var instance := MeshInstance3D.new()
	instance.mesh = mesh
	instance.position = location
	instance.material_override = colored_material(color)
	parent.add_child(instance)


func add_cone(parent: Node3D, location: Vector3, radius: float, height: float, color: Color) -> void:
	var mesh := CylinderMesh.new()
	mesh.top_radius = 0.0
	mesh.bottom_radius = radius
	mesh.height = height
	var instance := MeshInstance3D.new()
	instance.mesh = mesh
	instance.position = location
	instance.material_override = colored_material(color)
	parent.add_child(instance)


func make_interface() -> void:
	var layer := CanvasLayer.new()
	add_child(layer)
	var panel := PanelContainer.new()
	panel.position = Vector2(22, 20)
	panel.custom_minimum_size = Vector2(360, 100)
	layer.add_child(panel)
	var column := VBoxContainer.new()
	panel.add_child(column)
	var heading := Label.new()
	heading.text = "CARDWARS  ·  GODOT 3D PROEF"
	heading.add_theme_font_size_override("font_size", 21)
	column.add_child(heading)
	selected_label = Label.new()
	selected_label.text = "Klik op een kasteel om een stad te bekijken."
	column.add_child(selected_label)
	var help := Label.new()
	help.text = "Sleep: draaien  ·  Muiswiel: zoomen  ·  R: camera resetten"
	column.add_child(help)


func _unhandled_input(event: InputEvent) -> void:
	if event is InputEventMouseButton:
		if event.button_index == MOUSE_BUTTON_WHEEL_UP and event.pressed:
			camera_distance = maxf(29.0, camera_distance - 5.0)
			update_camera()
		elif event.button_index == MOUSE_BUTTON_WHEEL_DOWN and event.pressed:
			camera_distance = minf(110.0, camera_distance + 5.0)
			update_camera()
		elif event.button_index == MOUSE_BUTTON_LEFT:
			dragging = event.pressed
			if event.pressed:
				select_city(event.position)
	elif event is InputEventMouseMotion and dragging:
		camera_angle += event.relative.x * 0.008
		update_camera()
	elif event is InputEventKey and event.pressed and event.keycode == KEY_R:
		camera_angle = 0.0
		camera_distance = 75.0
		update_camera()


func select_city(point: Vector2) -> void:
	var origin := camera.project_ray_origin(point)
	var direction := camera.project_ray_normal(point)
	var query := PhysicsRayQueryParameters3D.create(origin, origin + direction * 200.0)
	var hit := get_world_3d().direct_space_state.intersect_ray(query)
	if not hit.is_empty() and hit["collider"] in city_nodes:
		var city: StaticBody3D = hit["collider"]
		selected_label.text = "%s  ·  %s" % [city.name, city.get_meta("realm")]
