var mysql = require('mysql');
var bluebird = require('bluebird')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'FolloUp'
})

connection.connect()

const pq = bluebird.promisify(connection.query).bind(connection)

var grab = () => {
  return pq('SELECT * FROM leads ORDER BY tracker ASC');
};


var insert = (reqbody) => {
  console.log('this is what was passed in', reqbody)
  return pq('INSERT INTO leads (fullName, address, email, phoneNumber, notes, leadType, status, tracker, date) VALUES (?, ?, ?, ?, ?, ? ,? ,?, ?)', [reqbody.fullName, reqbody.address, reqbody.email, reqbody.phoneNumber, reqbody.notes, reqbody.leadType, reqbody.status, reqbody.tracker, reqbody.date])
}

var update = (updatebody) => {
  console.log('we made it to the update query funcion!', updatebody)
      return pq('UPDATE leads SET date = ?, tracker = ?, notes = ?, status = ? WHERE address = ?', [updatebody.newDate, updatebody.tracker, updatebody.newNotes, updatebody.newStatus, updatebody.oldAddress]);
    }

module.exports.grab = grab
module.exports.insert = insert
module.exports.update = update