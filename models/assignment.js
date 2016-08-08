const squel = require('squel').useFlavour('mysql');
const uuid = require('uuid');
const moment = require('moment');

const connection = require('../config/db');

connection.query(`create table if not exists assignments (

    id varchar(50),
    name varchar(50),
    total int(10),
    score int(10)
  )`, err => {
    if(err) {
      console.log('table create err:', err);
    }
  })


exports.getAll = function() {
  return new Promise((resolve, reject) => {
    let sql = squel.select().from('assignments').toString();

    connection.query(sql, (err, assignments) => {
      if(err) {
        reject(err);
      } else {
        resolve(assignments);
      }
    });
  });
};

exports.getOne = function(id) {
  return new Promise((resolve, reject) => {
    let sql = squel.select()
                   .from('assignments')
                   .where('id = ?', id)
                   .toString();

    connection.query(sql, (err, assignment) => {
      
      if(err) {
        reject(err);
      } else if(!assignment) {
        reject({error: 'entry found.'})
      } else {
        resolve(assignment);
      }
    });
  });
};


exports.create = function(newAssignment) {
  return new Promise((resolve, reject) => {
    

    let sql = squel.insert()
                   .into('assignments')
                   .setFields(newAssignment)
                   .set('id', uuid())
                   .toString();

    connection.query(sql, err => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.delete = function(id) {
  return new Promise((resolve, reject) => {
    let sql = squel.delete()
                   .from('assignments')
                   .where('id = ?', id)
                   .toString();

    connection.query(sql, (err, result) => {
      if(result.affectedRows === 0) {
        reject({error: 'contact not found.'})
      } else if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.update = function(id, updateObj) {
  return new Promise((resolve, reject) => {
    delete updateObj.id;

    let sql = squel.update()
                   .table('assignments')
                   .setFields(updateObj)
                   .where('id = ?', id)
                   .toString();

    connection.query(sql, (err, okUpdate) => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};