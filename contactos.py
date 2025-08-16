# contactos.py

contactos = {}

def agregar_contacto(id, nombre, telefono):
    contactos[id] = {"id": id, "nombre": nombre, "telefono": telefono}

def obtener_contactos():
    return list(contactos.values())

def obtener_contacto(id):
    return contactos.get(id)

def actualizar_contacto(id, nombre, telefono):
    if id in contactos:
        contactos[id] = {"id": id, "nombre": nombre, "telefono": telefono}
        return True
    return False

def eliminar_contacto(id):
    return contactos.pop(id, None)