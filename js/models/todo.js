// for namespacing?
var app = app || {};

// todo model
app.Todo = Backbone.model.extend({
  defaults: {
    title: '',
    completed: false
  },

  // toggle the completed status of the todo item
  toggle: function(){
    // when toggle() is triggered, trigger save() on the model passing in the opposite of it's current completed status
    this.save({
      completed: !this.get('completed')
    })
  }
})