class User {
  constructor(nombre, email, password) {
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
  }
}

module.exports = User;
