// for namespacing?
var app = app || {};

// todo collection
// the collection of todos is backed by *localStorage* instead of a remote server. 'Local Storage is a drop-in replacement for Backbone.sync() to handle saving to a localStorage database'
var TodoList = Backbone.Collection.extend({

  // connect the collection to the model
  model: app.Todo,

  // save all the todo items under the 'todos-backbone' namespace
  localStorage: new Backbone.LocalStorage('todos-backbone'),

  // filter the list down to all todo items that are completed
  completed: function(){
    //why filter? why not just return this.todo.get('completed')
    return this.filter(function( todo ) {
      return todo.get('completed');
    })
  },

  // filter the list down to all todo items that are remaining
  remaining: function(){
    return this.without.apply( this, this.completed());
  },

  // keep the todos in sequential order despite being saved by an unordered GUID in the db. This generates the next order number for new items
  nextOrder: function(){
    if (!this.length){
      return 1
    }
    return this.last().get('order') + 1
  },

  // todos are sorted by their original insertion order
  comparator: function(todo){
    return todo.get('order')
  }
})

// create our global collection of todos
app.Todos = new TodoList();