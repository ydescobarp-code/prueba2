from flask import Flask, jsonify, request, render_template
from contactos import (
    agregar_contacto,
    obtener_contactos,
    obtener_contacto,
    actualizar_contacto,
    eliminar_contacto
)

app = Flask(__name__)

# Ruta para la página web
@app.route('/')
def index():
    return render_template('index.html')

# --- Rutas API CRUD ---
@app.route('/api/contactos', methods=['GET'])
def get_contactos():
    return jsonify(obtener_contactos()), 200

@app.route('/api/contactos/<string:id>', methods=['GET'])
def get_contacto(id):
    contacto = obtener_contacto(id)
    if contacto:
        return jsonify(contacto), 200
    return jsonify({"error": "Contacto no encontrado"}), 404

@app.route('/api/contactos', methods=['POST'])
def post_contacto():
    data = request.json
    id = data.get('id')
    nombre = data.get('nombre')
    telefono = data.get('telefono')
    if not id or not nombre or not telefono:
        return jsonify({"error": "Datos incompletos"}), 400
    agregar_contacto(id, nombre, telefono)
    return jsonify({"mensaje": "Contacto agregado"}), 201

@app.route('/api/contactos/<string:id>', methods=['PUT'])
def put_contacto(id):
    data = request.json
    nombre = data.get('nombre')
    telefono = data.get('telefono')
    if not nombre or not telefono:
        return jsonify({"error": "Datos incompletos"}), 400

    if actualizar_contacto(id, nombre, telefono):
        return jsonify({"mensaje": "Contacto actualizado"}), 200
    return jsonify({"error": "Contacto no encontrado"}), 404


@app.route('/api/contactos/<string:id>', methods=['DELETE'])
def delete_contacto(id):
    if eliminar_contacto(id):
        return jsonify({"mensaje": "Contacto eliminado"}), 200
    return jsonify({"error": "Contacto no encontrado"}), 404


if __name__ == '__main__':
    app.run(debug=True)