
#Somethings about cutting objects up in Blender 3D

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()
import mathutils
import os
from math import radians
slices = 8
pathVor = r'C:\Unity\Export_42264_9965\Export_42264_9965\42264\Vor\ALI-42264(3)-170216-Ausgangsmodell-Lower.stl'
pathNach = r'C:\Unity\Export_42264_9965\Export_42264_9965\42264\Danach\ALI-42264(3)-170216-Postortho-Lower.stl'
strIndex=0
names = []
bpy.ops.import_mesh.stl(filepath=pathVor)
bpy.context.object.name = '_VorLower'
bpy.ops.import_mesh.stl(filepath=pathNach)
bpy.context.object.name = 'NachLower'
dimension = bpy.data.objects[0].dimensions.x/10
each = dimension/slices
for current in bpy.data.objects:
	names.append(current.name)
	bpy.ops.object.empty_add(type='PLAIN_AXES')
	parent = bpy.context.scene.objects.active
	current.select = True
	bpy.ops.object.parent_set()
	bpy.context.scene.objects.active = current
	bpy.ops.object.select_all(action='DESELECT')
	current.select = True
	current.rotation_euler.x = radians(90)
	current.scale = (0.1,0.1,0.1)
	bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
	current.name = names[strIndex]+'0'
	parent.name = names[strIndex]
	for index in range(1,slices):
		bpy.ops.object.duplicate()
		bpy.context.scene.objects.active.name = names[strIndex]+str(index)
	strIndex += 1
	bpy.context.scene.objects.active = parent.children[0]
	bpy.ops.object.mode_set(mode='EDIT')
	bpy.ops.mesh.bisect(plane_co=((dimension/2)-each, 0, 0), plane_no=(1, 0, 0), use_fill=False, clear_inner=True, clear_outer=False)
	bpy.ops.object.mode_set(mode='OBJECT')
	for i in range(1,slices-1):
		bpy.context.scene.objects.active = parent.children[i]
		bpy.ops.object.mode_set(mode='EDIT')
		bpy.ops.mesh.bisect(plane_co=((dimension/2)-(i*each), 0, 0), plane_no=(1, 0, 0), use_fill=False, clear_inner=False, clear_outer=True)
		bpy.ops.mesh.select_all(action='DESELECT')
		bpy.ops.mesh.select_all(action='SELECT')
		bpy.ops.mesh.bisect(plane_co=((dimension/2)-((i+1)*each), 0, 0), plane_no=(1, 0, 0), use_fill=False, clear_inner=True, clear_outer=False)
		bpy.ops.object.mode_set(mode='OBJECT')
	bpy.context.scene.objects.active = parent.children[slices-1]
	bpy.ops.object.mode_set(mode='EDIT')
	bpy.ops.mesh.bisect(plane_co=((dimension/2)-((slices-1)*each), 0, 0), plane_no=(1, 0, 0), use_fill=False, clear_inner=False, clear_outer=True)
	bpy.ops.object.mode_set(mode='OBJECT')
	
bpy.data.scenes[0].frame_start = 0
bpy.data.scenes[0].frame_end = 49
bpy.data.scenes[0].frame_current = 0
for index in range(slices):
	current = bpy.data.objects[names[0]+str(index)]
	bpy.data.scenes[0].frame_current = 0
	bpy.context.scene.objects.active = current
	bpy.ops.object.shape_key_add()
	bpy.ops.object.modifier_add(type='SHRINKWRAP')
	current.modifiers["Shrinkwrap"].target = bpy.data.objects[names[1]+str(index)]
	bpy.ops.object.modifier_apply(apply_as='SHAPE',modifier="Shrinkwrap")
	current.data.shape_keys.keyframe_insert('key_blocks[1].value',-1,0)
	bpy.ops.anim.keyframe_insert_menu(type='Location')
	bpy.data.scenes[0].frame_current = 49
	current.data.shape_keys.key_blocks[1].value = 1
	current.data.shape_keys.keyframe_insert('key_blocks[1].value',-1,49)
	bpy.ops.anim.keyframe_insert_menu(type='Location')
	
bpy.ops.export_scene.fbx(filepath=r'C:\TFS\Hadi\SWK.Hololens\Branches\Development\DrWeber\Unity\Assets\MyAssets\Models\Primitiv.fbx')