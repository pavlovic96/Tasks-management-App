class Employee {
  constructor(name, surname, username, dateOfBirth, email) {
    (this.name = name),
      (this.surname = surname),
      (this.username = username),
      (this.date = dateOfBirth);
    (this.email = email),
      (this.employees = db.collection("employees")),
      (this.tasks = []),
      (this.tasksLength = 0);
  }

  get name() {
    return this._name;
  }

  get surname() {
    return this._surname;
  }

  get username() {
    return this._username;
  }

  get date() {
    return this._date;
  }

  get email() {
    return this._email;
  }

  get tasks() {
    return this._tasks;
  }

  get tasksLength() {
    return this._tasksLength;
  }

  set name(n) {
    if (n.length > 0) {
      this._name = n;
    }
  }

  set surname(s) {
    if (s.length > 0) {
      this._surname = s;
    }
  }

  set username(u) {
    this._username = u;
  }

  set date(d) {
    this._date = d;
  }

  set email(e) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)) {
      this._email = e;
    } else {
      alert("You have entered an invalid email address!");
    }
  }

  set tasks(t) {
    this._tasks = t;
  }

  set tasksLength(t) {
    this._tasksLength = t;
  }

  async allUsernames() {
    const usernames = [];
    await this.employees.get().then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        usernames.push(doc.id);
      });
    });
    return usernames;
  }

  checkUsername(list) {
    let doesntExist = true;
    for (let i = 0; i < list.length; i++) {
      if (list[i] === this.username) {
        doesntExist = false;
      }
    }
    return doesntExist;
  }

  async addEmployee() {
    let ts = new Date(this.date);

    let obj = {
      name: this.name,
      surname: this.surname,
      date: firebase.firestore.Timestamp.fromDate(ts),
      email: this.email,
      tasks: this.tasks,
      tasksLength: this.tasksLength,
    };

    let response = await this.employees.doc(this.username).set(obj);
    return response;
  }

  async updateEmployee() {
    let ts = new Date(this.date);

    let response = await this.employees.doc(this.username).update({
      name: this.name,
      surname: this.surname,
      date: firebase.firestore.Timestamp.fromDate(ts),
      email: this.email,
    });
    return response;
  }
}

export default Employee;
